const d = document;
const pokedivFavs= d.querySelector('.divFavs');
const busquedaPoke = JSON.parse(localStorage.getItem('pokefavoritos'));
const pokedelet = d.querySelector('.delete');
const pokefavs = JSON.parse(localStorage.getItem('pokefavoritos'));

busquedaPoke.forEach(pokemon => {

    JSON.stringify(pokemon.data);
    console.log('Esto tiene que ser igual a la tarjeta: ', pokemon);
    

    const pokeCards = d.createElement("li");
    const pokeCardsimg = d.createElement("div");
    const pokeImgs = d.createElement("img");
    const pokeNames = d.createElement("span");
    const pokeId = d.createElement("span");
    const pokediv = d.createElement("div");


    pokeCards.className = 'poke-card col-10 col-lg-4 m-3';
    pokeNames.className = 'pknombre';

    pokeImgs.setAttribute('src', pokemon.pokemon.sprites);
    pokeNames.textContent = pokemon.pokemon.name;
    pokeId.textContent = `${pokemon.pokemon.id}`;

    pokeCards.appendChild(pokeCardsimg);
    pokeCardsimg.appendChild(pokeImgs);
    pokediv.appendChild(pokeId);    
    pokeCards.appendChild(pokediv);
    pokeCards.appendChild(pokeNames);
    pokedivFavs.appendChild(pokeCards); 

});

pokedelet.addEventListener("click", ()=> {



swal("Esto borrará todo tu equipo ¿Estas seguro?", {
    buttons: {
        cancel: "No",
        Si: true,
    },
    })
    .then((value) => {
    switch (value) {
    
        case "Si":
        localStorage.removeItem('pokefavoritos'); 
        console.log(value);
        location.reload();
        break;
    
        default:
        swal("Ok mantendremos tu equipo");
    }
    })



})






