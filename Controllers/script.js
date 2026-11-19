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
const categorySelect = document.querySelector('.category-select');
const carouselTrack = document.querySelector('.carousel-track');
const recipeModal = document.querySelector('.recipe-modal');
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
    const filteredCarouselRecipes = recipes.meals.filter(recipe => recipes.meals.indexOf(recipe) < 4);
    console.log(filteredCarouselRecipes);
    mappingCarouselDisplays(filteredCarouselRecipes, carouselTrack);
       return recipes;
    }catch(error){
      console.log(error);
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
      </div>`
    }
    resultforCall = recipeData.meals
    return recipeData.meals;

  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error(error);
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
  }
});


categorySelect.addEventListener('click', async (event) => {
  if(event.target.closest('.category-btn')){
    const particularCategory = event.target.closest('.category-btn');
    const particularCategoryText = event.target.closest('.category-btn').textContent;
    console.log(particularCategory, particularCategoryText);
    activeFilter = particularCategoryText;
    particularCategory.classList.add('active-category');
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
