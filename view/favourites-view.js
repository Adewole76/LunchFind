'use strict'
export const mappingFavouritesArray = (arr, container) => {
    const mappedFavouritesItems = arr.map(item => {
        return `<div class="recipe" data-user-id = ${item.idMeal}>
        <div class=img-div>
        <img src="${item.strMealThumb?item.strMealThumb:`/image/gallery.png`}"class="recipe-image" alt="recipe-thumbnail">
        </div>
        <section>
          <p class="recipe-cat-cty">${item.strCategory}.${item.strCountry}<p>
          <p class="recipe-mealName">${item.strMeal}</p>
        </section>
         <button class="favourite-btn" data-button-id="${item.idMeal}"><img class="favourite-images" src="/image/hearts.png" data-image-id="${item.idMeal}"></button>
        </div>`
    }).join('')
    if(arr.length > 0){
        container.innerHTML =  mappedFavouritesItems;
    }else{
        container.innerHTML =
         `<section class="No-favourites-empty-state">
            <section>
                <div>
                   <img src="/image/hearts.png" alt="favourite-icon">
                </div>
                   <h3>No Favourites yet</h3>
                   <p>Tap the heart on any recipe to save it in favourites</p>
                   <button type="button" onclick="window.location.href='index.html'">
                        Browse Recipes
                   </button>
            </section>
        </section>
        `;
        container.style.display = 'block';
    }
}
    