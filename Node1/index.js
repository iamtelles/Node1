import express from "express";
import { crud_cliente } from "./controlador/crud_clientes.js";

const app = express();
const PORT = 5000;

// Middleware para manejar datos de formularios y JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de directorios estáticos
app.use(express.static('./vista'));
app.use(express.static('./controlador'));
app.use(express.static('./modelo'));

// Configuración del motor de vistas
app.set('views', './vista');
app.set('view engine', 'ejs');

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Aplicación iniciada: http://localhost:${PORT}/`);
});

// Rutas
app.get('/', crud_cliente.leer);
app.post('/crud_clientes', crud_cliente.cud);
