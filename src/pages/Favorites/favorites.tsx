import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Card from '../../components/Card/card';

const Favorites: React.FC = () => {

    const favorites = useSelector((state: RootState) => state.favorites);

    // agregar localStorage para persistir los favoritos

    return (
        <div style={{ padding: '20px' }}>
            <h2>Favorites</h2>
            <ul>
                {favorites.length === 0 ? (
                    <p>You don't have any favorites yet</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
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
            </ul>
        </div>
    );
};

export default Favorites;