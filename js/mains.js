/*
 *	ELORDI, ALEJANDRO
 */

 'use strict';


//Elementos del DOM

const d = document;
const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
const resDiv = d.querySelector('#rmResultado');
const persoURL = 'https://rickandmortyapi.com/api/character';


//-----------Querys de Personajes, episodios y 

const queryPersonaje = (perso) => `query {
    characters(name: "${perso}" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }}}`


//----------- Event Listeners

button.addEventListener("click", ()=> {

    console.log('valor', inputElement.value);  
    const rmValor = inputElement.value;
  
    const options = {
      method: 'GET',
      headres: {"Content-Type": "aplication/json"},
      body: JSON.stringify({
        query: queryPersonaje(rmValor),
      })
    }
    
    fetch(persoURL, options)
    .then(function(res){
      console.log('Respuesta de API ', res);
      return response.json();
      })
    .then(function(json){
    //  resDiv.innerHTML = JSON.stringify(json.data)
    })
    .finally(function(){
      //spiner de loading
    })
    .catch(function(err){
      console.log('Error',err)
    })
    
  })