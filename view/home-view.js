'use strict'
export const mappingCarouselDisplays = (arr, container) =>{
   const mappedCarouselDisplays = arr.map(item => {
    return`<div class="carousel-slide">
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

export const mappingSearchedRecipes = (arr, container) => {
    const mappedSearchedRecipes = arr.map(item => {
        return `<div class="recipe" data-user-id = ${item.idMeal}>
        <div>
        <img src="${item.strMealThumb}"class="recipe-image" alt="recipe-thumbnail">
        </div>
        <section>
          <p>${item.strCategory}.${item.strCountry}<p>
          <p>${item.strMeal}</p>
        </section>
        </div>`
    }).join('')
if(arr.length > 0){
    container.innerHTML = mappedSearchedRecipes;
}else if(!arr){
    container.innerHTML = `<p>No results for your search</p>`
}
}