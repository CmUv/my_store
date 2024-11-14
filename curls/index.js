// Importamos las dependencias necesarias
const express = require('express'); // Framework para crear el servidor y manejar las rutas
const bodyParser = require('body-parser'); // Middleware para analizar el cuerpo de las solicitudes HTTP
const { Sequelize, Model, DataTypes } = require('sequelize'); // Sequelize es un ORM para interactuar con la base de datos

// Creamos una instancia de la aplicación Express
const app = express();
const port = 3000; // Definimos el puerto en el que se ejecutará el servidor

// Creación de una instancia de Sequelize con SQLite como base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite', // Usamos SQLite como motor de la base de datos
  storage: './database.sqlite' // La base de datos se almacenará en este archivo
});

// Definición del modelo "User" (Usuario), representando una tabla en la base de datos
class User extends Model {} // Definimos una clase User que extiende de Model
User.init({
  name: DataTypes.STRING,     // Campo de nombre tipo string
  email: DataTypes.STRING,    // Campo de email tipo string
  password: DataTypes.STRING  // Campo de contraseña tipo string
}, {
  sequelize,                  // Asocia el modelo con la instancia de Sequelize
  modelName: 'user'           // Define el nombre de la tabla como "user" en la base de datos
});

// Sincroniza los modelos con la base de datos
sequelize.sync(); // Crea las tablas necesarias en la base de datos si no existen

// Middleware para analizar el cuerpo de las solicitudes (enviar datos en formato URL o JSON)
app.use(bodyParser.urlencoded({ extended: false })); // Para datos en formato application/x-www-form-urlencoded
app.use(bodyParser.json()); // Para datos en formato JSON

// Rutas CRUD (Crear, Leer, Actualizar, Borrar) para el modelo "User"

// Obtener todos los usuarios
app.get('/users', async (req, res) => {
  const users = await User.findAll(); // Busca todos los usuarios en la tabla "user"
  res.json(users); // Envía la lista de usuarios como respuesta en formato JSON
  console.log("**** Usuarios obtenidos correctamente");
});

// Obtener un usuario por ID
app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id); // Busca el usuario por su ID primario (pk)
  res.json(user); // Envía el usuario encontrado como respuesta en formato JSON
});

// Crear un nuevo usuario
app.post('/users', async (req, res) => {
  const user = await User.create(req.body); // Crea un nuevo usuario usando los datos enviados en el cuerpo de la solicitud
  res.json(user); // Envía el usuario creado como respuesta en formato JSON
  console.log("**** Usuario agregado correctamente");
});

// Actualizar un usuario por ID
app.put('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id); // Busca el usuario por ID
  if (user) {
    await user.update(req.body); // Actualiza el usuario con los nuevos datos proporcionados
    res.json(user); // Envía el usuario actualizado como respuesta en formato JSON
    console.log("**** Usuario actualizado correctamente");
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' }); // Envía un mensaje de error si no se encuentra el usuario
  }
});

// Eliminar un usuario por ID
app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id); // Busca el usuario por ID
  if (user) {
    await user.destroy(); // Elimina el usuario de la base de datos
    res.json({ message: 'Usuario eliminado' }); // Envía un mensaje de confirmación
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' }); // Envía un mensaje de error si no se encuentra el usuario
  }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port}`);
});
