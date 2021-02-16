const TitleH1 = document.querySelector("#H1");
const secCard = document.querySelector(".secCard");
const CitySel = document.querySelector(".City__Sel");

const state = {
  config : {
    ApiKey : "67672cfdd9e43fec3c6ad2755f3bb7ad",
    urlMap : "http://api.openweathermap.org/data/2.5/weather",
    urlIco : "http://openweathermap.org/img/wn/",
  }
}

const objCity = {
  id : null,
  name : null,
  description : null,
  icon : null,
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

//Importo da API
async function getData(city, lang) {
  
  try {
    //const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=palermo&lang=it&appid=67672cfdd9e43fec3c6ad2755f3bb7ad");
    //const response = await fetch("http://api.openweathermap.org/data/2.5/weather?id=2524169&lang=it&appid=67672cfdd9e43fec3c6ad2755f3bb7ad&units=metric");
    const response = await fetch(`${state.config.urlMap}?id=${city.id}&lang=${lang}&appid=${state.config.ApiKey}&units=metric`)
    const result = await response.json();
    
    if (!response.ok) {
      throw result;
    }

    objCity.id = city.id;
    objCity.name = city.name;
    objCity.description = result.weather[0].description;
    objCity.icon = `${state.config.urlIco}${result.weather[0].icon}@2x.png`

    //prova
    CreateCard(objCity)

    //console.log(result)
    //console.log(objCity)
    //console.log("--------------------")
    
    return result;

  } catch (errorMessage) {
    console.log(errorMessage);
  }
}

//Popolo la Select
function GetSelectAryCity () {
  aryCity.forEach(city => {
    const newOpt = document.createElement("option");
    newOpt.textContent = city.name;
    CitySel.appendChild(newOpt);
  });
  const newOpt = document.createElement("option");
  newOpt.textContent = "All";
  newOpt.selected = true;
  CitySel.appendChild(newOpt);
}

function CreateCard (city) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("divCard")
  const newH3 = document.createElement("h3");
  newH3.textContent = city.name;
  const newImg = document.createElement("img");
  newImg.classList.add("imgCard")
  newImg.alt = ""; //da aggiungere
  newImg.src = city.icon;
  const newPar = document.createElement("p");
  //newPar.classList.add("Par")
  newPar.textContent = city.description;
  
  /*
  const newTit = document.createElement("h2");
  newTit.textContent = strTit;
  const newParAct = document.createElement("p");
  newParAct.classList.add("Act")
  if (Act !== 0) {
    newParAct.textContent = `${Act} attività disponibili`;
  } else {
    newParAct.textContent = `Nessuna attività disponibile`;
  }
  */

  secCard.appendChild(newDiv);
  newDiv.appendChild(newH3);
  newDiv.appendChild(newImg);
  newDiv.appendChild(newPar);
  
}

//aggiungo id e nome ???

function GetCities () {
//se selettore all mostra carosello altrimenti informazione singola citta
  secCard.textContent = "";

  //all
  
  aryCity.forEach(city => {
    getData(city, "it");
    
  });
}

//main
TitleH1.textContent = "Previsione del " + DateToday();
GetCities();
document.addEventListener("DOMContentLoaded", GetSelectAryCity, {once: true});
document.addEventListener("change", GetCities);




/* lingua 
http://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid={API key}
*/