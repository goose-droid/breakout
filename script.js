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


let ballColor = "#0095DD";

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


//main function that will draw every 10 ms
function draw() {
    //clear canvas
    //(coordinates of top left, coordinates of bottom right)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw ball
    drawBall();

    //change direction when ball hits the walls
    //remember y is backwards (top to bottom)
    //ballRadius is used so that the collision is on the circumference
    //and not the center of the ball
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
        toggleBallColor();
    }
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius ) {
        dx = -dx;
        toggleBallColor();
    }

    //change ball position using dx and dy
    x += dx;
    y += dy;
}

//call draw() every 20 ms
setInterval(draw, 10);