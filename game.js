/* =========================================================
   THE AMERICAN TRAIL – ADVANCED GAME ENGINE (Fixed Ending)
========================================================= */

let game = {
    day: 1,
    cash: 5000,
    inventory: 100,
    sentiment: 50,
    regulation: 20,
    factions: { business: 50, regulator: 50, consumer: 50 },
    position: 0,
    maxPos: 4, // 0–4 = 5 total stops
    ended: false
};

/* =========================================================
   MAP NODES
========================================================= */
const mapNodes = [
    { x: 50, y: 200 },
    { x: 250, y: 160 },
    { x: 450, y: 150 },
    { x: 650, y: 180 },
    { x: 750, y: 200 }
];

function moveDot() {
    const dot = document.getElementById("travelDot");
    dot.setAttribute("cx", mapNodes[game.position].x);
    dot.setAttribute("cy", mapNodes[game.position].y);

    document.querySelectorAll(".map-node").forEach((n, i) =>
        n.classList.toggle("active", i === game.position)
    );
}

/* =========================================================
   UI HELPERS
========================================================= */
function showEventCard() {
    document.getElementById("eventCard").classList.add("active");
}

function hideEventCard() {
    document.getElementById("eventCard").classList.remove("active");
}

function updateStats() {
    document.getElementById("stats").innerHTML =
        `<p><b>Day:</b> ${game.day}</p>
         <p><b>Cash:</b> $${game.cash}</p>
         <p><b>Inventory:</b> ${game.inventory}</p>
         <p><b>Sentiment:</b> ${game.sentiment}</p>
         <p><b>Regulation:</b> ${game.regulation}</p>`;
}

/* =========================================================
   FACTION REACTION
========================================================= */
function reactFaction(faction, amount) {
    game.factions[faction] += amount;
}

/* =========================================================
   EVENT SYSTEM
========================================================= */
const EVENTS = [
    { title:"Tariff Spike", text:"A sudden tariff increase hits imported goods.",
      choices:[
        { text:"Absorb cost", effect:()=>{ game.cash-=300; }},
        { text:"Raise prices", effect:()=>{ game.sentiment-=5; }}
      ]},
    { title:"Inflation Jump", text:"Prices rise unexpectedly.",
      choices:[
        { text:"Cut expenses", effect:()=>{ game.cash+=200; }},
        { text:"Borrow funds", effect:()=>{ game.cash+=500; game.regulation+=2; }}
      ]},
    { title:"Supplier Bankruptcy", text:"One of your suppliers collapses.",
      choices:[
        { text:"Find replacement", effect:()=>{ game.cash-=400; game.inventory+=10; }},
        { text:"Wait it out", effect:()=>{ game.inventory-=15; }}
      ]},
    { title:"Cargo Delay", text:"Shipping delays affect key items.",
      choices:[
        { text:"Air freight", effect:()=>{ game.cash-=350; game.inventory+=5; }},
        { text:"Accept delay", effect:()=>{ game.inventory-=10; }}
      ]}
];

/* =========================================================
   PLAY TURN
========================================================= */
function playTurn() {
    if (game.ended) return;

    updateStats();
    hideEventCard();

    if (game.position > game.maxPos) {
        return endGame(
            "Victory!",
            "You successfully reached Election Day and completed The American Trail!"
        );
    }

    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];

    document.getElementById("eventTitle").innerText = event.title;
    document.getElementById("eventText").innerText = event.text;

    const choices = document.getElementById("choices");
    choices.innerHTML = "";

    event.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.className = "btn retro-btn";
        btn.innerText = choice.text;
        btn.onclick = () => {
            choice.effect();
            nextPhase();
        };
        choices.appendChild(btn);
    });

    showEventCard();
}

/* =========================================================
   NEXT PHASE
========================================================= */
function nextPhase() {
    game.day++;
    game.position++;

    hideEventCard();
    moveDot();
    updateStats();
    checkFailure();

    document.getElementById("nextBtn").classList.remove("hidden");
}

document.getElementById("nextBtn").onclick = () => {
    document.getElementById("nextBtn").classList.add("hidden");
    playTurn();
};

/* =========================================================
   FAIL CONDITIONS
========================================================= */
function checkFailure() {
    if (game.cash <= 0)
        return endGame("Bankruptcy!", "Your business ran out of money.");
    if (game.sentiment <= 0)
        return endGame("Public Revolt!", "Public support collapsed.");
    if (game.regulation >= 100)
        return endGame("Shutdown!", "Regulatory pressure closed your business.");
    if (game.inventory <= 0)
        return endGame("Inventory Collapse!", "You couldn't supply your goods.");
}

/* =========================================================
   END GAME
========================================================= */
function endGame(title, message) {
    game.ended = true;

    document.getElementById("gameContainer").classList.add("hidden");

    const end = document.getElementById("gameOverScreen");
    end.classList.remove("hidden");

    document.getElementById("endTitle").innerText = title;
    document.getElementById("endMessage").innerText = message;

    document.getElementById("restartBtn").onclick = () => {
        window.location.reload();
    };
}

/* =========================================================
   GAME START
========================================================= */
document.getElementById("startGameBtn").onclick = () => {
    document.getElementById("titleScreen").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");
    moveDot();
    playTurn();
};
