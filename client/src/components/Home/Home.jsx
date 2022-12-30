import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { filtradoLibreria } from '../../libraries/index.js'; 
import { getAllPokemon, getPokemonByName, getPokemonByType, filterByCreated, filterByOrigen, filterByTipo, filterByAlphabet } from "../../redux/actions/pokemonAction.js";
import { getTypes } from '../../redux/actions/typeAction.js';

import NavBar from '../NavBar/NavBar.jsx';
import PokemonCard from '../PokemonCard/PokemonCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import SearchBar from '../SearchBar/SearchBar.jsx';
import pokemon_logo from "../../images/pokemon.png";
import "./Home.css";
import style from "./Home.module.css";


//          Ultimate

export default function Home() {

    const dispatch = useDispatch();

    //      Traigo a Pokemon y Types desde el Estado
    const { listPokemon, filtrado } = useSelector(state => state.pokemon);
    const { listType } = useSelector(state => state.pokemon);
    const { pokemonByName } = useSelector(state => state.pokemon);
    const { pokemonByType } = useSelector(state => state.pokemon);
    //  console.log(pokemonByType);


    //      Este es el estado del listado de los Pokemon en totalidad y por pagina
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(12);
    const max = Math.ceil(listPokemon.length / perPage);
    const listaFiltrada = filtradoLibreria(filtrado, listPokemon);

    //      Este es el estado del select de Tipos, y si fue seleccionado un item
    const [input, setInput] = useState(1);

    //      Dato que envio a SearchBar.jsx
    const [selected, setSelected] = useState(false);

    const error = useSelector(state => state.error);


    //  handleAllPokes 

    //      Lista todos los pokemon de nuevo
    const allPokemons = (e) => {
        e.preventDefault();
        dispatch(getAllPokemon());
        setInput(1);
        setPage(1);
        setSelected(true);
    }


    //      Listar desde la API o creados
    const handleFilterCreated = (e) => {
        dispatch(filterByOrigen(e.target.value));
    }

    //      Lista todos los pokemon por tipo
    const handleFilterType = (e) =>{
        //  e.preventDefault(e);
        dispatch(filterByTipo(e.target.value));
    }


    //      Lista todos los pokemon por tipo
    const handleFilterAlphabet = (e) =>{
        //  e.preventDefault(e);
        dispatch(filterByAlphabet(e.target.value));
    }



    //      Es mejor colocar el useEffect antes del RETURN
    useEffect(() => 
    {
        dispatch(getAllPokemon());
        dispatch(getTypes());
        setOcultarFiltro(true);
    }, [dispatch]);                 //  Lo que coloco dentro del arreglo, es de lo que depende el componentDitMount

    const [ocultarFiltro, setOcultarFiltro] = useState(true);


    return (
        <div className={ style.home_body }>
            <NavBar />

            {/*         Aqui buscare el Pokemon por nombre         charizard     */} 
            <SearchBar setInput={ setInput } setPage={ setPage } setSelected={ selected } seteo={ setOcultarFiltro }  />

            {/*         Aqui buscare el Pokemon por filtros                  */} 
            {
                !ocultarFiltro ? null :
            
                <div className={ style.filter_Bar }>
                    <div className={ style.filter_Bar_Option }>
                        Origen de Datos :
                        <select className={ style.selectBox } onChange={ handleFilterCreated }>
                            <option value="ALL">Todos</option>
                            <option value="API">Pokemon de la API</option>
                            <option value="CREATED">Pokemon de la BD</option>
                        </select>
                    </div>
                    <div className={ style.filter_Bar_Option }>
                        Ordenar por tipo :
                        <select className={ style.selectBox } defaultValue="first" onChange={ handleFilterType }>
                            {/* <option value="first" selected={ selected } disabled>Search by type</option> */}
                            <option value="ALL">Tipos de Pokemon</option>
                            {
                                listType?.map( t => {
                                    return (
                                        <option key={ t.id } value={ t.name }>
                                            { t.name }
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                    <div className={ style.filter_Bar_Option }>
                        Ordenar por letra o ataque :
                        <select className={ style.selectBox } onChange={ handleFilterAlphabet }>
                            <option value="ALL">Sin orden</option>
                            <option value="A-Z">A to Z</option>
                            <option value="Z-A">Z to A</option>
                            <option value="ASC">Ascendente por ataque</option>
                            <option value="DESC">Descendente por ataque</option>
                        </select>
                    </div>
                </div>
            }

            {/*         Aqui listo mis Pokemon          */}
            {
                pokemonByName.name ?
                (
                    <div className={ style.Pokemon_By_Name_body }>
                        <div className={ style.Pokemon_Name }>
                            <h1>{ pokemonByName.name.toUpperCase() }</h1>
                        </div>
                        <div className={ style.Pokemon_By_Name_image }>
                            <img src={ pokemonByName.image } alt="" />
                        </div>
                        <div className={ style.pokemon_By_Name_Datos }>
                            <h4>Life: { pokemonByName.life }</h4>
                            <h4>Attack: { pokemonByName.attack }</h4>
                            <h4>Defense: { pokemonByName.defense }</h4>
                            <h4>Speed: { pokemonByName.speed }</h4>
                            <h4>Height: { pokemonByName.height }</h4>
                            <h4>Weight: { pokemonByName.weight }</h4>
                            <h4>Types: 
                                <p>
                                {
                                    pokemonByName.types.map( e => {
                                        return(
                                            <div className={ style.type_division }>
                                                { e }
                                            </div>
                                        )
                                    })
                                }
                                </p>
                            </h4>
                        </div>
                    </div>
                )
                :
                (
                    <>
                        <div className={style.grid_border}>
                            <div className={style.grid_Pokemon}>
                                {
                                    listaFiltrada.slice((page - 1) * perPage, (page - 1) * perPage + perPage)?.map(e => {
                                        return (
                                            <div className={style.pokemon} key={e.id}>
                                                <PokemonCard id={e.id} name={e.name} types={e.types} image={e.image} />
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            {/*         Aqui inicia el paginado          */}
                            <Pagination page={page} setPage={setPage} max={max} input={input} setInput={setInput} />
                        </div>
                    </>
                )
            }
        </div>
    )
}
