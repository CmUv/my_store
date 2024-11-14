// console.log("App New")

const express = require('express');
const path = require('path'); //Importa el módulo path, de utilidades para trabajar con rutas de archivos y directorios
const app = express(); // Crea una instancia de la aplicación Express
const port = 3000; //define el puerto

/* app.get('/', (req, res) => {
  res.send('Hola mi server en Express');
}); */

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(express.static(...)): Esta línea configura el middleware para servir archivos estáticos desde la carpeta public.
Esto significa que cualquier archivo dentro de esta carpeta (como HTML, CSS, imágenes o scripts)
se puede acceder directamente a través de su ruta en el navegador.
path.join(__dirname, 'public'): Utiliza el módulo path para construir la ruta absoluta a la carpeta public,
asegurando que el código funcione correctamente independientemente del sistema operativo.
*/

// Enviar el archivo index.html cuando se accede a la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/new-rute', (req, res) => {
  res.send("ruta personanalizada");
});

app.get('/products', (req, res) => {
  res.json({
    "userId": 1,
    "id": 1,
    "title": "Toyota Corolla",
    "body": "Un sedán compacto conocido por su confiabilidad y eficiencia de combustible."
  });
});

app.get('/post-rute', (req, res) => {
  res.send("ruta de post");
});

app.get('/things/:name/:id', function (req, res) {
  res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

/* app.listen(port, () => {
  console.log('My port: ' + port);
}); */
app.listen(port,()=>{
  console.log(`puerto habiltado http://localhost:${port}`)
})
