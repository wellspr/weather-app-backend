# API Documentation

This api is designed to permit request of data from the [Open Weather API](https://openweathermap.org/api). We make use of the free tier service.

## Current Weather

Current weather api documentation is available at https://openweathermap.org/current. 

The current weather data can be retrieved for one location or for various cities. We implement first the case of getting data for one single location at a time.

Current weather for one location can be retrieved by city name, by city ID, by geographic coordinates and by ZIP code. 

---

### Parameters

Requests can be made by city name, by city ID, by coordinates and by ZIP code. 

The required parameter to make a request by city name is `q`; the required parameter to make a request by city ID is `id`; the required parameters to make a request by geocoordinates are `lat` and `lon`; the required parameter for making a request by zip code is `zip`.

The required API key is provided by the following parameter:

`appid` - API key. (required)

The following are optional parameters that can be passed along with the required ones.

`mode` - Response format, JSON by default, we are not going to change this. (optional)

`units` - Units of measurement, possible values are **standard**, **metric** and **imperial**. (optional)

`lang` - Output language. (optional)

Example of direct API call 

    api.openweathermap.org/data/2.5/weather?q=London&appid={API key}


### Call to this API

To make an equivalent call using this API one must make a request to 

    /weather

passing along a query object with the relevant parameters. Example request by city name using axios:

    axios.get("/weather", {
        query: {
            q: "Paris",
            units: "metric",
            lang: "fr"
        }
    });

Fields in API response

- **coord**
    - **coord.lon** City geo location, longitude
    - **coord.lat** City geo location, latitude
- **weather** (more info Weather condition codes)
    - **<b>weather.id</b>** Weather condition id
    - **weather.main** Group of weather parameters (Rain, Snow, Extreme etc.)
    - **weather.description** Weather condition within the group. You can get the output in your language. Learn more
    - **weather.icon** Weather icon id
- **base** Internal parameter
- **main**
    - **main.temp** Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    - **main.feels_like** Temperature. This temperature parameter accounts for the human perception of weather. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    - **main.pressure** Atmospheric pressure (on the sea level, if there is no sea_level or grnd_level data), hPa
    - **main.humidity** Humidity, %
    - **main.temp_min** Minimum temperature at the moment. This is minimal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    - **main.temp_max** Maximum temperature at the moment. This is maximal currently observed temperature (within large megalopolises and urban areas). Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
    - **main.sea_level** Atmospheric pressure on the sea level, hPa
    - **main.grnd_level** Atmospheric pressure on the ground level, hPa
- **wind**
    - **wind.speed** Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
    - **wind.deg** Wind direction, degrees (meteorological)
    - **wind.gust** Wind gust. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
- **clouds**
    - **clouds.all** Cloudiness, %
- **rain**
    - **rain.1h** Rain volume for the last 1 hour, mm
    - **rain.3h** Rain volume for the last 3 hours, mm
- **snow**
    - **snow.1h** Snow volume for the last 1 hour, mm
    - **snow.3h** Snow volume for the last 3 hours, mm
- **dt** Time of data calculation, unix, UTC
- **sys**
    - **sys.type** Internal parameter
    - **<b>sys.id</b>** Internal parameter
    - **sys.message** Internal parameter
    - **sys.country** Country code (GB, JP etc.)
    - **sys.sunrise** Sunrise time, unix, UTC
    - **sys.sunset** Sunset time, unix, UTC
- **timezone** Shift in seconds from UTC
- **id** City ID
- **name** City name
- **cod** Internal parameter


## One Call API

This API gives access to current weather, minute forecast for 1 hour, hourly forecast for 48 hours, daily forecast for 7 days and government weather alerts. The documentation is available at <https://openweathermap.org/api/one-call-api>. 

The direct call is made like this: 

    https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


Here, `lat` and `lon` are required parameters, the geographical cooordinates, **latitude** and **longitude**. 