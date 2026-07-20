// ===============================
// DATA by Aditya 
// ===============================

let currentLevel =
parseInt(localStorage.getItem("currentLevel")) || 1;

let unlockedLevel =
parseInt(localStorage.getItem("unlockedLevel")) || 1;

let coins =
parseInt(localStorage.getItem("coins")) || 200;

let bestTime =
parseInt(localStorage.getItem("bestTime")) || 0;

let lives = 3;

let oddIndex = 0;

let timerSeconds = 0;

let timerInterval;

// ===============================
// ELEMENTS
// ===============================

const currentLevelEl =
document.getElementById("currentLevel");

const coinsEl =
document.getElementById("coins");

const livesEl =
document.getElementById("lives");

const timerEl =
document.getElementById("timer");

const levelTitle =
document.getElementById("levelTitle");

const grid =
document.getElementById("grid");

const rankEl =
document.getElementById("rank");

const highestLevelEl =
document.getElementById("highestLevel");

// ===============================
// RANK
// ===============================

function getRank(level){

    if(level >= 100) return "Legend";

    if(level >= 80) return "Master";

    if(level >= 60) return "Expert";

    if(level >= 40) return "Pro";

    if(level >= 20) return "Skilled";

    return "Beginner";

}

// ===============================
// UPDATE UI
// ===============================

updateUI();

function updateUI(){

    currentLevelEl.innerText =
    currentLevel;

    coinsEl.innerText =
    coins;

    livesEl.innerText =
    lives;

    if(rankEl){

        rankEl.innerText =
        getRank(unlockedLevel);

    }

    if(highestLevelEl){

        highestLevelEl.innerText =
        localStorage.getItem("highestLevel") || 1;

    }

}

// ===============================
// SAVE DATA
// ===============================

function saveData(){

    localStorage.setItem(
        "currentLevel",
        currentLevel
    );

    localStorage.setItem(
        "unlockedLevel",
        unlockedLevel
    );

    localStorage.setItem(
        "coins",
        coins
    );

    localStorage.setItem(
        "bestTime",
        bestTime
    );

    const highest =
    parseInt(
        localStorage.getItem("highestLevel")
    ) || 1;

    if(unlockedLevel > highest){

        localStorage.setItem(
            "highestLevel",
            unlockedLevel
        );

    }

}

// ===============================
// PAGE FUNCTIONS
// ===============================

function hideAll(){

    document
    .querySelectorAll(".page")
    .forEach(page=>{

        page.classList.add("hidden");

    });

}

function goHome(){

    clearInterval(timerInterval);

    hideAll();

    document
    .getElementById("homePage")
    .classList.remove("hidden");

    updateUI();

}

function openShop(){

    hideAll();

    document
    .getElementById("shopPage")
    .classList.remove("hidden");

}

function openContact(){

    window.location.href =
    "contacts.html";

}

function continueGame(){

    hideAll();

    document
    .getElementById("gamePage")
    .classList.remove("hidden");

    startTimer();

    loadLevel(currentLevel);

}

// ===============================
// TIMER
// ===============================

function startTimer(){

    clearInterval(timerInterval);

    timerInterval =
    setInterval(()=>{

        timerSeconds++;

        let min =
        Math.floor(timerSeconds / 60);

        let sec =
        timerSeconds % 60;

        timerEl.innerText =

        String(min).padStart(2,"0")

        +

        ":"

        +

        String(sec).padStart(2,"0");

    },1000);

}

// ===============================
// LEVEL SETTINGS
// ===============================

function getGridSize(level){

    if(level<=10) return 3;

    if(level<=20) return 4;

    if(level<=30) return 5;

    if(level<=40) return 6;

    if(level<=50) return 7;

    if(level<=60) return 8;

    if(level<=79) return 9;

    return 10;

}

function getDifference(level){

    if(level>=95) return 1;

    if(level>=80) return 2;

    if(level>=70) return 4;

    if(level>=60) return 7;

    if(level>=50) return 10;

    if(level>=40) return 15;

    if(level>=30) return 18;

    if(level>=20) return 20;

    if(level>=10) return 25;

    return 40;

}

function randomColor(){

    return{

        r:Math.floor(Math.random()*200)+20,

        g:Math.floor(Math.random()*200)+20,

        b:Math.floor(Math.random()*200)+20

    };

}

// ===============================
// LOAD LEVEL
// ===============================

function loadLevel(level){

    levelTitle.innerText =
    "Level " + level;

    grid.innerHTML = "";

    const size =
    getGridSize(level);

    grid.style.gridTemplateColumns =
    `repeat(${size},1fr)`;

    const total =
    size * size;

    oddIndex =
    Math.floor(Math.random()*total);

    const diff =
    getDifference(level);

    const base =
    randomColor();

    for(let i=0;i<total;i++){

        const box =
        document.createElement("div");

        box.className =
        "box";

        let r = base.r;
        let g = base.g;
        let b = base.b;

        if(i===oddIndex){

            r = Math.min(255,r+diff);
            g = Math.min(255,g+diff);
            b = Math.min(255,b+diff);

        }

        box.style.background =
        `rgb(${r},${g},${b})`;

        if(level>=90){

            box.style.maxWidth="35px";

        }

        else if(level>=80){

            box.style.maxWidth="40px";

        }

        box.onclick =
        ()=>checkBox(i);

        grid.appendChild(box);

    }

}

// ===============================
// CHECK CLICK
// ===============================

function checkBox(index){

    if(index === oddIndex){

        levelCompleted();

    }else{

        wrongClick();

    }

}

// ===============================
// WRONG CLICK
// ===============================

function wrongClick(){

    lives--;

    updateUI();

    if(lives <= 0){

        gameOver();

    }

}

// ===============================
// RESET LEVEL
// ===============================

function getResetLevel(level){

    if(level >= 99) return 80;

    if(level >= 95) return 70;

    if(level >= 90) return 60;

    if(level >= 80) return 50;

    if(level >= 70) return 45;

    if(level >= 60) return 40;

    if(level >= 50) return 30;

    if(level >= 40) return 20;

    if(level >= 30) return 10;

    if(level >= 20) return 5;

    if(level >= 10) return 1;

    return 1;

}

// ===============================
// GAME OVER
// ===============================

function gameOver(){

    clearInterval(timerInterval);

    if(bestTime === 0 || timerSeconds < bestTime){

        bestTime = timerSeconds;

    }

    saveData();

    alert(

        "Game Over!\n\n" +

        "Reached Level : " +

        currentLevel +

        "\nTime : " +

        timerEl.innerText

    );

    const resetLevel =

    getResetLevel(currentLevel);

    currentLevel = resetLevel;

    unlockedLevel = resetLevel;

    lives = 5;

    timerSeconds = 0;

    timerEl.innerText = "00:00";

    saveData();

    updateUI();

    goHome();

}

// ===============================
// LEVEL COMPLETE
// ===============================

function levelCompleted(){

    // Reward Coins
    coins += 0;

    if(currentLevel < 100){

        currentLevel++;

        if(currentLevel > unlockedLevel){

            unlockedLevel = currentLevel;

        }

        saveData();

        updateUI();

        loadLevel(currentLevel);

    }else{

        saveData();

        updateUI();

        showLegend();

    }

}

// ===============================
// HINT COST
// ===============================

function getHintCost(){

    if(currentLevel >= 90)

        return 150;

    if(currentLevel >= 80)

        return 100;

    return 50;

}

// ===============================
// USE HINT
// ===============================

function useHint(){

    const cost = getHintCost();

    if(coins < cost){

        alert("Need " + cost + " coins");

        return;

    }

    coins -= cost;

    saveData();

    updateUI();

    const target =

    grid.children[oddIndex];

    target.style.border =

    "4px solid white";

    target.style.boxShadow =

    "0 0 20px white";

    setTimeout(()=>{

        target.style.border = "none";

        target.style.boxShadow = "none";

    },1200);

}

// ===============================
// TROPHY PAGE
// ===============================

function showLegend(){

    clearInterval(timerInterval);

    hideAll();

    document

    .getElementById("trophyPage")

    .classList.remove("hidden");

}

// ===============================
// LEVEL PAGE
// ===============================

function openLevels(){

    hideAll();

    document
        .getElementById("levelsPage")
        .classList.remove("hidden");

    renderLevels();

}

function renderLevels(){

    const levelGrid =
    document.getElementById("levelGrid");

    levelGrid.innerHTML = "";

    for(let i = 1; i <= 100; i++){

        const btn =
        document.createElement("button");

        btn.innerText = i;

        btn.className = "level-btn";

        if(i <= unlockedLevel){

            btn.classList.add("unlocked");

            btn.onclick = () => {

                currentLevel = i;

                continueGame();

            };

        }else{

            btn.classList.add("locked");

        }

        levelGrid.appendChild(btn);

    }

}

// ===============================
// REDEEM CODES
// ===============================

const redeemCodes = {

    SOMU7: 50,
    ADI7: 20000,
    AS143: 1000

};

function redeemCode(){

    const code =

    document
        .getElementById("redeemInput")
        .value
        .trim()
        .toUpperCase();

    if(localStorage.getItem("used_" + code)){

        alert("Code already used");

        return;

    }

    if(redeemCodes[code]){

        coins += redeemCodes[code];

        localStorage.setItem(
            "used_" + code,
            "true"
        );

        saveData();

        updateUI();

        alert(
            "Added " +
            redeemCodes[code] +
            " coins"
        );

    }else{

        alert("Invalid code");

    }

}

// ===============================
// DAILY REWARD
// ===============================

function claimDailyReward(){

    const today =
    new Date().toDateString();

    const lastClaim =
    localStorage.getItem("lastClaim");

    if(lastClaim === today){

        alert("Reward already claimed today");

        return;

    }

    const reward =

    Math.floor(Math.random()*41) + 10;

    coins += reward;

    localStorage.setItem(
        "lastClaim",
        today
    );

    saveData();

    updateUI();

    alert(
        "You received " +
        reward +
        " coins!"
    );

}

// ===============================
// BUY LIFE
// ===============================

function buyLife(){

    if(coins < 20){

        alert("Need 20 coins");

        return;

    }

    coins -= 20;

    lives++;

    saveData();

    updateUI();

    alert("1 Life Added");

}

// ===============================
// AUTO SAVE
// ===============================

window.addEventListener(

    "beforeunload",

    saveData

);

// ===============================
// INITIAL UI
// ===============================

updateUI();
