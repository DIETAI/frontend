import React, { useState } from "react";

const DataGridPagination = () => {
  const pageCount = 2;
  const [page, setPage] = useState(1);

  const handleBack = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    if (page === pageCount) return;
    setPage(page + 1);
  };

  return (
    <div>
      <button onClick={handleBack}>back</button>
      <button onClick={handleNext}>next</button>
      {Array(pageCount)
        .fill(null)
        .map((_, index) => {
          return <option key={index}>{index + 1}</option>;
        })}
    </div>
  );
};

export default DataGridPagination;
