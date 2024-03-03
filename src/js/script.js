import { validateIp } from "../helpers";

const ipInput = document.querySelector(".search-bar__input");
const btn = document.querySelector("button");


btn.addEventListener("click", getData);
ipInput.addEventListener("keydown", handleEvent);

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=at_Z9HJtMTBUyL572QGcLgVkNIaXc1Yg&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then(console.log);
  }
}

function handleEvent(e) {
  if (e.key === "Enter") {
    getData();
  }
}
