const express = require('express');
const app = express();
const request = require('request');
const mongoose = require('mongoose');

const uri = "mongodb+srv://deval:deval@cluster0.odhin.mongodb.net/ipl_fantasy>?retryWrites=true&w=majority";
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/researchImpact2', { useNewUrlParser: true })
    .then(() => {
        console.log("connected to database!");
    })
    .catch((error) => {
        console.log("connection to database failed!");
        console.log(error);
    });

app.use((request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type ,Accept , Authorization");
    response.setHeader("Acces-Control-Allow-Methods", "GET , POST , PATCH , DELETE ,PUT, OPTIONS");
    next();
});

app.get('/test', (req, res) => {
    res.send({ "success": "true" });
});
// app.get('/locatestion', (req, res) => {
//     let street = encodeURI(req.query.street);
//     let state = encodeURI(req.query.state);
//     let city = encodeURI(req.query.city);
//     let url = `https://maps.googleapis.com/maps/api/geocode/json?address=[${street},${city},${state}]&key=${GOOGLE_API_KEY}`;
//     callAPI(url, (responseData) => {

//         if (responseData['results'] == "error") {
//             res.status(500).send();
//         } else {
//             responseData['results'][0]['geometry']['location']['stateAbbreviation'] = responseData['results'][0]['address_components'][5]['short_name'];
//             res.send(responseData['results'][0]['geometry']['location']);
//         }
//     });
//     // res.send({"lat":34.03165,"lng":-118.285245,"stateAbbreviation":"CA"});
// });


function callAPI(url, callback) {
    let result;
    request(url, function (error, response) {
        if (error) {
            callback({ "results": "error" })
        } else {
            try {
                result = JSON.parse(response.body);
                callback(result);
            } catch (err) {
                callback({ "results": "error" });
            }
        }
    });
}
let port = process.env.PORT || 8081;
// let port = 8081;
app.listen(port, () => console.log('app listening on port 8081'));