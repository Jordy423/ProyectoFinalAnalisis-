const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configurar la carpeta raíz para servir archivos estáticos
app.use(express.static(path.join(__dirname, '../')));

// Servir recursos estáticos desde las carpetas específicas
app.use('/css', express.static(path.join(__dirname, '../CSS')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/microservicio', express.static(path.join(__dirname, '../microservicio')));

// Ruta para servir el archivo principal.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../principal.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
