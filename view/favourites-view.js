'use strict'
export const mappingFavouritesArray = (arr, container) => {
    const mappedFavouritesItems = arr.map(item => {
     return `<div>
     <img src="${item.strMealThumb}" alt="favourites-thumbnail">
     <footer>
       <p>${item.strCategory}.${item.strCountry}<p>
       <p>${item.strMeal}</p>
     </footer>
     </div>`

    }).join('');

    if(arr){
        container.innerHTML =  mappedFavouritesItems;
    }else{
        container.innerHTML = `<p>No Favourites</p>`
    }
}