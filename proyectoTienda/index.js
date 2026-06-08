import express from 'express';
import cors from 'cors';
//import mysql from 'mysql2/promise';
import usuarioController from './controlador/usuarioController.js';
import productoController from './controlador/productoController.js';
import compraController from './controlador/compraController.js';

const app = express();
app.use(cors()); 
app.use(express.json());


// RUTAS DE USUARIOS
app.post('/registrar', usuarioController.registrar);
app.post('/login', usuarioController.login);
app.post('/cambiar-password', usuarioController.cambiarContrasena);

// RUTAS DE PRODUCTOS
app.get('/productos', productoController.listarProductos);

// RUTAS DE COMPRAS E HISTORIAL
app.get('/historial/:usuario_id', compraController.listarHistorial);
app.post('/compras', compraController.crearCompra);


const puerto = 3001;
app.listen(puerto, () => {
    console.log(`Servidor backend corriendo en http://localhost:${puerto}`);
});

