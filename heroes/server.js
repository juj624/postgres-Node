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
    let heroes;
    try {
        heroes = await Postgres.query("SELECT * FROM heroes");
    } catch (err) {
        return res.status(400).json({
            message: "An error happened",
        })
    }
    res.status(201).json({
        message: "success",
        data: heroes.rows,
    });
});

app.get('/heroes/:name', async (req, res) => {
    const heroesName = req.params.name;
    let name;
    try {
        name = await Postgres.query('SELECT * FROM heroes WHERE name = $1', [
            heroesName,
        ]);
    } catch (err) {
        return res.status(400).json({
            message: "An error happened",
        })
    }
    res.status(201).json({
        message: "success",
        data: name.rows,
    })
});

app.post('/heroes', async (req, res) => {
    const hero = req.body
    console.log(hero)
    try {
        await Postgres.query('INSERT INTO heroes(name, color, isAlive, age, image) VALUES($1,$2,$3,$4,$5)', [
            hero.name,
            hero.color,
            hero.isAlive,
            hero.age,
            hero.image,
        ]);

    } catch (err) {
        return res.status(400).json({
            message: "An error happened",
        })
    }
    res.status(201).json({
        message: "success",
        data: hero.rows
    });
});

// app.get('/heroes/:id/power', async (req, res) => {
//     const heroesId = req.params.name
//     let power;
//     console.log(heroesPower);
//     try {
//         power = await Postgres.query('INSERT INTO heroes_power(heroesId, powerId) VALUES($1,$2)', [
//             heroesId,
//         ]);
//     } catch (err) {
//         return res.status(400).json({
//             message: "An error happened",
//         })
//     }
//     res.status(201).json({
//         message: "success",
//         data: heroesPower.rows,
//     })
// });

app.listen(3000, () => console.log("Listening"));