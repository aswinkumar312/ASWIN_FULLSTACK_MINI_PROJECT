const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const gridSize = 20; // Size of each cell
const canvasSize = 400; // Canvas dimensions
let snake = [{ x: 200, y: 200 }]; // Initial snake position
let direction = { x: 0, y: 0 }; // Snake's movement direction
let food = spawnFood(); // Random food position
let score = 0;

// Prevent scrolling behavior for arrow keys
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();  // This prevents the default action (scrolling) for arrow keys
  }
});

// Handle keyboard input
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === "ArrowUp" && direction.y === 0) direction = { x: 0, y: -gridSize };
  if (key === "ArrowDown" && direction.y === 0) direction = { x: 0, y: gridSize };
  if (key === "ArrowLeft" && direction.x === 0) direction = { x: -gridSize, y: 0 };
  if (key === "ArrowRight" && direction.x === 0) direction = { x: gridSize, y: 0 };
});

// Game loop
function gameLoop() {
  // Move snake
  const head = {
    x: (snake[0].x + direction.x + canvasSize) % canvasSize,
    y: (snake[0].y + direction.y + canvasSize) % canvasSize,
  };
  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = spawnFood();
  } else {
    snake.pop(); // Remove last segment if no food eaten
  }

  // Check collision with itself only
  if (snakeCollision(head)) {
    alert(`Game Over! Your score: ${score}`);
    resetGame();
    return;
  }

  // Draw everything
  drawGame();
  setTimeout(gameLoop, 100); // Control speed
}

// Draw the game
function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw snake with spacing
  ctx.fillStyle = "green";
  const spacing = 2; // Space between snake segments
  snake.forEach((segment, index) => {
    ctx.fillRect(
      segment.x + spacing / 2,
      segment.y + spacing / 2,
      gridSize - spacing,
      gridSize - spacing
    );
  });

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Spawn food in a random position
function spawnFood() {
  const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  return { x, y };
}

// Check if snake collides with itself
function snakeCollision(head) {
  return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
}

// Reset the game
function resetGame() {
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  food = spawnFood();
  
  score = 0;
}

// Start the game
gameLoop();
  