import { conectar } from "../modelo/db_conectar.js";

const crud_cliente = {};

const handleResponse = (error, res, successMessage) => {
    if (error) {
        console.error(error);
        res.status(500).send(`Error: ${error.message}`);
    } else {
        console.log(successMessage);
        res.redirect('/');
    }
};

crud_cliente.leer = (req, res) => {
    conectar.query('SELECT clientes.id_Clientes, clientes.Nit, clientes.Nombres, clientes.Apellidos, clientes.Dirección, clientes.Telefono, DATE_FORMAT(clientes.Fecha_Nacimiento, "%d-%m-%Y") as Fecha_Nacimiento FROM clientes;', (error, results) => {
        if (error) {
            handleResponse(error, res, "Error fetching data from the database");
        } else {
            res.render('clientes/index', { resultado: results });
        }
    });
};

crud_cliente.cud = (req, res) => {
    const { btn_crear, btn_actualizar, btn_borrar, ...clienteData } = req.body;

    if (btn_crear || btn_actualizar) {
        const operation = btn_crear ? 'creating' : 'updating';
        const query = btn_crear ? 'INSERT INTO clientes SET ?' : 'UPDATE clientes SET ? WHERE id_Clientes = ?';
        const queryParams = btn_crear ? [clienteData] : [clienteData, clienteData.txt_id];

        conectar.query(query, queryParams, (error, results) => {
            const successMessage = `Successfully ${operation} a client`;
            handleResponse(error, res, successMessage);
        });
    } else if (btn_borrar) {
        conectar.query('DELETE FROM clientes WHERE id_Clientes = ?', [clienteData.txt_id], (error, results) => {
            handleResponse(error, res, "Successfully deleted a client");
        });
    } else {
        res.status(400).send("Invalid operation");
    }
};

export { crud_cliente };

