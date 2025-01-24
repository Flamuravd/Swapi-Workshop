console.log("Swapi Workshop");

const players = document.querySelector("#players");
const starships = document.querySelector("#starships");
const display = document.querySelector("#display");

console.log(players, starships, display);

function fetchData(type, pageUrl) {
  const url = pageUrl || `https://swapi.dev/api/${type}/`;
  console.log("Fetching data from:", url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched data:", data);
      displayTable(data.results, type);  
      renderPagination(data, type);     
    })
    .catch((error) => console.error("Error fetching data:", error));
}