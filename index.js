import express from "express";
import openWeather from "./apis/openWeather.js";
import cors from "cors";

const app = express();
app.use(cors());

const weatherData = new openWeather();

app.get("/", (req, res) => {
    const query = req.query;
    res.status(200).json({response: query})
});

app.get("/weather/current", (req, res) => {
    console.log(req.query);
    weatherData.params = req.query;
    weatherData.getWeather()
        .then(r => res.status(200).json(r.data))
        .catch(err => res.status(400).json(err));
});

app.get("/weather/forecast", (req, res) => {
    weatherData.params = req.query;
    weatherData.getForecast()
        .then(r => res.status(200).json(r.data))
        .catch(err => res.status(400).json(err));
});

app.get("/weather/historical", (req, res) => {
    weatherData.params = req.query;
    weatherData.getHistorical()
        .then(r => res.status(200).json(r.data))
        .catch(err => res.status(400).json(err));
});

app.get("/weather/get-icon/:icode", (req, res) => {
    res.status(200).json({iconURL: weatherData.getIconURL(req.params.icode)});
});

app.get("/weather/get-city/:city", (req, res) => {
    res.status(200).json(weatherData.getCityList(req.params.city));
});

app.listen(4000, () => {
    console.log("App running");
});