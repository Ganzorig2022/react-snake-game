import './App.css';
import { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
// import { Board, NavBar, SnakeBody, FoodLocation } from './components/';
import Board from './components/Board';
import SnakeBody from './components/SnakeBody';
import FoodLocation from './components/FoodLocation';
import Navbar from './components/Navbar';
import styles from './components/snakeBody.module.css';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ScoreboardIcon from '@mui/icons-material/Scoreboard';
import SnakeGIF from './assets/crying-snake.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getRandomPositionFood = () => {
  const min = 1;
  const max = 39;

  let x = Math.floor(Math.random() * (max - min));
  let y = Math.floor(Math.random() * (max - min));
  return [x, y];
};

const App = () => {
  const [speed, setSpeed] = useState(200);
  const [direction, setDirection] = useState('RIGHT');
  const [isAlive, setIsAlive] = useState(false);
  const [isGameOver, setIsGameOver] = useState();
  const [closeBtn, setCloseBtn] = useState(false);
  const [snakeShape, setSnakeShape] = useState([
    [10, 0],
    [10, 1],
    [10, 2],
  ]);
  const [foodPoint, setFoodPoint] = useState(getRandomPositionFood());
  const [score, setScore] = useState(0);
  const [scoreIsChanged, setScoreIsChanged] = useState(false);

  //==========PREVENTING FROM SIDE EFFECTS==============
  //1.
  useEffect(() => {
    document.onkeydown = keyHandler;

    checkHitTheWall();
    eatFood();
    const moveIt = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(moveIt);
  });

  //2. Score point bumps when score state changes!!!!!!
  useEffect(() => {
    if (score === 0) return;

    setScoreIsChanged(true);

    const timer = setTimeout(() => {
      setScoreIsChanged(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const textBumpStyle = `${scoreIsChanged && styles.bump}`;
  //=========0. Start Button triggers SNAKE GAME=========
  const startGame = () => {
    setCloseBtn(true);
    setIsAlive(true);
    setIsGameOver(false);
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

    //if head[0]===40 means [40, 0] -> game over etc...
    if (head[0] === 40 || head[1] === 40 || head[0] < 0 || head[1] < 0)
      gameOver();
  };

  //=======4.Game over when snake hit the wall======
  const gameOver = () => {
    toast.error('GAME OVER');
    setSnakeShape([
      [10, 0],
      [10, 1],
      [10, 2],
    ]);
    setFoodPoint([10, 20]);
    setDirection(null);
    setIsAlive(false);
    setCloseBtn(false);
    setIsGameOver(true);
    setScore(0);
    setDirection('RIGHT');
  };

  //========5. Eat food=================
  const eatFood = () => {
    //get head values from snake body array
    //[10,2]
    const head = snakeShape[snakeShape.length - 1];
    const food = foodPoint;

    //snake head reaches food
    if (head[0] === food[0] && head[1] === food[1]) {
      setFoodPoint(getRandomPositionFood());
      makeSnakeBigger();
      setScore(score + 1);
    }
  };

  //========6. Make snake bigger when eats======
  const makeSnakeBigger = () => {
    let head = snakeShape[snakeShape.length - 1];
    let newBody = [...snakeShape, head];
    setSnakeShape(newBody);
  };

  return (
    <div>
      <Navbar />
      <Board>
        <Box
          sx={{
            width: '40rem',
            background: '#84ffff',
            borderRadius: '10px',
            marginBottom: '10px',
          }}
        >
          <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>
            <ScoreboardIcon />
            Your score:
            <small className={textBumpStyle}>{score}</small>
          </Typography>
        </Box>
        <div className={styles.wrapper}>
          <SnakeBody snakeBody={snakeShape} />
          <FoodLocation foodPoint={foodPoint} />
          {!closeBtn && (
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Button
                onClick={startGame}
                color='success'
                variant='contained'
                sx={{
                  background: '#dd2c00',
                  color: '#fff',
                }}
              >
                Start Game <SportsEsportsIcon />
              </Button>
            </Box>
          )}
          {isGameOver && (
            <div>
              <img src={SnakeGIF} alt='snake' />
            </div>
          )}
          <ToastContainer />
        </div>
      </Board>
    </div>
  );
};
export default App;
