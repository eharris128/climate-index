//------ ** define state! ** ----------|

// setup state

  // what state vars?
  // state structure?
let state = {
	weatherData: {},
	showMoreInfo: false,
}

//------ ** state mod functions ** ----------|

  // store api data
  function updatesStateWeatherData(data){
  	state.weatherData = data;
  	console.log(state.weatherData);
  }

  function unitConversion(state) {
  	const pascalToMercury = 0.75006375541921;
    state.weatherData.main.temp = ((9/5) * (state.weatherData.main.temp - 273.15) + 32).toFixed(2);
    state.weatherData.main.temp_max = ((9/5) * (state.weatherData.main.temp_max - 273.15) + 32).toFixed(2);
    state.weatherData.main.temp_min = ((9/5) * (state.weatherData.main.temp_min - 273.15) + 32).toFixed(2);
    state.weatherData.main.pressure = ((state.weatherData.main.pressure * pascalToMercury) / 100).toFixed(2);
  }

function windConversion(state) {
	let windDirection = state.weatherData.wind.deg;
	switch(true) {
		case windDirection < 11.25:
			windDirection = 'N';
			break;
		case windDirection < 33.75:
			windDirection = 'NNE';
			break;
		case windDirection < 56.25:
			windDirection = 'NE';
			break;
		case windDirection < 78.75:
			windDirection = 'ENE';
			break;
		case windDirection < 101.25:
			windDirection = 'E';
			break;	
		case windDirection < 123.75:
			windDirection = 'ESE';
			break;
		case windDirection < 146.25:
			windDirection = 'SE';
			break;
		case windDirection < 168.75:
			windDirection = 'SSE';
			break;
		case windDirection < 191.25:
			windDirection = 'S';
			break;		
		case windDirection < 213.75:
			windDirection = 'SSE';
			break;
		case windDirection < 236.25:
			windDirection = 'SW';
			break;
		case windDirection < 258.75:
			windDirection = 'WSW';
			break;
		case windDirection < 281.25:
			windDirection = 'W';
			break;	
		case windDirection < 303.75:
			windDirection = 'WNW';
			break;
		case windDirection < 326.25:
			windDirection = 'NW';
			break;
		case windDirection < 348.75:
			windDirection = 'NNW';
			break;
		case windDirection > 348.75:
			windDirection = 'N'
			break;
		default:
			windDirection = 'Unknown';
	}
	return windDirection;
}

//------ ** render functions ** ----------|

// let firstRenderTemplate = (state) => {
//   const currentTemp = state.weatherData.main.temp;
//   return (`
//   <h3>Current Temperature is: ${currentTemp}</h3>
//   <h4>The Weather is: ${weatherDescription}</h4>
//   <h4>The Humidity is: ${humidityData}</h4>
//   `)
// }

  // 2 renders needed per click

function firstRender(state) {
	const humidityData = state.weatherData.main.humidity;
	const weatherDescription = state.weatherData.weather[0].description;
  const currentTemp = state.weatherData.main.temp;
  let firstRenderTemplate = (`
  <h3>Current Temperature is: ${currentTemp}\&ordm F</h3>
  <h4>Today's weather description is: "${weatherDescription}"</h4>
  <h4>The Humidity is: ${humidityData}%</h4>
  `)
  $('.js-results').html(firstRenderTemplate);
  console.log(firstRenderTemplate);
}

function secondRender(state) {
	//Discuss as alt ways of storing our weather data
		const weatherData = state.weatherData;
			// const copyData = Object.assign({}, state.weatherData);

const highTemp = weatherData.main.temp_max;
const lowTemp = weatherData.main.temp_min;
const pressure = weatherData.main.pressure;
const percentCloudCover = weatherData.clouds.all;
const windDirection = windConversion(state);
const windSpeed = weatherData.wind.speed;


	let secondRenderTemplate = (`
	<p>Today's high: ${highTemp}\&ordm F</p>
	<p>Today's low: ${lowTemp}\&ordm F</p>
  <p>Today's current pressure: ${pressure} mmHg</p>
  <p>Today's current % cloud cover is: ${percentCloudCover}%</p>
  <p>Today's current Cardinal wind direction is: ${windDirection}</p>
  <p>Today's current wind speed is: ${windSpeed}m/s</p>
		`)
	$('.js-more-data').html(secondRenderTemplate);
}
    // html templates for both


  // render for non valid zip code
    // html template for error


//------ ** functions to write ** ----------|


  // API info conversion functions as needed
  //extra function defined to id non valid zips, calls error render
  // get weather api data function
  function getApiData(cityName, callback) {
    const appKey = "0b0b48a8c8b04be0075e7d47726f1633"
    const baseUrl = "http://api.openweathermap.org/data/2.5/weather"
    const query = {
      q: cityName,
      appID: appKey

    }
    //.done will wait until $.getJSON for weather API is complete before running getGiphyData
    // $.getJSON(baseUrl, query, callback).done(getGiphyData(myCalculatedScore, callback));
    $.getJSON(baseUrl, query, callback)
    // .done(functionhere);
    // How to handle 404 error
    	   // .fail(e => {console.log('AAAAAAA')})
  }

  function callbackJson(data) {
    updatesStateWeatherData(data);
    //some call of a rendering function
    unitConversion(state);
    firstRender(state);
  }


  // weather info to score function
    // gif api function


//------ ** make event listener functions ** ----------|

  //* which approach would be best for API call?

  // search button submit functions
$('#js-form').submit(function(event){
  event.preventDefault();
  let cityName = $('#city').val();
  getApiData(cityName, callbackJson);
  $('.js-more-data').removeClass('hidden');
})
  //extra info click

$('.more-button').on('click',function(event) {
  event.preventDefault();
  secondRender(state);
});
