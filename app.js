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

  function tempConvert(state) {
    state.weatherData.main.temp = (state.weatherData.main.temp - 273.15).toFixed(2);
    state.weatherData.main.temp_max = (state.weatherData.main.temp_max - 273.15).toFixed(2);
    state.weatherData.main.temp_min = (state.weatherData.main.temp_min - 273.15).toFixed(2);
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
  <h4>The Weather is: "${weatherDescription}"</h4>
  <h4>The Humidity is: ${humidityData}%</h4>
  `)
  $('.js-results').html(firstRenderTemplate);
  console.log(firstRenderTemplate);
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
      .done(/*functionhere*/);
  }

  function callbackJson(data) {
    updatesStateWeatherData(data);
    //some call of a rendering function
    tempConvert(state);
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
})
  //extra info click
