const coin = document.getElementById('coin');
const flipButton = document.getElementById('flip-button');
const flipStatus = document.getElementById('flip-status');
const headsCount = document.getElementById('heads-count');
const tailsCount = document.getElementById('tails-count');
const resetStatsButton = document.getElementById('reset-stats');

// Initialize stats
let stats = {
    heads: 0,
    tails: 0
};

// Load stats from localStorage
function loadStats() {
    const savedStats = localStorage.getItem('coinFlipStats');
    if (savedStats) {
        stats = JSON.parse(savedStats);
        updateStatsDisplay();
    }
}

// Initialize the coin flipper
function initCoinFlipper() {
    loadStats();
    
    flipButton.addEventListener('click', flipCoin);
    coin.addEventListener('click', flipCoin);
    resetStatsButton.addEventListener('click', resetStats);
}

// Flip the coin
function flipCoin() {
    // Check if animation is already running
    if (coin.classList.contains('animate-flip')) {
        return;
    }
    
    flipStatus.textContent = 'Flipping...';
    
    // Generate a random result (0 for heads, 1 for tails)
    const result = Math.floor(Math.random() * 2);
    
    // Add flip animation
    coin.classList.add('animate-flip');
    
    // Set the appropriate rotation for the result
    const rotations = 5; // Number of full rotations
    const endRotation = rotations * 360 + (result === 0 ? 0 : 180);
    
    // Add animation keyframes dynamically
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        @keyframes flip {
            0% { transform: rotateY(0); }
            100% { transform: rotateY(${endRotation}deg); }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Wait for animation to finish
    setTimeout(() => {
        if (result === 0) {
            // Heads
            stats.heads++;
            flipStatus.textContent = 'Result: Heads!';
        } else {
            // Tails
            stats.tails++;
            flipStatus.textContent = 'Result: Tails!';
        }
        
        // Update stats display
        updateStatsDisplay();
        
        // Save stats
        saveStats();
        
        // Remove animation class
        coin.classList.remove('animate-flip');
        
        // Remove the style element
        document.head.removeChild(styleElement);
    }, 3000);
}

// Update the stats display
function updateStatsDisplay() {
    headsCount.textContent = stats.heads;
    tailsCount.textContent = stats.tails;
}

// Reset stats
function resetStats() {
    stats.heads = 0;
    stats.tails = 0;
    updateStatsDisplay();
    saveStats();
    flipStatus.textContent = 'Stats reset';
}

// Save stats to localStorage
function saveStats() {
    localStorage.setItem('coinFlipStats', JSON.stringify(stats));
}

// Add styles for heads and tails
const coinStyle = document.createElement('style');
coinStyle.textContent = `
.heads {
    background: linear-gradient(45deg, #f1c40f, #e67e22);
    z-index: 1;
}

.heads:before {
    content: 'H';
    color: #2c3e50;
}

.tails {
    background: linear-gradient(45deg, #95a5a6, #7f8c8d);
    transform: rotateY(180deg);
}

.tails:before {
    content: 'T';
    color: #2c3e50;
}
`;
document.head.appendChild(coinStyle);

// Initialize the coin flipper on page load
initCoinFlipper();
