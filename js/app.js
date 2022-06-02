/*
 *	ELORDI, ALEJANDRO
 */

 'use strict';


//Elementos del DOM

const d = document;
const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const resDiv = d.querySelector('#pokeResultado');

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
