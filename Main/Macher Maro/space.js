let titlesize = 32;
let row = 16;
let col = 16;

let board;
let boardwidth = titlesize * col;  //32*16
let boardheight = titlesize * row;   //32*16
let context;


//ship
let shipWidth = titlesize * 2;
let shipHeight = titlesize;
let shipX = titlesize * col / 2 - titlesize;
let shipY = titlesize * row - titlesize * 2;
let shipImg;

let ship = {
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}

let shipVelocity = titlesize;  // for the movement of the ship


//allines
let alineArray = [];
let alineWidth = titlesize * 2;
let alineHight = titlesize;
let alineX = titlesize;
let allineY = titlesize;

let alineImg;
let alineImgP = "pink";
let alineImgW = "white";
let alineImgY = "yellow";
let alinevelocityX = 1;
let alinevelocityY = 5;

let alineRow = 2;
let alineCol = 3;
let alinect = 0;//aline ct

let alineimage = ["yellow", "cyan", "magenta", "white"]


//bullets
let bulletarray = [];
let bulletvelocityY = -10; // as moving up 

// let flag=0;

let score = 0;
let gameover = false;

let button=document.getElementById("button");
button.addEventListener("click", function() {
    // Reload the window
    location.reload();
  });

  window.onload=function () {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");

    // context.fillStyle="green";
    // context.fillRect(ship.x, ship.y, ship.width, ship.height);
    // draw ship
    shipImg = new Image();
    shipImg.src = "images/ship.png";
    shipImg.onload = function () {
        context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);
    }

    //draw aline
    alineImg = new Image();
    let images = alineimage[Math.floor(Math.random() * 4)];

    alineImg.src = `images/alien-${images}.png`;

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveship);
    document.addEventListener("keyup", shoot);
    createaline();
}

function update() {

    if (gameover) {
        return;
    }



    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height); // to clear the ships that are made continuslty

    //ship
    context.drawImage(shipImg, ship.x, ship.y, ship.width, ship.height);

    //aline
    for (let i = 0; i < alineArray.length; i++) {

        let aline = alineArray[i];
        if (aline.alive) {
            aline.x += alinevelocityX

            //if touches boarder
            if (aline.x + aline.width >= boardwidth || aline.x <= 0) {
                alinevelocityX *= -1;
                aline.x += alinevelocityX * 2

                //move all aine down
                for (let j = 0; j < alineArray.length; j++) {
                    alineArray[j].y += alineHight;
                }
            }

            //to change the color of alines i have done thiss

            alineImg = new Image();
            let images = alineimage[Math.floor(Math.random() * 4)];

            alineImg.src = `images/alien-${images}.png`;

            context.drawImage(alineImg, aline.x, aline.y, aline.width, aline.height);

            if (aline.y >= ship.y) {
                gameover = true;
                context.fillStyle = "red";
                context.font = "bolder 70px courier";
                context.fillText("WASTED", 130, 260);
                var audio=document.getElementById("aud")
                audio.src="images/moye-moye.mp3";
            }
        }
    }


    //bullets
    for (let i = 0; i < bulletarray.length; i++) {
        let bullet = bulletarray[i];
        bullet.y += bulletvelocityY;
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);

        // bullet collision
        for (let j = 0; j < alineArray.length; j++) {
            let aline = alineArray[j];
            if (!bullet.used && aline.alive && detectcollision(bullet, aline)) {
                bullet.used = true;
                aline.alive = false;
                alinect--;
                score++;
            }
        }
    }

    //clear bullet
    while (bulletarray.length > 0 && (bulletarray[0].used || bulletarray[0].y < 0)) {
        bulletarray.shift();  //remove bullets
    }

    if (alinect == 0) {
        //inrases aline ct by 1 more
        alineCol = Math.min(alineCol + 1, col / 2 - 2);  // capat 16/2 =6
        alineRow = Math.min(alineRow + 1, row - 4);   // cap at 16-4=12
        alinevelocityX += 0.2
        alineArray = [];
        bulletarray = [];
        createaline();
    }


    //score
    context.fillStyle = "white";
    context.font = "25px courier";
    context.fillText(score, 5, 20)
}

//movement
function moveship(e) {

    if (gameover) {
        return;
    }

    if (e.code == "ArrowRight" || e.code == "KeyD" && ship.x + shipVelocity + ship.width <= boardwidth) {
        ship.x += shipVelocity; //move right
    }

    else if (e.code == "ArrowLeft" || e.code == "KeyA"  && ship.x - shipVelocity >= 0) {
        ship.x -= shipVelocity;  //move left
    }
}

// funciton for crateing aline
function createaline() {


    for (let c = 0; c < alineCol; c++) {
        for (let r = 0; r < alineRow; r++) {
            let aline = {
                img: alineImg,
                x: alineX + c * alineWidth,
                y: allineY + r * alineHight,
                width: alineWidth,
                height: alineHight,
                alive: true
            }
            alineArray.push(aline);
        }
    }

    alinect = alineArray.length;
}

function shoot(e) {

    if (gameover) {
        return;
    }

    if (e.code == "Space") {
        //shoot
        let bullet = {
            x: ship.x + ship.width * 15 / 32,
            y: ship.y,
            width: titlesize / 8,
            height: titlesize / 2,
            used: false
        }
        bulletarray.push(bullet);
    }
}

function detectcollision(a, b) {
    return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;
}