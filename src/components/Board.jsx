import { Container } from '@mui/material';
import React from 'react';
import styles from './board.module.css';

const Board = (props) => {
  return (
    <Container maxWidth='md' className={styles.board}>
      {props.children}
    </Container>
  );
};

export default Board;
