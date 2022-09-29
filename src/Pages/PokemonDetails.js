import { json, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function PokemonInfo(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <div class="sprites">
        <div id="frontSprite" class="card">
          <p>Front</p>
          <img src={props.src} class="card-img-top" alt="..."></img>
          <div class="card-body"></div>
        </div>
        <div id="backSprite" class="card">
          <p>Back</p>
          <img src={props.src2} class="card-img-top" alt="..."></img>
          <div class="card-body"></div>
        </div>
      </div>
      <div class="info">
        <ul class="list-group list-group-horizontal-lg">
            <li class="list-group-item">Type: {props.type} </li>
            <li class="list-group-item">Weight: {props.weight} kg</li>
            <li class="list-group-item">Height: {props.height} meters</li>
        </ul>
      </div>
    </div>
  );
}

export function PokemonDetails() {
  const [pokemonList, setPokemonList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setPokemonList([json]);
      });
  }, []);
  return (
    <>
      {pokemonList.map((pokemon) => {
        console.log(pokemon)
        return (
          <PokemonInfo
            name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            src2={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`}
            weight={pokemon.weight}
            height={pokemon.height}
            type={pokemon.types.map((type) => type.type.name)}
          />
        );
      })}
    </>
  );
}
