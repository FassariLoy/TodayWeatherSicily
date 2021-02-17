const TitleH1 = document.querySelector("#H1");
const secCard = document.querySelector(".secCard");
const selCity = document.querySelector(".selCity");
const btnIT = document.querySelector("#it");
const btnEN = document.querySelector("#en");
const btnFR = document.querySelector("#fr");

let strLanguage = "en";

const state = {
  config : {
    ApiKey : "67672cfdd9e43fec3c6ad2755f3bb7ad",
    urlMap : "http://api.openweathermap.org/data/2.5/weather",
    urlIco : "http://openweathermap.org/img/wn/",
  },
  cities : [],
}

const objCity = {
  id : null,
  name : null,
  description : null,
  icon : null,
  temp_max : null,
  temp_min : null,
  humidity : null,
  wind : null,

  //aggiungere altre informazioni
}

const aryCity = [
  {
    id : "2525763",
    name : "Agrigento",
  },
  {
    id : "2525448",
    name : "Caltanissetta",
  },
  {
    id : "2525065",
    name : "Catania",
  },
  {
    id : "2524818",
    name : "Enna",
  },
  {
    id : "2524169",
    name : "Messina",
  },
  {
    id : "2523918",
    name : "Palermo",
  },
  {
    id : "2523649",
    name : "Ragusa",
  },
  {
    id : "2523083",
    name : "Siracusa",
  },
  {
    id : "2522875",
    name : "Trapani",
  },
]

//fn utility
function DateToday () {
  let Today = new Date()

  const dd = String(Today.getDate()).padStart(2, '0');
  const mm = String(Today.getMonth() + 1).padStart(2, '0'); 
  const yyyy = Today.getFullYear();

  return Today = dd + '/' + mm + '/' + yyyy;
}


/*
  const text = evt.target.value.toLowerCase();
   
  evt.preventDefault();
*/

//Importo da API
async function getData(city, lang, type) {
  try {
    //const response = await fetch("http://api.openweathermap.org/data/2.5/weather?id=2524169&lang=it&appid=67672cfdd9e43fec3c6ad2755f3bb7ad&units=metric");
    const response = await fetch(`${state.config.urlMap}?id=${city.id}&lang=${lang}&appid=${state.config.ApiKey}&units=metric`)
    const result = await response.json();
    
    if (!response.ok) {
      throw result;
    }

    objCity.id = city.id;
    objCity.name = city.name;
    objCity.description = result.weather[0].description;
    objCity.temp_max = result.main.temp_max;
    objCity.temp_min = result.main.temp_min;
    objCity.humidity = result.main.humidity;
    objCity.wind = result.wind.speed;

    /*
    console.log(result)
    console.log(objCity)
    AddCities(objCity);
    //console.log("--------------------")
    */
    //objCity.icon = "./css/image/11.png"
    if (type === "Multi") {
      //objCity.icon = `./css/image/${result.weather[0].icon}.png`
      objCity.icon = `${state.config.urlIco}${result.weather[0].icon}@2x.png`
      CreateCardMulti(objCity);
    } else {
      objCity.icon = `./css/image/${result.weather[0].icon}.png`
      //objCity.icon = `${state.config.urlIco}${result.weather[0].icon}@4x.png`
      CreateCardSingle(objCity);
    }
        
    return result;

  } catch (errorMessage) {
    console.log(errorMessage);
  }
}

//**prova
/*
let sommaAry = [];

function AddCities(city) {
  sommaAry.push(city)
  state.cities.push(city);
  console.log(sommaAry)
}
*/
//**fine prova

//Popolo la Select
function GetSelectAryCity () {
  aryCity.forEach(city => {
    const newOpt = document.createElement("option");
    newOpt.textContent = city.name;
    selCity.appendChild(newOpt);
  });
  const newOpt = document.createElement("option");
  newOpt.textContent = "All";
  newOpt.selected = true;
  selCity.appendChild(newOpt);

  selCity.value = "All";

  GetCities();
}

//Creo la Card Multi
function CreateCardMulti (city) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("divCardMulti")
  const newH3 = document.createElement("h3");
  newH3.textContent = city.name;
  const newImg = document.createElement("img");
  newImg.classList.add("imgCard")
  newImg.alt = ""; //da aggiungere
  newImg.src = city.icon;
  const newPar = document.createElement("p");
  newPar.textContent = city.description.toUpperCase();

  secCard.classList.remove("SingleCard");
  secCard.classList.add("MultiCard");
  secCard.appendChild(newDiv);
  newDiv.appendChild(newH3);
  newDiv.appendChild(newImg);
  newDiv.appendChild(newPar);
}

//Creo la Card Single
function CreateCardSingle (city) {
  const divCar = document.createElement("div");
  divCar.classList.add("divCardSingle");
  
  const divImg = document.createElement("div");
  divImg.classList.add("divImgSingle");

  const imgCar = document.createElement("img");
  imgCar.classList.add("imgCard")
  imgCar.alt = ""; //da aggiungere
  imgCar.src = city.icon;

  const divTit = document.createElement("div");
  divTit.classList.add("divTitleSingle");

  const newH2 = document.createElement("h2");
  newH2.textContent = city.name;
  
  const newPar = document.createElement("p");
  newPar.textContent = city.description.toUpperCase();
  
  const divPar = document.createElement("div");
  divPar.classList.add("divParamSingle");

  const li01 = document.createElement("li");
  li01.textContent = `Temp. Min: ${city.temp_min} °C`;
  const li02 = document.createElement("li");
  li02.textContent = `Temp. Max: ${city.temp_max} °C`;
  const li03 = document.createElement("li");
  li03.textContent = `Humidity: ${city.humidity}%`;
  const li04 = document.createElement("li");
  li04.textContent = `Wind: ${city.wind} Kh`;
  
  secCard.classList.remove("MultiCard");
  secCard.classList.add("SingleCard");
  secCard.appendChild(divCar);
  divCar.appendChild(divImg);
  divImg.appendChild(imgCar)
  divCar.appendChild(divTit);
  divTit.appendChild(newH2);
  divTit.appendChild(newPar);
  divCar.appendChild(divPar);
  divPar.appendChild(li01);
  divPar.appendChild(li02);
  divPar.appendChild(li03);
  divPar.appendChild(li04);
}

//Gestione Select - se selettore all mostra carosello altrimenti informazione singola città
function GetCities () {
  secCard.textContent = "";
  
  if (selCity.value === "All") {
    aryCity.forEach((city) => {
      getData(city, strLanguage, "Multi");
    });
  } else {
      const SelectedCity = aryCity.filter((objCity) => (objCity.name === selCity.value))
      getData(SelectedCity[0], strLanguage, "Single");
    }
  }

function LanguageIT () {
  strLanguage = "it"
  GetCities();
}

function LanguageEN () {
  strLanguage = "en"
  GetCities();
}

function LanguageFR () {
  strLanguage = "fr"
  GetCities();
}

//main
TitleH1.textContent = "Meteo del " + DateToday();

document.addEventListener("DOMContentLoaded", GetSelectAryCity, {once: true});
document.addEventListener("change", GetCities);

//Seleziono la lingua (default EN)
btnIT.addEventListener('click', LanguageIT);
btnEN.addEventListener('click', LanguageEN);
btnFR.addEventListener('click', LanguageFR);

/* lingua 
http://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid={API key}
*/