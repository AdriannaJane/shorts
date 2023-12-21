// Define categories object to store card data
const categories = {
  plot: [],
  type: [],
  setting: [],
  tone: []
};

// Load the JSON file and initialize the categories
fetch('cards.json')
  .then(response => response.json())
  .then(data => {
    Object.assign(categories, data);
    initializeGame();
    setCardHeight(); // Ensure card heights are set after fetching data
  })
  .catch(error => console.error('Error loading card data:', error));

function initializeGame() {
  // Set the initial height for all cards
  setCardHeight();

  // Show the back of the first card
  const firstCard = document.querySelector('.card');
  firstCard.classList.add('active');
}

function drawCards() {
  showCard(1);
  const cards = document.querySelectorAll('.card');
  const categoriesKeys = Object.keys(categories);

  cards.forEach((card, index) => {
    const category = categoriesKeys[index];
    const randomIndex = Math.floor(Math.random() * categories[category].length);
    const text = categories[category][randomIndex];

    card.style.backgroundImage = `url('img/card-${category}.svg')`;
    card.innerHTML = `<div class="card-content">${text}</div>`;
    card.classList.add('flipped');
  });

  document.getElementById('draw').style.display = 'none';
  document.getElementById('reset').style.display = 'block';
}

function resetGame() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.innerHTML = '';
    card.style.backgroundImage = `url('img/card-back.svg')`;
    card.classList.remove('flipped');
  });

  document.getElementById('draw').style.display = 'block';
  document.getElementById('reset').style.display = 'none';
  showCard(1); // Reset to show the first card
}

function showCard(index) {
  const cards = document.querySelectorAll('.card');
  const dots = document.querySelectorAll('.dot');

  // Hide all cards and show only the selected one
  cards.forEach(card => card.classList.remove('active'));
  cards[index - 1].classList.add('active');

  // Update the dots to match the selected card
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index - 1].classList.add('active');
}
function setCardHeight() {
  const cardContainer = document.getElementById('card-container');
  const cardContainerWidth = cardContainer.offsetWidth;
  const cards = document.querySelectorAll('.card');

  // Calculate the height based on the width and the aspect ratio 3.5:2.5
  const cardHeight = cardContainerWidth * (3.5 / 2.5);
  
  cards.forEach(card => {
    card.style.height = `${cardHeight}px`;
    card.style.width = `${cardContainerWidth}px`; // Set width to 100% of the container width
    card.style.borderRadius = '50px'; // Apply border radius
  });
}

// Call setCardHeight on window resize and after the DOM is fully loaded
window.addEventListener('resize', setCardHeight);

document.addEventListener('DOMContentLoaded', () => {
  setCardHeight(); // Call this function to set the height as soon as the page loads
  initializeGame(); // Then initialize the game
});