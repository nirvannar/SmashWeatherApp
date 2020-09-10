const newLocal = "ea3505b901160aeb6ba7bdb73c8062a9";

const api = {
  key: newLocal,
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?"
};
const form = document.querySelector('.top form');
const input = document.querySelector('.top input');
const msg = document.querySelector('.top .msg');
const showResults = document.querySelector('.bottom .results');
const cityName = document.querySelector('.cityName >span');
const countryName = document.querySelector('.cityName >sup');
const cityTemp = document.querySelector('.cityTemp');
const cityIcon = document.querySelector('.cityIcon');
const description = document.querySelector('.description');

form.addEventListener("submit", e => {
  e.preventDefault()
  const location = input.value;
  fetchData(location);


  /*  this code is to prevent the display of the same results(same city)
  const resultItems = showResults.querySelectorAll('.bottom-side .city');
  const resultItemsArray = Array.from(resultItems);
  
  if(resultItemsArray.length > 0){
      const filteredArray = resultItemsArray.filter(el => {
          let content = "";
          if(inputVal.includes(',')){
              if(inputVal.split(',')[1].length > 2){
                  inputVal = inputVal.split(',')[0];
                  content = el
                  .querySelector('.cityName span')
                  .textContent.toLowerCase();
              }else {
                  content = el.querySelector('.cityName').dataset.name.toLowerCase();
              }
          }else {
              content = el.querySelector('.cityName span').textContent.toLowerCase();
          }
          return content == inputVal.toLowerCase();
      });
      if(filteredArray.length > 0){
          msg.textContent = `The weather for ${filteredArray[0].querySelector('.cityName span').textContent} has been brought out already..`
          // 
          form.reset();
          input.focus();
          return;
      }
  }*/




  msg.textContent = "";
  form.reset();


});

function fetchData(location) {
  const url = `${api.baseUrl}q=${location}&appid=${api.key}&units=metric`;


  //   the icon code holds the weather info of the searched city

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data; //declaring data object

      cityName.innerHTML = `${name}`;
      countryName.innerHTML = `${sys.country}`;
      countryName.style.display = "initial";
      cityTemp.innerHTML = `${Math.round(main.temp)}°C`;
      cityIcon.src = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@4x.png`;
      cityIcon.alt = `${weather[0]["main"]}`;
      description.innerHTML = `${weather[0]["main"]}<br/><br/>Feels like ${Math.round(main.feels_like)}°C`;
      
      localStorage.setItem("weatherData", JSON.stringify(data));
      // localStorage.setItem('searchinput', JSON.stringify(searchHistory));

    })
    .catch(() => {
      msg.textContent = "Please enter a valid city";
      cityName.innerHTML = "";
      countryName.innerHTML = "";
      countryName.style.display = "none";
      cityTemp.innerHTML = "";
      cityIcon.src = "";
      cityIcon.alt = "";
      description.innerHTML = "";




    });

  // let searchHistory = JSON.parse(localStorage.getItem("searchinput")) || [];
  //searchHistory.push(inputVal);

  // var lastSearch = JSON.parse(localStorage.getItem("searchinput"));
  // console.log(lastSearch);
}
window.onload = function () {
  if (localStorage.getItem("weatherData")) {

    let { name, weather, main, sys } = JSON.parse(localStorage.getItem("weatherData"));

    cityName.innerHTML = `${name}`;
      countryName.innerHTML = `${sys.country}`;
      countryName.style.display = "initial";
      cityTemp.innerHTML = `${Math.round(main.temp)}°C`;
      cityIcon.src = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@4x.png`;
      cityIcon.alt = `${weather[0]["main"]}`;
      description.innerHTML = `${weather[0]["main"]}<br/><br/>Feels like ${Math.round(main.feels_like)}°C`;
  }
}

