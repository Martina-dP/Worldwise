import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { getCountries } from '../../action/action';
import Card from '../../components/Card/card';
import style from './listCountries.module.css';
import Pagination from '../../components/Pagination/pagination';

const ListCountries: React.FC = () => {

    const paises = useSelector((state: RootState) => state.countries);
    const favorites = useSelector((state: RootState) => state.favorites);

    const [currentPage, setCurrentPage] = React.useState(1);
    const [countriesPerPage] = React.useState(20); 
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = paises.slice(indexOfFirstCountry, indexOfLastCountry);
    const totalPages = Math.ceil(paises.length / countriesPerPage);

    const handlePrevPage = (page: number) => {
        setCurrentPage(page);
    };

    const handleNextPage = (page: number) => {
        setCurrentPage(page);
    };

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    return (
        <div style={{ padding: '20px' }}>
            <h2 className={style.list_title} >Countries List</h2>
            <ul className={style.list_list}>
                {currentCountries?.map((country) => {
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
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
            />
        </div>
    );
};

export default ListCountries;