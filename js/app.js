/*
 *	ELORDI, ALEJANDRO
 */

 'use strict';


//Elementos del DOM

const d = document;
const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const resDiv = d.querySelector('#pokeResultado');
const listDiv = d.querySelector('#pokeLista');



//-----------------------Busqueda listado completo------------------------//

const gqlVariables = {
  limit: 2,
  offset: 1,
};

const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: ${gqlVariables.limit}, offset: ${gqlVariables.offset}) {
    count
    next
    previous
    status
    message
    results {
      url
      name
      image
    }
  }
}`;

fetch('https://graphql-pokeapi.graphcdn.app/', {
  credentials: 'omit',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: gqlQuery,
    variables: gqlVariables,
  }),
  method: 'POST',
})
.then(function(json){
  listDiv.innerHTML = JSON.stringify(json.data)
})
.finally(function(){
  //spiner de loading
})
.catch(function(err){
  console.log('Error',err)
})


//-----------------------Busqueda individial------------------------//


const pokeQueryBusqueda = (pokemon) => `query pokemon {
  pokemon(name:"${pokemon}") {
    id
    name
    sprites {
      front_default
    }
    moves {
      move {
        name
      }
    }
    types {
      type {
        name
      }
    }
  }
}`


button.addEventListener("click", ()=> {

  console.log('valor', inputElement.value);  
  const pokeValor = inputElement.value;

  const options = {
    method: 'POST',
    headres: {"Content-Type": "aplication/json"},
    body: JSON.stringify({
      query: pokeQueryBusqueda(pokeValor),
    })
  }
  
  fetch('https://graphql-pokeapi.graphcdn.app/',options)
  .then(function(res){
    console.log('Respuesta de API ', res);
    return response.jason();
    })
  .then(function(json){
    resDiv.innerHTML = JSON.stringify(json.data)
  })
  .finally(function(){
    //spiner de loading
  })
  .catch(function(err){
    console.log('Error',err)
  })
  
})
