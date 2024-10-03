const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    port: 2022
});

client.connect();

app.post('/saveGame', async (req, res) => {
    const { nombre, rompecabezas, tiempo, movimientos, dificultad } = req.body; 
    
    try {
        const result = await client.query(
            'INSERT INTO games (nombre, rompecabezas, tiempo, movimientos, dificultad) VALUES ($1, $2, $3, $4, $5)',
            [nombre, rompecabezas, tiempo, movimientos, dificultad]
        );
        res.status(200).send('Datos guardados exitosamente');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar los datos');
    }
});

app.get('/getLeaderboard', async (req, res) => {
    const { imagen, dificultad } = req.query;

    try {
        // Consulta que filtra por rompecabezas y nivel
        const result = await client.query(
            'SELECT * FROM games WHERE rompecabezas = $1 AND dificultad = $2 ORDER BY tiempo ASC',
            [imagen, dificultad]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener datos de la base de datos');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});