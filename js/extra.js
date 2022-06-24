const d = document;
const button = document.getElementById('sendButton');
const pkfav = document.querySelector('.pkfav');
const btnfav = document.querySelector('sendButton');
const inputElement = document.getElementById('search');
const resDiv = d.querySelector('#pokeResultado');
const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");



//-----------------------Busqueda individial------------------------//


//Buscador de pokemon
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
        saveResults('pokeresponse', json);
        //saveFav('pokefavoritos', 'proximo pokemon');
        console.log('Valor del fetch extra:', json.data);
    })
    .catch((err)=>{
      console.log('Error',err)
    })
  });
  
  
  //Crear tarjeta buscada
  const pokeCard = d.querySelector('[data-poke-card]');
  const pokeName = d.querySelector('[data-poke-name]');
  const pokeImg = d.querySelector('[data-poke-img]');
  const pokeImgCont = d.querySelector('[data-poke-img-container]');
  const pokeId = d.querySelector('[data-poke-id]');
  const pokeTypes = d.querySelector('[data-poke-types]');
  
  //Carga el LocalStorage al iniciar
  if(busquedaPoke != null){
  
    pokeCard.className = 'poke-card col-8 col-sm-5 col-lg-3 col-xl-2 m-2';
  
    JSON.stringify(busquedaPoke);
    console.log('Esto tiene que ser igual a la tarjeta: ', busquedaPoke);
  
    const id = busquedaPoke.pokemon.id;
    const sprite = busquedaPoke.pokemon.sprites.front_default;
    const type = busquedaPoke.pokemon.types;
    const name = busquedaPoke.pokemon.name;
  
    //Contruyo tarjeta
    pokeId.innerHTML = `<span>Nro. : ${id}</span>`;
    pokeName.innerHTML = `<span>${name}</span>`;
    pokeImg.setAttribute('src',sprite);
  
  }
  
  //Creador de PokeTarjeta
  const pokeRender = (json) => {
  
    pokeCard.className = 'poke-card col-8 col-lg-3 col-xl-2 m-2';
  
    //Paso los datos a un Array
    JSON.stringify(json.data);
  
    
    //Tiro en consola ese Array
    const id = json.data.pokemon.id;
    const sprite = json.data.pokemon.sprites.front_default;
    const type = json.data.pokemon.types;
    const name = json.data.pokemon.name;
  
    //Contruyo tarjeta
    pokeId.innerHTML = `<span>Nro. : ${id}</span>`;
    pokeName.innerHTML = `<span>${name}</span>`;
    pokeImg.setAttribute('src',sprite);
    renderPokeTypes(type);
    
  }
  
  const renderPokeTypes = (types)=> {

    pokeTypes.innerHTML = '';
    //Recorre los tipos de cada pokemon
    types.forEach(type => {
      const typePokeElement = d.createElement("div");
      typePokeElement.textContent = type.type.name;
      pokeTypes.appendChild(typePokeElement);
    });
  }
  
  //Guardado en LocalStorage
  function saveResults(pokeresponse, json){    
    //Guardo en un objeto JSON
    localStorage.setItem(pokeresponse, JSON.stringify(json.data));
  }