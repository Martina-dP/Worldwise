import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Card from '../../components/Card/card';

const ResultsSearch: React.FC = () => {

    const favorites = useSelector((state: RootState) => state.favorites);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Países Favoritos</h2>
            <ul>
                {favorites.length === 0 ? (
                    <p>No tenés favoritos todavía.</p>
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

export default ResultsSearch;