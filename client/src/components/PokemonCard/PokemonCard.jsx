import React from 'react'
import { Link } from 'react-router-dom'
//import stylesPokemonCard from "./PokemonCard.css";
import style from "./PokemonCard.module.css";

//    Ultimate

export default function PokemonCard(props) {
    return (
        <div className={ style.body_PokemonCard }>
            <div className={ style.PokemonCard_title }>
                { props.name.toUpperCase() }
            </div>
            <Link to={`/pokemon/${ props.id }`}>
                <div className={ style.PokemonCard_image }>
                    <img className={ style.pokemon_image } src={ props.image } alt="" />
                </div>
            </Link>
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
