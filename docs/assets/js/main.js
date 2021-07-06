"use strict";console.log(">> Ready :)");const savedSeries=JSON.parse(localStorage.getItem("favoritesSeries")),form=document.querySelector(".js-input"),listSeries=document.querySelector(".js-series-list"),listFavoriteSeries=document.querySelector(".js-favorite-list"),inputSeries=document.querySelector(".js-input-name"),btnRemove=document.querySelector(".js-btnremove"),error=document.querySelector(".js-error"),img=document.querySelector(".js-image"),containError=document.querySelector(".js-error-contain"),btnResett=document.querySelector(".js-buttonReset");form.addEventListener("submit",findSeries);let globalData=[];function findSeries(e){e.preventDefault();const t=inputSeries.value;t&&(globalData=[],fetch("http://api.tvmaze.com/search/shows?q="+t).then(e=>e.json()).then(e=>{e.forEach(e=>{globalData.push(e.show)}),globalData.length>0?(printShowCards(globalData),error.classList.add("hidden"),listSeries.classList.remove("hidden")):(error.classList.remove("hidden"),listSeries.classList.add("hidden"))}))}function printShowCards(e){let t="";e.forEach(e=>{let r="";r=null==e.image?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":e.image.medium;const i=favoritesShow.find(t=>t.id===e.id)?"showfavCard":"showCard";t+=`<li id="${e.id}" class="${i} js-favorite"><img class="image" src="${r}" alt="${e.name}"></img><h3 class="title">${e.name}</h3> </li>`}),listSeries.innerHTML=t,addListenersToCards()}function addListenersToCards(){const e=document.querySelectorAll(".js-favorite");for(const t of e)t.addEventListener("click",updateFavoriteList)}addListenersToCards();let favoritesShow=[];function updateFavoriteList(e){const t=e.currentTarget;let r=e.currentTarget.id;const i=favoritesShow.find(e=>e.id===parseInt(r));if(null==i){const e=globalData.find(e=>e.id===parseInt(r));favoritesShow.push(e),t.classList.add("showfavCard"),t.classList.remove("showCard")}else{let e=favoritesShow.indexOf(i);favoritesShow.splice(e,1),t.classList.add("showCard"),t.classList.remove("showfavCard")}localStorage.setItem("favoritesSeries",JSON.stringify(favoritesShow)),printFavoriteList(favoritesShow)}function printFavoriteList(e){if(!Array.isArray(e))return;let t="";e.forEach(e=>{let r="";r=null==e.image?"https://via.placeholder.com/210x295/ffffff/666666/?text=TV":e.image.medium,t+=`<li class="favoriteCard"><img class="image-fav" src="${r}" alt="${e.name}"></img><h3 class="titleFav">${e.name}</h3><button type="button" class="buttonX js-btnremove" data-id="${e.id}">X</button>\n    </li>`}),listFavoriteSeries.innerHTML=t}function removeItem(e){if("button"===e.target.type){const t=e.target.getAttribute("data-id");removeFavoriteList(favoritesShow.find(e=>e.id===parseInt(t))),printFavoriteList(favoritesShow),printShowCards(globalData),localStorage.setItem("favoritesSeries",JSON.stringify(favoritesShow))}}function removeFavoriteList(e){let t=favoritesShow.indexOf(e);favoritesShow.splice(t,1)}function handlerReset(e){e.preventDefault(),favoritesShow=[],listFavoriteSeries.innerHTML="",printShowCards(globalData),localStorage.removeItem("favoritesSeries")}savedSeries&&(favoritesShow=savedSeries),printFavoriteList(favoritesShow),listFavoriteSeries.addEventListener("click",removeItem),btnResett.addEventListener("click",handlerReset);