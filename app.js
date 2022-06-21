const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

    const query = req.body.cityName; 
    const apiKey = config.SECRET_API_KEY;
    const units = "imperial";

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiKey}`;

    https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const weatherTemp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const image = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${image}@2x.png`;

      res.write(
        `<h1>The temperature in ${query} is ${weatherTemp} degress fahrenheit.</h1>`
      );
      res.write(`<h3>The weather is currently ${weatherDesc}.</h3>`);
      res.write(`<img src="${imageURL}"/>`);
      res.send();
    });
  });
})

app.listen(port, () => {
  console.log("Server running on " + port);
});
