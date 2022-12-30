import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home.jsx';
import PokemonDetail from './components/PokemonDetail/PokemonDetail.jsx';
import PokemonAdd from './components/PokemonAdd/PokemonAdd.jsx';
import LandingPage from './components/LandingPage/LandingPage';
import Pokedex from './components/Pokedex/Pokedex';


//    Ultimate

function App() {
    return (
        <Routes>
            <Route index element={ <LandingPage/> } />
            <Route path="/pokemon" element={ <Home/> } />
            <Route path="/create" element={ <PokemonAdd/> } />
            <Route path="/pokemon/:idPokemon" element={ <PokemonDetail/> } />
            <Route path="/pokemon/addPokemon" element={ <PokemonAdd/> } />

            <Route path="/pokedex" element={ <Pokedex/> } />
        </Routes>
    );
}

export default App;
