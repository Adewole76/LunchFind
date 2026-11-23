'use strict'
import { mappingCarouselDisplays } from '../view/home-view.js';
import { mappingSearchedRecipes } from '../view/home-view.js';
import { favourites } from "../model.js";
import { saveItems } from "../model.js";
import { getItems } from "../model.js";
import { filterFavouritesArray } from "../model.js";
console.log(favourites);
const debounce = (func, delay) => {
  let timerId;

  const debounced = function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), delay);
  };

  // Allows us to kill a pending timer immediately
  debounced.cancel = () => {
    clearTimeout(timerId);
  };

  return debounced;
};
let activeFilter = 'Breakfast';

const recipeSearchInput = document.querySelector('.recipe-search-input');
const recipesContainer = document.querySelector('.recipes-container');
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const categorySelectBtns = document.querySelectorAll('.category-btn');
const carouselContainer = document.querySelector('.carousel-container');
const categorySelect = document.querySelector('.category-select');
const carouselTrack = document.querySelector('.carousel-track');
const recipeModal = document.querySelector('.recipe-modal');
const sidebarToggleOn = document.querySelector('.sidebar-toggleOn');
recipesContainer.innerHTML = `<div class="nothing-typed-state">
    <div>
      <div class="image-div">
      <img src="/image/search.png" alt="search-icon">
      </div>
      <h3>Search for a recipe</h3>
      <p>Type a dish or an ingrdient like "rice", "chicken", or "soup" to see the recipes here</p>
    </div>
    </div>`;
recipesContainer.style.display = 'block';
const getCarouselRecipes = async () => {
    try{
       const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeFilter}`);
       if(!response.ok){
        throw new Error('Request failed')
       }
    
    const recipes = await response.json();
    carouselContainer.style.overflowX = 'hidden'
    const filteredCarouselRecipes = recipes.meals.filter(recipe => recipes.meals.indexOf(recipe) < 4);
    console.log(filteredCarouselRecipes);
    mappingCarouselDisplays(filteredCarouselRecipes, carouselTrack);
       return recipes;
    }catch(error){
      console.log(error);
      carouselContainer.innerHTML = `<section class="offline-empty-state">
      <div>
          <p class="error-tag">REQUEST FAILED</p>
          <h3>Couldn't load recipes</h3>
          <p class="error-instruction">Check your connection and try again</p>
      </div>
      </section>`
      carouselContainer.style.overflow = 'hidden';
    }

}
getCarouselRecipes();

let abortController = null;
let resultforCall;
const getRecipesBySearch = async (searchQuery) => {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
      { signal: abortController.signal }
    );

    if (!response.ok) {
      throw new Error('Request Failed');
    }
 
    const recipeData = await response.json();
    if(recipeData.meals !== null){
    console.log(recipeData.meals);
    mappingSearchedRecipes(recipeData.meals, recipesContainer);
    recipesContainer.style.display = 'grid';
    recipesContainer.style.gridTemplateColumns = '1fr 1fr 1fr';
    recipesContainer.style.columnGap = "2em";
    recipesContainer.style.rowGap = "2em"
    const heartImages = document.querySelectorAll('.favourite-images');
    for(let i = 0; i < heartImages.length; i++){
    if(favourites.some(item => item.idMeal === heartImages[i].dataset.imageId)){
      heartImages[i].src = '/image/hearts.png';
    }
    }
    }else{
      recipesContainer.innerHTML = `<div class="no-results">
      <div>
        <p>No matches</p>
        <img src="/image/searched.png" alt="search-icon">
        <h3>No recipes found</h3>
        <p>Try a different word, like "rice" or "soup"</p>
      </div>
      </div>`;
      recipesContainer.style.display = 'block'
    }
    resultforCall = recipeData.meals
    return recipeData.meals;

  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error);
      recipesContainer.innerHTML = `<section class="offline-empty-state">
      <div>
          <p class="error-tag">REQUEST FAILED</p>
          <h3>Couldn't load recipes</h3>
          <p class="error-instruction">Check your connection and try again</p>
      </div>
      </section>`
    }
  }
};


const debouncedGetRecipes = debounce(getRecipesBySearch, 300);

recipeSearchInput.addEventListener('input', function () {
  const query = recipeSearchInput.value.trim();

  if (query === '') {
    debouncedGetRecipes.cancel();
    if (abortController) abortController.abort();
    recipesContainer.innerHTML = `<div class="nothing-typed-state">
    <div>
      <div class="image-div">
      <img src="/image/search.png" alt="search-icon">
      </div>
      <h3>Search for a recipe</h3>
      <p>Type a dish or an ingrdient like "rice", "chicken", or "soup" to see the recipes here</p>
    </div>
    </div>`
    recipesContainer.style.display = "block";
   // mappingSearchedRecipes(null, recipesContainer);
    return;
  }
  recipesContainer.innerHTML = `<div class="loading-state">
  <p>LOADING</p>
  <section>
    <div class="loading-skeleton">
      <div class="biggest"></div>
      <div class="smallest"></div>
      <div class="medium"></div>
    </div>

    <div class="loading-skeleton">
      <div class="biggest"></div>
      <div class="smallest"></div>
      <div class="medium"></div>
    </div>

    <div class="loading-skeleton">
      <div class="biggest"></div>
      <div class="smallest"></div>
      <div class="medium"></div>
    </div>
  </section>
  </div>`;
  recipesContainer.style.display = 'block';
  debouncedGetRecipes(query);
  
});
recipesContainer.addEventListener('click', (event) => {
  if(event.target.closest('.favourite-btn') || event.target.closest('.favourite-images')){
    const particularRecipe = event.target.closest('.recipe');
    const particularBtnImage = particularRecipe.querySelector('.favourite-images');
    console.log(particularBtnImage);
    console.log(particularRecipe);
    const recipeId = particularRecipe.dataset.userId;
     const particularRecipeObject = resultforCall.find(item => item.idMeal === recipeId)
    console.log(recipeId, typeof recipeId);
    console.log(particularRecipeObject)
    console.log(typeof particularRecipeObject.idMeal);
    if(favourites.some(item => item.idMeal === recipeId)){
     filterFavouritesArray(recipeId);
     particularBtnImage.src = '/image/heart.png';
    }else if(!favourites.some(item => item.idMeal === recipeId)){
      particularBtnImage.src = '/image/hearts.png';
      favourites.push(particularRecipeObject)
      saveItems('favourites', favourites);
    }
  }else if(event.target.closest('.recipe')){
    const particularRecipe = event.target.closest('.recipe');
    const particularRecipeId = particularRecipe.dataset.userId;
    console.log(particularRecipe, particularRecipeId);
    const particularRecipeObject = resultforCall.find(item => item.idMeal === particularRecipeId);
    console.log(particularRecipeObject);
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


categorySelect.addEventListener('click', async (event) => {
  if(event.target.closest('.category-btn')){
    const particularCategory = event.target.closest('.category-btn');
    const particularCategoryText = event.target.closest('.category-btn').textContent;
    console.log(particularCategory, particularCategoryText);
    activeFilter = particularCategoryText;
    particularCategory.classList.add('active-category' );
    for(let i = 0; i < categorySelectBtns.length; i++){
      if(categorySelectBtns[i].textContent !== particularCategoryText){
        categorySelectBtns[i].classList.remove('active-category');
      }
    }
    await getCarouselRecipes();
  }
})

let slideCount = 0
setInterval(() => {
  if(slideCount === 3){
     slideCount = -1
     slideCount= slideCount + 1;
     carouselTrack.style.transform = `translateX(${slideCount * -100}%)`;
}else{
  slideCount= slideCount + 1;
  carouselTrack.style.transform = `translateX(${slideCount * -100}%)`;  
}
}, 2000)
nextBtn.addEventListener('click', function(){
  if(slideCount === 3){
     slideCount = -1
     slideCount= slideCount + 1;
     carouselTrack.style.transform = `translateX(${slideCount * -100}%)`;
}else{
  slideCount= slideCount + 1;
  carouselTrack.style.transform = `translateX(${slideCount * -100}%)`;  
}
});
prevBtn.addEventListener('click', function(){
  if(slideCount > 0){
  slideCount = slideCount - 1;
  carouselTrack.style.transform = `translateX(${slideCount * -100}%)`;
}
});
