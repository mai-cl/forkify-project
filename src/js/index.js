import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {}

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1- Get query from view
    const query = searchView.getInput(); //TODO
    console.log(query);

    if (query) {
        // 2- New search object and add to state
        state.search = new Search(query);

        // 3- Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4- Search for recipes
            await state.search.getResults();
        
            // 5- Render results on UI
            //console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
            
        } catch(error) {
            alert('Something si wrong...');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    //console.log(btn);
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        //console.log(goToPage);
    }
})

/*
const search = new Search('pizza');
console.log(search);
search.getResults();
*/




/**
 * RECIPE CONTROLLER
 */
/*
const r = new Recipe(46956);
r.getRecipe();
console.log(r);
*/
const controlRecipe = async () => {
    //get ID from url
    const id = window.location.hash.replace('#','');
    console.log(id);

    if (id) {
        //prepare ui for changes

        //create new recipe object
        state.recipe = new Recipe(id);

        try {
            //get recipe data
            await state.recipe.getRecipe();
    
            //calcultate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
    
            //render recipe
            console.log(state.recipe);

        } catch(error) {
            alert('Error processing recipe!');
            //lo ideal seria agregar msjs a la UI
        }
    }

}

/* window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe); */
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


