import React, { useMemo } from 'react';
import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

const CabinsTableOperations = () => {
  const filterOptions = useMemo(
    () => [
      { filter: 'all', label: 'All' },
      { filter: 'no-discount', label: 'No discount' },
      { filter: 'with-discount', label: 'With discount' },
    ],
    []
  );

  const sortByOptions = useMemo(
    () => [
      { value: 'name-asc', label: 'Sort by name (A-Z)' },
      { value: 'name-desc', label: 'Sort by name (Z-A)' },
      { value: 'regularPrice-asc', label: 'Sort by price (low first)' },
      { value: 'regularPrice-desc', label: 'Sort by price (high first)' },
      { value: 'maxCapacity-asc', label: 'Sort by capacity (low first)' },
      { value: 'maxCapacity-desc', label: 'Sort by capacity (high first)' },
    ],
    []
  );

  return (
    <TableOperations>
      <Filter filterName="discount" options={filterOptions}></Filter>

      <SortBy options={sortByOptions} />
    </TableOperations>
  );
};

export default CabinsTableOperations;
