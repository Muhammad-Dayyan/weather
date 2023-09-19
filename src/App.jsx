
import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';


function App() {

  useEffect(() => {
    console.log("hello world")


    callApi("karachi")
  }, [])





  const [weatherData, setWeatherData] = useState({});
  const [searchInput, setsearchInput] = useState("")

  const callApi = async (cityName) => {
    try {
      console.log("cityName", cityName);
      const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c401c2e320489e13f727c8aa504cc926&units=metric`)
      console.log("data", data)
      setWeatherData(data.data)
    }

    catch (error) {

      console.log("error", error);
    }
  }
  console.log("weatherData", weatherData);
  const handleWeatherApi = (e) => {
    e.preventDefault();
    console.log("searchInput", searchInput)
    callApi(searchInput);
  }

  if (weatherData && weatherData.weather && weatherData.weather.length > 0)
  return (
    <>
      <div className='App'>
        <div className='card'>
          <h2 className='title'>
            <i className='fa fa-cloud'>Weather App</i></h2>
          <form onSubmit={handleWeatherApi}> <div className='search-form'>
            <input onChange={(e) => { setsearchInput(e.target.value) }} type='text' placeholder='Enter your city name'></input>
          </div></form>
          <div className='main-container'>
            <h4>Live Weather Condition</h4>
           
    
      <div className='weather-icon'>
        <img src={`https://api.openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt='imgicon' />
      </div>
    
  
          
            
            <h2>
            {weatherData?.weather && weatherData?.weather[0].main}
            </h2>
            <div className='temperature'>

              <h1>{weatherData?.main?.temp}&deg;C</h1>
            </div>
            <div className='Location'>
              <h2><i className='fa fa-street-view'></i>{weatherData?.name}</h2>
            </div>
            <div>
            <h4>Min:{parseFloat(weatherData?.main?.temp_min ).toFixed(1)}&deg;C
            || Max: {parseFloat(weatherData?.main?.temp_max ).toFixed(1)}&deg;C
            || Humidity: {weatherData?.main?.humidity}%
            
            </h4></div>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
