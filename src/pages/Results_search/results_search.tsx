import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/card';
import { clearSearchResults } from '../../action/action';

interface Props {
    resetSearch: () => void;
}

const ResultsSearch: React.FC<Props> = ({resetSearch}) => {

    const searchResults = useSelector((state: RootState) => state.resultSearch);
    const isFavorite = useSelector((state: RootState) => state.favorites);

    const dispatch = useDispatch<AppDispatch>();

    const handleBackToHome = () => {
        dispatch(clearSearchResults())
        resetSearch();
    }

    return (
        <div style={{ padding: '20px' }}>
            <div>
                <h2>Results</h2>
                <Link to="/" onClick={handleBackToHome}>Back to Home</Link>
            </div>
            <div>
            <ul>
                {searchResults.length === 0 ? (
                    <p>No searches performed</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {searchResults.map((country, index ) => (
                            <Card
                                key={index}
                                id={country.id}
                                name={country.name}
                                flags={country.flags}
                                isFavorite={isFavorite.some(fav => fav.id === country.id)}
                            />
                        ))}
                    </div>
                )}
            </ul>
            </div>
        </div>
    );
};

export default ResultsSearch;