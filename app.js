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


function firstRender(state) {
	const weatherData = state.weatherData;
	const humidityData = weatherData.main.humidity;
	const weatherDescription = weatherData.weather[0].description;
  const currentTemp = weatherData.main.temp;
	const highTemp = weatherData.main.temp_max;
	const lowTemp = weatherData.main.temp_min;
	const pressure = weatherData.main.pressure;
	const percentCloudCover = weatherData.clouds.all;
	const windDirection = windConversion(state);
	const windSpeed = weatherData.wind.speed;

  let firstRenderTemplate = (`
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
  $('.js-results').html(firstRenderTemplate);
	$('.more-button').removeClass('hidden');

}

function errorRender(state) {
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
    .done(getGIFData(callbackGIFJson))
		.fail(e => {errorRender(initialState)})
}

function callbackJson(data) {
  updatesStateWeatherData(data);
  unitConversion(initialState);
  firstRender(initialState);
	moreInfoListener();
}

function callbackGIFJson(data) {
	// update state
	updatesStateGifData(data);
	// render gif to DOM
	rendersGif(initialState);
}

// slides
// style changes


//------ ** make event listener functions ** ----------|


// search city submit functions
const submitCityListener = function(){
	$('#js-form').submit(function(event){
	  event.preventDefault();
	  let cityName = $('#city').val();
	  getApiData(cityName, callbackJson);
		$('.js-error').addClass('hidden');
	});
}

//extra info click
const moreInfoListener = function() {
	$('.more-button').on('click',function(event) {
	  event.preventDefault();
		$('.js-more-data').removeClass('hidden');
		$('.more-button').addClass('hidden');
	});
}

$(function(){
	submitCityListener();
});
