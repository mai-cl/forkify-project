import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    /*
    async getResults(query) {
        const result = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`); // el resultado de la promesa se guarda en result
        console.log(result);
        const res = await result.json(); 
        console.log(res);
    }
    */

    async getResults() {
        try {
            const response = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = response.data.recipes;
            //console.log(this.result);
        } catch(error) {
            alert(error);
        }
    }
}