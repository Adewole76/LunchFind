'use strict'
import { mappingFavouritesArray } from "../view/favourites-view.js";
import { favourites } from "../model.js";
import { filterFavouritesArray } from "../model.js";

const recipeContainer = document.querySelector('.recipes-container');
const favouritesNumber = document.querySelector('.favourites-number');
const recipeModal = document.querySelector('.recipe-modal')

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
    }else if(event.target.closest('.recipe')){
      const particularRecipe = event.target.closest('.recipe');
      const particularRecipeId = particularRecipe.dataset.userId;
      const particularRecipeObject = favourites.find(item => item.idMeal === particularRecipeId)
      console.log(particularRecipe, particularRecipeId, particularRecipeObject);
    recipeModal.classList.remove('hidden');
    recipeModal.innerHTML = `
    <section class="modal-img-cont">
      <img class="modal-img" src="${particularRecipeObject.strMealThumb}" alt="modal-image">
    </section>
    <section>
     <header>
     <button class="close-modal-btn"><img alt="close-button-icon" src="/image/close (4).png"></button>
     </header>
     <section class="recipe-details">
     <p class="category-count">${particularRecipeObject.strCategory}.${particularRecipeObject.strCountry}</p>
     <h3>${particularRecipeObject.strMeal}</h3>
     <h4>Ingredients</h4>
     <ul>
         ${particularRecipeObject.strIngredient1?`<li>${particularRecipeObject.strIngredient1} &rArr; ${particularRecipeObject.strMeasure1}</li>`:''}
         ${particularRecipeObject.strIngredient2?`<li>${particularRecipeObject.strIngredient2} &rArr; ${particularRecipeObject.strMeasure2}</li>`:''}
         ${particularRecipeObject.strIngredient3?`<li>${particularRecipeObject.strIngredient3} &rArr; ${particularRecipeObject.strMeasure3}</li>`:''}
         ${particularRecipeObject.strIngredient4?`<li>${particularRecipeObject.strIngredient4} &rArr; ${particularRecipeObject.strMeasure4}</li>`:''}
         ${particularRecipeObject.strIngredient5?`<li>${particularRecipeObject.strIngredient5} &rArr; ${particularRecipeObject.strMeasure5}</li>`:''}
         ${particularRecipeObject.strIngredient6?`<li>${particularRecipeObject.strIngredient6} &rArr; ${particularRecipeObject.strMeasure6}</li>`:''}
         ${particularRecipeObject.strIngredient7?`<li>${particularRecipeObject.strIngredient7} &rArr; ${particularRecipeObject.strMeasure7}</li>`:''}
         ${particularRecipeObject.strIngredient8?`<li>${particularRecipeObject.strIngredient8} &rArr; ${particularRecipeObject.strMeasure8}</li>`:''}
         ${particularRecipeObject.strIngredient9?`<li>${particularRecipeObject.strIngredient9} &rArr; ${particularRecipeObject.strMeasure9}</li>`:''}
         ${particularRecipeObject.strIngredient10?`<li>${particularRecipeObject.strIngredient10} &rArr; ${particularRecipeObject.strMeasure10}</li>`:''}
         ${particularRecipeObject.strIngredient11?`<li>${particularRecipeObject.strIngredient11} &rArr; ${particularRecipeObject.strMeasure11}</li>`:''}
         ${particularRecipeObject.strIngredient12?`<li>${particularRecipeObject.strIngredient12} &rArr; ${particularRecipeObject.strMeasure12}</li>`:''}
         ${particularRecipeObject.strIngredient13?`<li>${particularRecipeObject.strIngredient13} &rArr; ${particularRecipeObject.strMeasure13}</li>`:''}
         ${particularRecipeObject.strIngredient14?`<li>${particularRecipeObject.strIngredient14} &rArr; ${particularRecipeObject.strMeasure14}</li>`:''}
         ${particularRecipeObject.strIngredient15?`<li>${particularRecipeObject.strIngredient15} &rArr; ${particularRecipeObject.strMeasure15}</li>`:''}
         ${particularRecipeObject.strIngredient16?`<li>${particularRecipeObject.strIngredient16} &rArr; ${particularRecipeObject.strMeasure16}</li>`:''}
         ${particularRecipeObject.strIngredient17?`<li>${particularRecipeObject.strIngredient17} &rArr; ${particularRecipeObject.strMeasure17}</li>`:''}
         ${particularRecipeObject.strIngredient18?`<li>${particularRecipeObject.strIngredient18} &rArr; ${particularRecipeObject.strMeasure18}</li>`:''}
         ${particularRecipeObject.strIngredient19?`<li>${particularRecipeObject.strIngredient19} &rArr; ${particularRecipeObject.strMeasure19}</li>`:''}
         ${particularRecipeObject.strIngredient20?`<li>${particularRecipeObject.strIngredient20} &rArr; ${particularRecipeObject.strMeasure20}</li>`:''}
     </ul>

     <h4>Method</h4>
     <section class="instructions-container">
     <p class="instructions">${particularRecipeObject.strInstructions}</p>
     </section>
     </section>

    </section>`;
    const closeModalBtn = document.querySelector('.close-modal-btn')
    closeModalBtn.addEventListener('click', function(){
      recipeModal.classList.add('hidden');
      console.log('i am working')
    })

    }
});