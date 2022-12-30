import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { getPokemonByID, setPokemon } from '../../redux/actions/pokemonAction';
import NavBar from '../NavBar/NavBar';
import style from "./PokemonDetail.module.css";

//    Ultimate


export default function PokemonDetail() {

    const dispatch = useDispatch();
    const { idPokemon } = useParams();
    const { pokemonDetail } = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(getPokemonByID(idPokemon))
    }, []);

    useEffect(() => {
        return () => {
            if (getPokemonByID) {
                dispatch(setPokemon({}));
            }
        };
    }, [getPokemonByID, dispatch]);

    return (
        <div className={ style.detail_body }>
            <NavBar/>
            <div className={ style.pokemonDetail_title }>
                <h1>Detalle del Pokemon</h1>                
            </div>
            {
                pokemonDetail ? 
                <div className={ style.pokemon_Detail }>
                    <div className={ style.pokemon_Detail_Name }>
                        <h1>{ pokemonDetail.success?.name.toUpperCase() }</h1>
                    </div>
                    <div className={ style.pokemon_Detail_Image }>
                        <img className={ style.pokemon_Image } src={ pokemonDetail.success?.image } alt="" />
                    </div>
                    <div className={ style.pokemon_Detail_Datos }>
                        <h4>Life: { pokemonDetail.success?.life }</h4>
                        <h4>Attack: { pokemonDetail.success?.attack }</h4>
                        <h4>Defense: { pokemonDetail.success?.defense }</h4>
                        <h4>Speed: { pokemonDetail.success?.speed }</h4>
                        <h4>Height: { pokemonDetail.success?.height }</h4>
                        <h4>Weight: { pokemonDetail.success?.weight }</h4>
                        <h4>Types: 
                            <p>
                                {
                                    pokemonDetail.success?.types.map( e => {
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
                :
                <div className={ style.pokemon_No_Detail }>
                    <p>No hay detalle</p>
                </div>
            }
        </div>
    )
}
