import React from 'react';
import styles from './Button.module.css';

const Button = ({ buttonType, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.btn} ${styles[buttonType]}`}
    ></button>
  );
};

export default Button;
