'use strict'
import {mappingCarouselDisplays} from '../view/home-view.js';

let activeFilter
const carouselTrack = document.querySelector('.carousel-track');
const getCarouselRecipes = async () => {
    try{
       const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${activeFilter}`);
       if(!response.ok){
        throw new Error('Request failed')
       }
    
       const recipes = await response.json();
       console.log(recipes);
       return recipes;
    }catch(error){
      console.log(error);
    }
    
}
