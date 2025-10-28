const teams = [
  { name: "Sweden", flag: "https://flagcdn.com/w40/se.png", chance: 1.00 },
  { name: "Finland", flag: "https://flagcdn.com/w40/fi.png", chance: 0.97 },
  { name: "Czechia", flag: "https://flagcdn.com/w40/cz.png", chance: 0.93 },
  { name: "Switzerland", flag: "https://flagcdn.com/w40/ch.png", chance: 0.91 },
  { name: "Latvia", flag: "https://flagcdn.com/w40/lv.png", chance: 0.87 },
  { name: "Slovakia", flag: "https://flagcdn.com/w40/sk.png", chance: 0.87 },
  { name: "Germany", flag: "https://flagcdn.com/w40/de.png", chance: 0.82 },
  { name: "Norway", flag: "https://flagcdn.com/w40/no.png", chance: 0.79 },
  { name: "Denmark", flag: "https://flagcdn.com/w40/dk.png", chance: 0.77 },
  { name: "Poland", flag: "https://flagcdn.com/w40/pl.png", chance: 0.74 },
  { name: "Japan", flag: "https://flagcdn.com/w40/jp.png", chance: 0.71 },
  { name: "Estonia", flag: "https://flagcdn.com/w40/ee.png", chance: 0.69 },
  { name: "Singapore", flag: "https://flagcdn.com/w40/sg.png", chance: 0.69 },
  { name: "USA", flag: "https://flagcdn.com/w40/us.png", chance: 0.67 },
  { name: "Australia", flag: "https://flagcdn.com/w40/au.png", chance: 0.65 },
  { name: "Thailand", flag: "https://flagcdn.com/w40/th.png", chance: 0.64 },
  { name: "Hungary", flag: "https://flagcdn.com/w40/hu.png", chance: 0.62 },
  { name: "Italy", flag: "https://flagcdn.com/w40/it.png", chance: 0.60 },
  { name: "France", flag: "https://flagcdn.com/w40/fr.png", chance: 0.57 },
  { name: "Russia", flag: "https://flagcdn.com/w40/ru.png", chance: 0.53 },
  { name: "Netherlands", flag: "https://flagcdn.com/w40/nl.png", chance: 0.51 },
  { name: "Spain", flag: "https://flagcdn.com/w40/es.png", chance: 0.48 },
  { name: "New Zealand", flag: "https://flagcdn.com/w40/nz.png", chance: 0.45 },
  { name: "Philippines", flag: "https://flagcdn.com/w40/ph.png", chance: 0.43 },
  { name: "Belgium", flag: "https://flagcdn.com/w40/be.png", chance: 0.41 },
  { name: "Canada", flag: "https://flagcdn.com/w40/ca.png", chance: 0.46 },
  { name: "Austria", flag: "https://flagcdn.com/w40/at.png", chance: 0.39 },
  { name: "South Korea", flag: "https://flagcdn.com/w40/kr.png", chance: 0.38 },
  { name: "Ukraine", flag: "https://flagcdn.com/w40/ua.png", chance: 0.35 },
  { name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png", chance: 0.33 },
  { name: "Malaysia", flag: "https://flagcdn.com/w40/my.png", chance: 0.31 },
  { name: "Slovenia", flag: "https://flagcdn.com/w40/si.png", chance: 0.28 },
  { name: "China", flag: "https://flagcdn.com/w40/cn.png", chance: 0.25 },
  { name: "Indonesia", flag: "https://flagcdn.com/w40/id.png", chance: 0.23 },
  { name: "Burkina Faso", flag: "https://flagcdn.com/w40/bf.png", chance: 0.20 },
  { name: "Kenya", flag: "https://flagcdn.com/w40/ke.png", chance: 0.17 },
  { name: "India", flag: "https://flagcdn.com/w40/in.png", chance: 0.15 },
  { name: "Iran", flag: "https://flagcdn.com/w40/ir.png", chance: 0.15 },
  { name: "Cote d'Ivoire", flag: "https://flagcdn.com/w40/ci.png", chance: 0.16 },
  { name: "Brazil", flag: "https://flagcdn.com/w40/br.png", chance: 0.19 },
  { name: "Georgia", flag: "https://flagcdn.com/w40/ge.png", chance: 0.10 },
  { name: "Liechtenstein", flag: "https://flagcdn.com/w40/li.png", chance: 0.31 },
  { name: "Nigeria", flag: "https://flagcdn.com/w40/ng.png", chance: 0.14 },
  { name: "Uganda", flag: "https://flagcdn.com/w40/ug.png", chance: 0.09 },
  { name: "Myanmar", flag: "https://flagcdn.com/w40/mm.png", chance: 0.11 },
  { name: "Jamaica", flag: "https://flagcdn.com/w40/jm.png", chance: 0.07 }
];

function shuffle(array){ return array.sort(()=>Math.random()-0.5); }
function delay(ms){ return new Promise(res=>setTimeout(res,ms)); }
function formatCountry(team){ return `<span class="country"><img src="${team.flag}" alt="${team.name}"> ${team.name}</span>`; }
function playMatch(a,b){ return Math.random()*(a.chance+b.chance)<a.chance?a:b; }

async function qualificationRound(teams, resultsDiv){
  resultsDiv.innerHTML+=`<h2>🏁 Qualification Round</h2>`;
  const winners=[];
  for(let i=0;i<teams.length;i+=2){
    const t1=teams[i], t2=teams[i+1];
    await delay(100);
    const winner=playMatch(t1,t2);
    winners.push(winner);
    resultsDiv.innerHTML+=`<div class="match">${formatCountry(t1)} vs ${formatCountry(t2)} → <span class="winner">${formatCountry(winner)}</span></div>`;
  }
  return winners;
}

async function groupStage(groups, resultsDiv){
  resultsDiv.innerHTML+=`<h2>📊 Group Stage</h2>`;
  const groupResults=[];
  for(let i=0;i<groups.length;i++){
    const group=groups[i];
    resultsDiv.innerHTML+=`<h3>Group ${i+1}</h3>`;
    const points={}; group.forEach(t=>points[t.name]=0);
    for(let a=0;a<group.length;a++){
      for(let b=a+1;b<group.length;b++){
        await delay(50);
        const winner=playMatch(group[a],group[b]);
        points[winner.name]++;
        resultsDiv.innerHTML+=`<div class="match">${formatCountry(group[a])} vs ${formatCountry(group[b])} → <span class="winner">${formatCountry(winner)}</span></div>`;
      }
    }
    const ranking=[...group].sort((x,y)=>points[y.name]-points[x.name]);
    groupResults.push(ranking);
    resultsDiv.innerHTML+=`<div>1️⃣ ${formatCountry(ranking[0])} | 2️⃣ ${formatCountry(ranking[1])} | 3️⃣ ${formatCountry(ranking[2])} | 4️⃣ ${formatCountry(ranking[3])}</div>`;
  }
  return groupResults;
}

async function playoffRound(teams, resultsDiv){
  resultsDiv.innerHTML+=`<h2>⚔️ Playoffs for Quarterfinals</h2>`;
  const winners=[];
  for(let i=0;i<teams.length;i+=2){
    await delay(100);
    const winner=playMatch(teams[i],teams[i+1]);
    winners.push(winner);
    resultsDiv.innerHTML+=`<div class="match">${formatCountry(teams[i])} vs ${formatCountry(teams[i+1])} → <span class="winner">${formatCountry(winner)}</span></div>`;
  }
  return winners;
}

async function knockoutStage(name, teams, resultsDiv){
  resultsDiv.innerHTML+=`<h2>🏆 ${name}</h2>`;
  let roundTeams=[...teams], semiLosers=[], finalWinner;
  const rounds=['Quarterfinals','Semifinals','Final'];
  for(let r=0;r<rounds.length;r++){
    resultsDiv.innerHTML+=`<h3>${rounds[r]}</h3>`;
    const nextRound=[];
    for(let i=0;i<roundTeams.length;i+=2){
      await delay(100);
      const winner=playMatch(roundTeams[i],roundTeams[i+1]);
      const loser=winner===roundTeams[i]?roundTeams[i+1]:roundTeams[i];
      if(r===1) semiLosers.push(loser);
      nextRound.push(winner);
      resultsDiv.innerHTML+=`<div class="match">${formatCountry(roundTeams[i])} vs ${formatCountry(roundTeams[i+1])} → <span class="winner">${formatCountry(winner)}</span></div>`;
    }
    roundTeams=nextRound;
    if(rounds[r]==='Final') finalWinner=roundTeams[0];
  }

  await delay(100);
  const third=playMatch(semiLosers[0],semiLosers[1]);
  resultsDiv.innerHTML+=`<h3>🥉 3rd Place</h3>`;
  resultsDiv.innerHTML+=`<div class="match">${formatCountry(semiLosers[0])} vs ${formatCountry(semiLosers[1])} → <span class="winner">${formatCountry(third)}</span></div>`;
  resultsDiv.innerHTML+=`<h2>🏆 Season Winner: <span class="winner">${formatCountry(finalWinner)}</span></h2><hr>`;
}

async function runSeason(season, button){
  button.disabled=true;
  const resultsDiv=document.getElementById('results');
  resultsDiv.innerHTML+=`<h1>Season ${season}</h1>`;
  const shuffled=shuffle([...teams]);
  
  const qualWinners=await qualificationRound(shuffled,resultsDiv);
  const groups=[
    qualWinners.slice(0,4),
    qualWinners.slice(4,8),
    qualWinners.slice(8,12),
    qualWinners.slice(12,16)
  ];
  
  const groupResults=await groupStage(groups,resultsDiv);
  const playoffTeams=[];
  groupResults.forEach(gr=>{ playoffTeams.push(gr[1],gr[2]); });
  const playoffWinners=await playoffRound(playoffTeams,resultsDiv);
  
  const quarterFinals=groupResults.map(gr=>gr[0]).concat(playoffWinners);
  await knockoutStage('Playoffs & Finals',quarterFinals,resultsDiv);
  button.disabled=false;
}

let seasonNumber=2025;
document.getElementById('startBtn').addEventListener('click',()=>runSeason(seasonNumber,document.getElementById('startBtn')));
document.getElementById('nextSeasonBtn').addEventListener('click',()=>{seasonNumber++;runSeason(seasonNumber,document.getElementById('nextSeasonBtn'));});
