'use strict'
import { mappingFavouritesArray } from "../view/favourites-view.js";
import { favourites } from "../model.js";
import { filterFavouritesArray } from "../model.js";

const recipeContainer = document.querySelector('.recipes-container');
const favouritesNumber = document.querySelector('.favourites-number');

console.log(favourites);
mappingFavouritesArray(favourites, recipeContainer);

favouritesNumber.innerHTML = `${favourites.length} SAVED RECIPES`;
recipeContainer.addEventListener('click', function(event){
    if(event.target.closest('.favourite-btn') || event.target.closest('.favourite-images')){
      const particularRecipe = event.target.closest('.recipe');
      const particularRecipeId = particularRecipe.dataset.userId;
      console.log(particularRecipe, particularRecipeId);
      filterFavouritesArray(particularRecipeId);
      mappingFavouritesArray(favourites, recipeContainer);
      favouritesNumber.innerHTML = `${favourites.length} SAVED RECIPES`;
    }
});