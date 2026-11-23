'use strict'
export const mappingFavouritesArray = (arr, container) => {
    const mappedFavouritesItems = arr.map(item => {
        return `<div class="recipe" data-user-id = ${item.idMeal}>
        <div class=img-div>
        <img src="${item.strMealThumb}"class="recipe-image" alt="recipe-thumbnail">
        </div>
        <section>
          <p class="recipe-cat-cty">${item.strCategory}.${item.strCountry}<p>
          <p class="recipe-mealName">${item.strMeal}</p>
        </section>
         <button class="favourite-btn" data-button-id="${item.idMeal}"><img class="favourite-images" src="/image/hearts.png" data-image-id="${item.idMeal}"></button>
        </div>`
    }).join('')
    if(arr){
        container.innerHTML =  mappedFavouritesItems;
    }else{
        container.innerHTML =
         `<div class="No-favourites-empty-state">
        <p>No Favourites yet</p>
        </div>
        `
    }
}
    