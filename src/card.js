
    let cardIdCounter = 0;

    export const addCard = (city, date, weatherDataTemp,weatherDataWind,weatherDataMoisture) => {

    const container = document.getElementById('cards-container');
    
    const minTemp = Math.round(weatherDataTemp.max_temp);
    const maxTemp = Math.round(weatherDataTemp.min_temp);
    const windSpeed = Math.round(weatherDataWind.wind_speed);
    const moisture = Math.round(weatherDataMoisture.moisture_data);

    container.insertAdjacentHTML('afterbegin', `
        <zizi-card id="card-${cardIdCounter}">
        <center>${city} - ${date}<center>
            <div class="card-content">
                <div><i class="bi bi-thermometer-sun"></i>${minTemp}°C</div>
                <div><i class="bi bi-thermometer-snow"></i>${maxTemp}°C</div>
                <div><i class="bi bi-wind"></i>${windSpeed}km/h</div>
                <div><i class="bi bi-moisture"></i>${moisture}mm</div>
            </div>
            <div class="delete-btn">
              <i class="bi bi-trash" id="delete-button-${cardIdCounter}" data-cardIdCounter="${cardIdCounter}"></i>
            </div>
        </zizi-card>
        `);

       document.getElementById(`delete-button-${cardIdCounter}`)
      .addEventListener('click',e => {
      const counterId = e.target.getAttribute('data-cardIdCounter');
      document.getElementById(`card-${counterId}`).remove();
    })
      cardIdCounter++;
    }

