document.addEventListener("DOMContentLoaded", ()=>{
    // only allows one instance of the app to be running at a given time
    let app = App.getInstance();
});

class App {

    constructor() {
        console.log("App started.");

        // generates a random id for a random pokemon
        const randomId = Math.floor(Math.random() * 800) + 1;

        // this is the data needed for the api
        const apiData = {
            url: 'https://pokeapi.co/api/v2/',
            type: 'pokemon',
            id: `${randomId}`,
        }
        
        // this line below is called 'deconstruction'
        const {url, type, id} = apiData;

        // construct the api url for fetching data
        const apiUrl = `${url}${type}/${id}`;

        // fetch the pokemon data from the api
        fetch(apiUrl)
            .then( (data) => data.json())
            .then( (pokemon) => generateHtml(pokemon) )


        // using the fetched data, create new html to insert
        const generateHtml = (data) => {
            // console.log(data);

            // new html
            const html = `
                <h2 class="name">${data.name}</h2>
                <img src=${data.sprites.front_default}>
            `
            // insert the new html into the page
            const pokemonDiv = document.querySelector('.pokemon');
            pokemonDiv.innerHTML = html;
        } 
    }

    // creates an instance of the app class
    static getInstance(){
        if(!App._instance){
            App._instance = new App();
            return App._instance;
        } else {
            throw "Error: An instance of the App class already exists.";
        }
    }

}