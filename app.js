// Pokedex
const poke_container = document.getElementById("poke_container");
const pokemons_number = 200;
const colors = {
  fire: "#e13f00",
  grass: "#6DA44E",
  electric: "#F6D31B",
  water: "#2b80da", // 2b80da DEF3FD
  ground: "#F4E7DA",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#f5f5f5",
  fighting: "#e6e0d4",
  normal: "#f5f5f5"
};

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 2; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async id => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const res = await fetch(url); // res is short for result
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

fetchPokemons();

const createPokemonCard = pokemon => {
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  const poke_types = pokemon.types.map(el => el.type.name);
  const type = main_types.find(type => poke_types.indexOf(type) > -1);
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const color = colors[type];

  const abilities = pokemon.abilities.map(el => " " + el.ability.name);

  let = { hp } = "";
  const statBase = pokemon.stats.map(stat => {
    switch (stat.stat.name) {
      case "hp":
        hp = stat["base_stat"];
        break;
    }
  });

  const pokeInnerHTML = `
    <div class="info-top">
      <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
      <span class="hp-box"><img src="hp.png" class="heart"><span class="hp-num">${hp} HP</span></span>
    </div>
    <div class="img-container" style="background-color: ${color}">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
      }.png">
    </div>
    <div class="info">
      <h3 class="name">${name}</h3>
      <h3 class="type" style="color:${color}">${type}</h3>
      <span><span class="label">Height:</span> ${pokemon.height * 10} cm</span>
      <span><span class="label">Weight:</span> ${pokemon.weight / 10} kg</span>
      <div class="abilities">
      <span><span class="label">Abilities: </span>${abilities}</span>
      </div>
    </div>`;
  pokemonEl.innerHTML = pokeInnerHTML;

  poke_container.appendChild(pokemonEl);
};

getPokemon(1);
