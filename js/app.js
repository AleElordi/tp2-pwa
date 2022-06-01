/*
 *	ELORDI, ALEJANDRO
 */


 'use strict';


//Elementos del DOM

const d = document;
const boton = d.querySelector('.sendButton');
const resDiv = d.querySelector('#pokeResultado');



const pokeQueryBusqueda = (pokemon) => `query pokemon($name: String!){
  pokemon(name: "${pokemon}") {
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



boton.addEventListener('click', () => {

  //Obtengo el Pokemon buscado
  const valorPokemon = inputElement.value;

  const options = {
    credentials: 'omit',
    method: 'POST',
    headres: {'Content-Type': 'aplication/json'},
    body: JSON.stringify({
      query: pokeQueryBusqueda(valorPokemon)
    })
  }

  fetch('https://pokeapi.co/api/v2/', options)
  .then(function(res){console.log('Respuesta de API ', res);
  return response.jason();})
  .then(function(json){
    resDiv.innerHTML = JSON.stringify(json.data)
  }).finally(function(){
    //spiner de loading
  }).catch(function(err){
    console.log('Error',err)
  })
})