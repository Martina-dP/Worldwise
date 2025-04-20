import React from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { CardProps } from "../../interfaces/interfaces"
import { addToFavorites, deleteItem, removeFromFavorites } from '../../action/action';

import style from './card.module.css';

const Card: React.FC<CardProps> = ({ id, name, flags, isFavorite}) => {

    const dispatch = useDispatch<AppDispatch>();

    const handleFavoriteClick = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(id));
        } else {
            dispatch(addToFavorites(id));
        }
    };

    const handleDeleteClick = () => {
        dispatch(deleteItem(id));
    }

    return (
        <div className={style.card_container}>
            <div className={style.card_favorite}>
                <button className={style.favorite_button} onClick={handleFavoriteClick}>
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <img
                src={flags?.svg || flags?.png}
                alt={name.common}
                className={style.card_img}
            />
            <div className={style.card_info}>
                {/* <Link to={`/country/${id}`} >
                    <span className={style.card_title} >{name.common}</span>
                </Link> */}
                <span className={style.card_title} >{name.common}</span>
                <button className={style.card_btn_delete} onClick={handleDeleteClick}>🗑️</button>
            </div>
        </div>
    );
};

export default Card;