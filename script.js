const cards = document.querySelector("#cards");
const data = [];

let menu = "weekly"; // daily, weekly, monthly

function activeMenu() {
    const li = document.querySelectorAll("li");
    li.forEach(e=>{
        e.id === menu ? e.classList.add("activeMenu") : e.classList.remove("activeMenu")
    });
}

function card({title,timeframes}) {

    const current = timeframes[menu].current;
    const previous = timeframes[menu].previous;
    const titulo = title.replace(" ","-");

    const element = `<div class="${titulo}">
    <div class="borIdent">
      <img src="./images/icon-${titulo.toLowerCase()}.svg" alt="work">
    </div>
    <div class="content">
      <div class="contentTitle">
        <h2>${title}</h3>
        <img src="./images/icon-ellipsis.svg" alt="config">
      </div>
      <div class="contentHrs">
        <h3>${current}hrs</h2>
        <h4>Last Week - ${previous}hrs</h4>
      </div>
    </div>
  </div>`

  return element;
    
}

function cargarCard() {
    data.forEach(element => {
        cards.insertAdjacentHTML("beforeend",card(element))
    });
}

function lastDWM() {
  switch (menu) {
    case "daily":
      return "Day";
    case "weekly":
      return "Week";
    case "monthly":
      return "Month";
    default:
      return "Weekly"
  }
}

function changeTimeFrames(tipo) {
    menu = tipo;
    const dwm = lastDWM();
    activeMenu();
    data.forEach(element=>{
        const clase = "." + element.title.replace(" ","-");
        const div = document.querySelector(clase);

        const h3 = div.querySelector("h3");
        const h4 = div.querySelector("h4");

        h3.innerText = element.timeframes[menu].current + "hrs";
        h4.innerText = `Last ${dwm} - ${element.timeframes[menu].previous} hrs`;
    })
}

async function getData() {
    const res = await fetch("./data.json",{cache: 'no-cache'}).then(data=>data.json());
    data.push(...res);
    cargarCard();;
}

getData();