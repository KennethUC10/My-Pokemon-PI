import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions/pokemonAction';
import style from "./SearchBar.module.css";


//    Ultimate

export default function SearchBar({ setInput, setPage, setSelected, seteo }) {

    //const { setInput, setPage, setSelected } = props;
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleInputChange = (e) =>
    {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e)
    {
        e.preventDefault();                     //  Esto sirve para que a la hora de hacer Refresh,no desaparezca el valor
        if(!validateName(name))
        {
            alert("Solo puedes ingresar letras");
            setName("");
        }
        else if(name !== "")
        {
            dispatch(getPokemonByName(name)).then(info => {
                setInput(1);
                setPage(1);
                console.log(info);
            });
            setName("");
            seteo(false);
        }
    }

    const validateName = (name) => {
        return /^[a-zA-Z]{1,10}$/.test(name);
    };
    

    return (
        <div className={ style.searchBar_Container }>
            <div className={ style.searchBar_Menu }>
                <input className={ style.textBox_Name } type="text" pattern="[a-zA-Z]*" placeholder="Write Pokemon's name" value={ name } onChange={ e => handleInputChange(e) } />
                <button className={ style.button_Search } type="submit" onClick={ e => handleSubmit(e) }>Busqueda</button>
            </div>
        </div>
    )
}

