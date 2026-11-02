# ExploreHub — Weather App + Movie Search App

A responsive mini project built with HTML5, CSS3 and JavaScript ES6+. It contains two applications:
- **Weather App:** searches current weather by city using OpenWeather.
- **Movie Search App:** searches movie titles and displays posters and release years using OMDb.

## Requirements
- Visual Studio Code
- Live Server extension (Ritwick Dey)
- Internet connection
- Free API keys from OpenWeather and OMDb

## Setup in VS Code
1. Extract the ZIP file.
2. Open the extracted `Mini_Project` folder in VS Code.
3. Open `weather.js` and replace `YOUR_OPENWEATHER_API_KEY` with your OpenWeather API key.
4. Open `movies.js` and replace `YOUR_OMDB_API_KEY` with your OMDb API key.
5. Right-click `index.html` and choose **Open with Live Server**.

## Get API keys
- OpenWeather: https://openweathermap.org/api
- OMDb: https://www.omdbapi.com/apikey.aspx

After receiving an API key, paste it between the quotes. Do not share your API keys publicly or commit them to a public GitHub repository.

## Project structure
```text
Mini_Project/
├── index.html
├── style.css
├── script.js
├── weather.html
├── weather.css
├── weather.js
├── movies.html
├── movies.css
├── movies.js
└── README.md
```

## Concepts demonstrated
- ES6 arrow functions, template literals and destructuring
- JavaScript modules
- DOM selection, event handling and dynamic rendering
- Fetch API, Promises and async/await
- JSON response handling and error handling
- Responsive CSS layout

## Note
The APIs require valid keys. The pages will load without keys, but searches display a setup message until you add them.
