

const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {

    var city = req.body.cityn;
    var appid = // your app id 
     ;

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid;
    https.get(url, function (request, response) {
        request.on("data" , function(data){
            var weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var icon = weatherData.weather[0].icon;
            var disc = weatherData.weather[0].description;
            res.write("<h1> The Temperature in " + city + " is " + temp + "</h1>");
            res.write("<p>" + disc + "</p>");
            res.write(" <img src =http://openweathermap.org/img/wn/" +icon+ "@2x.png >");
            res.send();
        })
    })

})

app.listen("3000", function () {
    console.log("server running on port 3000");
})
