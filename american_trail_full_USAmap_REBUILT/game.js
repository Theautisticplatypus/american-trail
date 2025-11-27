let game={day:1,cash:5000,inventory:100,sentiment:50,reg:20};
let pos=0; let maxPos=4;

const nodes=[{x:50,y:200},{x:250,y:160},{x:450,y:150},{x:650,y:180},{x:750,y:200}];

function updateStats(){
 document.getElementById('stats').innerHTML=
 `Day: ${game.day}<br>Cash: $${game.cash}<br>Inventory: ${game.inventory}<br>
 Sentiment: ${game.sentiment}<br>Regulation: ${game.reg}`;
}

function randomEvent(){
 let events=[
  {text:'Tariff Increase!',choices:[
    {text:'Absorb cost',effect:()=>game.cash-=300},
    {text:'Raise prices',effect:()=>game.sentiment-=8}
  ]},
  {text:'Supply Chain Delay!',choices:[
    {text:'Buy domestic',effect:()=>{game.cash-=400;game.inventory+=10}},
    {text:'Wait it out',effect:()=>game.inventory-=15}
  ]},
  {text:'New Regulation!',choices:[
    {text:'Hire consultant',effect:()=>game.cash-=600},
    {text:'Ignore it',effect:()=>game.reg+=12}
  ]}
 ];
 return events[Math.floor(Math.random()*events.length)];
}

function playTurn(){
 updateStats();
 let ev=randomEvent();
 document.getElementById('event').innerHTML=ev.text;
 let c=document.getElementById('choices'); c.innerHTML='';
 ev.choices.forEach(ch=>{
   let b=document.createElement('button');
   b.textContent=ch.text;
   b.onclick=()=>{ch.effect(); endTurn();};
   c.appendChild(b);
 });
}

function endTurn(){
 document.getElementById('choices').innerHTML='';
 document.getElementById('event').innerHTML='Decision Applied.';
 document.getElementById('nextBtn').style.display='inline-block';
}

document.getElementById('nextBtn').onclick=()=>{
 document.getElementById('nextBtn').style.display='none';
 game.day++; pos++;
 if(pos>maxPos){ endGame('Victory!','You reached Election Day!'); return; }
 moveDot(); checkFail(); playTurn();
};

function moveDot(){
 let dot=document.getElementById('travelDot');
 dot.setAttribute('cx',nodes[pos].x);
 dot.setAttribute('cy',nodes[pos].y);
 document.querySelectorAll('.node').forEach((n,i)=>n.classList.toggle('active',i===pos));
}

function checkFail(){
 if(game.cash<=0) endGame('Bankrupt','Out of money.');
 if(game.sentiment<=0) endGame('Revolt','Public support collapsed.');
 if(game.reg>=100) endGame('Shutdown','Regulation crushed operations.');
 if(game.inventory<=0) endGame('Collapse','No inventory left.');
}

function endGame(title,text){
 document.getElementById('game').style.display='none';
 let g=document.getElementById('gameOver'); g.classList.remove('hidden');
 document.getElementById('endTitle').innerText=title;
 document.getElementById('endText').innerText=text;
}

document.getElementById('startGameBtn').onclick=()=>{
 document.getElementById('titleScreen').style.display='none';
 playTurn();
};
