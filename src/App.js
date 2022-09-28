import { useState, useEffect } from "react";

//Takes pokemon object and gets ID from it
function getIDFromPokemon(pokemon) {
  return pokemon.url
    .replace("https://pokeapi.co/api/v2/pokemon/", "")
    .replace("/", "");
}

function Card(props) {
  const [likes, setLikes] = useState(0);
  return (
    <div class="card col-4 d-flex justify-content-center">
      <img src={props.src} class="card-img-top" alt="..." />
      <div class="card-body text-center">
        <h5 class="card-title">{props.title}</h5>
        {likes === 0 ? null : <p class="card-text">Likes: {likes}</p>}
        <button
          onClick={() => {
            setLikes(likes + 1);
          }}
          href="#"
          class="btn btn-primary"
        >
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0); //Hook to change state of number of pokemon shown
  const [isLoading, setIsLoading] = useState(false); //Hook to change state of loading
  const limit = 20; //Sets the number of pokemon to shown when the API is fetched

  useEffect(() => {
    setIsLoading(true);//loading is set to true when we are fetching the data
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setIsLoading(false);//sets loading back to false when we have the data
        setPokemonList([...pokemonList, ...json["results"]]); //Using spread operator allows us to add existing elements to new when page is being updated.
      });
  }, [offset]); //useEffect is triggered everytime the offset is changed

  return (
    <div className="App" class="text-center">
      <div class="container">
        <div class="row">
          {pokemonList.map((pokemon) => {
            return (
              <Card
                title={pokemon["name"]}
                text="This is a pokemon"
                buttonText="Like"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getIDFromPokemon(
                  pokemon
                )}.png`}
              />
            );
          })}
        </div>
      </div>
      {isLoading == true ? <div class="spinner-border text-danger" role="status">//We make a conditional to show load only if isLoading is true
        <span class="visually-hidden">Loading...</span>
      </div>: null}
      <div>
        <button onClick={() => {setOffset(offset + limit)}}>More</button>
      </div>
    </div>
  );
}

export default App;
