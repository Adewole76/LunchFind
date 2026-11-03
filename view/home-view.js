'use strict'
export const mappingCarouselDisplays = (arr, container) =>{
   const mappedCarouselDisplays = arr.map(item => {
    return`<div>
    <img src="${item.strMealThumb}" class="carousel-image" alt="slide-image">
    <p class="recipe-name">${item.strMeal}</p>
    </div>
    `
   }).join('')
if(arr.length > 0){
 container.innerHTML = mappedCarouselDisplays;
}else{
    container.innerHTML = '<p>No network</p>';
}
}