
/* =========================================================
   THE AMERICAN TRAIL – ADVANCED GAME ENGINE (20 EVENTS)
   Difficulty: CASUAL
   Retro Oregon Trail Theme
========================================================= */

let game = {
    day: 1,
    cash: 5000,
    inventory: 100,
    sentiment: 50,
    regulation: 20,
    factions: { business: 50, regulator: 50, consumer: 50 },
    position: 0,
    maxPos: 4
};

/* MAP NODES / MOVEMENT */
const mapNodes = [
    { x: 50, y: 200 },
    { x: 250, y: 160 },
    { x: 450, y: 150 },
    { x: 650, y: 180 },
    { x: 750, y: 200 }
];

function moveDot() {
    const dot = document.getElementById("travelDot");
    const pos = game.position;
    dot.setAttribute("cx", mapNodes[pos].x);
    dot.setAttribute("cy", mapNodes[pos].y);
    document.querySelectorAll(".map-node").forEach((n,i)=>n.classList.toggle("active",i===pos));
}

/* EVENT CARD CONTROLS */
function showEventCard(){ document.getElementById("eventCard").classList.add("active"); }
function hideEventCard(){ document.getElementById("eventCard").classList.remove("active"); }

/* UPDATE STATS */
function updateStats(){
    document.getElementById("stats").innerHTML =
    `<p><b>Day:</b> ${game.day}</p>
     <p><b>Cash:</b> $${game.cash}</p>
     <p><b>Inventory:</b> ${game.inventory}</p>
     <p><b>Public Sentiment:</b> ${game.sentiment}</p>
     <p><b>Regulation Risk:</b> ${game.regulation}</p>`;
}

/* FACTION REACTION */
function reactFaction(faction, amount){
    game.factions[faction]+=amount;
    const el = {
        business: document.getElementById("factionBusiness"),
        regulator: document.getElementById("factionRegulator"),
        consumer: document.getElementById("factionConsumer")
    }[faction];
    if(!el) return;
    el.style.transform="scale(1.2)";
    el.style.opacity="1";
    setTimeout(()=>{ el.style.transform="scale(1)"; el.style.opacity="0.9"; },500);
}

/* =========================================================
   EVENT DEFINITIONS – 20 EVENTS
========================================================= */

const EVENTS = [
    { title:"Tariff Spike", text:"A sudden tariff increase hits imported goods.",
      choices:[
        { text:"Absorb cost", effect:()=>{ game.cash-=300; reactFaction("consumer",+3); }},
        { text:"Raise prices", effect:()=>{ game.sentiment-=5; reactFaction("consumer",-5); }}
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
      ]},
    { title:"Federal Audit", text:"Regulators conduct a surprise audit.",
      choices:[
        { text:"Cooperate", effect:()=>{ game.cash-=200; reactFaction("regulator",+8); }},
        { text:"Limit access", effect:()=>{ game.regulation+=10; reactFaction("regulator",-10); }}
      ]},
    { title:"Compliance Rule", text:"New administrative requirements introduced.",
      choices:[
        { text:"Hire staff", effect:()=>{ game.cash-=300; }},
        { text:"Ignore it", effect:()=>{ game.regulation+=12; }}
      ]},
    { title:"Public Protest", text:"Crowds form outside your business.",
      choices:[
        { text:"Pause ops", effect:()=>{ game.cash-=200; game.sentiment+=6; }},
        { text:"Continue", effect:()=>{ game.sentiment-=10; }}
      ]},
    { title:"Viral Review", text:"A negative review spreads widely.",
      choices:[
        { text:"Respond", effect:()=>{ game.sentiment+=5; }},
        { text:"Ignore", effect:()=>{ game.sentiment-=5; }}
      ]},
    { title:"Lobbying Chance", text:"Congressional staff request input.",
      choices:[
        { text:"Send rep", effect:()=>{ reactFaction("business",+5); }},
        { text:"Decline", effect:()=>{ game.sentiment+=3; }}
      ]},
    { title:"Election Poll Shift", text:"A political change influences public mood.",
      choices:[
        { text:"Align publicly", effect:()=>{ game.sentiment+=6; }},
        { text:"Stay neutral", effect:()=>{ game.sentiment+=1; }}
      ]},
    { title:"Trade War", text:"Foreign retaliation disrupts supply lines.",
      choices:[
        { text:"Shift local", effect:()=>{ game.cash-=400; game.inventory+=5; }},
        { text:"Stay course", effect:()=>{ game.inventory-=10; }}
      ]},
    { title:"Currency Shock", text:"Foreign exchange spikes affect costs.",
      choices:[
        { text:"Hedge", effect:()=>{ game.cash-=200; }},
        { text:"Absorb", effect:()=>{ game.cash-=100; }}
      ]},
    { title:"Employee Strike", text:"Workers halt operations.",
      choices:[
        { text:"Meet demands", effect:()=>{ game.cash-=300; game.sentiment+=4; }},
        { text:"Push back", effect:()=>{ game.sentiment-=8; }}
      ]},
    { title:"Hiring Frenzy", text:"Sudden availability of workers.",
      choices:[
        { text:"Hire", effect:()=>{ game.cash-=250; game.inventory+=8; }},
        { text:"Hold steady", effect:()=>{ game.inventory+=2; }}
      ]},
    { title:"Infrastructure Breakdown", text:"Local outage disrupts workflow.",
      choices:[
        { text:"Backup systems", effect:()=>{ game.cash-=350; }},
        { text:"Wait", effect:()=>{ game.inventory-=5; }}
      ]},
    { title:"Legal Threat", text:"Lawsuit rumors emerge.",
      choices:[
        { text:"Hire attorney", effect:()=>{ game.cash-=500; }},
        { text:"Settle quietly", effect:()=>{ game.cash-=300; }}
      ]},
    { title:"Tech Mandate", text:"New tech required to stay compliant.",
      choices:[
        { text:"Adopt tech", effect:()=>{ game.cash-=450; game.regulation-=5; }},
        { text:"Delay", effect:()=>{ game.regulation+=6; }}
      ]},
    { title:"National Boycott", text:"Major backlash rises.",
      choices:[
        { text:"PR campaign", effect:()=>{ game.cash-=250; game.sentiment+=5; }},
        { text:"Ignore", effect:()=>{ game.sentiment-=12; }}
      ]},
    { title:"Interest Rate Hike", text:"Loans become more expensive.",
      choices:[
        { text:"Pay debts", effect:()=>{ game.cash-=200; }},
        { text:"Ignore", effect:()=>{} }
      ]},
    { title:"Policy Uncertainty", text:"Confusing signals from lawmakers.",
      choices:[
        { text:"Hold resources", effect:()=>{ game.inventory+=3; }},
        { text:"Expand anyway", effect:()=>{ game.cash-=200; }}
      ]}
];

/* =========================================================
   EVENT FLOW + TURN SYSTEM
========================================================= */

function playTurn() {
    updateStats();
    hideEventCard();

    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];

    document.getElementById("eventTitle").innerText = event.title;
    document.getElementById("eventText").innerText = event.text;

    const choices = document.getElementById("choices");
    choices.innerHTML = "";

    event.choices.forEach(choice => {
        let btn = document.createElement("button");
        btn.className = "btn retro-btn";
        btn.innerText = choice.text;
        btn.onclick = () => {
            choice.effect();
            triggerMiniGame();
            nextPhase();
        };
        choices.appendChild(btn);
    });

    showEventCard();
}

function nextPhase() {
    hideEventCard();

    game.day++;
    game.position++;

    if (game.position > game.maxPos) {
        return endGame("You Win!", "You successfully reached Election Day with your business intact!");
    }

    moveDot();
    checkFailure();
    updateStats();

    document.getElementById("nextBtn").classList.remove("hidden");
}

document.getElementById("nextBtn").onclick = () => {
    document.getElementById("nextBtn").classList.add("hidden");
    playTurn();
};

/* =========================================================
   FAILURE CONDITIONS (CASUAL MODE)
========================================================= */

function checkFailure() {
    if (game.cash <= 0)
        return endGame("Bankruptcy!", "You ran out of money.");

    if (game.sentiment <= 0)
        return endGame("Public Revolt!", "Public support collapsed.");

    if (game.regulation >= 100)
        return endGame("Shutdown!", "Regulatory pressure forced closure.");

    if (game.inventory <= 0)
        return endGame("Inventory Collapse!", "You couldn't supply your business.");
}

/* =========================================================
   GAME OVER SCREEN
========================================================= */

function endGame(title, message) {
    document.getElementById("gameContainer").style.display = "none";

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
    playTurn();
};
