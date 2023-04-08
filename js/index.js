const monstersUrl = 'http://localhost:3000/monsters';
let currentPage = 1;

// Load the first 50 monsters on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchMonsters();
});

function fetchMonsters() {
  fetch(`${monstersUrl}?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
    .then(monsters => {
      monsters.forEach(monster => {
        renderMonster(monster);
      });
    });
}

function renderMonster(monster) {
  const monsterContainer = document.querySelector('#monster-container');
  const monsterCard = document.createElement('div');
  monsterCard.innerHTML = `
    <h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Description: ${monster.description}</p>
  `;
  monsterContainer.appendChild(monsterCard);
}

// Handle form submission to create a new monster
const monsterForm = document.querySelector('#monster-form');
monsterForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.querySelector('#name').value;
  const age = document.querySelector('#age').value;
  const description = document.querySelector('#description').value;

  const newMonster = {
    name: name,
    age: age,
    description: description
  };

  fetch(monstersUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newMonster)
  })
    .then(response => response.json())
    .then(monster => {
      renderMonster(monster);
      monsterForm.reset();
    });
});

// Handle the load more button click to show the next 50 monsters
const loadMoreButton = document.querySelector('#load-more');
loadMoreButton.addEventListener('click', () => {
  currentPage++;
  fetchMonsters();
});
