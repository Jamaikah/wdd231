document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#navigation');

navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});

const url = 'https://jamaikah.github.io/wdd231/chamber/data/members.json';


const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#desc');

const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=8.47&lon=124.59&units=metric&appid=601a786d3d3e91a0024809f93231b5ca';
// 8.47, 124.59
async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            //console.log(data);
            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

apiFetch();

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}       


const forecastDate = document.querySelector('#forecastDay');


const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=8.47&lon=124.59&units=metric&appid=601a786d3d3e91a0024809f93231b5ca';

async function forecastAPIFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const forecastData = await response.json();
            //console.log(data);
            forecastDisplay(forecastData);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

forecastAPIFetch();

function forecastDisplay(forecastData) {

    const dailyForecast = {}

    forecastData.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });
        if (!dailyForecast[date]) {
            dailyForecast[date] = [];
        }
        dailyForecast[date].push(item);
    })

    const days = Object.keys(dailyForecast).slice(1, 4);
    
    days.forEach((day) => {
        const dayData = dailyForecast[day];

        const dayName = new Date(day).toLocaleDateString('en-US', { weekday: 'short' });
        const dayDate = new Date(day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const tempHigh = Math.max(...dayData.map((item) => item.main.temp_max));
        const tempLow = Math.min(...dayData.map((item) => item.main.temp_min));
        const middle = dayData[Math.floor(dayData.length / 2)];
        const dayIcon = middle.weather[0].icon;
        const dayDesc = middle.weather[0].description;

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="forecast-day">${dayName}</div>
            <div class="forecast-date">${dayDate}</div>
            <img src="https://openweathermap.org/img/wn/${dayIcon}.png" alt="${dayDesc}">
            <div class="forecast-temp">
                <span class="temp-high">${Math.round(tempHigh)}&deg;C</span>
                <span class="temp-low">${Math.round(tempLow)}&deg;C</span>
            </div>
            <div class="forecast-desc">${dayDesc}</div>
        `;

        forecastDate.appendChild(forecastCard);
    });
}



const data_url = "data/members.json";
const container = document.getElementById("spotlight-container");
const levels = { "1": "Member", "2": "silver", "3": "Gold" };

function randoms(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));      
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

async function loadSpotlight() {
    try {
        const response = await fetch(data_url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        const allgoods = data.companies.filter(
            comps => comps.membershipLevel == "2" || comps.membershipLevel == "3"
        );

        const count = Math.min(allgoods.length, Math.random() < 0.5 ? 2 : 3);
        const spotlights = randoms(allgoods).slice(0, count);

        displaySpotlights(spotlights);
    } catch (error) {
        console.error("Could not load spotlights:", error);
        container.textContent = "Spotlights are unavailable right now.";
    }
}

function displaySpotlights(companies) {
    container.innerHTML = "";

    companies.forEach(company => {
        const card = document.createElement("article");
        card.className = "spotlight-card";

        card.innerHTML = `
      <img src="${company.image}" alt="${company.companyName} logo" loading="lazy">
      <h3>${company.companyName}</h3>
      <p class="level">${levels[company.membershipLevel]} Member</p>
      <p>${company.companyPhoneNumber}</p>
      <p>${company.companyAddress}</p>
      <a href="${company.companyURL}" target="_blank" rel="noopener">Visit Website</a>
    `;

        container.appendChild(card);
    });
}

loadSpotlight();