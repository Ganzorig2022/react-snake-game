import { useState } from 'react';
import { useEffect } from 'react';
import Board from './components/Board';
import SnakeBody from './components/SnakeBody';
import { Typography, Box, Button } from '@mui/material';
import styles from './components/snake.module.css';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const App = () => {
  const [speed, setSpeed] = useState(400);
  const [direction, setDirection] = useState('RIGHT');
  const [isAlive, setIsAlive] = useState(false);
  const [closeBtn, setCloseBtn] = useState(false);
  const [snakeShape, setSnakeShape] = useState([
    [10, 0],
    [10, 1],
    [10, 2],
  ]);

  //==========PREVENTING FROM SIDE EFFECTS==============
  useEffect(() => {
    document.onkeydown = keyHandler;

    checkHitTheWall();
    const moveIt = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(moveIt);
  });

  //=========0. Start Button triggers SNAKE GAME=========
  const startGame = () => {
    setCloseBtn(true);
    setIsAlive(true);
  };

  //==============1. Key press event handler===========
  const keyHandler = (e) => {
    //UP
    if (e.keyCode == 87) {
      setDirection('UP');
    }
    //RIGHT (S)
    if (e.keyCode == 83) {
      setDirection('RIGHT');
    }
    //DOWN
    if (e.keyCode == 68) {
      setDirection('DOWN');
    }
    //LEFT
    if (e.keyCode == 65) {
      setDirection('LEFT');
    }
  };

  //==============2. Move snake body by pressing WASD keys===
  const moveSnake = () => {
    //move snake if it's alive
    if (isAlive) {
      // [[0,0],[0,1],[0,2]]
      let body = [...snakeShape];

      //head is body array's last element: [0,2]
      let head = body[body.length - 1];

      switch (direction) {
        case 'RIGHT':
          head = [head[0], head[1] + 1]; //[0,2+1] => [0,3]
          break;
        case 'LEFT':
          head = [head[0], head[1] - 1]; //[0,2-1] => [0,2]
          break;
        case 'UP':
          head = [head[0] - 1, head[1]]; //[0+1,2] => [1,2]
          break;
        case 'DOWN':
          head = [head[0] + 1, head[1]]; //[0+1,2] => [1,2]
          break;
        default:
          break;
      }
      body.push(head);
      body.shift(); //[[0,1], [0,2],[0,3]]
      setSnakeShape(body);
    }
  };

  //========3. Check if snake hit the wall or not=======
  const checkHitTheWall = () => {
    //get head values from snake body array
    const head = snakeShape[snakeShape.length - 1];

    //if head[0]===50 means [50, 0] -> game over etc...
    if (head[0] === 50 || head[1] === 50 || head[0] < 0 || head[1] < 0)
      gameOver();
  };

  //=======4.Game over when snake hit the wall======
  const gameOver = () => {
    alert('GAME OVER! YOU DUMB MOTHERFUCKERS.');

    setSnakeShape([
      [10, 0],
      [10, 1],
      [10, 2],
    ]);
    setDirection(null);
    setIsAlive(false);
  };

  return (
    <div>
      <Board>
        <Typography sx={{ textAlign: 'center' }}>
          Snake game by Ganzo
        </Typography>
        <div className={styles.wrapper}>
          <SnakeBody snakeBody={snakeShape} />
          {!closeBtn && (
            <Button
              onClick={startGame}
              color='success'
              variant='contained'
              className={styles.button}
            >
              Start Game <SportsEsportsIcon />
            </Button>
          )}
        </div>
      </Board>
    </div>
  );
};
export default App;
