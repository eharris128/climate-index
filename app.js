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

//------ ** render functions ** ----------|


  // 2 renders needed per click
  function firstRender(state) {
  	console.log(state.weatherData.main.humidity);
  	console.log(state.weatherData.weather[0].description);
  	console.log(state.weatherData.main.temp);
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
    firstRender(state);
  }

getApiData('London',callbackJson);

  // Const APP_KEY = 'mykey';
  // Const BASE_URL = 'https://api.weather.org/search'; (the base endpoint);
  // Const CITY_BASE_URL = 'HTTPS://API.OPENWEATHERMAP.ORG/DATA.2.5/WEATHER;
  // Function fetchCityByName (cityName,callback) {
  // 	Const query = {
  // 	APPID: APP_KEY,
  // 	Q: cityName
  // 	}
  // 	$.getJSON(CITY_BASE_URL, query,callback)
  //
  // }
  // weather info to score function
    // gif api function


//------ ** make event listener functions ** ----------|

  //* which approach would be best for API call?

  // search button submit functions

  //extra info click
