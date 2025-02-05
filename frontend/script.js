const APIURL = "http://localhost:3000/api/";
const APIURL_LIVE = "http://bored-backend.vercel.app";

async function generateActivity() {
  const response = await fetch(APIURL_LIVE + "/api/randomactivity"); // Henter fra APIURL_LIVE
  const data = await response.json(); // Gjør om responsen til JSON

  writeToHTML(data);
}

async function generateActivityByType(type) {
  const response = await fetch(APIURL_LIVE + "/api/activity?type=" + type); // Henter fra APIURL
  const data = await response.json(); // Gjør om responsen til JSON
  //console.log(response, data);

  writeToHTML(data);
}

function writeToHTML(data) {
  document.getElementById("activity").innerHTML = data.activity;
  document.getElementById("type").innerHTML = data.type;
  document.getElementById("accessability").innerHTML = data.accessibility;
  document.getElementById("price").innerHTML = data.price * 10 + "/10";
  document.getElementById("participants").innerHTML = data.participants;
}
