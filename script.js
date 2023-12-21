document.addEventListener('DOMContentLoaded', function () {
    const drawCardButton = document.getElementById('draw-card-button');
    const cards = document.querySelectorAll('.card');
    const navDotsContainer = document.querySelector('.nav-dots'); // Container for nav dots
    const navDots = document.querySelectorAll('.nav-dots .dot');
    let currentCardIndex = 0; // Start with the first card
    let cardData = [];

    // Initially hide nav dots
    navDotsContainer.style.visibility = 'hidden';

    // Set the first card as visible
    cards[currentCardIndex].style.display = 'flex';
    navDots[currentCardIndex].classList.add('active');

    drawCardButton.addEventListener('click', function () {
        if (drawCardButton.textContent === 'Draw') {
            drawNewCard();
            // Make nav dots visible after drawing cards
            navDotsContainer.style.visibility = 'visible';
        } else {
            resetCards();
            // Hide nav dots after resetting the game
            navDotsContainer.style.visibility = 'hidden';
        }
    });

    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showCard(index);
        });
    });

    function showCard(index) {
        // Hide the currently displayed card
        cards[currentCardIndex].style.display = 'none';
        navDots[currentCardIndex].classList.remove('active');

        // Show the new card
        cards[index].style.display = 'flex';
        navDots[index].classList.add('active');

        currentCardIndex = index;
    }

   function drawNewCard() {
    fetch('cards.json')
        .then(response => response.json())
        .then(data => {
            cardData = data;
            cards.forEach(card => {
                const category = card.dataset.category;
                const backSide = card.querySelector('.back-side');
                const textElement = backSide.querySelector('p');
                const headingElement = backSide.querySelector('h2'); // Might be null for 'plot'

                let textContent, headingContent;
                if (category === 'plot') {
                    // Handle 'plot' differently as it has no headings
                    textContent = cardData[category][Math.floor(Math.random() * cardData[category].length)];
                    headingElement.style.display = 'none'; // Hide heading for 'plot'
                } else {
                    // Other categories with both headings and texts
                    const randomIndex = Math.floor(Math.random() * cardData[category].texts.length);
                    textContent = cardData[category].texts[randomIndex];
                    headingContent = cardData[category].headings[randomIndex];
                    headingElement.textContent = headingContent;
                }

                backSide.style.backgroundImage = `url('img/card-${category}.svg')`;
                textElement.textContent = textContent;

                card.classList.add('flipped');
            });
            drawCardButton.textContent = 'Reset';
        })
        .catch(error => {
            console.error('Error fetching card data:', error);
        });
}


    function resetCards() {
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.style.display = 'none'; // Hide all cards
            card.querySelector('.back-side').style.backgroundImage = '';
            card.querySelector('p').textContent = '';
        });

        // Reset the display of the first card and its nav dot
        cards[0].style.display = 'flex';
        navDots[0].classList.add('active');
        currentCardIndex = 0;

        drawCardButton.textContent = 'Draw';
    }
});
