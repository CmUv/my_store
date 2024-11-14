// Importar módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de Sequelize para usar SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

// Definición del modelo User
class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize, modelName: 'user' }
);

// Sincronizar modelos con la base de datos
sequelize.sync();

// Middlewares para manejar JSON y archivos estáticos
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// Ruta para el HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); //abre el archivo index.html
});

// Rutas CRUD para el modelo User
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.json(user);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
});


// Importar multer para manejar la carga de archivos
const multer = require('multer');
const fs = require('fs');

// Configuración de multer para almacenar archivos temporalmente en la carpeta 'uploads'
const upload = multer({ dest: 'uploads/' });

// Ruta para cargar archivo JSON y guardar datos en la base de datos
app.post('/upload-json', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData); // Parsear el contenido JSON

    // Guardar cada usuario en la base de datos
    for (const user of jsonData) {
      await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }

    // Eliminar archivo cargado después de procesarlo
    fs.unlinkSync(filePath);

    res.status(200).json({ message: 'Datos guardados exitosamente en la base de datos' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al procesar el archivo JSON' });
  }
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
