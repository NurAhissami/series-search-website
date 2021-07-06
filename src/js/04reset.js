btnResett.addEventListener("click", handlerReset);

function handlerReset(ev) {
  ev.preventDefault();
  favoritesShow = [];
  listFavoriteSeries.innerHTML = "";
  printShowCards(globalData);
  localStorage.removeItem("favoritesSeries");
}
