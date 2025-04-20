import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/card';
import { clearSearchResults } from '../../action/action';
import Pagination from '../../components/Pagination/pagination';

import style from '../ListCountries/listCountries.module.css';
import searchStyle from './resultsSearch.module.css';

interface Props {
    resetSearch: () => void;
}

const ResultsSearch: React.FC<Props> = ({resetSearch}) => {

    const searchResults = useSelector((state: RootState) => state.resultSearch);
    const isFavorite = useSelector((state: RootState) => state.favorites);

    const dispatch = useDispatch<AppDispatch>();

    const [currentPage, setCurrentPage] = React.useState(1);
    const [countriesPerPage] = React.useState(20); 
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const resultsCountries = searchResults.slice(indexOfFirstCountry, indexOfLastCountry);
    const totalPages = Math.ceil(searchResults.length / countriesPerPage);

    const handleBackToHome = () => {
        dispatch(clearSearchResults())
        resetSearch();
    }
    
        const handlePrevPage = (page: number) => {
            setCurrentPage(page);
        };
    
        const handleNextPage = (page: number) => {
            setCurrentPage(page);
        };

    return (
        <div style={{ padding: '20px' }}>
            <div className={searchStyle.list_header}>
                <h2>Results</h2>
                <Link to="/" onClick={handleBackToHome}>Back to Home</Link>
            </div>
            <div className={style.list_list}>
                {resultsCountries.length === 0 ? (
                    <p>No searches performed</p>
                ) : (
                    <>
                        {resultsCountries.map((country) => (
                            <Card
                                key={country.id}
                                id={country.id}
                                name={country.name}
                                flags={country.flags}
                                isFavorite={isFavorite.some(fav => fav.id === country.id)}
                            />
                        ))}
                    </>
                )}
            </div>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        </div>
    );
};

export default ResultsSearch;