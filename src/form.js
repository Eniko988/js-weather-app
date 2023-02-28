import { addCard } from "./card.js";
import { loadDataOfTemp, loadDataOfWind,loadDataOfMoisture } from "./weather.js";


export const initForm = () => {
const dateSelector = document.getElementById('date-input');
const form = document.getElementById('form');
const submitButton = document.getElementById('submit');

const errorMessage = document.getElementById('error-message');
const cardsContainer = document.getElementById('cards-container');

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; 
const day = now.getDate();

dateSelector.min =`${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

const maxDate = now;

maxDate.setDate(now.getDate() + 6);
const maxDateYear = maxDate.getFullYear();
const maxDateMonth = maxDate.getMonth() + 1;
const maxDateDay = maxDate.getDate();

dateSelector.max = `${maxDateYear}-${maxDateMonth < 10 ? `0${maxDateMonth}`: maxDateMonth }-${maxDateDay < 10 ? `0${maxDateDay}`: maxDateDay}`

form.addEventListener('submit', async e=>{
    const city = document.getElementById('city-input').value;
    const date = document.getElementById('date-input').value;
    e.preventDefault();
    submitButton.disabled = true;

    cardsContainer.insertAdjacentHTML('afterbegin',`<div id="loading-indicator" class="loader"></div>`);
    try {
       const weatherDataTemp = await loadDataOfTemp (city, date);
       const weatherDataWind = await loadDataOfWind (city, date);
       const weatherDataMoisture = await loadDataOfMoisture (city, date);

       addCard(city, date, weatherDataTemp, weatherDataWind, weatherDataMoisture);
       form.reset();
    } catch (er) {
        errorMessage.style.display="block";
        setTimeout (()=> errorMessage.style.display = 'none',2000);
        
    }
    submitButton.disabled= false;
    cardsContainer.removeChild(document.getElementById('loading-indicator'))
})
}
