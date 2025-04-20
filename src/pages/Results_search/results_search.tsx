import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/card';
import { clearSearchResults } from '../../action/action';
import style from '../ListCountries/listCountries.module.css';
import searchStyle from './resultsSearch.module.css';

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
            <div className={searchStyle.list_header}>
                <h2>Results</h2>
                <Link to="/" onClick={handleBackToHome}>Back to Home</Link>
            </div>
            <div className={style.list_list}>
                {searchResults.length === 0 ? (
                    <p>No searches performed</p>
                ) : (
                    <>
                        {searchResults.map((country, index ) => (
                            <Card
                                key={index}
                                id={country.id}
                                name={country.name}
                                flags={country.flags}
                                isFavorite={isFavorite.some(fav => fav.id === country.id)}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResultsSearch;