/* app.js */
const STORAGE_KEY = 'fm_players_v3';
const STORAGE_FORMATION = 'fm_formation_v3';
const STORAGE_SQUAD_NAME = 'fm_squad_name';

// 15 Most Popular Formations (ranked by global usage)
const formations = {
  "442": { name: "4-4-2", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 15, y: 50, role: "LM"},
    {id: 7, x: 38, y: 55, role: "CM"},
    {id: 8, x: 62, y: 55, role: "CM"},
    {id: 9, x: 85, y: 50, role: "RM"},
    {id: 10, x: 35, y: 25, role: "ST"},
    {id: 11, x: 65, y: 25, role: "ST"}
  ]},
  "433": { name: "4-3-3", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 30, y: 55, role: "CM"},
    {id: 7, x: 50, y: 60, role: "CDM"},
    {id: 8, x: 70, y: 55, role: "CM"},
    {id: 9, x: 20, y: 30, role: "LW"},
    {id: 10, x: 50, y: 25, role: "ST"},
    {id: 11, x: 80, y: 30, role: "RW"}
  ]},
  "4231": { name: "4-2-3-1", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 35, y: 60, role: "CDM"},
    {id: 7, x: 65, y: 60, role: "CDM"},
    {id: 8, x: 20, y: 40, role: "LW"},
    {id: 9, x: 50, y: 45, role: "CAM"},
    {id: 10, x: 80, y: 40, role: "RW"},
    {id: 11, x: 50, y: 20, role: "ST"}
  ]},
  "352": { name: "3-5-2", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 25, y: 78, role: "CB"},
    {id: 3, x: 50, y: 82, role: "CB"},
    {id: 4, x: 75, y: 78, role: "CB"},
    {id: 5, x: 15, y: 55, role: "LWB"},
    {id: 6, x: 35, y: 60, role: "CM"},
    {id: 7, x: 50, y: 55, role: "CDM"},
    {id: 8, x: 65, y: 60, role: "CM"},
    {id: 9, x: 85, y: 55, role: "RWB"},
    {id: 10, x: 35, y: 25, role: "ST"},
    {id: 11, x: 65, y: 25, role: "ST"}
  ]},
  "451": { name: "4-5-1", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 15, y: 50, role: "LM"},
    {id: 7, x: 32, y: 55, role: "CM"},
    {id: 8, x: 50, y: 60, role: "CDM"},
    {id: 9, x: 68, y: 55, role: "CM"},
    {id: 10, x: 85, y: 50, role: "RM"},
    {id: 11, x: 50, y: 25, role: "ST"}
  ]},
  "343": { name: "3-4-3", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 25, y: 78, role: "CB"},
    {id: 3, x: 50, y: 82, role: "CB"},
    {id: 4, x: 75, y: 78, role: "CB"},
    {id: 5, x: 20, y: 55, role: "LM"},
    {id: 6, x: 40, y: 60, role: "CM"},
    {id: 7, x: 60, y: 60, role: "CM"},
    {id: 8, x: 80, y: 55, role: "RM"},
    {id: 9, x: 20, y: 30, role: "LW"},
    {id: 10, x: 50, y: 25, role: "ST"},
    {id: 11, x: 80, y: 30, role: "RW"}
  ]},
  "541": { name: "5-4-1", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 10, y: 72, role: "LWB"},
    {id: 3, x: 30, y: 78, role: "CB"},
    {id: 4, x: 50, y: 82, role: "CB"},
    {id: 5, x: 70, y: 78, role: "CB"},
    {id: 6, x: 90, y: 72, role: "RWB"},
    {id: 7, x: 20, y: 50, role: "LM"},
    {id: 8, x: 40, y: 55, role: "CM"},
    {id: 9, x: 60, y: 55, role: "CM"},
    {id: 10, x: 80, y: 50, role: "RM"},
    {id: 11, x: 50, y: 25, role: "ST"}
  ]},
  "4141": { name: "4-1-4-1", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 50, y: 62, role: "CDM"},
    {id: 7, x: 15, y: 45, role: "LM"},
    {id: 8, x: 38, y: 50, role: "CM"},
    {id: 9, x: 62, y: 50, role: "CM"},
    {id: 10, x: 85, y: 45, role: "RM"},
    {id: 11, x: 50, y: 25, role: "ST"}
  ]},
  "442d": { name: "4-4-2 Diamond", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 50, y: 60, role: "CDM"},
    {id: 7, x: 25, y: 50, role: "LM"},
    {id: 8, x: 50, y: 45, role: "CAM"},
    {id: 9, x: 75, y: 50, role: "RM"},
    {id: 10, x: 35, y: 25, role: "ST"},
    {id: 11, x: 65, y: 25, role: "ST"}
  ]},
  "532": { name: "5-3-2", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 10, y: 72, role: "LWB"},
    {id: 3, x: 30, y: 78, role: "CB"},
    {id: 4, x: 50, y: 82, role: "CB"},
    {id: 5, x: 70, y: 78, role: "CB"},
    {id: 6, x: 90, y: 72, role: "RWB"},
    {id: 7, x: 30, y: 55, role: "CM"},
    {id: 8, x: 50, y: 60, role: "CDM"},
    {id: 9, x: 70, y: 55, role: "CM"},
    {id: 10, x: 35, y: 25, role: "ST"},
    {id: 11, x: 65, y: 25, role: "ST"}
  ]},
  "4312": { name: "4-3-1-2", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 30, y: 58, role: "CM"},
    {id: 7, x: 50, y: 63, role: "CDM"},
    {id: 8, x: 70, y: 58, role: "CM"},
    {id: 9, x: 50, y: 40, role: "CAM"},
    {id: 10, x: 35, y: 22, role: "ST"},
    {id: 11, x: 65, y: 22, role: "ST"}
  ]},
  "4222": { name: "4-2-2-2", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 35, y: 62, role: "CDM"},
    {id: 7, x: 65, y: 62, role: "CDM"},
    {id: 8, x: 25, y: 42, role: "CAM"},
    {id: 9, x: 75, y: 42, role: "CAM"},
    {id: 10, x: 35, y: 22, role: "ST"},
    {id: 11, x: 65, y: 22, role: "ST"}
  ]},
  "352a": { name: "3-5-2 Attacking", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 25, y: 78, role: "CB"},
    {id: 3, x: 50, y: 82, role: "CB"},
    {id: 4, x: 75, y: 78, role: "CB"},
    {id: 5, x: 15, y: 58, role: "LM"},
    {id: 6, x: 35, y: 62, role: "CM"},
    {id: 7, x: 50, y: 55, role: "CAM"},
    {id: 8, x: 65, y: 62, role: "CM"},
    {id: 9, x: 85, y: 58, role: "RM"},
    {id: 10, x: 35, y: 28, role: "ST"},
    {id: 11, x: 65, y: 28, role: "ST"}
  ]},
  "433f": { name: "4-3-3 False 9", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 30, y: 58, role: "CM"},
    {id: 7, x: 50, y: 63, role: "CDM"},
    {id: 8, x: 70, y: 58, role: "CM"},
    {id: 9, x: 20, y: 35, role: "LW"},
    {id: 10, x: 50, y: 35, role: "CF"},
    {id: 11, x: 80, y: 35, role: "RW"}
  ]},
  "4411": { name: "4-4-1-1", slots: [
    {id: 1, x: 50, y: 92, role: "GK"},
    {id: 2, x: 15, y: 75, role: "LB"},
    {id: 3, x: 38, y: 78, role: "CB"},
    {id: 4, x: 62, y: 78, role: "CB"},
    {id: 5, x: 85, y: 75, role: "RB"},
    {id: 6, x: 15, y: 50, role: "LM"},
    {id: 7, x: 38, y: 55, role: "CM"},
    {id: 8, x: 62, y: 55, role: "CM"},
    {id: 9, x: 85, y: 50, role: "RM"},
    {id: 10, x: 50, y: 35, role: "CF"},
    {id: 11, x: 50, y: 20, role: "ST"}
  ]}
};

let currentFormation = localStorage.getItem(STORAGE_FORMATION) || "442";
let selectedIds = [];
let editingPlayerId = null;

// Argentina 2022 World Cup Winners (The Smile Team)
const defaultSquad = [
  {id: 1, name: "Sylvester", role: "GK"},
  {id: 2, name: "Vikor", role: "RB"},
  {id: 3, name: "Bolu", role: "CB"},
  {id: 4, name: "Kolade", role: "CB", isCaptain: true},
  {id: 5, name: "Yomi", role: "LB"},
  {id: 6, name: "Paraboi", role: "CM"},
  {id: 7, name: "Faruq", role: "DM"},
  {id: 8, name: "EMINENT", role: "LM"},
  {id: 9, name: "Suskid", role: "RW"},
  {id: 10, name: "Dennis", role: "LW"},
  {id: 11, name: "Sylvester", role: "CF"}, // or use "Jubril" as alternative
  {id: 12, name: "Dolapo", role: "RW"},
  {id: 13, name: "Peter", role: "GK"},
  {id: 14, name: "Imtiaz", role: "DM"}
];

function loadPlayers() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Corrupted save data");
    }
  }
  return JSON.parse(JSON.stringify(defaultSquad));
}

let players = loadPlayers();

// Squad Name
function loadSquadName() {
  const saved = localStorage.getItem(STORAGE_SQUAD_NAME);
  if (saved) {
    document.getElementById('squad-name').textContent = saved;
  } else {
    document.getElementById('squad-name').textContent = "Valor 2023 ⭐⭐⭐";
  }
}

document.getElementById('squad-name').addEventListener('blur', function() {
  localStorage.setItem(STORAGE_SQUAD_NAME, this.textContent);
});

document.getElementById('squad-name').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    this.blur();
  }
});

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  localStorage.setItem(STORAGE_FORMATION, currentFormation);
}

function isOnPitch(playerId) {
  const formation = formations[currentFormation];
  return formation.slots.some(s => s.id === playerId);
}

function switchFormation(key) {
  if (!formations[key]) return;
  
  const newFormation = formations[key];
  const assigned = new Set();
  const newAssignments = new Map();
  
  // Match by role
  newFormation.slots.forEach(slot => {
    const match = players.find(p => 
      p.role === slot.role && !assigned.has(p.id)
    );
    if (match) {
      newAssignments.set(slot.id, match.id);
      assigned.add(match.id);
    }
  });
  
  // Fill remaining with any unassigned
  const unassigned = players.filter(p => !assigned.has(p.id));
  newFormation.slots.forEach(slot => {
    if (!newAssignments.has(slot.id) && unassigned.length > 0) {
      const player = unassigned.shift();
      newAssignments.set(slot.id, player.id);
      assigned.add(player.id);
    }
  });
  
  // Rebuild players with new IDs
  const newPlayers = [];
  newAssignments.forEach((playerId, slotId) => {
    const player = players.find(p => p.id === playerId);
    newPlayers.push({...player, id: slotId});
  });
  
  let nextId = 100;
  players.forEach(p => {
    if (!assigned.has(p.id)) {
      newPlayers.push({...p, id: nextId++});
    }
  });
  
  players = newPlayers;
  currentFormation = key;
  selectedIds = [];
  save();
  render();
}

function selectPlayer(id) {
  const idx = selectedIds.indexOf(id);
  
  if (idx !== -1) {
    selectedIds.splice(idx, 1);
    render();
    return;
  }
  
  if (selectedIds.length === 1) {
    const p1 = players.find(p => p.id === selectedIds[0]);
    const p2 = players.find(p => p.id === id);
    const p1OnPitch = isOnPitch(p1.id);
    const p2OnPitch = isOnPitch(p2.id);
    
    if (p1OnPitch !== p2OnPitch) {
      swapPlayers(p1.id, p2.id);
      return;
    }
  }
  
  if (selectedIds.length < 2) {
    selectedIds.push(id);
  } else {
    selectedIds[1] = id;
  }
  
  render();
}

function clearSelection() {
  selectedIds = [];
  render();
}

function executeSwap() {
  if (selectedIds.length !== 2) return;
  swapPlayers(selectedIds[0], selectedIds[1]);
}

function swapPlayers(id1, id2) {
  const p1 = players.find(p => p.id === id1);
  const p2 = players.find(p => p.id === id2);
  
  const tempId = p1.id;
  p1.id = p2.id;
  p2.id = tempId;
  
  selectedIds = [];
  save();
  render();
}

// Modal Functions
function openModal(type) {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const nameInput = document.getElementById('input-name');
  const roleInput = document.getElementById('input-role');
  
  editingPlayerId = null;
  
  if (type === 'edit' && selectedIds.length === 1) {
    const player = players.find(p => p.id === selectedIds[0]);
    editingPlayerId = player.id;
    title.textContent = 'Edit Player';
    nameInput.value = player.name;
    roleInput.value = player.role;
  } else {
    title.textContent = 'Add Player';
    nameInput.value = '';
    roleInput.value = 'CM';
  }
  
  modal.classList.remove('hidden');
  nameInput.focus();
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  editingPlayerId = null;
}

function savePlayer() {
  const name = document.getElementById('input-name').value.trim();
  const role = document.getElementById('input-role').value;
  
  if (!name) {
    alert('Please enter a name');
    return;
  }
  
  if (editingPlayerId) {
    const player = players.find(p => p.id === editingPlayerId);
    player.name = name;
    player.role = role;
  } else {
    const maxId = Math.max(...players.map(p => p.id), 99);
    players.push({
      id: maxId + 1,
      name: name,
      role: role
    });
  }
  
  closeModal();
  save();
  render();
}

function deletePlayer(id) {
  if (!confirm('Delete this player?')) return;
  
  players = players.filter(p => p.id !== id);
  selectedIds = selectedIds.filter(sid => sid !== id);
  save();
  render();
}

// Rendering
function render() {
  renderPitch();
  renderSubs();
  renderPanel();
  renderFormations();
}

function renderPitch() {
  const pitch = document.getElementById('pitch');
  pitch.innerHTML = '';
  
  const formation = formations[currentFormation];
  
  formation.slots.forEach(slot => {
    const player = players.find(p => p.id === slot.id);
    if (!player) return;
    
    const div = document.createElement('div');
    div.className = 'player';
    if (selectedIds.includes(player.id)) div.classList.add('selected');
    
    div.innerHTML = `
      <span class="role">${player.role}</span>
      <span class="name">${player.name}</span>
    `;
    
    div.style.left = `${slot.x}%`;
    div.style.top = `${slot.y}%`;
    
    div.onclick = () => selectPlayer(player.id);
    pitch.appendChild(div);
  });
}

function renderSubs() {
  const container = document.getElementById('subs');
  const addBtn = container.querySelector('.add-btn');
  container.innerHTML = '';
  container.appendChild(addBtn);
  
  const formation = formations[currentFormation];
  const slotIds = new Set(formation.slots.map(s => s.id));
  const subs = players.filter(p => !slotIds.has(p.id));
  
  subs.forEach(player => {
    const div = document.createElement('div');
    div.className = 'sub';
    if (selectedIds.includes(player.id)) div.classList.add('selected');
    
    div.innerHTML = `
      <div class="name">${player.name}</div>
      <div class="role">${player.role}</div>
    `;
    
    div.onclick = () => selectPlayer(player.id);
    container.appendChild(div);
  });
}

function renderPanel() {
  const details = document.getElementById('player-details');
  const swapSection = document.getElementById('swap-section');
  
  if (selectedIds.length === 1) {
    const p = players.find(pl => pl.id === selectedIds[0]);
    const onPitch = isOnPitch(p.id);
    
    details.innerHTML = `
      <div class="player-card-large">
        <div class="role-badge">${p.role}</div>
        <div class="name">${p.name}</div>
        <div class="status-badge">${onPitch ? 'Starting XI' : 'Substitute'}</div>
        <div class="player-actions">
          <button class="btn-edit" onclick="openModal('edit')">Edit</button>
          <button class="btn-delete" onclick="deletePlayer(${p.id})">Delete</button>
        </div>
      </div>
    `;
    swapSection.classList.add('hidden');
    return;
  }
  
  if (selectedIds.length === 2) {
    const p1 = players.find(pl => pl.id === selectedIds[0]);
    const p2 = players.find(pl => pl.id === selectedIds[1]);
    
    details.innerHTML = '<div class="empty-state"><div class="hint-large">Swap Players</div></div>';
    
    document.getElementById('swap-p1').innerHTML = `
      <div class="name">${p1.name}</div>
      <div class="role">${p1.role}</div>
    `;
    document.getElementById('swap-p2').innerHTML = `
      <div class="name">${p2.name}</div>
      <div class="role">${p2.role}</div>
    `;
    
    swapSection.classList.remove('hidden');
    return;
  }
  
  details.innerHTML = `
    <div class="empty-state">
      <div class="hint-large">Select a player</div>
      <div class="hint-small">Click two to swap positions</div>
    </div>
  `;
  swapSection.classList.add('hidden');
}

function renderFormations() {
  const grid = document.getElementById('formation-list');
  grid.innerHTML = '';
  
  Object.entries(formations).forEach(([key, formation]) => {
    const btn = document.createElement('button');
    btn.textContent = formation.name;
    btn.classList.toggle('active', key === currentFormation);
    btn.onclick = () => switchFormation(key);
    grid.appendChild(btn);
  });
}

// Close modal on outside click
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Enter key in modal
document.getElementById('input-name').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') savePlayer();
});

// Init
loadSquadName();
render();
