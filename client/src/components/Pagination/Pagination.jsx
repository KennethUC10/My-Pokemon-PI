import React from 'react'
import previous from "../../images/previous.png";
import next from "../../images/next.png";
import style from "./Pagination.module.css";

export default function Pagination({ page, setPage, max, input, setInput }) {

    console.log(page, setPage, max, input, setInput);

    const nextPage = () => {
        setInput(parseInt(page) + 1);
        setPage(parseInt(page) + 1);
    }

    const previousPage = () => {
        setInput(parseInt(page) - 1);
        setPage(parseInt(page) - 1);
    }

    const onKeyDown = (e) => {
        if(e.keyCode === 13)
        {
            if(parseInt(e.target.value) < 1 || parseInt(e.target.value) > max || isNaN(parseInt(e.target.value)))
            {
                setPage(1);
                setInput(1);
            }
            else
            {
                setPage(parseInt(e.target.value));
            }
        }
    }

    const onChange = (e) => {
        setInput(e.target.value);
    }


    /*         Renderizado         */
    return (
        <div className={ style.main }>
            <button className={ style.button_left } disabled={ page <= 1 } onClick={ previousPage }>
                <img src={ previous } alt="" width="10px" height="15px" />
            </button>
            <input className={ style.input_TextBox } name="page" onChange={(e) => onChange(e) } onKeyDown={(e) => onKeyDown(e)} value={ input } />
            <p className=""> de { max } </p>
            <button className={ style.button_right } disabled={ page >= max } onClick={ nextPage }>
                <img src={ next } alt="" width="10px" height="15px" />
            </button>

            {/*
            <div className={ style.paginado }>
            </div>
            */}

        </div>
    )
}
