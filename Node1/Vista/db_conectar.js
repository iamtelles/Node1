import mysql from 'mysql';

const dbConfig = {
    host: 'localhost',
    user: 'usr_empresa',
    password: 'Sally0811.',
    database: 'bd_empresa'
};

const conectar = mysql.createConnection(dbConfig);

const connectToDatabase = async () => {
    try {
        await conectar.connect();
        console.log('Conexión exitosa ID:', conectar.threadId);
    } catch (error) {
        console.error('Error en la conexión:', error.message);
    }
};

export { conectar, connectToDatabase };
