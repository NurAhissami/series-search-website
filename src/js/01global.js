"use strict";

console.log(">> Ready :)");

const savedSeries = JSON.parse(localStorage.getItem("favoritesSeries"));

//Variables

// const inputForm = document.querySelector(".js-input");
// const btn = document.querySelector(".js-button");
const form = document.querySelector(".js-input");

const listSeries = document.querySelector(".js-series-list");
const listFavoriteSeries = document.querySelector(".js-favorite-list");

const inputSeries = document.querySelector(".js-input-name");

const btnRemove = document.querySelector(".js-btnremove");
const error = document.querySelector(".js-error");
const img = document.querySelector(".js-image");
const containError = document.querySelector(".js-error-contain");

const btnResett = document.querySelector(".js-buttonReset");
