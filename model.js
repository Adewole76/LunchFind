'use strict'
export const saveItems = (key, value) => {
   const savedItem = localStorage.setItem(key, value);
}
export const getItems = (valueKey) => {
    let saveditem = localStorage.getItem(valueKey);
    let parsedSavedItem = JSON.parse(saveditem)
    const usableSavedItem = parsedSavedItem

    return usableSavedItem;
}
export let favourites = [];