let currMoletile;
let currPlanttile;
let gameover=false;
let score=0;
let highscore=0;


window.onload=function()
{
    setGame();
}

// get the button and add a event of click
let start=document.getElementById("button");
start.addEventListener("click",startagain);

// function for restarting the game
function startagain()
{

    let heading=document.getElementById("h1")
    heading.innerText="HIT WITH SILAJIT";
    heading.style.color="black"
    var audio=document.getElementById("aud")
    audio.src="images/128-Abrars Entry Jamal Kudu - Animal 128 Kbps.mp3"
    score=0;
    let scores=document.getElementById("score");
    scores.innerText=0;
    gameover=false;
}



function setGame()
{
        for(let i=0;i<9;i++)
        {
            let tile=document.createElement("div");
            tile.id=i.toString();
            tile.addEventListener("click",selecttile);
            document.getElementById("board").appendChild(tile);
            setInterval(setMole,1000);
            setInterval(setPlant,2000);
        }

}

function getRandomTile()
{
    let num=Math.floor(9*Math.random());
    return num.toString();
}

function setMole()
{

    if(gameover) return;

    if(currMoletile)
    {
        currMoletile.innerHTML="";
    }

    let moli=document.createElement("img");
    moli.src="./images/monty-mole.png";
    let num=  getRandomTile();

    if(currPlanttile && currPlanttile.id==num)
    {
        return;
    }

    currMoletile=document.getElementById(num);
    currMoletile.appendChild(moli);
}

function setPlant()
{

    if(gameover) return;

    if(currPlanttile)
    {
        currPlanttile.innerHTML="";
    }

    let plant=document.createElement("img");
    plant.src="./images/piranha-plant.png";
    let num=getRandomTile();

    if(currMoletile && currMoletile.id==num)
    {
        return;
    }

    currPlanttile=document.getElementById(num);
    currPlanttile.appendChild(plant);
}

function selecttile()
{

    if(gameover) return;

    if(this == currMoletile)
    {
        score+=10;
        document.getElementById("score").innerText=score.toString();
    }
    else if(this == currPlanttile)
    {
        var audio=document.getElementById("aud")
        audio.src="images/moye-moye.mp3";

        let heading=document.getElementById("h1")
        heading.innerText="YOU LOSE";
        heading.style.color="red";


        let scores=document.getElementById("score");
        let highest=document.getElementById("highscore");
        scores.innerText=" "+score;
        if(score>highest.innerText)
        {
            highest.innerText=score;
        }
        gameover=true;
    }
}