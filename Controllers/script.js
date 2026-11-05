'use strict'
import {mappingCarouselDisplays} from '../view/home-view.js';
import {favourites} from "../model.js";

const debounce = (func, delay) => {
let timerId;
return function(...args){
  clearTimeout(timerId);
  timerId =  setTimeout(() => func.apply(this, ...args), delay)
}
}
let activeFilter = 'Breakfast';

const recipeSearchInput = document.querySelector('.recipe-search-input');
const recipesContainer = document.querySelector('.recipes-container');
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const categorySelect = document.querySelector('.category-select');
const carouselTrack = document.querySelector('.carousel-track');
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

 const getRecipes = async () =>{
  try{
   const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeSearchInput.value}`);
   if(!response.ok){
    throw new Error(`Request failed:${response.status}`)
   }
   console.log(response);
  }catch(error){
    console.log(error)
  }
 }
categorySelect.addEventListener('click', async (event) => {
  if(event.target.closest('.category-btn')){
    const particularCategory = event.target.closest('.category-btn').textContent;
    activeFilter = particularCategory;
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
