const form = document.querySelector(".homeForm");
const home = document.querySelector(".home");
const inputName = document.getElementById("name");
const nameTitle = document.querySelector(".nameTitle");

function handleEnter(e) {
  e.preventDefault();

  const value = inputName.value;
  if (value === "") {
    nameTitle.textContent = "utente";
    home.classList.add("invisible");
  } else {
    nameTitle.textContent = value;
    console.log(value);
    home.classList.add("invisible");
  }
}
form.addEventListener("submit", handleEnter);


let stats = document.querySelector(".stats");
const lat = document.createElement("h3");
const long = document.createElement("h3");
const alt = document.createElement("h3");
const vel = document.createElement("h3");
stats.appendChild(lat);
stats.appendChild(long);
stats.appendChild(alt);
stats.appendChild(vel);


const sateliteURL = "https://api.wheretheiss.at/v1/satellites/25544";
const iconURL =
  "https://upload.wikimedia.org/wikipedia/commons/7/77/Space_station.svg";


let mymap = L.map("mapid").setView([0, 0], 4);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);


const sateliteIcon = L.icon({
  iconUrl: iconURL,
});
const sateliteMarker = L.marker([0, 0], { icon: sateliteIcon }).addTo(mymap);


async function getSateliteData(data) {
  const res = await fetch(sateliteURL).catch(() => {
    clearInterval(intID);
    console.log("error in fetching");
  });

  if (res) {
    data = await res.json();
    const { latitude, longitude, altitude, velocity } = data;

    const lat2 = latitude.toFixed(2);
    const lon2 = longitude.toFixed(2);

    sateliteMarker
      .setLatLng([latitude, longitude])
      .bindPopup(`${lat2}, ${lon2}`);
    mymap.setView([latitude, longitude]);

    lat.textContent = `Latitude: ${lat2}`;
    long.textContent = `Longitude: ${lon2}`;
    alt.textContent = `Altitude: ${altitude.toFixed(2)}`;
    vel.textContent = `Velocity: ${velocity.toFixed(2)}`;
  }
}
const intID = setInterval(getSateliteData, 1000);



const btn = document.querySelector(".btnShow");

function showModalStats() {
  stats.classList.add("visible");
  btn.textContent = "Hide Stats";
}
function hideModalStats() {
  stats.classList.remove("visible");
  btn.textContent = "Show Stats";
}

function selectWhichEvent() {
  btn.textContent === "Show Stats" ? showModalStats() : hideModalStats()
}
btn.addEventListener("click", selectWhichEvent);
