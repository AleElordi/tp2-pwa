/*
 *	ELORDI, ALEJANDRO
 */

 'use strict';


//Elementos del DOM

const d = document;
const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const resDiv = d.querySelector('#pokeResultado');



//-----------------------Busqueda individial------------------------//


const queryGraphQL = (pokeValor) => `query {
  pokemon(name:"${pokeValor}") {
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


  const pokeValor = inputElement.value;
  console.log('valor', inputElement.value);  

  const options = {
    method: "post",
    headers: {"Content-Type": "aplication/json"},
    body: JSON.stringify({
      query: queryGraphQL(pokeValor),
    })
  }
  
  fetch("https://graphql-pokeapi.graphcdn.app/",options)
  .then((response) => response.json())
  .finally(()=>{
    //spiner de loading
  })
  .catch((err)=>{
    console.log('Error',err)
  })
  
})


//-----------------------Busqueda Listado------------------------//


const querylist =`query pokemons($limit: Int, $offset: Int) {
  pokemons(limit: $limit, offset: $offset) {
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
}`;



const pokeLista = () => {

const options = {
  method: "post",
  headers: {"Content-Type": "aplication/json"},
  body: JSON.stringify({
    query: querylist,
  })
}

fetch("https://graphql-pokeapi.graphcdn.app/",options)
.then((response) => response.json())
.then((json)=>{
  resDiv.innerHTML = JSON.stringify(json.data)
})
.catch((err)=>{
  console.log('Error',err)
})

};

pokeLista();