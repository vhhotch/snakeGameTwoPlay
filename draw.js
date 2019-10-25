class FoodPizza {
    constructor () {
        this.name = pizza;
        this.borderColor = "yellow";
        this.fillColor= "red";
        this.foodSize = 10
    }
    
    pizza (x, y) {
        // This is the border of the pizza
        ctx.fillStyle = this.color;
        ctx.fillRect(x*this.foodSize, y*this.foodSize, this.foodSize, this.foodSize);
        // This is the single square 
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(x*this.foodSize+1, y*this.foodSize+1, this.foodSize-2, this.foodSize-2);
    }
}

class Snake {
    constructor (name, color){
        this.name = name;
        this.length = 4;
        this.snakeBody = [];
        this.color = color; 
        this.snakeSize = 10;
        this.score = 0;
    }
    bodySnake (x,y){
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        // This is the border of the square
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    }

    drawSnake () {
        // Initially the body of the snake will be formed by 5 squares.
        for (var i = this.length; i>=0; i--) {
            this.snakeBody.push({x:i, y:0});
        }
    }

    
    //not sure how to link this properly with app.js
    directSnake () {
        if (direction == 'right') {
            snakeX++;
        } else if (direction == 'left') {
            snakeX--;
        } else if (direction == 'up') {
            snakeY--;
        } else if (direction == 'down') {
            snakeY++;
        }
    }

}

class Game {

    //within game we have two snakes playing at any one time. 
    //the two snakes are created using the snake class, and passed into the game class as an array. There will be 2 snakes. this.snakes[0] this.snakes[1]
    constructor (snakes, food) {
        this.snakes = snakes;
        this.food = food;
    }


    start () {

    }


    scoreText () {
        // How many pizzas did the snake eat
        var score_text = "Score: " + this.snakes.score;
        ctx.fillStyle = 'blue';
        ctx.fillText(score_text, 145, h-5);
    }
}

// Module pattern
var drawModule = (function () { 
    // var bodySnake = function(x, y) {
    //     // This is the single square
    //     ctx.fillStyle = 'green';
    //     ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    //     // This is the border of the square
    //     ctx.strokeStyle = 'darkgreen';
    //     ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    // }

    // var pizza = function(x, y) {
    //     // This is the border of the pizza
    //     ctx.fillStyle = 'yellow';
    //     ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    //     // This is the single square 
    //     ctx.fillStyle = 'red';
    //     ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
    // }

    // var scoreText = function() {
    //     // How many pizzas did the snake eat
    //     var score_text = "Score: " + score;
    //     ctx.fillStyle = 'blue';
    //     ctx.fillText(score_text, 145, h-5);
    // }

    // var drawSnake = function() {
    //     // Initially the body of the snake will be formed by 5 squares.
    //     var length = 4;
    //     snake = [];
        
    //     // Using a for loop we push the 5 elements inside the array(squares).
    //     // Every element will have x = 0 and the y will take the value of the index.
    //     for (var i = length; i>=0; i--) {
    //         snake.push({x:i, y:0});
    //     }  
    // }
    var foodCheck = function () {//Look at the position of the snake's body.
        for (var i=0; i<snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
            if (food.x===snakeX || food.y === snakeY || food.y === snakeY && food.x===snakeX) {
                food.x = Math.floor((Math.random() * 10) + 1);
                food.y = Math.floor((Math.random() * 10) + 1);
                foodCheck()
            }
        }
    }  
    var createFood = function() {
        food = {
          //Generate random numbers.
          x: Math.floor((Math.random() * 10) + 1),
          y: Math.floor((Math.random() * 10) + 1)
      } 
      foodCheck();
    }
      
  var checkCollision = function(x, y, array) {
    for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
    } 
    return false;
    }

var paint = function () {
    //Let's draw the space in which the snake will move.
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);

    //Give it a border.
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    //Disable the button _start_ while you're playing.
    btn.setAttribute('disabled', true);

    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    /*
    Make the snake move.
    Use a variable ('direction') to control the movement.
    To move the snake, pop out the last element of the array and shift it on the top as first element.
    */
    // if (direction == 'right') {
    //     snakeX++;
    // } else if (direction == 'left') {
    //     snakeX--;
    // } else if (direction == 'up') {
    //     snakeY--;
    // } else if (direction == 'down') {
    //     snakeY++;
    // }

    /*
    If the snake touches the canvas path or itself, it will die!
    Therefore if x or y of an element of the snake, don't fit inside the canvas, the game will be stopped.
    If the check_collision is true, it means the the snake has crashed on its body itself, then the game will be stopped again. 
    */
    if (snakeX == -1 || snakeX == w / snakeSize || snakeY == -1 || snakeY == h / snakeSize || checkCollision(snakeX, snakeY, snake)) {
        //Stop the game.

        //Make the start button enabled again.
        btn.removeAttribute('disabled', true);

        //Clean up the canvas.
        ctx.clearRect(0, 0, w, h);
        gameloop = clearInterval(gameloop);
        return;
    }

    //If the snake eats food it becomes longer and this means that, in this case, you shouldn't pop out the last element of the array.
    if (snakeX == food.x && snakeY == food.y) {
        //Create a new square instead of moving the tail.
        var tail = {
            x: snakeX,
            y: snakeY
        };
        score++;

        //Create new food.
        createFood();
    } else {

        //Pop out the last cell.
        var tail = snake.pop();
        tail.x = snakeX;
        tail.y = snakeY;
    }

    //Puts the tail as the first cell.
    snake.unshift(tail);

    //For each element of the array create a square using the bodySnake function we created before.
   
        
    snake.bodySnake(snake[i].x, snake[i].y);
    

    //Create food using the _pizza_ function.
    FoodPizza.pizza(food.x, food.y);

    //Put the score text.
    scoreText();
}

var init = function () {
    direction = 'down';
    drawSnake();
    createFood();
    gameloop = setInterval(paint, 80);
}

//You need to return only the _init_ function at the end of the Module.
return {
    init: init
};

//Close the Module.    
}());