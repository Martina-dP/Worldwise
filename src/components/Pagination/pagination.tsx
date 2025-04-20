import React from 'react';
import { PaginationProps } from '../../interfaces/interfaces';

import style from './pagination.module.css';

const Pagination: React.FC<PaginationProps> = ({ 
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
}) => {

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePrevPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            handleNextPage(currentPage + 1);
        }
    };

    return (
        <div className={style.pagination_container}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </button>
            <span className={style.pagination_text}>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;