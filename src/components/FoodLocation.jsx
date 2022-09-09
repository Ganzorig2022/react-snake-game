import React from 'react';
import styles from './snake.module.css';

const FoodLocation = ({ foodPoint }) => {
  return (
    <div
      className={styles.foodItem}
      style={{ top: `${foodPoint[0]}rem`, left: `${foodPoint[1]}rem` }}
    ></div>
  );
};

export default FoodLocation;
