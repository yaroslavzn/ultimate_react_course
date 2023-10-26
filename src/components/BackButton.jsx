import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button buttonType="back" type="button" onClick={() => navigate(-1)}>
      &larr; Back
    </Button>
  );
};

export default BackButton;
