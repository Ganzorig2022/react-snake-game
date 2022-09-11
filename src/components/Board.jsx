import { Container } from '@mui/material';
import React from 'react';
import styles from './board.module.css';

const Board = (props) => {
  return <div className={styles.board}>{props.children}</div>;
};

export default Board;
