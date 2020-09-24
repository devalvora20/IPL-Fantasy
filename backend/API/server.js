const express = require('express');
const app = express();
const request = require('request');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://deval:deval@cluster0.odhin.mongodb.net/ipl_fantasy>?retryWrites=true&w=majority";

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type ,Accept , Authorization");
    response.setHeader("Acces-Control-Allow-Methods", "GET , POST , PATCH , DELETE ,PUT, OPTIONS");
    next();
});

app.get('/test', (req, res) => {
    res.send({ "Success": "true" });
});

app.get('/get-all-stats', async (req, res) => {
    let player_stats = {}

    try {
        const stats = await getAllStats();
        while (await stats.hasNext()) {
            const player = await stats.next();
            player_stats[player["name"]] = player["match_stats"];
        }
        res.send({ "stats": player_stats });
    } catch (error) {
        console.log(error);
    }
});

async function getAllStats() {
    const db = await MongoClient.connect(uri);
    const dbo = db.db("ipl_fantasy");
    const all_player_stats = await dbo.collection("scores").find({})
    return all_player_stats
}

let port = process.env.PORT || 8081;
app.listen(port, () => console.log('app listening on port 8081'));