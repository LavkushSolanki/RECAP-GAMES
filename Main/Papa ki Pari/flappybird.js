// board

let board;
let boardwidth = 360;
let boardheight = 640;
let context;

//bird
let birdwidth = 34;   // actual size of bird is 408/228 = 17/12 thats why we come up with this numbers
let birdheight = 24;
let birdx = boardwidth / 8;
let birdy = boardheight / 2;

let bird = {
    x: birdx,
    y: birdy,
    width: birdwidth,
    height: birdheight
}

//pipes
let pipeArray = [];
let pipewidth = 64; // width/height ration of real image is 384/3072=1/8
let pipeheight = 512;
let pipex = boardwidth;
let pipey = 0;

let toppipeimg;
let bottompipeimg;

//physics
let velocityx = -2;// pipe moving left speed
let velocityY = 0; //bird jump speed
let gravity = 0.4;

let gameover=false;
let score=0;
let highscore=0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth
    context = board.getContext("2d"); // used for drawing on board

    // draw bird
    // context.fillStyle="green";
    // context.fillRect(bird.x,bird.y,bird.width,bird.height);

    //load image
    birdImg = new Image();
    birdImg.src = "images/flappybird.png";
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    toppipeimg = new Image();
    toppipeimg.src = "images/toppipe.png";

    bottompipeimg = new Image();
    bottompipeimg.src = "images/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placepipe, 1500);

    document.addEventListener("keydown", movebird);
}

// use to upade our canvas frame
function update() {
    requestAnimationFrame(update);

    if(gameover)
    {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    // bird
    velocityY += gravity;
    // bird.y+=velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //limit the bird to move out of the screen
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    if(bird.y> boardheight || bird.y<0) 
    {
        gameover=true;
    }

    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityx;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if(!pipe.passed && bird.x > pipe.x + pipe.width)
        {
            score+=0.5; // 0.5 beacuse there are 2 set of pipes so 0.5*2 = 1 for each pipes
            pipe.passed=true;
        }

        if(detectCollision(bird,pipe))
        {
            gameover=true;
        }
    }

    // clear pipes
    while(pipeArray.length>0 && pipeArray[0].x < -pipewidth)
    {
        pipeArray.shift(); // remove the first element from the array
    }

    //score
    context.fillStyle="white";
    context.font="20px sans-serif";
    context.fillText("SCORE",5,25);
    context.font="45px sans-serif";
    context.fillText(score,5,70);
    //highest score
    context.fillStyle="blue";
    context.font="20px sans-serif";
    context.fillText("YOUR'S BEST",100,25);
    context.font="45px sans-serif";
    context.fillText(highscore,100,70);

    if(gameover)
    {
        highscore=Math.max(highscore,score);
        context.fillStyle="red";
        context.font="45px sans-serif";
        context.fillText("GAME OVER",40,320)
    }
}

function placepipe() {

    if(gameover)
    {
        return;
    }

    let randompipey = pipey - pipeheight / 4 - Math.random() * (pipeheight / 2);
    let gap = boardheight / 4;
    let toppipe = {
        img: toppipeimg,
        x: pipex,
        y: randompipey,
        width: pipewidth,
        height: pipeheight,
        passed: false
    }
    let bottompipe = {
        img: bottompipeimg,
        x: pipex,
        y: randompipey + pipeheight + gap,
        width: pipewidth,
        height: pipeheight,
        passed: false
    }

    pipeArray.push(toppipe);
    pipeArray.push(bottompipe);
}


function movebird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //jump
        velocityY = -6;
    }

    if(gameover)
    {
        bird.y=birdy;
        pipeArray=[];
        score=0;
        gameover=false;
        var audio=document.getElementById("aud")
        audio.src="images/WhatsApp Audio 2024-02-24 at 12.56.13_6b059321.mp3";

    }
}


function detectCollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}