console.log("Swapi Workshop");

const players = document.querySelector("#players");
const starships = document.querySelector("#starships");
const display = document.querySelector("#display");

console.log(players, starships, display);

let currentPage = 1;
let currentCategory = "";

async function fetchData(category, page = 1) {
  try {
    const response = await fetch(`https://swapi.dev/api/${category}/?page=${page}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
}

function generateTable(data, category) {
  const table = document.createElement("table");
  table.style.margin = "20px auto";
  table.style.borderCollapse = "collapse";
  table.style.width = "80%";
  table.style.textAlign = "center";
  table.style.backgroundColor = "rgba(255, 255, 255, 0.1)";

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  let headers = [];
  if (category === "people") {
    headers = ["Name", "Height (cm)", "Mass (kg)", "Gender", "Birth Year", "Appearances"];
  } else if (category === "starships") {
    headers = ["Name", "Model", "Manufacturer", "Cost (Credits)", "Crew", "Passengers", "Class"];
  }

  headers.forEach(text => {
    const th = document.createElement("th");
    th.textContent = text;
    th.style.backgroundColor = "yellow";
    th.style.color = "black";
    th.style.padding = "10px";
    th.style.border = "1px solid white";
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
    data.results.forEach(item => {
    const row = document.createElement("tr");

    let rowData = [];
    if (category === "people") {
      rowData = [item.name, item.height, item.mass, item.gender, item.birth_year, item.films.length];
    } else if (category === "starships") {
      rowData = [
      item.name, item.model, item.manufacturer,
      item.cost_in_credits !== "unknown" ? item.cost_in_credits : "N/A",
      item.crew, item.passengers, item.starship_class
      ];
    }

    rowData.forEach(text => {
      const td = document.createElement("td");
      td.textContent = text;
      td.style.color = "white";
      td.style.border = "1px solid white";
      td.style.padding = "10px";
      row.appendChild(td);
    });

    tbody.appendChild(row);
  });

  table.appendChild(tbody);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.style.backgroundColor = "yellow";
  prevButton.style.color = "black";
  prevButton.style.padding = "10px 20px";
  prevButton.style.borderRadius = "15px";
  prevButton.style.border = "none";
  prevButton.style.cursor = "pointer";
  prevButton.style.fontSize = "16px";
  prevButton.style.margin = "10px";
  prevButton.style.fontWeight = "bold";

  if (currentPage === 1) {
    prevButton.disabled = true;
    prevButton.style.backgroundColor = "gray";
    prevButton.style.cursor = "not-allowed";
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.style.backgroundColor = "yellow";
  nextButton.style.color = "black";
  nextButton.style.padding = "10px 20px";
  nextButton.style.borderRadius = "15px";
  nextButton.style.border = "none";
  nextButton.style.cursor = "pointer";
  nextButton.style.fontSize = "16px";
  nextButton.style.margin = "10px";
  nextButton.style.fontWeight = "bold";

  display.innerHTML = "";
  display.appendChild(table);
  display.appendChild(prevButton);
  display.appendChild(nextButton);
    
  prevButton.addEventListener("click", () => changePage(category, -1));
  nextButton.addEventListener("click", () => changePage(category, 1));
}


async function changePage(category, step) {
  currentPage += step;
  const data = await fetchData(category, currentPage);
    
  if (data && data.results.length > 0) {
    generateTable(data, category);
  } else {
    currentPage -= step;
  }
}

players.addEventListener("click", async () => {
  currentCategory = "people";
  currentPage = 1;
  const data = await fetchData(currentCategory, currentPage);
  if (data) generateTable(data, currentCategory);
});

starships.addEventListener("click", async () => {
  currentCategory = "starships";
  currentPage = 1;
  const data = await fetchData(currentCategory, currentPage);
  if (data) generateTable(data, currentCategory);
});
