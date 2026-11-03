'use strict'
export const mappingCarouselDisplays = (arr, container) =>{
   const mappedCarouselDisplays = arr.map(item => {
    return`<div>
    <img class="carousel-image" alt="slide-image">
    <p class="recipe-name"></p>
    </div>
    `
   }).join('')
if(arr.length > 0){
 container.innerHTML = mappedCarouselDisplays;
}
}