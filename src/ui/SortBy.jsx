import React from 'react';
import Select from './Select';
import { useSearchParams } from 'react-router-dom';

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get('sortBy') || '';

  const changeSelectHandler = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select onChange={changeSelectHandler} value={selected}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SortBy;
