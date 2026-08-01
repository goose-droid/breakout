//constants from html
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//ball starting position
let x = canvas.width / 2;
let y = canvas.height - 30;

//change in x and change in y
//how much we want ball to move on every draw()
var dx = 2;
var dy = -2;

//define radius of ball to help with calculations
const ballRadius = 10;

//define paddle information
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

//define default/starting ball color
let ballColor = "#0095DD";

//brick definitions
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

//create array of bricks
const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

//variables to keep track of keyboard presses
let rightPressed = false;
let leftPressed = false;

//Event listeners for keypresses
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

//variable to control if draw() continues to loop
let interval = 0;

//score variable
let score = 0;

//keypress functions
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

//function to toggle ball color
function toggleBallColor() {
    if (ballColor === "#0095DD") {
        ballColor= "#00dd4a";
    } else {
        ballColor = "#0095DD";
    }
}
        
//function to draw the ball
function drawBall() {
    ctx.beginPath();
    //(position x, position y, radius, 
    // starting angle (radians), ending angle (radians))
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

//function to draw paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//function to draw bricks
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//detect collision of ball on bricks
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1 ){
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("Vous avez gagné, félicitations !");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
            
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}


//main function that will draw every 10 ms
function draw() {
    //clear canvas
    //(coordinates of top left, coordinates of bottom right)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw bricks
    drawBricks();

    //draw ball
    drawBall();

    //draw paddle
    drawPaddle();

    drawScore();

    collisionDetection();

    //change direction when ball hits the walls
    //remember y is backwards (top to bottom)
    //ballRadius is used so that the collision is on the circumference
    //and not the center of the ball
    if (y + dy < ballRadius) {
        dy = -dy;
        toggleBallColor();
    } else if (y + dy > canvas.height - ballRadius) {
        //check if hits paddle
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            toggleBallColor();
        } else {
            alert("Perdu !");
            document.location.reload();
            clearInterval(interval); // necessary for Chrome to end the game
        }
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius ) {
        dx = -dx;
        toggleBallColor();
    }
    
    //change ball position using dx and dy
    x += dx;
    y += dy;

    //check for keyboard keys for moving the paddle
    if (rightPressed) {
        paddleX += 7;
        //check if hit edge of screen
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

//call draw() every 20 ms
interval = setInterval(draw, 10);