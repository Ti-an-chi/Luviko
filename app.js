/* app.js */
const STORAGE_KEY = 'fm_players_v2';
const STORAGE_FORMATION = 'fm_formation';

const formations = {
  "442": [
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
  ],
  "433": [
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
  ],
  "352": [
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
  ],
  "4231": [
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
  ]
};

let currentFormation = localStorage.getItem(STORAGE_FORMATION) || "442";
let selectedIds = [];

// Data Management
function loadPlayers() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Corrupted save data");
    }
  }
  // Default squad
  return [
    {id: 1, name: "De Gea", role: "GK"},
    {id: 2, name: "Shaw", role: "LB"},
    {id: 3, name: "Martinez", role: "CB"},
    {id: 4, name: "Varane", role: "CB"},
    {id: 5, name: "Dalot", role: "RB"},
    {id: 6, name: "Rashford", role: "LM"},
    {id: 7, name: "Casemiro", role: "CM"},
    {id: 8, name: "Mainoo", role: "CM"},
    {id: 9, name: "Antony", role: "RM"},
    {id: 10, name: "Hojlund", role: "ST"},
    {id: 11, name: "Garnacho", role: "ST"},
    {id: 12, name: "Onana", role: "GK"},
    {id: 13, name: "Maguire", role: "CB"},
    {id: 14, name: "Lindelof", role: "CB"},
    {id: 15, name: "Eriksen", role: "CM"},
    {id: 16, name: "Mount", role: "CAM"},
    {id: 17, name: "Bruno", role: "CAM"},
    {id: 18, name: "Sancho", role: "LW"}
  ];
}

let players = loadPlayers();

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
  localStorage.setItem(STORAGE_FORMATION, currentFormation);
}

// Get slot assignment for a player (null = sub)
function getSlot(playerId) {
  const formation = formations[currentFormation];
  const slot = formation.find(s => s.id === playerId);
  return slot || null;
}

function isOnPitch(playerId) {
  const formation = formations[currentFormation];
  return formation.some(s => s.id === playerId);
}

// Formation Switching - Clean Logic
function switchFormation(name) {
  if (!formations[name]) return;
  
  const newFormation = formations[name];
  const assigned = new Set();
  const newAssignments = new Map(); // slotId -> playerId
  
  // Step 1: Match by exact role
  newFormation.forEach(slot => {
    const match = players.find(p => 
      p.role === slot.role && 
      !assigned.has(p.id)
    );
    if (match) {
      newAssignments.set(slot.id, match.id);
      assigned.add(match.id);
    }
  });
  
  // Step 2: Fill empty slots with any unassigned players
  const unassigned = players.filter(p => !assigned.has(p.id));
  newFormation.forEach(slot => {
    if (!newAssignments.has(slot.id) && unassigned.length > 0) {
      const player = unassigned.shift();
      newAssignments.set(slot.id, player.id);
      assigned.add(player.id);
    }
  });
  
  // Step 3: Update player IDs to match their new slots (or subs)
  // Players in newAssignments get their ID changed to slot.id
  // Players not in assigned stay as-is (subs)
  const newPlayers = [];
  
  // First, handle all players that will be on pitch
  newAssignments.forEach((playerId, slotId) => {
    const player = players.find(p => p.id === playerId);
    newPlayers.push({...player, id: slotId});
  });
  
  // Then add subs (keep original IDs, ensure no conflicts)
  let nextId = 100;
  players.forEach(p => {
    if (!assigned.has(p.id)) {
      newPlayers.push({...p, id: nextId++});
    }
  });
  
  players = newPlayers;
  currentFormation = name;
  selectedIds = [];
  save();
  render();
}

// Selection Logic
function selectPlayer(id) {
  const idx = selectedIds.indexOf(id);
  
  // Toggle if already selected
  if (idx !== -1) {
    selectedIds.splice(idx, 1);
    render();
    return;
  }
  
  // Auto-swap if selecting sub + pitch player
  if (selectedIds.length === 1) {
    const p1 = players.find(p => p.id === selectedIds[0]);
    const p2 = players.find(p => p.id === id);
    const p1OnPitch = isOnPitch(p1.id);
    const p2OnPitch = isOnPitch(p2.id);
    
    if (p1OnPitch !== p2OnPitch) {
      // One is sub, one is pitch - auto swap
      swapPlayers(p1.id, p2.id);
      return;
    }
  }
  
  // Normal selection (max 2)
  if (selectedIds.length < 2) {
    selectedIds.push(id);
  } else {
    // Replace second selection
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
  
  // Swap IDs (which represent slot assignments)
  const tempId = p1.id;
  p1.id = p2.id;
  p2.id = tempId;
  
  selectedIds = [];
  save();
  render();
}

// Player Management
function addPlayer() {
  const name = prompt("Player name:");
  if (!name) return;
  
  const role = prompt("Position (e.g., CM, ST, GK):", "SUB") || "SUB";
  
  // Find next available ID (100+ for subs)
  const maxId = Math.max(...players.map(p => p.id), 99);
  
  players.push({
    id: maxId + 1,
    name: name.trim(),
    role: role.toUpperCase().trim()
  });
  
  save();
  render();
}

function editPlayer(id) {
  const player = players.find(p => p.id === id);
  
  const newName = prompt("New name:", player.name);
  if (newName === null) return; // Cancelled
  
  const newRole = prompt("New position:", player.role);
  if (newRole === null) return;
  
  if (newName.trim()) player.name = newName.trim();
  if (newRole.trim()) player.role = newRole.trim().toUpperCase();
  
  save();
  render();
}

function deletePlayer(id) {
  const player = players.find(p => p.id === id);
  if (!confirm(`Delete ${player.name}?`)) return;
  
  players = players.filter(p => p.id !== id);
  
  // If we deleted a pitch player, we need to handle the empty slot
  // The slot will be empty until someone is assigned to it
  
  selectedIds = selectedIds.filter(sid => sid !== id);
  save();
  render();
}

// Rendering
function render() {
  renderPitch();
  renderSubs();
  renderPanel();
  updateFormationButtons();
}

function renderPitch() {
  const pitch = document.getElementById('pitch');
  pitch.innerHTML = '';
  
  const formation = formations[currentFormation];
  
  formation.forEach(slot => {
    const player = players.find(p => p.id === slot.id);
    if (!player) return; // Empty slot
    
    const div = document.createElement('div');
    div.className = 'player';
    if (selectedIds.includes(player.id)) div.classList.add('selected');
    
    div.innerHTML = `
      <span class="role">${player.role}</span>
      <span class="name">${player.name}</span>
    `;
    
    // CRITICAL: Use percentage with transform centering
    div.style.left = `${slot.x}%`;
    div.style.top = `${slot.y}%`;
    
    div.onclick = () => selectPlayer(player.id);
    pitch.appendChild(div);
  });
}

function renderSubs() {
  const container = document.getElementById('subs');
  // Keep the add button, remove rest
  const addBtn = container.querySelector('.add-btn');
  container.innerHTML = '';
  container.appendChild(addBtn);
  
  // Find subs (players whose ID doesn't match any slot in current formation)
  const formation = formations[currentFormation];
  const slotIds = new Set(formation.map(s => s.id));
  
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
  
  // Single selection - show player details
  if (selectedIds.length === 1) {
    const p = players.find(pl => pl.id === selectedIds[0]);
    const onPitch = isOnPitch(p.id);
    
    details.innerHTML = `
      <div class="player-card-large">
        <div class="role-badge">${p.role}</div>
        <div class="name">${p.name}</div>
        <div style="color: var(--text-muted); font-size: 12px; margin-bottom: 16px;">
          ${onPitch ? 'On Pitch' : 'Substitute'}
        </div>
        <div class="player-actions">
          <button class="btn-edit" onclick="editPlayer(${p.id})">Edit</button>
          <button class="btn-delete" onclick="deletePlayer(${p.id})">Delete</button>
        </div>
      </div>
    `;
    swapSection.classList.add('hidden');
    return;
  }
  
  // Two selections - show swap preview
  if (selectedIds.length === 2) {
    const p1 = players.find(pl => pl.id === selectedIds[0]);
    const p2 = players.find(pl => pl.id === selectedIds[1]);
    
    details.innerHTML = '<div class="empty-state">Two players selected</div>';
    
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
  
  // No selection
  details.innerHTML = '<div class="empty-state">Select a player to view details<br><br>Click two players to swap</div>';
  swapSection.classList.add('hidden');
}

function updateFormationButtons() {
  document.querySelectorAll('.formations button').forEach(btn => {
    btn.classList.toggle('active', 
      btn.getAttribute('onclick').includes(`'${currentFormation}'`)
    );
  });
}

// Initialize
render();
