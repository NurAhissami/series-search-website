form.addEventListener("submit", findSeries);

// Array de la API
let globalData = [];

//Se crea una función que llame a la api a partir de un input

function findSeries(e) {
  e.preventDefault();
  ("");
  const inputValue = inputSeries.value;
  if (!inputValue) return;
  globalData = [];

  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((seriesResponse) => seriesResponse.json())
    .then((seriesData) => {
      //recorremos el array para guardarlo en globalData
      seriesData.forEach((element) => {
        globalData.push(element.show);
      });
      if (globalData.length > 0) {
        printShowCards(globalData);
        error.classList.add("hidden");
        listSeries.classList.remove("hidden");
      } else {
        error.classList.remove("hidden");
        listSeries.classList.add("hidden");
      }
    });
}

//Creamos una función que pinta las series en una lista.

function printShowCards(show) {
  let showList = "";

  show.forEach((element) => {
    let image = "";
    if (element.image == null) {
      image = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    } else {
      image = element.image.medium;
    }
    const showClass = favoritesShow.find((fav) => fav.id === element.id)
      ? "showfavCard"
      : "showCard";
    // console.log(isFavorite);
    showList += `<li id="${element.id}" class="${showClass} js-favorite"><img class="image" src="${image}" alt="${element.name}"></img><h3 class="title">${element.name}</h3> </li>`;
  });

  listSeries.innerHTML = showList;
  addListenersToCards();
}
