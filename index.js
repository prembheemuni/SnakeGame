document.addEventListener("DOMContentLoaded", () => {
  const arenaSize = 600;
  const cellSize = 20;
  let dx = cellSize;
  let dy = 0;
  let food = { x: 120, y: 60 };
  let intervalID;
  let snake = [
    { x: 60, y: 60 },
    { x: 40, y: 60 },
    { x: 20, y: 60 },
  ];
  let score = 0;
  let gameSpeed = 300;

  const gameArena = document.getElementById("gameArena");
  const scoreBoard = document.getElementById("scoreBoard");

  function createSingleBlock(classNames, positionObj) {
    const divElement = document.createElement("div");
    divElement.classList.add(classNames);
    divElement.style.position = "absolute";
    divElement.style.top = `${positionObj.y}px`;
    divElement.style.left = `${positionObj.x}px`;
    return divElement;
  }

  function drawSnakeAndFood() {
    gameArena.innerHTML = "";

    const foodDiv = createSingleBlock("food", food);
    gameArena.appendChild(foodDiv);
   
    snake.forEach((each, i) => {
        let snakeBlock;
        if (i === 0) {
          snakeBlock = createSingleBlock("snakeHead", each);
        } else if (i === snake.length - 1) {
          snakeBlock = createSingleBlock("snakeTail", each);
        } else {
          snakeBlock = createSingleBlock("snakeBlock", each);
        }
        gameArena.appendChild(snakeBlock);
      });
  }

  function moveFood() {
    const newX = Math.floor(Math.random() * 30) * cellSize;
    const newY = Math.floor(Math.random() * 30) * cellSize;
    food = { x: newX, y: newY };
    const isFoodIsOnSnake = snake.findIndex(
      (e) => e.x === food.x && e.y === food.y
    );
    if (isFoodIsOnSnake !== -1) {
      moveFood();
    }
  }

  function updateScoreAndIncreaseSpeed() {
    score++;
    scoreBoard.textContent = `Score: ${score}`;
    if (gameSpeed > 50) {
        // clearing interval and starting a new interval
        intervalID && clearInterval(intervalID)
        gameSpeed -= 50;
        gameLoop();
    }
  }

  function updateSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    isGameOver();
    if (head.x === food.x && head.y === food.y) {
      moveFood();
      updateScoreAndIncreaseSpeed();
    } else {
      snake.pop();
    }
  }

  function isGameOver() {
    const head = { x: snake[0].x, y: snake[0].y };
    if (
      head.x === arenaSize ||
      head.y === arenaSize ||
      head.x === -20 ||
      head.y === -20
    ) {
      intervalID && clearInterval(intervalID);
      alert("Game over");
      resetGame()
    }

    const snakeAfterHeadRemoved = snake.slice(1);
    const isSnakeBittenItself = snakeAfterHeadRemoved.findIndex(
      (e) => e.x === head.x && e.y === head.y
    );
    if (isSnakeBittenItself !== -1) {
      intervalID && clearInterval(intervalID);
      alert("Game over");
      resetGame()
    }
  }

  function gameLoop() {
    intervalID = setInterval(() => {
      updateSnake();
      drawSnakeAndFood();
    }, gameSpeed);
  }

  function startGame() {
    document.addEventListener("keydown", (e) => {
      const keyPressed = e.key;
      const isSnakeMovingUp = dy < 0;
      const isSnakeMovingDown = dy > 0;
      const isSnakeMvingRight = dx > 0;
      const isSnakeMovingLeft = dx < 0;
      if (keyPressed === "ArrowDown" && !isSnakeMovingUp) {
        dx = 0;
        dy = cellSize;
      }
      if (keyPressed === "ArrowUp" && !isSnakeMovingDown) {
        dx = 0;
        dy = -cellSize;
      }
      if (keyPressed === "ArrowLeft" && !isSnakeMvingRight) {
        dx = -cellSize;
        dy = 0;
      }
      if (keyPressed === "ArrowRight" && !isSnakeMovingLeft) {
        dx = cellSize;
        dy = 0;
      }
    });
    scoreBoard.textContent = `Score: ${score}`;
    gameLoop();
  }

  function resetGame() {
    intervalID && clearInterval(intervalID)
    location.reload();
  }

  document.getElementById("startButton").addEventListener("click", () => {
    startGame();
  });

  document.getElementById("resetGame").addEventListener("click", () => {
    resetGame();
  });

});
