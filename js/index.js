const CitySel = document.querySelector(".City__Sel");

const state = {
  config : {
    ApiKey : "67672cfdd9e43fec3c6ad2755f3bb7ad",
    urlMap : "http://api.openweathermap.org/data/2.5/weather",
  },
  dato : null,
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

async function getData(url) {
  try {
    const response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=palermo&lang=it&appid=67672cfdd9e43fec3c6ad2755f3bb7ad");
    const result = await response.json();

    if (!response.ok) {
      throw result;
    }
    console.log(result)
    return result;
  } catch (errorMessage) {
    console.log(errorMessage);
  }
}

getData();

//Popolo la Select
function GetSelectAryCity () {
  aryCity.forEach(element => {
    const newOpt = document.createElement("option");
    newOpt.textContent = element.name;
    CitySel.appendChild(newOpt);
  });
  const newOpt = document.createElement("option");
  newOpt.textContent = "All";
  newOpt.selected = true;
  CitySel.appendChild(newOpt);
}

function ShowCity () {
  const a = Math.random()
  console.log(a);


}

document.addEventListener("DOMContentLoaded", GetSelectAryCity, {once: true});
document.addEventListener("change", ShowCity);


/* lingua 
http://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid={API key}
*/