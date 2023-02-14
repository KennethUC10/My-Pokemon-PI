import React from 'react'
import { Link } from 'react-router-dom'
//import stylesPokemonCard from "./PokemonCard.css";
import style from "./PokemonCard.module.css";

//    Ultimate
export default function PokemonCard(props) {
    return (
        <div className={ style.body_PokemonCard }>
            <div className={ style.PokemonCard_title }>
                <h4>{ props.name.toUpperCase() }</h4>
            </div>
            <div className={ style.PokemonCard_image }>
                <Link to={`/pokemon/${ props.id }`}>
                    <img className={ style.pokemon_image } src={ props.image } alt="" />
                </Link>
            </div>
            <div className={ style.Pokemon_types }>
                {
                    props.types.map( e => {
                        return(
                            <div className={ style.type_division }>
                                { e }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
