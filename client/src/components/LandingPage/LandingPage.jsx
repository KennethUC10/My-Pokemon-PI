import React from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import stylesLandingPage from "./LandingPage.css";
import style from "./LandingPage.module.css";


//    Ultimate

export default function LandingPage()
{
    const navigate = useNavigate();

    const handleClick = () => {
        setTimeout( () => {
            navigate("/pokemon");
        });
    }

    return(
        <div className={ style.landing_body }>
            <button className={ style.landing_button } onClick={ handleClick } >Pokedex</button>
            {/* 
            <div className="introduction">
                <h1 className="title">Pokemon</h1>
                <Link to="/pokemon">
                    <button className="buttonHome">Ingresar al Home</button>
                </Link>
            </div>
            */}
        </div>
    )
}
