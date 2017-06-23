//------ ** define state! ** ----------|


let initialState = {
	weatherData: {},
	showMoreInfo: false,
	gifData: {}
}


//------ ** state mod functions ** ----------|


  // store api data
function updatesStateWeatherData(data){
	initialState.weatherData = data;
}

function updatesStateGifData(data) {
	// chooce images.ourpreferredsizeimage
	initialState.gifData = data.data.image_original_url;
}

function pressureAndTemperatureConversion(state) {
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


function stateRender(state) {
	// DRY this up! (Don't Repeat Yourself). (Reduce duplication.)

	const weatherData = state.weatherData;
	// is equivalent to:
	// const { weatherDay } = state
	// This is called "object destructuring".
	//
	// const { weatherData: {
	// 	main: {
	// 		{ humidity, temp, temp_max, temp_min, pressure }
	// 	}
	// } = state

	const humidityData = weatherData.main.humidity;
	const weatherDescription = weatherData.weather[0].description;
  const currentTemp = weatherData.main.temp;
	const highTemp = weatherData.main.temp_max;
	const lowTemp = weatherData.main.temp_min;
	const pressure = weatherData.main.pressure;
	const percentCloudCover = weatherData.clouds.all;
	const windDirection = windConversion(state);
	const windSpeed = weatherData.wind.speed;

  let stateRenderTemplate = (`
	  <h3>Current Temperature is: ${currentTemp}\&ordm F</h3>
	  <h4>Today's weather description is: "${weatherDescription}"</h4>
	  <h4>The Humidity is: ${humidityData}%</h4>
		<button class="more-button hidden" type="button">More Info</button>
		<div class="js-more-data hidden">
			<p>Today's high: ${highTemp}\&ordm F</p>
			<p>Today's low: ${lowTemp}\&ordm F</p>
			<p>Today's current pressure: ${pressure} mmHg</p>
			<p>Today's current % cloud cover is: ${percentCloudCover}%</p>
			<p>Today's current Cardinal wind direction is: ${windDirection}</p>
			<p>Today's current wind speed is: ${windSpeed}m/s</p>
		</div>
  `)
  $('.js-for-error').removeClass('hidden');
  $('.js-results').html(stateRenderTemplate);
	$('.more-button').removeClass('hidden');

}

function errorRender(state) {
	// Refactor this into main render function and
	// use state to determine whether error is showing.
	//
	// i.e.:
	// state.showingError = true

	$('.js-for-error').addClass('hidden');
	let errorRenderTemplate = (`
		<p>Please enter valid city name and country!</p>
		`)
	$('.js-error').html(errorRenderTemplate)
		.css('color', 'red')
		.removeClass('hidden');
}

function rendersGif (state) {
	const gif = state.gifData;
	let gifRenderTemplate = (`
		<img src=${gif}>
		`)
	$('.js-gif').html(gifRenderTemplate);
}

//------ ** functions to write ** ----------|
function getGIFData(callback){
	 const appKey = '6cb3b870c31b4846b6b714316ea2639e';
	 const baseUrl = 'http://api.giphy.com/v1/gifs/random';
	 const query = {
	 	tag: 'weatherman',
	 	api_key: appKey
	 }
	 $.getJSON(baseUrl, query, callback)
}

function getApiData(cityName, callback) {
  const appKey = "0b0b48a8c8b04be0075e7d47726f1633"
  const baseUrl = "http://api.openweathermap.org/data/2.5/weather"
  const query = {
    q: cityName,
    appID: appKey
		}

  $.getJSON(baseUrl, query, callback)
    .done(getGIFData(gifJsonToRenderPath))
		.fail(e => {errorRender(initialState)})
}

function jsonToRenderPath(data) {
  updatesStateWeatherData(data);

	// Consider if you didn't know anything about the app,
	// how would this read?
  pressureAndTemperatureConversion(initialState);

	// Use global find-and-replace to change function names.
  stateRender(initialState);

	// Consider setting up all listeners at the same time.
	// Be sure to use $.on() for dynamically added elements.
	moreInfoListener();
}

function gifJsonToRenderPath(data) {
	// update state
	updatesStateGifData(data);
	// render gif to DOM
	rendersGif(initialState);
}

//------ ** make event listener functions ** ----------|


// search city submit functions
const submitCityListener = function(){
	$('#js-form').submit(function(event){
	  event.preventDefault();
		$('.js-error').addClass('hidden');

	  let cityName = $('#city').val();

		// jsonToRenderPath: More descriptive name?
	  getApiData(cityName, jsonToRenderPath);
	});
}

//extra info click
const moreInfoListener = function() {
	$('.more-button').on('click',function(event) {
	  event.preventDefault();

		// These two lines should be based on state and
		// handled in the render.
		// i.e. state.showingMoreInfo = true
		$('.js-more-data').removeClass('hidden');
		$('.more-button').addClass('hidden');
	});
}

$(function(){
	submitCityListener();
});
