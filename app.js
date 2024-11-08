let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "blue", "green"];
let heighlevel = 0;
let started = false;
let level = 0; 

let levelHeading = document.querySelector('h2');
let button = document.querySelector('button');


button.addEventListener("click", () => {
    console.dir(button);
    if(!started) {
        started = true;
        button.style.display = "none";
        levelUp();
    }
    
});

function flashBtn(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}


function levelUp() {
    userSeq = [];
    level++;
    heighlevel = Math.max(level, heighlevel);
    levelHeading.innerText = `Your Score ${level}`;

    // Chose rendom button 
    let random = Math.floor(Math.random() * 4);
    let randomColor = btns[random];
    let randombtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    flashBtn(randombtn); 
}

function checkColour(idx) {
    // console.log(`Current level : ${level}`);
    
    if(userSeq[idx] === gameSeq[idx]) {
        console.log("Same Value");
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 700);
        }
    } else {
        if(heighlevel <= level) {
            levelHeading.innerHTML = `Game Over!! <br> Your Score : <b> ${level} </b> 
            Heigh Score Breaked : ${heighlevel} `;
            heighlevel = level;

        } else { 
            levelHeading.innerHTML = `Game Over!! Your Score : <b> ${level} </b> <br>`;
            
        }

        button.style.display = "inline-block";
        button.innerText = "Re-Start";
        

        document.querySelector("body").style.backgroundColor = 'red';
        setInterval(()=>{
            document.querySelector("body").style.backgroundColor = 'white';
        }, 1500);
        document.querySelector("body").style.backgroundColor = 'red';

        started = false;
        level = 0;
        gameSeq = [];
    }
}

function btnPress() {
    let btn = this;
    flashBtn(btn);
    userColour = btn.getAttribute("id");
    console.log(userColour);
    userSeq.push(userColour);
    checkColour(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}