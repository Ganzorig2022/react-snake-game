import React from 'react';
import styles from './snakeBody.module.css';

const SnakeBody = ({ snakeBody }) => {
  return snakeBody.map((el, i) => (
    <div
      key={i}
      className={styles.snakeItem}
      style={{ top: `${el[0]}rem`, left: `${el[1]}rem` }}
    ></div>
  ));
};

export default SnakeBody;
