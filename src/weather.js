export const loadDataOfTemp = async (city, date) => {
    try {
        const coordinates = await getCoordinates(city);
        const weatherDataOfTemp = await getDataOfTemp(coordinates,date);
        return weatherDataOfTemp;

    } catch (e) {
        console.error('Error loading weather data',e);
        throw e;
    }
}
export const loadDataOfWind = async (city, date) => {
    try {
        const coordinates = await getCoordinates(city);
        const weatherDataOfWind = await getDataOfWind(coordinates, date);
        return weatherDataOfWind;
    } catch (e) {
        console.error('Error loading weather data',e);
        throw e;
    }
}
export const loadDataOfMoisture = async (city, date) => {
    try {
        const coordinates = await getCoordinates(city);
        const weatherDataOfMoisture = await getDataOfMoisture(coordinates, date);
        return weatherDataOfMoisture;
    } catch (e) {
        console.error('Error loading weather data',e);
        throw e;
    }
}
const getCoordinates = (city) =>{
    const geocoding = {
        'Atlanta': {lat:33.7489,lon:-84.3879},
        'Bangkok':{lat:13.7563, lon:100.5017},
        'Berlin': {lat:52.5235, lon:13.4115},
        'Budapest': {lat:47.4984, lon:19.0408},
        'Cairo':{lat:30.0333, lon:31.2333},
        'Jakarta':{lat:-6.2255, lon:106.7985},
        'Melbourne':{lat: -37.84093, lon:144.9464},
        'Mumbai': {lat:19.0759,lon:72.8776},
        'London': {lat:51.5002, lon:-0.1262},
        'Peking':{lat: 39.9918, lon:116.31017},
        'San Francisco':{lat:37.8093, lon:-122.4099},
        'Tokyo': {lat:35.6869,lon:139.7494},
        'Washington':{lat: 47.7510, lon:-120.7401}
    };

    return new Promise((resolve, reject)=>{
        const result = geocoding[city];
        if (result){
            resolve(result);
        }else{
            reject(new Error('Error occured during geocoding'));
        }
    })
}

const getDataOfTemp = async (coordiantes, date) => {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordiantes.lat}&longitude=${coordiantes.lon}&daily=apparent_temperature_max,apparent_temperature_min&timezone=Europe/Budapest`);
    if (response.status !== 200) {
        throw 'Error loading weather data';
    }
    const jsonResponse = await response.json();

    const dateIndex = jsonResponse.daily.time.findIndex(d => d === date);

    const temp = {
		min_temp: jsonResponse.daily.apparent_temperature_min[dateIndex],
		max_temp: jsonResponse.daily.apparent_temperature_max[dateIndex]}
    return temp;
}

const getDataOfWind= async (coordiantes, date) => {
   
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordiantes.lat}&longitude=${coordiantes.lon}&daily=windspeed_10m_max&timezone=Europe/Budapest`);
    if (response.status !== 200) {
        throw 'Error loading weather data';
    }
    const jsonResponse = await response.json();

    const dateIndex = jsonResponse.daily.time.findIndex(d => d === date);
    const windSpeed = {
        wind_speed: jsonResponse.daily.windspeed_10m_max[dateIndex]
    }
    
    return windSpeed;
    
}
const getDataOfMoisture= async (coordiantes, date) => {
   
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordiantes.lat}&longitude=${coordiantes.lon}&daily=rain_sum&timezone=Europe/Budapest`);
    if (response.status !== 200) {
        throw 'Error loading weather data';
    }
    const jsonResponse = await response.json();

    const dateIndex = jsonResponse.daily.time.findIndex(d => d === date);
    const moisture = {
        moisture_data: jsonResponse.daily.rain_sum[dateIndex]
    }
    
    return moisture;  
}
