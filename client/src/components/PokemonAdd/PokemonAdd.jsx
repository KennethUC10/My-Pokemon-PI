import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon } from '../../redux/actions/pokemonAction.js';
import { validate, valSelect } from '../../validation/validator.js';
import NavBar from '../NavBar/NavBar.jsx';
import style from "./PokemonAdd.module.css";

export default function PokemonAdd() {

    const validarPokemon = ({ name, height, weight, life, defense, attack, speed, image, types }) => {
        const obj = {};
    
        if (name.toString().trim().length === 0) {
            obj.name = 'El Nombre esta Vacio';
        }
        if (height.toString().trim().length === 0) {
            obj.height = 'La Altura esta Vacia';
        } else if (typeof height === 'number') {
            obj.height = 'La Altura No es un Numero';
        } else if (height < 0 || height > 280) {
            obj.height = 'La Altura solo puede estar entre 0 a 280';
        }
    
        if (weight.toString().trim().length === 0) {
            obj.weight = 'El Peso esta Vacio';
        } else if (typeof weight === 'number') {
            obj.weight = 'El Peso No es un Numero';
        } else if (weight < 0 || weight > 280) {
            obj.weight = 'El Peso solo puede estar entre 0 a 280';
        }
    
        if (life.toString().trim().length === 0) {
            obj.life = 'La Vida esta Vacia';
        } else if (typeof life === 'number') {
            obj.life = 'La Vida No es un Numero';
        } else if (life < 0 || life > 280) {
            obj.life = 'La Vida solo puede estar entre 0 a 280';
        }
    
        if (defense.toString().trim().length === 0) {
            obj.defense = 'La Defenza esta Vacia';
        } else if (typeof defense === 'number') {
            obj.defense = 'La Defenza No es un Numero';
        } else if (defense < 0 || defense > 280) {
            obj.defense = 'La Defenza solo puede estar entre 0 a 280';
        }
    
        if (attack.toString().trim().length === 0) {
            obj.attack = 'El Ataque esta Vacio';
        } else if (typeof attack === 'number') {
            obj.attack = 'El Ataque No es un Numero';
        } else if (attack < 0 || attack > 280) {
            obj.attack = 'El Ataque solo puede estar entre 0 a 280';
        }
    
        if (speed.toString().trim().length === 0) {
            obj.speed = 'La Velocidad esta Vacia';
        } else if (typeof speed === 'number') {
            obj.speed = 'La Velocidad No es un Numero';
        } else if (speed < 0 || speed > 280) {
            obj.speed = 'La Velocidad solo puede estar entre 0 a 280';
        }
    
        if (image.toString().trim().length === 0) {
            obj.image = 'La Imagen esta Vacia';
        } else if (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(image)) {
            obj.image = 'La Url de la Imagen no es Valida';
        }
    
        return obj;
    };




    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { listPokemon } = useSelector(state => state.pokemon);
    const { listType } = useSelector(state => state.pokemon);

    /*
    const types = useSelector(state => state.type);
    const pokemons = useSelector(state => state.);
    const [errors, setErrors] = useState();
    const [errorSelect, setErrorSelect] = useState({});
    const [disabled, setDisable] = useState(true);
    */

    const [errors, setErrors] = useState({});

    const [entrada, setEntrada] = useState(
    {
        name: "",
        life: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: [],
        image: ""
    });


    //      Esto es para revisar lo ingresado en los input
    const handleChange = (e) => {
        setEntrada({ 
            ...entrada,
            [e.target.name]: e.target.value 
        });

        setErrors(
            validarPokemon({
                ...entrada,
                [e.target.name]: e.target.value
            })
        );
    }


    //  Funcion para el chekcBox
    const handleCheck = (e) => {
        if(e.target.checked)
        {
            setEntrada({ 
                ...entrada,
                type: [ ...entrada.type, e.target.value ]
            })
        }
        else
        {
            setEntrada({ 
                ...entrada,
                type: entrada.type.filter( el => el !== e.target.value )
            })
        }
    }


    //  Funcion para el boton Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const noErrors = Object.keys(errors).length === 0;

        if (noErrors)
        {
            if(entrada.type.length > 3)
            {
                alert("Solo se pueden marcar como maximo 3 tipos");
            }
            else
            {
                dispatch(createPokemon(entrada));
                alert("Pokemon creado con exito !!!");
            }
        }

        setEntrada({
            name: "",
            life: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            types: [],
            image: ""
        })
    }

    const validation = (input) => {
        let errors = {};
        if(!input.name || input.name.length < 1)
        {
            errors.name = "Please, you must write a name";
        }
    }


    return (
        <div className={ style.PokemonAdd_body }>
            <NavBar/>
            <div className={ style.PokemonAdd_title }>
                <h1>Creacion de nuevo Pokemon</h1>                
            </div>
            {/*
            <Link to="/pokemon">Volver</Link>
            */}

            <div className={ style.PokemonAdd_main }>
                <div className={ style.PokemonAdd_main_left }>
                    <form onSubmit={ e => handleSubmit(e) }>
                        {
                            console.log(errors)
                        }
                        <table>
                            <tr>
                                <td>
                                    <label>Nombre :</label>
                                </td>
                                <td>
                                    <input name="name" type="text" value={ entrada.name } onChange={ handleChange } ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Vida :</label>
                                </td>
                                <td>
                                    <input name="life" type="number" value={ entrada.life } onChange={ handleChange } ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Ataque :</label>
                                </td>
                                <td>
                                    <input name="attack" type="number" value={ entrada.attack } onChange={ handleChange } ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Defensa :</label>
                                </td>
                                <td>
                                    <input name="defense" type="number" value={ entrada.defense } onChange={ handleChange } ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Velocidad :</label>
                                </td>
                                <td>
                                    <input name="speed" type="number" value={ entrada.speed } onChange={ handleChange } ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Altura :</label>
                                </td>
                                <td>
                                    <input name="height" type="number" value={ entrada.height } onChange={ handleChange } ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Peso :</label>
                                </td>
                                <td>
                                    <input name="weight" type="number" value={ entrada.weight } onChange={ handleChange } ></input>
                                </td>
                            </tr>
                        </table>

                        <label>URL de la Imagen :</label>
                        <input className={ style.image_URL } name="image" type="text" value={ entrada.image } onChange={ handleChange } ></input>


                        <table className={ style.tabla1 } border="1">
                            <tr>
                                <th colSpan="5">Tipos de Pokemon</th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="normal" value="normal" onChange={ e => handleCheck(e) } />Normal
                                </td>
                                <td>
                                    <input type="checkbox" name="fighting" value="fighting" onChange={ e => handleCheck(e) } />Fighting                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="flying" value="flying" onChange={ e => handleCheck(e) } />Flying                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="poison" value="poison" onChange={ e => handleCheck(e) } />Poison                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="ground" value="ground" onChange={ e => handleCheck(e) } />Ground                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="rock" value="rock" onChange={ e => handleCheck(e) } />Rock
                                </td>
                                <td>
                                    <input type="checkbox" name="bug" value="bug" onChange={ e => handleCheck(e) } />Bug                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="ghost" value="ghost" onChange={ e => handleCheck(e) } />Ghost                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="steel" value="steel" onChange={ e => handleCheck(e) } />Steel                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="fire" value="fire" onChange={ e => handleCheck(e) } />Fire                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="water" value="water" onChange={ e => handleCheck(e) } />Water
                                </td>
                                <td>
                                    <input type="checkbox" name="grass" value="grass" onChange={ e => handleCheck(e) } />Grass                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="electric" value="electric" onChange={ e => handleCheck(e) } />Electric                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="psychic" value="psychic" onChange={ e => handleCheck(e) } />Psychic                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="ice" value="ice" onChange={ e => handleCheck(e) } />Ice                                    
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="checkbox" name="dragon" value="dragon" onChange={ e => handleCheck(e) } />Dragon
                                </td>
                                <td>
                                    <input type="checkbox" name="dark" value="dark" onChange={ e => handleCheck(e) } />Dark                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="fairy" value="fairy" onChange={ e => handleCheck(e) } />Fairy                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="unknown" value="unknown" onChange={ e => handleCheck(e) } />Unknown                                    
                                </td>
                                <td>
                                    <input type="checkbox" name="shadow" value="shadow" onChange={ e => handleCheck(e) } />Shadow                                    
                                </td>
                            </tr>
                        </table>
                        
                        {/*  
                        <ul>
                            <li>entrada.type.map( e => e + " ," )</li>
                        </ul>
                        */}

                        <input type="submit" value="Crear Pokemon" />
                    </form>

                </div>
                <div className={ style.PokemonAdd_main_right }>
                </div>
            </div>
        </div>
    )
}

