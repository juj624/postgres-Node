const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config({
    path: "./config.env",
});


app.use(express.json());

//connection to Postgres

const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

//selectionner les étudiant
app.get('/students', async (_req, res) => {
    let name;
    try {
        name = await Postgres.query("SELECT * FROM students");
    } catch (err) {
        return res.status(400).json({
            message: "An error happened",
        })
    }
    res.status(201).json({
        message: "success",
        data: name.rows,
    });
});
//Ajouter un étudiant !
app.post("/students", async (req, res) => {
    const students = req.body.name
    try {
        await Postgres.query("INSERT INTO students(name) VALUES($1)", [
            students,
        ]);
    } catch (err) {
        return res.status(400).json({
            message: 'success',
        })
    }
    res.status(201).json({
        message: 'student add successfully',
        data: students.rows
    });
});









app.listen(3000, () => console.log('listening'))