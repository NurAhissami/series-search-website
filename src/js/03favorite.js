function addListenersToCards() {
  const allSeries = document.querySelectorAll(".js-favorite");
  for (const serie of allSeries) {
    serie.addEventListener("click", updateFavoriteList);
  }
}

addListenersToCards();
//Creamos un array para favoritos

let favoritesShow = [];

if (savedSeries) {
  favoritesShow = savedSeries;
}

printFavoriteList(favoritesShow);

function updateFavoriteList(elementlist) {
  const updateFavoriteEvent = elementlist.currentTarget;
  let favoriteElementID = elementlist.currentTarget.id;
  const showFavorites = favoritesShow.find(
    (element) => element.id === parseInt(favoriteElementID)
  );
  if (showFavorites == null) {
    const selectedElement = globalData.find(
      (element) => element.id === parseInt(favoriteElementID)
    );
    favoritesShow.push(selectedElement);
    updateFavoriteEvent.classList.add("showfavCard");
    updateFavoriteEvent.classList.remove("showCard");
  } else {
    let i = favoritesShow.indexOf(showFavorites);
    favoritesShow.splice(i, 1);
    updateFavoriteEvent.classList.add("showCard");
    updateFavoriteEvent.classList.remove("showfavCard");
  }

  localStorage.setItem("favoritesSeries", JSON.stringify(favoritesShow));

  printFavoriteList(favoritesShow);
}

function printFavoriteList(event) {
  if (!Array.isArray(event)) return;
  let list = "";

  event.forEach((element) => {
    let image = "";
    if (element.image == null) {
      image = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    } else {
      image = element.image.medium;
    }
    list += `<li class="favoriteCard"><img class="image-fav" src="${image}" alt="${element.name}"></img><h3 class="titleFav">${element.name}</h3><button type="button" class="buttonX js-btnremove" data-id="${element.id}">X</button>
    </li>`;
  });

  listFavoriteSeries.innerHTML = list;
}

listFavoriteSeries.addEventListener("click", removeItem);

function removeItem(event) {
  if (event.target.type === "button") {
    const id = event.target.getAttribute("data-id");
    const fav = favoritesShow.find((element) => element.id === parseInt(id));

    removeFavoriteList(fav);
    printFavoriteList(favoritesShow);
    printShowCards(globalData);
    localStorage.setItem("favoritesSeries", JSON.stringify(favoritesShow));
  }
}

function removeFavoriteList(element) {
  let i = favoritesShow.indexOf(element);
  favoritesShow.splice(i, 1);
}
