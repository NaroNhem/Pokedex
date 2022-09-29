import { useState, useEffect } from "react";
import "./styles.css"
import { Route, Routes, Link } from "react-router-dom"
import { Pokedex } from "./Pages/Pokedex"
import { PokemonDetails } from "./Pages/PokemonDetails"

function App() {
  return(
    <Routes>
      <Route path="/" element={<Pokedex />} />
      <Route path="/pokemon/:id" element={<PokemonDetails />}/>
    </Routes>
  )
}

export default App;
