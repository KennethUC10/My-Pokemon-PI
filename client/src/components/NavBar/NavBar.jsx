import React from 'react';
import style from "./NavBar.module.css";
import pokemon_logo from "../../images/pokemon.png";
import { Link } from 'react-router-dom';

export default function NavBar() {

    const handleClick = () => {
        window.location.reload();
    };

    return (
        <div className={ style.nav_bar }>
            <div className={ style.nav_bar_container }>
                <div className={ style.nav_bar_left }>
                    <div className={ style.Button_Landing }>
                        <Link to="/">Landing</Link>
                    </div>
                    <div className={ style.Button_Home }>
                        <Link to="/pokemon">Home</Link>
                    </div>
                </div>
                <div className={ style.nav_bar_center }>
                    <img className={ style.nav_bar_image } src={ pokemon_logo } alt="" />
                </div>
                <div className={ style.nav_bar_right }>
                    <div>
                        <button className={ style.Button_Filtros } onClick={() => handleClick()}  >
                            <h3>Reset</h3>
                        </button>
                    </div>
                    <div className={ style.Button_Create_Pokemon }>
                        <Link to="/pokemon/addPokemon">Create Pokemon</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
