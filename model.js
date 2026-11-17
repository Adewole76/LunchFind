'use strict'
export const saveItems = (key, value) => {
   const savedItem = localStorage.setItem(key, JSON.stringify(value));
}
export const getItems = (valueKey) => {
    let saveditem = localStorage.getItem(valueKey);
    let parsedSavedItem = JSON.parse(saveditem)
    const usableSavedItem = parsedSavedItem

    return usableSavedItem;
}
export let favourites = getItems('favourites')?getItems('favourites'):[];
export const filterFavouritesArray = (particularId) => {
    favourites = favourites.filter(item => item.idMeal !== particularId);
    saveItems('favourites', favourites);
    console.log(favourites);
}