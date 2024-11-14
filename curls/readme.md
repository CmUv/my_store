# API de Gestión de Usuarios

Este proyecto es una **API REST** desarrollada en **Node.js** utilizando **Express** y **Sequelize** para la gestión de usuarios en una base de datos SQLite. La API proporciona un conjunto de endpoints que permiten realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre los usuarios registrados.

Este repositorio está diseñado para ayudar a entender los principios básicos de construcción de una API con Express y Sequelize, ideal para pruebas locales y desarrollo. A continuación, encontrarás instrucciones de instalación, ejecución y ejemplos de comandos `curl` para interactuar con la API.

## Características
- Creación y gestión de usuarios con información básica (nombre, email y contraseña).
- Conexión a base de datos **SQLite** mediante **Sequelize**.
- CRUD completo para usuarios con manejo de errores básicos.

## Tecnologías utilizadas
- **Node.js** y **Express** para el servidor web.
- **Sequelize** como ORM para la gestión de la base de datos.
- **SQLite** como base de datos de desarrollo local.

## comandos curl para interactuar con la API REST
Estos comandos permiten probar las rutas de creación, consulta, actualización y eliminación de usuarios:

Aquí tienes un ejemplo de cómo quedaría el archivo README.md con los comandos curl para interactuar con la API:


# API de Usuarios

Este proyecto es una API REST simple para la gestión de usuarios, creada con Node.js, Express y Sequelize usando SQLite como base de datos. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los usuarios.

## Instalación

1. Clona este repositorio.
2. Instala las dependencias con:
   ```bash
   npm install
Inicia el servidor con:

node app.js
El servidor se ejecutará en http://localhost:3000.

Endpoints
1. Obtener todos los usuarios
GET /users


curl -X GET http://localhost:3000/users
2. Obtener un usuario por ID
GET /users/

Ejemplo (obtener el usuario con ID 1):


curl -X GET http://localhost:3000/users/1
3. Crear un nuevo usuario
POST /users


curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{
  "name": "Carlos Ureña",
  "email": "curena@example.com",
  "password": "123456"
}'
4. Actualizar un usuario existente
PUT /users/

Ejemplo (actualizar el usuario con ID 2):

curl -X PUT http://localhost:3000/users/2 -H "Content-Type: application/json" -d '{
  "name": "Carlos Updated",
  "email": "updatemail@example.com"
}'
5. Eliminar un usuario
DELETE /users/

Ejemplo (eliminar el usuario con ID 1):


curl -X DELETE http://localhost:3000/users/1
6. Crear otro usuario con información diferente
POST /users


curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{
  "name": "Jane Smith",
  "email": "janesmith@example.com",
  "password": "abcdef"
}'
7. Obtener un usuario inexistente (manejo de errores)
GET /users/

Ejemplo (obtener el usuario con ID 99, que no existe):


curl -X GET http://localhost:3000/users/99
8. Actualizar un usuario inexistente (manejo de errores)
PUT /users/

Ejemplo (intentar actualizar el usuario con ID 99, que no existe):


curl -X PUT http://localhost:3000/users/99 -H "Content-Type: application/json" -d '{
  "name": "Nonexistent User"
}'
9. Crear un usuario sin contraseña (validación)
POST /users


curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{
  "name": "Missing Password",
  "email": "missingpassword@example.com"
}'
10. Intentar eliminar un usuario inexistente
DELETE /users/

Ejemplo (eliminar el usuario con ID 99, que no existe):


curl -X DELETE http://localhost:3000/users/99

