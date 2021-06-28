const express = require("express");
const db = require("./database/db");

const app = express();

const SyncSQL = sql => new Promise((resolve, reject) => {
    db.query(sql, (err, results, fields) => {
        if (err) return reject(err);
        resolve(results);
    })
});

app.get("/notices", async (req, res) => {
    let { game } = req.headers;

    try {
        let rows = await SyncSQL(`SELECT * FROM game_notices WHERE game = '${game}'`);
        res.status(200).send({ games: rows });
    } catch (err)  {
        res.status(200).send({ games: [] });
    }


});

app.listen(40120, () => console.log("Server is running in port 40120"));