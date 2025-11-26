// Simplified full game engine core (fits packaging)
let game={day:1,cash:5000,inventory:100,sentiment:50,regulation:20};
let travelProgress=0;

function playSound(id){}

function updateStats(){
    const stats=document.getElementById("stats");
    stats.innerHTML=`<p>Day: ${game.day}</p><p>Cash: $${game.cash}</p><p>Inventory: ${game.inventory}</p><p>Sentiment: ${game.sentiment}</p><p>Reg Risk: ${game.regulation}</p>`;
    stats.classList.add("fade-in");
    setTimeout(()=>stats.classList.remove("fade-in"),400);
}

const factions={business:{name:"Business Lobby",img:"img/faction_business.png"},
consumer:{name:"Consumer Coalition",img:"img/faction_consumer.png"},
regulator:{name:"Regulatory Council",img:"img/faction_regulator.png"}};

function randomEvent(){
    return {text:"Tariff Change",choices:[
        {text:"Absorb cost",effect:()=>game.cash-=300},
        {text:"Raise prices",effect:()=>game.sentiment-=5}
    ]};
}

function playTurn(){
    updateStats();
    const f=Object.values(factions)[Math.floor(Math.random()*3)];
    document.getElementById("factionPortrait").src=f.img;
    document.getElementById("factionName").innerText=f.name;
    document.getElementById("factionBox").style.opacity=1;
    setTimeout(()=>document.getElementById("factionBox").style.opacity=0,1400);

    const ev=randomEvent();
    const eDiv=document.getElementById("event");
    eDiv.innerHTML=`<p>${ev.text}</p>`;
    eDiv.classList.add("fade-in");
    setTimeout(()=>eDiv.classList.remove("fade-in"),400);

    const cDiv=document.getElementById("choices");
    cDiv.innerHTML="";
    ev.choices.forEach(ch=>{
        const b=document.createElement("button");
        b.textContent=ch.text;
        b.onclick=()=>{ch.effect();endTurn();};
        cDiv.appendChild(b);
    });
}

function endTurn(){
    document.getElementById("choices").innerHTML="";
    document.getElementById("event").innerHTML="<p>Decision applied.</p>";
    document.getElementById("nextBtn").style.display="block";
}

document.getElementById("nextBtn").onclick=()=>{
    document.getElementById("nextBtn").style.display="none";
    travelProgress+=30;
    document.getElementById("travelDot").style.transform=`translateX(${travelProgress}px)`;
    game.day++;
    playTurn();
};

document.getElementById("startGameBtn").onclick=()=>{
    const t=document.getElementById("titleScreen");
    t.style.opacity=0;
    setTimeout(()=>t.style.display="none",700);
};

document.getElementById("miniGameCloseBtn").onclick=()=>{document.getElementById("miniGameModal").style.display="none";};

playTurn();
