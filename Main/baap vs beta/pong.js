// board 
let board;
let boardwidth = 500;
let boardheight = 500;
let context;

let winner;


//players
let playerH = 50;
let playerW = 10;
let playerVelocityY = 0;

let player1 = {
    x: 10,
    y: boardheight / 2,
    width: playerW,
    height: playerH,
    velocityY: 0
}
let player2 = {
    x: 480,
    y: boardheight / 2,
    width: playerW,
    height: playerH,
    velocityY: 0
}


//ball
let ballH = 10;
let ballW = 10;
let ball = {
    x: boardwidth / 2,
    y: boardheight / 2,
    width: ballW,
    height: ballH,
    veclocityX: 1,
    veclocityY: 2
}

//player scores
let player1score = 0;
let player2score = 0;

//game over
let gameover = false;

let direction = 1;

let y;

let button=document.getElementById("button");
button.addEventListener("click", function() {
    // Reload the window
    location.reload();
  });




window.onload = function () {
    board = document.getElementById("board");

    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d"); // used for drawing on board

    //draw intital player1
    context.fillStyle = "palevioletred";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //draw intial player2
    context.fillStyle = "skyblue";
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);

}

function update() {

    if (gameover) return;

    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    //draw intital player1
    context.fillStyle = "palevioletred";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    //draw intial player2
    context.fillStyle = "skyblue";
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    context.fillRect(player2.x, player2.y, player2.width, player2.height);


    //ball
    context.fillStyle = "white";
    ball.x += ball.veclocityX;
    ball.y += ball.veclocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if (ball.y <= 0 || (ball.y + ball.height >= boardheight)) {

        ball.veclocityY *= -1;
    }

    //bouce ball
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) {
            //left side of ball touch right side of player 1
            ball.veclocityX *= -1;
        }
    }

    else if (detectCollision(ball, player2)) {
        if (ball.x + ball.width >= player2.x) {
            //right side of ball touch left side of player 2
            ball.veclocityX *= -1;
        }
    }


    //gameover
    if (ball.x < 0) {
        player2score++;
        if (player2score > 5) {
            context.font = "bold 30px sans-serif"
            context.fillText("BAAP is Player2", 140, 270)
            gameover = true;
        }
        else {
            // y=y+0.25;
            resetGame(1,2);
            
        }
    }
    else if (ball.x + ballW > boardwidth) {
        player1score++;
        if (player1score > 5) {
            context.font = "bold 30px sans-serif"
            context.fillText("BAAP is Player1", 140, 270)
            gameover = true
        } 
        else {
            // y=y+0.25;
            resetGame(-1,2);
        }
    }

    //player 1
    context.font = "20px sans-serif";
    context.fillText("PLAYER 1", 12,30)
    context.fillText("PLAYER 2", 400,30)

    //score
    context.font = "45px sans-serif";
    context.fillText(player1score, 125, 45)
    context.fillText(player2score, boardwidth * 4 / 5 - 45, 45);


    for (let i = 10; i < board.height; i += 25) {
        // i= kahh se apne kko banan heyy rect
        // x= board ka bich se ek dam aur 10 minus kyuki player ka width ke liyee
        // y= joh ki 25 25 pix chod ke gap dega apne ko
        // width and height of square == 5
        context.fillRect(board.width / 2 - 10, i, 5, 5);
    }
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerH > boardheight)
}


function movePlayer(e) {

    if (gameover) return;

    //player 1
    if (e.code == "KeyW") {
        player1.velocityY = -3;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 3;
    }


    //player 2
    if (e.code == "ArrowUp") {
        player2.velocityY = -3;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 3;
    }

}


function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}

function resetGame(direction,Y) {

    if (gameover) return;


    ball = {
        x: boardwidth / 2,
        y: boardheight / 2,
        width: ballW,
        height: ballH,
        veclocityX: direction,
        veclocityY: Y
    }
}