import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getCountries } from '../../action/action';
import Card from '../../components/Card/card';
import style from './listCountries.module.css';

const ListCountries: React.FC = () => {

    const paises = useSelector((state: RootState) => state.countries);
    const favorites = useSelector((state: RootState) => state.favorites);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    return (
        <div style={{ padding: '20px' }}>
        <h2 className={style.list_title} >Countries List</h2>
        <ul className={style.list_list}>
            {paises?.map((country) => {
            return (
                <Card
                key={country.id}
                id={country.id}
                name={country.name}
                flags={country.flags}
                isFavorite={favorites.some(fav => fav.id === country.id)}
                />
            );
            })}
        </ul>
        </div>
    );
};

export default ListCountries;