
/* =========================================================
   MINI GAMES MODULE – The American Trail
   Retro Oregon Trail Theme – No Sound Mode
========================================================= */

const miniModal = document.getElementById("miniGameModal");
const miniBox = document.getElementById("miniGameContent");
const miniTitle = document.getElementById("miniGameTitle");
const closeMini = document.getElementById("closeMiniGame");

/* OPEN / CLOSE */
function openMiniGame(){ miniModal.classList.remove("hidden"); }
function closeMiniGame(){ miniModal.classList.add("hidden"); miniBox.innerHTML=""; }
closeMini.onclick = closeMiniGame;

/* =========================================================
   MINI GAME 1: SUPPLY CHAIN SHUFFLE
========================================================= */

function playSupplyChainShuffle(){
    miniTitle.innerText="Supply Chain Shuffle";
    const goodIndex=Math.floor(Math.random()*3);

    miniBox.innerHTML=`
        <p>One supplier is reliable. Two will cause delays.</p>
        <div class="mini-grid">
            <button class="btn retro-btn" onclick="supplyPick(0)">Supplier A</button>
            <button class="btn retro-btn" onclick="supplyPick(1)">Supplier B</button>
            <button class="btn retro-btn" onclick="supplyPick(2)">Supplier C</button>
        </div>
    `;
    openMiniGame();

    window.supplyPick=function(choice){
        if(choice===goodIndex){
            game.inventory+=10;
            game.sentiment+=3;
            miniBox.innerHTML="<p><b>You picked the reliable supplier!</b><br>Inventory +10, Sentiment +3</p>";
        } else {
            game.inventory-=8;
            miniBox.innerHTML="<p><b>Bad supplier!</b><br>Inventory -8</p>";
        }
        updateStats();
    };
}

/* =========================================================
   MINI GAME 2: LOBBYING GAMBLE
========================================================= */

function playLobbyingGamble(){
    miniTitle.innerText="Lobbying Gamble";
    miniBox.innerHTML=`
        <p>You attempt to persuade Congress. Will it work?</p>
        <button class="btn retro-btn" onclick="lobbyResult()">Lobby</button>
    `;
    openMiniGame();

    window.lobbyResult=function(){
        if(Math.random()<0.5){
            game.regulation-=10;
            game.factions.business+=5;
            miniBox.innerHTML="<p><b>Success!</b><br>Regulation -10, Business +5</p>";
        } else {
            game.regulation+=8;
            miniBox.innerHTML="<p><b>Failure!</b><br>Regulation +8</p>";
        }
        updateStats();
    };
}

/* =========================================================
   MINI GAME 3: POLITICAL FORECAST
========================================================= */

function playPoliticalForecast(){
    miniTitle.innerText="Political Forecast";
    const actual = Math.random()<0.5 ? "positive" : "negative";

    miniBox.innerHTML=`
        <p>Predict the national political climate this week:</p>
        <div class="mini-grid">
            <button class="btn retro-btn" onclick="forecastGuess('positive')">Positive</button>
            <button class="btn retro-btn" onclick="forecastGuess('negative')">Negative</button>
        </div>
    `;
    openMiniGame();

    window.forecastGuess=function(guess){
        if(guess===actual){
            miniBox.innerHTML="<p><b>You predicted correctly!</b><br>Sentiment +8</p>";
            game.sentiment+=8;
        } else {
            miniBox.innerHTML="<p><b>Wrong prediction.</b><br>Cash -200</p>";
            game.cash-=200;
        }
        updateStats();
    };
}

/* =========================================================
   RANDOM MINI GAME TRIGGER
========================================================= */

function triggerMiniGame(){
    const roll=Math.random();
    if(roll<0.2) return playSupplyChainShuffle();
    if(roll<0.35) return playLobbyingGamble();
    if(roll<0.5) return playPoliticalForecast();
}
