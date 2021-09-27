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
app.get('/heroes', async (_req, res) => {
    try {
        const hero = await Hero.find()
    } catch (err) {
        return res.status(400).json({
            message: "An error happened",
        })
    }
});