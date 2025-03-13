### Flow

- Create Html, css, js and connect
- Crate and empty div with game arena
- write an global event DomContentLoaded and start writing js
- Initialize the required varibles such as food obj and snake array score, cellSize, arena size, each px is 1 unit
- dx,dy are distance that snake moves
- startGame will Add an event listner for keydown and starts the gameloop
- gameloop will create an time interval with game speed and inside updateSnake and drawSnakeAndFood Functions will be called.  
- inside update snake we will take the values of dx and dy will create a new head and will place on the front. we will check for game over condition(involves wall touching and self biting). we also check that head will equal to our food cordniate. if matches then we need to call movefood function and scoreUpdateIncreaseSpeed function. if there is no food we pop the tail. drawSnakeAndFood function first it emptys the gameArena and renders snake and food.
- moveFood function generates new random cords. the total units are gameArena / cellSize (600/20 = 30), so Math.Random() * 30 gives values within 0 to 30. we floor it and then multpily with cellsize to get new random cordniate and we do the same for y.
we need check whether newCords of food will be on the snake, if true call the makeFood again to get new cords. 
- scoreUpdateAndIncrease speed function updates score and increases speed (to reflect in ui, clearInverval and startGameLoop)
- there will be start button and reset button .
- drawSnakeAndFood will use a common function which creates div by taking classname and position.

