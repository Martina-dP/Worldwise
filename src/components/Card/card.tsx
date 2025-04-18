import React from 'react';
import { CardProps } from "../../interfaces/interfaces"
import { Link } from 'react-router-dom';
import style from './card.module.css';

const Card: React.FC<CardProps> = ({ id, name, flags, isFavorite}) => {
    return (
        <div className={style.card_container}>
            <div className={style.card_favorite}>
                <button className={style.favorite_button}>
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            {flags.svg && <img src={flags.svg} alt={name.official} className={style.card_img} />}
            <div className={style.card_info}>
                <Link to={`/country/${id}`} >
                    <span className={style.card_title} >{name.official}</span>
                </Link>
            </div>
        </div>
    );
};

export default Card;