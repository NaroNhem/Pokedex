import { json, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function PokemonInfo(props) {
    const typeName = props.type.join("/")
    const abilities = props.ability.join(" | Hidden Ability: ")
  return (
    <div className="body">
      <div className="pokemonName left">
      <p className="pkmnName">{props.name}</p><span className="detailsId">#{props.id}</span>
      </div>
      <div class="detailsImg">
      <img src={props.srcMain}  alt="..." />
        </div>
      <div className="midSection">
        <div className="pictures">
          <p className="title">Front</p>
        <div id="frontSprite" class="card">
            <img src={props.src} class="card-img-top" alt="..."></img>
          </div>
          <div id="frontSprite" class="card">
            <img src={props.srcShiny1} class="card-img-top" alt="..."></img>
          </div>
        </div>
        <div className="pictures">
          <p className="title">Back</p>
        <div id="frontSprite" class="card">
          <img src={props.src2} class="card-img-top" alt="..."></img>
          </div>
          <div id="frontSprite" class="card">
            <img src={props.srcShiny2} class="card-img-top" alt="..."></img>
          </div>
        </div>
        <div className="statsCard">
          <div class="list-group card-body">
            <li class="list-group-item"><h4>Stats</h4></li>
            <li class="list-group-item">HP: {props.hp} </li>
            <li class="list-group-item">Attack: {props.attack}</li>
            <li class="list-group-item">Defense: {props.defense}</li>
            <li class="list-group-item">Special Attack: {props.specialAttack}</li>
            <li class="list-group-item">Special Defense: {props.specialDefense}</li>
            <li class="list-group-item">Speed: {props.speed}</li>
          </div>
        </div>
        </div>
        
      <ul class="list-group stats left">
            <li class="list-group-item">Type: {typeName} </li>
            <li class="list-group-item">Weight: {props.weight} kg</li>
            <li class="list-group-item">Height: {props.height} meters</li>
            <li class="list-group-item">Ability: {abilities}</li>
        </ul>
        
    </div>
  );
}

export function PokemonDetails() {
  const [pokemonList, setPokemonList] = useState([]);
  const { id } = useParams();
  let float = id;
  if (float < 100) {
  float = "00" + float;
  }
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPokemonList([json]);
      });
  }, []);
  return (
    <>
      {pokemonList.map((pokemon) => {
        console.log(pokemon)
        return (
          <>
          <PokemonInfo
            srcMain={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
            name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            id={float}
            srcShiny1={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`}
            srcShiny2={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            src2={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`}
            weight={pokemon.weight}
            height={pokemon.height}
            type={pokemon.types.map((type) => type.type.name)}
            ability={pokemon.abilities.map((ability) => ability.ability.name)}
            hp = {pokemon.stats[0].base_stat}
            attack = {pokemon.stats[1].base_stat}
            defense = {pokemon.stats[2].base_stat}
            specialAttack = {pokemon.stats[3].base_stat}
            specialDefense = {pokemon.stats[4].base_stat}
            speed = {pokemon.stats[5].base_stat}
          />
          </>
        );
      })}
    </>
  );
}
