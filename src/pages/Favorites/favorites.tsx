import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import Card from '../../components/Card/card';
import style from '../ListCountries/listCountries.module.css';
import { Country } from '../../interfaces/interfaces';
import { SAVE_LOCAL } from '../../action/action';

const Favorites: React.FC = () => {

    const favorites = useSelector((state: RootState) => state.favorites);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const getStorageData = localStorage.getItem("favorites");
        if (getStorageData) {
        const parsedFavorites: Country[] = JSON.parse(getStorageData);
                dispatch({
                    type: SAVE_LOCAL,
                    payload: parsedFavorites,
                });
        }
    }, [dispatch]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Favorites</h2>
                {favorites.length === 0 ? (
                    <p>You don't have any favorites yet</p>
                ) : (
                    <div className={style.list_list}>
                        {favorites.map((country) => (
                            <Card
                                key={country.id}
                                id={country.id}
                                name={country.name}
                                flags={country.flags}
                                isFavorite={true}
                            />
                        ))}
                    </div>
                )}
        </div>
    );
};

export default Favorites;