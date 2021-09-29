const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
dotenv.config({
    path: './config.env',
});

app.use(express.json());

// Connection to Postgres
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

app.get('/authors', async (_req, res) => {
    let authors
    try {
        authors = await Postgres.query("SELECT * FROM authors");
    } catch (err) {
        return res.status(400).json({
            message: "An error happened",
        });
    }
    res.status(201).json({
        message: "success",
        data: authors.rows,
    });
});

app.get('/authors/:id', async (req, res) => {
    const authorId = req.params.id;

    let author

    try {
        author = await Postgres.query('SELECT name, nationality FROM authors WHERE id=$1', [
            authorId,
        ])
    } catch (err) {
        res.status(400).json({
            message: "An error happened",
        });
    }
    res.status(201).json({
        message: "success",
        data: author.rows,
    });
});

app.get('/authors/:id/books', async (req, res) => {
    const authorId = req.params.id

    let books

    try {
        books = await Postgres.query('SELECT name, books FROM authors WHERE id=$1', [
            authorId,
        ])
    } catch (err) {
        res.status(400).json({
            message: "An error happened",
        });
    }
    res.status(201).json({
        message: "success",
        data: books.rows,
    });
});

app.listen(3000, () => console.log("Listening"));