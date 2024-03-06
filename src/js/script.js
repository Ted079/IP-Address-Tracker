import { getAddress, validateIp, addTileLayer, addOffset } from "../helpers";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "../../images/icon-loc3.png";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");

const ipInfo = document.querySelector("#ip");
const locationInfo = document.querySelector("#location");
const timezoneInfo = document.querySelector("#timezone");
const ispInfo = document.querySelector("#isp");

btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleEvent);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [35, 38],
});

const mapArea = document.querySelector(".map");
const map = L.map(mapArea, {
  center: [40.3771, 49.8875],
  zoom: 13,
  zoomControl: false,
});
L.marker([40.3771, 49.8875], { icon: markerIcon }).addTo(map);
addTileLayer(map);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value).then(setData);
  }
}

function handleEvent(e) {
  if (e.key === "Enter") {
    getData();
  }
}

function setData(mapData) {
  console.log(mapData);

  const {
    ip_address,
    region,
    country,
    timezone: { abbreviation },
    longitude: lng,
    latitude: lat,
    connection: { isp_name },
  } = mapData;

  console.log(lat, lng);

  ipInfo.innerText = ip_address;
  locationInfo.innerText = country + " " + region;
  timezoneInfo.innerText = abbreviation;
  ispInfo.innerText = isp_name;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  
  if(matchMedia("(max-width: 1023px)").matches){

    addOffset(map);
  }

}

document.addEventListener("DOMContentLoaded", () => {
  getAddress("188.253.234.229").then(setData);
})
