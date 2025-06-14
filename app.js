let highScore = localStorage.getItem("highScore") || 0;
let highScoreElement = document.getElementById("high-score");
highScoreElement.innerText = `High Score: ${highScore}`;

let gameseq = [];
let userseq = [];

let btns = ["btn_1","btn_2","btn_3","btn_4"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function() {    
    if(started == false){
        console.log("game is started ");
        started = true;        

        levelup();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    },250);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userseq = [];   
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random()*4);
    let randomColor = btns[randomIdx];
    let randombtn = document.querySelector(`.${randomColor}`); 
    gameseq.push(randomColor);
    console.log(gameseq);
    btnflash(randombtn);
}

function checkAns(index){
    if(userseq[index] === gameseq[index]){
        if(userseq.length == gameseq.length){
            setTimeout(levelup,1000);
    }
} else{
     if (level > highScore) {
        highScore = level;
         localStorage.setItem("highScore", highScore);
        highScoreElement.innerText = `High Score: ${highScore}`;
     }
        h2.innerHTML = `Game Over ! Your Score was <b>${level}</b> </br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "pink";
        },250)
        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("id");
    userseq.push(userColor);
    
    checkAns(userseq.length-1);
}

let allbtns = document.querySelectorAll(".btn")
for (btn of allbtns){
    btn.addEventListener("click",btnpress);
} 

function reset(){
    started = false;
    gameseq = [];
    userseq= [];
    level = 0;
}