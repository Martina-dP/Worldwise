import React from 'react';
import { PaginationProps } from '../../interfaces/interfaces';

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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </button>
            <span style={{ color: 'var(--color-primary-dark)' , fontWeight: 'bold', padding: '0 10px'}}>
                Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    );
};

export default Pagination;