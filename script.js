//constants from html
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//ball starting position
let x = canvas.width / 2;
let y = canvas.height - 30;

//change in x and change in y
//how much we want ball to move on every draw()
var dx = -2;
var dy = -1;

//function to draw the ball
function drawBall() {
    ctx.beginPath();
    //(position x, position y, radius, 
    // starting angle (radians), ending angle (radians))
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
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

    //change ball position using dx and dy
    x += dx;
    y += dy;
}

//call draw() every 20 ms
setInterval(draw, 10);