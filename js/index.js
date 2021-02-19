const TitleH1 = document.querySelector("#H1");
const secCard = document.querySelector(".secCard");
const selCity = document.querySelector(".selCity");
const btnIT = document.querySelector("#it");
const btnEN = document.querySelector("#en");
const btnFR = document.querySelector("#fr");
const imgSicily = document.querySelector(".imgSicily");

let strLanguage = "en";
let strWin = "Wind";
let strHum = "Humidity";

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
  sigle : null,
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
    sigle : "AG",
  },
  {
    id : "2525448",
    name : "Caltanissetta",
    sigle : "CL",
  },
  {
    id : "2525065",
    name : "Catania",
    sigle : "CT",
  },
  {
    id : "2524818",
    name : "Enna",
    sigle : "EN",
  },
  {
    id : "2524169",
    name : "Messina",
    sigle : "ME",
  },
  {
    id : "2523918",
    name : "Palermo",
    sigle : "PA",
  },
  {
    id : "2523649",
    name : "Ragusa",
    sigle : "RG",
  },
  {
    id : "2523083",
    name : "Siracusa",
    sigle : "SR",
  },
  {
    id : "2522875",
    name : "Trapani",
    sigle : "TP",
  },
]

//fn utility
function DateToday () {
  let Today = new Date();
  let gg = String(Today.getDay());
  const dd = String(Today.getDate()).padStart(2, '0');
  let mm = String(Today.getMonth() + 1).padStart(2, '0');

  switch (strLanguage) {
    //italiano
    case "it" : {
      switch (gg) {
        case "0":
          gg = "Dom";
          break;
        case "1":
          gg = "Lun";
          break;
        case "2":
          gg = "Mar";
          break;
        case "3":
          gg = "Mer";
          break;
        case "4":
          gg = "Gio";
          break;
        case "5":
          gg = "Ven";
          break;
        case "6":
          gg = "Sab";
          break;
      }
    
      switch (mm) {
        case "01":
          mm = "Gen";
          break;
        case "02":
          mm = "Feb";
          break;
        case "03":
          mm = "Mar";
          break;
        case "04":
          mm = "Apr";
          break;
        case "05":
          mm = "Mag";
          break;
        case "06":
          mm = "Giu";
          break;
        case "07":
          mm = "Lug";
          break;
        case "08":
          mm = "Ago";
          break;
        case "09":
          mm = "Set";
          break;
        case "10":
          mm = "Ott";
          break;
        case "11":
          mm = "Nov";
          break;
        case "12":
          mm = "Dic";
          break;
      }
      strHum = "Umidità";
      strWin = "Vento";
      break;
    }
    //inglese
    case "en" : {
      switch (gg) {
        case "0":
          gg = "Sun";
          break;
        case "1":
          gg = "Mon";
          break;
        case "2":
          gg = "Tue";
          break;
        case "3":
          gg = "Wed";
          break;
        case "4":
          gg = "Thu";
          break;
        case "5":
          gg = "Fry";
          break;
        case "6":
          gg = "Sat";
          break;
      }
    
      switch (mm) {
        case "01":
          mm = "Gen";
          break;
        case "02":
          mm = "Feb";
          break;
        case "03":
          mm = "Mar";
          break;
        case "04":
          mm = "Apr";
          break;
        case "05":
          mm = "May";
          break;
        case "06":
          mm = "Jun";
          break;
        case "07":
          mm = "Jul";
          break;
        case "08":
          mm = "Ago";
          break;
        case "09":
          mm = "Sep";
          break;
        case "10":
          mm = "Oct";
          break;
        case "11":
          mm = "Nov";
          break;
        case "12":
          mm = "Dec";
          break;
      }
      strHum = "Humidity";
      strWin = "Wind";
      break;
    }
    //francese
    case "fr" : { 
      switch (gg) {
        case "0":
          gg = "Dim";
          break;
        case "1":
          gg = "Lun";
          break;
        case "2":
          gg = "Mar";
          break;
        case "3":
          gg = "Mer";
          break;
        case "4":
          gg = "Jeu";
          break;
        case "5":
          gg = "Ven";
          break;
        case "6":
          gg = "Sam";
          break;
      }
    
      switch (mm) {
        case "01":
          mm = "Jan";
          break;
        case "02":
          mm = "Fév";
          break;
        case "03":
          mm = "Mar";
          break;
        case "04":
          mm = "Avr";
          break;
        case "05":
          mm = "Mai";
          break;
        case "06":
          mm = "Jui";
          break;
        case "07":
          mm = "Jui";
          break;
        case "08":
          mm = "Aoû";
          break;
        case "09":
          mm = "Sep";
          break;
        case "10":
          mm = "Oct";
          break;
        case "11":
          mm = "Nov";
          break;
        case "12":
          mm = "Déc";
          break;
      }
      strHum = "humidité";
      strWin = "Vent";
      break;
    }
  }
    
  //return Today = gg + '/' + mm + '/' + yyyy;
  return Today = gg + ' ' + dd + ' ' + mm ;
}

function capitalizeFLetter(strWord) { 
  return strWord[0].toUpperCase() + strWord.slice(1); 
} 

//Importo API
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
    objCity.sigle = city.sigle;
    objCity.description = capitalizeFLetter(result.weather[0].description);
    objCity.temp_max = parseInt(result.main.temp_max);
    objCity.temp_min = parseInt(result.main.temp_min);
    objCity.humidity = result.main.humidity;
    objCity.wind = parseInt(result.wind.speed);
   
    if (type === "Multi") {
      //objCity.icon = `./css/image/${result.weather[0].icon}.png`
      objCity.icon = `${state.config.urlIco}${result.weather[0].icon}@2x.png`;
      CreateCardMulti(objCity);
      AddImageSicily(objCity);
    } else {
      //objCity.icon = `./css/image/${result.weather[0].icon}.png`
      objCity.icon = `${state.config.urlIco}${result.weather[0].icon}@4x.png`;
      CreateCardSingle(objCity);
    }
        
    return result;

  } catch (errorMessage) {
    console.log(errorMessage);
  }
}

//Popolo la Select
function GetSelectAryCity () {
  const newOpt = document.createElement("option");
  newOpt.textContent = "* Select City *";
  newOpt.selected = true;
  selCity.appendChild(newOpt);

  aryCity.forEach(city => {
    const newOpt = document.createElement("option");
    newOpt.textContent = city.name;
    selCity.appendChild(newOpt);
  });
 
  selCity.value = "* Select City *";

  GetCities();
}

//Creo la Card Multi
function CreateCardMulti (city) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("divCardMulti");
  const newH3 = document.createElement("h3");
  newH3.textContent = city.name;
  const newImg = document.createElement("img");
  newImg.classList.add("imgCard");
  newImg.alt = ""; //da aggiungere
  newImg.src = city.icon;
  const newPar = document.createElement("p");
  newPar.textContent = city.description;

  secCard.classList.remove("SingleCard");
  secCard.classList.add("MultiCard");
  secCard.appendChild(newDiv);
  newDiv.appendChild(newH3);
  newDiv.appendChild(newImg);
  newDiv.appendChild(newPar);
}

function AddImageSicily (city) {
  console.log(city);
  const newImg = document.createElement("img");
  newImg.classList.add(city.sigle);
  newImg.src = city.icon;

  imgSicily.appendChild(newImg);
}

//Creo la Card Single
function CreateCardSingle (city) {
  const divCar = document.createElement("div");
  divCar.classList.add("divCardSingle");
  
  const divImg = document.createElement("div");
  divImg.classList.add("divImgSingle");

  const imgCar = document.createElement("img");
  imgCar.classList.add("imgCard");
  imgCar.alt = ""; //da aggiungere
  imgCar.src = city.icon;

  const divTit = document.createElement("div");
  divTit.classList.add("divTitleSingle");

  const newH2 = document.createElement("h2");
  newH2.textContent = city.name;
  
  const newPar = document.createElement("p");
  newPar.textContent = city.description;
  
  const divPar = document.createElement("div");
  divPar.classList.add("divParamSingle");

  const li01 = document.createElement("li");
  li01.classList.add("Min");
  li01.textContent = `Min: ${city.temp_min} °C`;
  const li02 = document.createElement("li");
  li02.classList.add("Max");
  li02.textContent = `Max: ${city.temp_max} °C`;
  const li03 = document.createElement("li");
  li03.textContent = `${strHum}: ${city.humidity}%`;
  const li04 = document.createElement("li");
  li04.textContent = `${strWin}: ${city.wind} KmH`;
  
  secCard.classList.remove("MultiCard");
  secCard.classList.add("SingleCard");
  secCard.appendChild(divCar);
  divCar.appendChild(divImg);
  divImg.appendChild(imgCar);
  divCar.appendChild(divTit);
  divTit.appendChild(newH2);
  divTit.appendChild(newPar);
  divCar.appendChild(divPar);
  divPar.appendChild(li01);
  divPar.appendChild(li02);
  divPar.appendChild(li03);
  divPar.appendChild(li04);
}

//Gestione Select - se selettore "* Select City" mostra carosello altrimenti informazione singola città
function GetCities () {
  secCard.textContent = "";
    
  if (selCity.value === "* Select City *") {
    aryCity.forEach((city) => {
      getData(city, strLanguage, "Multi");
      imgSicily.textContent = "";
    });
  } else {
      const SelectedCity = aryCity.filter((objCity) => (objCity.name === selCity.value));
      getData(SelectedCity[0], strLanguage, "Single");
    }
}

function LanguageIT () {
  strLanguage = "it";
  TitleH1.textContent = DateToday();
  GetCities();
}

function LanguageEN () {
  strLanguage = "en";
  TitleH1.textContent = DateToday();
  GetCities();
}

function LanguageFR () {
  strLanguage = "fr";
  TitleH1.textContent = DateToday();
  GetCities();
}

//main
TitleH1.textContent = DateToday();

document.addEventListener("DOMContentLoaded", GetSelectAryCity, {once: true});
document.addEventListener("change", GetCities);

//Seleziono la lingua (default EN)
btnIT.addEventListener('click', LanguageIT);
btnEN.addEventListener('click', LanguageEN);
btnFR.addEventListener('click', LanguageFR);
