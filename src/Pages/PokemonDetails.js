import { json, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function PokemonInfo(props) {
    const typeName = props.type.join("/")
  return (
    <div className="body">
      <div className="pokemonName">
      <h3>{props.name}</h3><span className="detailsId">#{props.id}</span>
      </div>
      
      <img src={props.srcMain} class="detailsImg" alt="..." />
      <div class="sprites">
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
      </div>
      {/* <ul class="list-group">
            <li class="list-group-item">Type: {typeName} </li>
            <li class="list-group-item">Weight: {props.weight} kg</li>
            <li class="list-group-item">Height: {props.height} meters</li>
        </ul> */}
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
          />
          </>
        );
      })}
    </>
  );
}
