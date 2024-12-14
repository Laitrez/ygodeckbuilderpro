import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="btn btn-primary"
      >
        Précédent
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="btn btn-primary"
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
