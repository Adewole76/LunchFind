'use strict'
import { mappingFavouritesArray } from `../view/favourites-view`;
import { favourites } from `../model.js`;

const recipeContainer = document.querySelector('.recipes-container');
const favouritesNumber = document.querySelector('.favourites-number');

mappingFavouritesArray(favourites, recipeContainer)
