'use strict'
import {mappingCarouselDisplays} from '../view/home-view.js';

let activeFilter = 'Breakfast';

const categorySelect = document.querySelector('.category-select');
const carouselTrack = document.querySelector('.carousel-track');
const getCarouselRecipes = async () => {
    try{
       const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeFilter}`);
       if(!response.ok){
        throw new Error('Request failed')
       }
    
       const recipes = await response.json();
       //console.log(recipes);
       return recipes;
    }catch(error){
      console.log(error);
    }
    
}
 getCarouselRecipes();
categorySelect.addEventListener('click', async (event) => {
  if(event.target.closest('.category-btn')){
    const particularCategory = event.target.closest('.category-btn').textContent;
    activeFilter = particularCategory;
    const carouselRecipes = await getCarouselRecipes();
    const filteredCarouselRecipes = carouselRecipes.meals.filter(recipe => carouselRecipes.meals.indexOf(recipe) < 4);
    console.log(filteredCarouselRecipes);
  }
})