let mycanvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let snakeSize = 10; 
let w = 350;
let h = 350;
let score = 0;
let highScore = 0;
const highScoreStatement = document.querySelector (".highscore")
let snake;
let food;