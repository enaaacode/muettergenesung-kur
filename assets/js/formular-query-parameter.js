const urlParams = new URLSearchParams(window.location.search);

const myOrt = urlParams.get("ort");
const myDatum = urlParams.get("datum");

const datumAnzeige = document.getElementById("datum-query");
datumAnzeige.textContent = myDatum;
