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

// Ruta para el HTML principal
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CRUD de Usuarios</title>
        <style>
          /* CSS integrado */
          .user-card { margin-bottom: 1em; padding: 1em; border: 1px solid #ccc; }
          .user-list { margin-top: 1em; }
        </style>
      </head>
      <body>
        <h1>CRUD de Usuarios</h1>

        <!-- Formulario para crear usuario -->
        <h2>Crear Usuario</h2>
        <form id="createUserForm">
          <label>Nombre: <input type="text" id="name" required /></label><br />
          <label>Email: <input type="email" id="email" required /></label><br />
          <label>Contraseña: <input type="password" id="password" required /></label><br />
          <button type="submit">Crear Usuario</button>
        </form>

        <!-- Formulario para actualizar usuario -->
        <h2>Actualizar Usuario</h2>
        <form id="updateUserForm">
          <label>ID de Usuario: <input type="number" id="userId" required /></label><br />
          <label>Nombre: <input type="text" id="updateName" /></label><br />
          <label>Email: <input type="email" id="updateEmail" /></label><br />
          <label>Contraseña: <input type="password" id="updatePassword" /></label><br />
          <button type="submit">Actualizar Usuario</button>
        </form>

        <!-- Botón para listar usuarios -->
        <h2>Lista de Usuarios</h2>
        <button onclick="fetchUsers()">Cargar Usuarios</button>
        <div id="userList" class="user-list"></div>

        <!-- JavaScript embebido -->
        <script>
          const apiUrl = '/users';

          // Crear Usuario
          document.getElementById("createUserForm").onsubmit = async (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            try {
              const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
              });
              const newUser = await response.json();
              alert(\`Usuario \${newUser.name} creado exitosamente\`);
              fetchUsers();
            } catch (error) {
              alert("Error al crear usuario");
            }
          };

          // Actualizar Usuario
          document.getElementById("updateUserForm").onsubmit = async (e) => {
            e.preventDefault();
            const userId = document.getElementById("userId").value;
            const name = document.getElementById("updateName").value;
            const email = document.getElementById("updateEmail").value;
            const password = document.getElementById("updatePassword").value;
            try {
              const response = await fetch(\`\${apiUrl}/\${userId}\`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
              });
              if (response.ok) {
                const updatedUser = await response.json();
                alert(\`Usuario \${updatedUser.name} actualizado exitosamente\`);
                fetchUsers();
              } else {
                alert("Usuario no encontrado");
              }
            } catch (error) {
              alert("Error al actualizar usuario");
            }
          };

          // Obtener y mostrar lista de usuarios
          async function fetchUsers() {
            try {
              const response = await fetch(apiUrl);
              const users = await response.json();
              const userList = document.getElementById("userList");
              userList.innerHTML = "";
              users.forEach((user) => {
                const userDiv = document.createElement("div");
                userDiv.className = "user-card";
                userDiv.innerHTML = \`
                  <p><strong>ID:</strong> \${user.id}</p>
                  <p><strong>Nombre:</strong> \${user.name}</p>
                  <p><strong>Email:</strong> \${user.email}</p>
                  <button onclick="deleteUser(\${user.id})">Eliminar</button>
                \`;
                userList.appendChild(userDiv);
              });
            } catch (error) {
              alert("Error al cargar usuarios");
              console.log("Error de cargar usuarios");
            }
          }

          // Eliminar Usuario
          async function deleteUser(id) {
            try {
              const response = await fetch(\`\${apiUrl}/\${id}\`, {
                method: "DELETE",
              });
              if (response.ok) {
                alert("Usuario eliminado exitosamente");
                fetchUsers();
              } else {
                alert("Usuario no encontrado");
              }
            } catch (error) {
              alert("Error al eliminar usuario");
            }
          }
        </script>
      </body>
    </html>
  `);
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
    res.status(404).json({ message: 'User not found' });
  }
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
