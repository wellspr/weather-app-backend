import axios from "axios";
import _ from "lodash";
import { OPEN_WEATHER_API_KEY } from "../config/index.js";
import { cityList } from "./data/cityList.js";

console.log(cityList.length);

const apiKey = OPEN_WEATHER_API_KEY;

class openWeather {
    constructor(params) {
        this.params = params;
        this.baseURL = "https://api.openweathermap.org/data/2.5";
        this.makeRequest = axios.create({
            baseURL: this.baseURL,
            params: { appid: apiKey }
        });
    }

    getWeather = async () => {
        return await this.makeRequest("/weather", {
            params: { ...this.params }
        });
    }

    getForecast = async () => {
        return await this.makeRequest("/onecall", {
            params: { ...this.params }
        });
    }

    getHistorical = async () => {
        return await this.makeRequest("/timemachine", {
            params: { ...this.params }
        });
    }

    getIconURL = (iconCode) => {
        return {
            small: `http://openweathermap.org/img/wn/${iconCode}@2x.png`,
            large: `http://openweathermap.org/img/wn/${iconCode}@4x.png`
        };
    }

    getIconList = () => {
        const icons = [
            "01d", "02d", "03d", "04d", "09d", "10d", "11d", "13d" ,"50d",
            "01n", "02n", "03n", "04n", "09n", "10n", "11n", "13n" ,"50n"
        ];

        return icons.map(icon => {
            return {
                code: icon,
                url: this.getIconURL(icon)
            };
        });
    }

    getCityList = (search) => {

        const terms =_.words(search, /[^,]+/g);

        const city = _.trim(terms[0]);
        const country = _.trim(terms[1])

        console.log(city);
        console.log(country);
        
        let list = [];
        cityList.filter(item => {
            const itemName = _.lowerCase(item.name);
            const queryName = _.lowerCase(city);
            
            if (_.startsWith(itemName, queryName)) {
                list.push({
                    item: item,
                    name_length: item.name.length
                });
            }
        });

        const sortedByCity = _.sortBy(list, ["name_length"]).map(city => {
            return city.item;
        });

        if (!country) {
            return sortedByCity;                
        }

        return sortedByCity.filter(city => {
            const countryName = _.lowerCase(city.country);
            const queryName = _.lowerCase(country);
            if (countryName === queryName) {
                return city;
            }
        });

    }

}

export default openWeather;