//------ ** define state! ** ----------|

// setup state

  // what state vars?
  // state structure?


//------ ** state mod functions ** ----------|

  // store api data


//------ ** render functions ** ----------|


  // 2 renders needed per click

    // html templates for both


  // render for non valid zip code
    // html template for error


//------ ** functions to write ** ----------|


  // API info conversion functions as needed
  //extra function defined to id non valid zips, calls error render
  // get weather api data function
  function getWeatherApi(cityName, callback) {
    const appKey = "0b0b48a8c8b04be0075e7d47726f1633"
    const baseUrl = "api.openweathermap.org/data/2.5/weather"
    const query = {
      q: cityName,
      appID: appKey

    }
    $.getJSON(baseUrl, query, callback);
  }

  function callbackJson(data) {
    let response = [];
    data.push(response);
    console.log(response);
  }


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
