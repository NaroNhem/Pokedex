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
            <li class="list-group-item statsTitle"><h4 >Stats</h4></li>
            <div className= "statBox"><li class="list-group-item statName">HP</li><li class="list-group-item statBar hp">{props.hp}</li></div>
            <div className= "statBox"><li class="list-group-item statName">Attack</li><li class="list-group-item statBar atk">{props.attack}</li></div>
            <div className= "statBox"><li class="list-group-item statName">Defense</li><li class="list-group-item statBar def">{props.defense}</li></div>
            <div className= "statBox"><li class="list-group-item statName">Sp. Att</li><li class="list-group-item statBar spatk">{props.specialAttack}</li></div>
            <div className= "statBox"><li class="list-group-item statName">Sp. Def</li><li class="list-group-item statBar spdef">{props.specialDefense}</li></div>
            <div className= "statBox"><li class="list-group-item statName">Speed</li><li class="list-group-item statBar spd">{props.speed}</li></div>
            <li class="list-group-item total">Total: {props.total}</li>
          </div>
        </div>
        </div>
      <ul class="list-group stats left">
            <li class="list-group-item">Type: {typeName} </li>
            <li class="list-group-item">Weight: {props.weight} kg</li>
            <li class="list-group-item">Height: {props.height} meters</li>
            <li class="list-group-item">Ability: {abilities}</li>
      </ul>
      <div className="moveTable">
        <ul>
          {props.array.map(element => <li>{element}</li>)}
        </ul>
      </div>
    </div>
  );
}

function Movelist(array) {
  const moveList = []
  array.forEach(element => {
      moveList.push(element.move.name)
  })
  return moveList
}
function Stats (stat, value) { //takes in stat name which is the same name as the CSS var and the value parameter which the stat is to be set to
  const statsCard = document.getElementById('root')//gets the element from the dom with "root" as parent
  statsCard.style.getPropertyValue(stat); //"--hp" takes the element that shares the same name as the paramenter
  getComputedStyle(statsCard).getPropertyValue(stat);
  statsCard.style.setProperty(stat, value)//sets the css variable to be the same as the value parameter
}
export function PokemonDetails() {
  
  const [pokemonList, setPokemonList] = useState([]);
  let total = 0;
  const { id } = useParams();
  let float = id;
  if (float < 10) {
  float = "00" + float;
  } else if (float < 100) {
    float = "0" + float;
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
        Stats("--hp",pokemon.stats[0].base_stat)
        Stats("--atk",pokemon.stats[1].base_stat)
        Stats("--def",pokemon.stats[2].base_stat)
        Stats("--spatk",pokemon.stats[3].base_stat)
        Stats("--spdef",pokemon.stats[4].base_stat)
        Stats("--spd",pokemon.stats[5].base_stat)
        pokemon.stats.forEach(element => {
          total += element.base_stat
        })
        Stats("--total",total)
        const pokemonProps = {
            srcMain: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
            id:float,
            srcShiny1:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`,
            srcShiny2:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`,
            src:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            src2: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`,
            weight:pokemon.weight,
            height:pokemon.height,
            type:pokemon.types.map((type) => type.type.name),
            ability:pokemon.abilities.map((ability) => ability.ability.name),
            hp:pokemon.stats[0].base_stat,
            attack:pokemon.stats[1].base_stat,
            defense:pokemon.stats[2].base_stat,
            specialAttack:pokemon.stats[3].base_stat,
            specialDefense:pokemon.stats[4].base_stat,
            speed:pokemon.stats[5].base_stat,
            total:total,
            array: Movelist(pokemon.moves)
          }
        
        return (
          <>
          <PokemonInfo {...pokemonProps}/>
          </>
        );
      })}
    </>
  );
}
