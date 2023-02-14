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
    
        if (name.toString().trim().length === 0)
        {
            obj.name = 'El Nombre esta Vacio';
        }

        if (height.toString().trim().length === 0)
        {
            obj.height = 'La Altura esta Vacia';
        }
        else if (typeof height === 'number')
        {
            obj.height = 'La Altura No es un Numero';
        }
        else if (height < 0 || height > 280)
        {
            obj.height = 'La Altura solo puede estar entre 0 a 280';
        }
    
        if (weight.toString().trim().length === 0)
        {
            obj.weight = 'El Peso esta Vacio';
        }
        else if (typeof weight === 'number')
        {
            obj.weight = 'El Peso No es un Numero';
        }
        else if (weight < 0 || weight > 280)
        {
            obj.weight = 'El Peso solo puede estar entre 0 a 280';
        }
    
        if (life.toString().trim().length === 0)
        {
            obj.life = 'La Vida esta Vacia';
        }
        else if (typeof life === 'number')
        {
            obj.life = 'La Vida No es un Numero';
        }
        else if (life < 0 || life > 280)
        {
            obj.life = 'La Vida solo puede estar entre 0 a 280';
        }
    
        if (defense.toString().trim().length === 0)
        {
            obj.defense = 'La Defenza esta Vacia';
        }
        else if (typeof defense === 'number')
        {
            obj.defense = 'La Defenza No es un Numero';
        }
        else if (defense < 0 || defense > 280)
        {
            obj.defense = 'La Defenza solo puede estar entre 0 a 280';
        }
    
        if (attack.toString().trim().length === 0) {
            obj.attack = 'El Ataque esta Vacio';
        }
        else if (typeof attack === 'number') {
            obj.attack = 'El Ataque No es un Numero';
        }
        else if (attack < 0 || attack > 280) {
            obj.attack = 'El Ataque solo puede estar entre 0 a 280';
        }
    
        if (speed.toString().trim().length === 0)
        {
            obj.speed = 'La Velocidad esta Vacia';
        }
        else if (typeof speed === 'number')
        {
            obj.speed = 'La Velocidad No es un Numero';
        }
        else if (speed < 0 || speed > 280)
        {
            obj.speed = 'La Velocidad solo puede estar entre 0 a 280';
        }
    
        if (image.toString().trim().length === 0)
        {
            obj.image = 'La Imagen esta Vacia';
        }
        else if (!/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/.test(image))
        {
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
                navigate("/pokemon");
            }
        }
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
            <div className={ style.PokemonAdd_main }>
                <form onSubmit={ e => handleSubmit(e) }>
                    <div className={ style.PokemonAdd_main_container }>

                        <div className={ style.PokemonAdd_main_left }>                        
                            <table className={ style.tabla_textBox }>
                                <tr>
                                    <td>
                                        <label>Nombre :</label>
                                    </td>
                                    <td>
                                        <input name="name" type="text" className={ style.textbox_letter } placeholder="Escribir nombre de Pokemon" value={ entrada.name } onChange={ handleChange } ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Vida :</label>
                                    </td>
                                    <td>
                                        <input name="life" type="number" className={ style.textbox_number } placeholder="Valor entre 0 y 280" value={ entrada.life } onChange={ handleChange } ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Ataque :</label>
                                    </td>
                                    <td>
                                        <input name="attack" type="number" className={ style.textbox_number } placeholder="Valor entre 0 y 280" value={ entrada.attack } onChange={ handleChange } ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Defensa :</label>
                                    </td>
                                    <td>
                                        <input name="defense" type="number" className={ style.textbox_number } placeholder="Valor entre 0 y 280" value={ entrada.defense } onChange={ handleChange } ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Velocidad :</label>
                                    </td>
                                    <td>
                                        <input name="speed" type="number" className={ style.textbox_number } placeholder="Valor entre 0 y 280" value={ entrada.speed } onChange={ handleChange } ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Altura :</label>
                                    </td>
                                    <td>
                                        <input name="height" type="number" className={ style.textbox_number } placeholder="Valor entre 0 y 280" value={ entrada.height } onChange={ handleChange } ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>Peso :</label>
                                    </td>
                                    <td>
                                        <input name="weight" type="number" className={ style.textbox_number } placeholder="Valor entre 0 y 280" value={ entrada.weight } onChange={ handleChange } ></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label>URL de la Imagen :</label>
                                    </td>
                                    <td>
                                        <input name="image" type="text" className={ style.textbox_letter } placeholder="Escribir URL de la imagen del Pokemon" value={ entrada.image } onChange={ handleChange } ></input>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <div className={ style.PokemonAdd_main_right }>
                            <table className={ style.table_types }  >
                                <tr>
                                    <th colSpan="5">Tipos de Pokemon</th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" name="normal" value="normal" onChange={ e => handleCheck(e) } />
                                            Normal
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_fighting } name="fighting" value="fighting" onChange={ e => handleCheck(e) } />Fighting
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_flying } name="flying" value="flying" onChange={ e => handleCheck(e) } />Flying
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_poison } name="poison" value="poison" onChange={ e => handleCheck(e) } />Poison
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_ground } name="ground" value="ground" onChange={ e => handleCheck(e) } />Ground
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_rock } name="rock" value="rock" onChange={ e => handleCheck(e) } />Rock
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_bug } name="bug" value="bug" onChange={ e => handleCheck(e) } />Bug
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_ghost } name="ghost" value="ghost" onChange={ e => handleCheck(e) } />Ghost
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_steel } name="steel" value="steel" onChange={ e => handleCheck(e) } />Steel
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_fire } name="fire" value="fire" onChange={ e => handleCheck(e) } />Fire
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_water } name="water" value="water" onChange={ e => handleCheck(e) } />Water
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_grass } name="grass" value="grass" onChange={ e => handleCheck(e) } />Grass
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_electric } name="electric" value="electric" onChange={ e => handleCheck(e) } />Electric
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_psychic } name="psychic" value="psychic" onChange={ e => handleCheck(e) } />Psychic
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_ice } name="ice" value="ice" onChange={ e => handleCheck(e) } />Ice
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_dragon } name="dragon" value="dragon" onChange={ e => handleCheck(e) } />Dragon
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_dark } name="dark" value="dark" onChange={ e => handleCheck(e) } />Dark
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_fairy } name="fairy" value="fairy" onChange={ e => handleCheck(e) } />Fairy
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_unknown } name="unknown" value="unknown" onChange={ e => handleCheck(e) } />Unknown
                                        </div>
                                    </td>
                                    <td>
                                        <div className={ style.checkbox }>
                                            <input type="checkbox" className={ style.checkbox_shadow } name="shadow" value="shadow" onChange={ e => handleCheck(e) } />Shadow
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div className={ style.container_button }>
                        <input className={ style.button_main } type="submit" value="Crear Pokemon" />
                    </div>
                </form>
            </div>
        </div>
    )
}

