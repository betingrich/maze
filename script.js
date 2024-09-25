const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const pointsDisplay = document.getElementById('points');
const coinsDisplay = document.getElementById('coins');
const timerDisplay = document.getElementById('timer');
const buyJumpBootsButton = document.getElementById('buy-jump-boots');
const buyJetpackButton = document.getElementById('buy-jetpack');
const signupButton = document.getElementById('signup-button');
const usernameInput = document.getElementById('username');
const dobInput = document.getElementById('dob');
const congratulationsDisplay = document.getElementById('congratulations');
const congratUsername = document.getElementById('congrat-username');

let playerPosition = { x: 0, y: 0 };
let isMoving = true;
let points = 0;
let coins = 0; // Coins collected
let jumpBoots = false; 
let jetpack = false; 
let timer; 
let timeRemaining = 60; 

// Function to update player position
function updatePlayerPosition() {
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
}

// Function to update points and coins display
function updatePointsAndCoinsDisplay() {
    pointsDisplay.innerText = `Points: ${points}`;
    coinsDisplay.innerText = `Coins: ${coins}`;
}

// Function to start the timer
function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        timerDisplay.innerText = `Time: ${timeRemaining}`;
        if (timeRemaining <= 0) {
            clearInterval(timer);
            alert("Time's up! Game over.");
            // Reset the game or implement game over logic here
        }
    }, 1000);
}

// Function to handle buying boosts
buyJumpBootsButton.addEventListener('click', () => {
    if (coins >= 3 && !jumpBoots) {
        coins -= 3;
        jumpBoots = true;
        updatePointsAndCoinsDisplay();
        alert('You bought Jump Boots! You can jump over 2 walls.');
    } else {
        alert('Not enough coins or already bought!');
    }
});

buyJetpackButton.addEventListener('click', () => {
    if (coins >= 6 && !jetpack) {
        coins -= 6;
        jetpack = true;
        updatePointsAndCoinsDisplay();
        alert('You bought a Jetpack! You can fly over 3 walls.');
    } else {
        alert('Not enough coins or already bought!');
    }
});

// Signup function
signupButton.addEventListener('click', () => {
    const username = usernameInput.value;
    const dob = dobInput.value;
    if (username && dob) {
        alert(`Welcome, ${username}!`);
    } else {
        alert('Please fill in all fields.');
    }
});

// Coin collection
document.querySelectorAll('.coin').forEach(coin => {
    coin.addEventListener('click', () => {
        coins += 1; // Earn 1 coin for each coin collected
        updatePointsAndCoinsDisplay();
        coin.style.display = 'none'; // Hide the collected coin
    });
});

// Function to check for maze completion (for demo purposes, we can simulate this)
function completeMaze() {
    clearInterval(timer);
    coins += 5; // Earn 5 coins for completing the maze
    updatePointsAndCoinsDisplay();
    congratUsername.innerText = usernameInput.value; // Display the username
    congratulationsDisplay.style.display = 'block'; // Show congratulations message
}

// Event listener for key presses (move logic)
document.addEventListener('keydown', (event) => {
    const step = 30;

    switch (event.key) {
        case 'ArrowUp':
            if (playerPosition.y > 0) playerPosition.y -= step;
            break;
        case 'ArrowDown':
            if (playerPosition.y < gameContainer.clientHeight - 30) playerPosition.y += step;
            break;
        case 'ArrowLeft':
            if (playerPosition.x > 0) playerPosition.x -= step;
            break;
        case 'ArrowRight':
            if (playerPosition.x < gameContainer.clientWidth - 30) playerPosition.x += step;
            break;
        case 'Enter': // Simulate completing the maze when Enter is pressed
            completeMaze();
            break
                    break;
    }

    // Update player position
    updatePlayerPosition();
});

// Toggle controls function
const toggleButtonControls = () => {
    const buttons = document.querySelectorAll('#controls button');
    buttons.forEach(button => {
        button.classList.toggle('hidden');
    });
};

// Add event listener for toggle control button
document.getElementById('toggle-controls').addEventListener('click', toggleButtonControls);

// Start the game
startTimer();
updatePlayerPosition();
