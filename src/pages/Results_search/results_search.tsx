import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/card';
import { clearSearchResults } from '../../action/action';

const ResultsSearch: React.FC = () => {

    const searchResults = useSelector((state: RootState) => state.resultSearch);

    const dispatch = useDispatch<AppDispatch>();

    const handleBackToHome = () => {
        dispatch(clearSearchResults())
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
                        {searchResults.map((country) => (
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
        </div>
    );
};

export default ResultsSearch;