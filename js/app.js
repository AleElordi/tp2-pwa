/*
 *	ELORDI, ALEJANDRO
 */

'use strict';

//Elementos del DOM

const d = document;
const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const resDiv = d.querySelector('#pokeResultado');
const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");



//-----------------------Busqueda listado completo------------------------//
let limit = 10;
let offset = 0;

function fetchPokemon() {

const pokelista = () => `query {
  pokemons(limit: ${limit}, offset: ${offset}) {
    count
    next
    previous
    nextOffset
    prevOffset
    status
    message
    results {
      url
      name
      image
    }
  }
}`

const options = {
  credentials: 'omit',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: pokelista(),
    variables: {
  limit: 2,
  offset: 1,
},
  }),
  method: 'POST',
};
  
  fetch('https://graphql-pokeapi.graphcdn.app/', options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .then((json) => {
    //Json con lista de pokemon
    pokemonContainer.innerHTML = JSON.stringify(json)
  })

  .catch((err)=>{
    console.log('Error',err)
  }) 
}


function fetchPokemons(offset, limit) {
  spinner.style.display = "block";
  for (let i = offset; i <= offset + limit; i++) {
    fetchPokemon(i);
  }
}

fetchPokemons(offset, limit);


//-----------------------Busqueda individial------------------------//

button.addEventListener("click", ()=> {

  const pokeValor = inputElement.value;
  console.log('valor', inputElement.value); 

  //Query
  const queryGraphQL = (pokemon) => `query {
    pokemon(name:"${pokemon}") {
      id
      name
      sprites {
        front_default
      }
      types {
        type {
          name
        }
      }
    }
  }`
  
  //Options para el fetch
  const options = {
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: queryGraphQL(pokeValor),
      variables: {
    limit: 2,
    offset: 1,
  },
    }),
    method: 'POST',
  };
  
  //Fetch
  fetch('https://graphql-pokeapi.graphcdn.app/', options)
  .then((response) => {
        return response.json();
      })
  .then((json) => {

    pokeRender(json);

    //pokeRender(json);
    console.log('Valor del fetch:', json.data);

  })
  .catch((err)=>{
    console.log('Error',err)
  })
});

//-----------------------Crear tarjeta de busqueda------------------------//

const pokeCard = d.querySelector('[data-poke-card]');
const pokeName = d.querySelector('[data-poke-name]');
const pokeImg = d.querySelector('[data-poke-img]');
const pokeImgCont = d.querySelector('[data-poke-img-container]');
const pokeId = d.querySelector('[data-poke-id]');
const pokeTypes = d.querySelector('[data-poke-types]');

//Tarjeta
const pokeRender = (json) => {
  
  //Paso los datos a un Array
  JSON.stringify(json.data)
 
  
  //Tiro en consola ese Array
  console.log('Armado de tarjeta: ', json.data.pokemon);
  const id = json.data.pokemon.id;
  const sprite = json.data.pokemon.sprites.front_default;
  const type = json.data.pokemon.types;
  const name = json.data.pokemon.name;


  //Contruyo tarjeta
  pokeId.innerHTML = `<span>Nro. : ${id}</span>`;
  pokeName.innerHTML = `<span>${name}</span>`;
  pokeImg.setAttribute('src',sprite);
  renderPokeTypes(type);

  //pokeImgCont
  //pokeCard

}

//Funciones complementarias

const renderPokeTypes = (types)=> {

  pokeTypes.innerHTML = '';
  types.forEach(type => {
    const typePokeElement = d.createElement("div");
    typePokeElement.textContent = type.type.name;
    pokeTypes.appendChild(typePokeElement);
    console.log(type.type.name);


    
  });


}




