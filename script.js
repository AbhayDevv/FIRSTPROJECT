const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;
let changingDirection = false;
let dx = box;
let dy = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;

  const goingUp = dy === -box;
  const goingDown = dy === box;
  const goingRight = dx === box;
  const goingLeft = dx === -box;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -box;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -box;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = box;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = box;
  }
}

function collisionDetection(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.forEach(drawSnakePart);

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  const snakeX = snake[0].x;
  const snakeY = snake[0].y;

  const newHead = { x: snakeX + dx, y: snakeY + dy };

  if (collisionDetection(newHead, snake) || snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
    clearInterval(game);
    alert("Game Over! Your score is: " + score);
    location.reload();
  }

  snake.unshift(newHead);

  if (snakeX === food.x && snakeY === food.y) {
    score += 10;
    document.getElementById("score").innerHTML = "Score: " + score;
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
  } else {
    snake.pop();
  }

  changingDirection = false;
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = "green";
  ctx.fillRect(snakePart.x, snakePart.y, box, box);
}

let game = setInterval(draw, 100);
