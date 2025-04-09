const minInput = document.getElementById('min-number');
const maxInput = document.getElementById('max-number');
const generateButton = document.getElementById('generate-button');
const randomNumberDisplay = document.getElementById('random-number');
const generatorStatus = document.getElementById('generator-status');
const generationHistory = document.getElementById('generation-history');
const clearHistoryButton = document.getElementById('clear-history');

// Load history from localStorage
let history = JSON.parse(localStorage.getItem('randomNumberHistory')) || [];

// Initialize the generator
function initGenerator() {
    updateHistoryDisplay();
    
    generateButton.addEventListener('click', generateRandomNumber);
    clearHistoryButton.addEventListener('click', clearHistory);
    
    // Add input validation
    minInput.addEventListener('change', validateInputs);
    maxInput.addEventListener('change', validateInputs);
}

// Generate a random number
function generateRandomNumber() {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    
    if (isNaN(min) || isNaN(max)) {
        generatorStatus.textContent = 'Please enter valid numbers';
        return;
    }
    
    if (min >= max) {
        generatorStatus.textContent = 'Maximum must be greater than minimum';
        return;
    }
    
    // Generate the random number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
    // Animate the result
    animateNumberDisplay(randomNumber);
    
    // Add to history
    const timestamp = new Date().toLocaleTimeString();
    const historyEntry = {
        min,
        max,
        result: randomNumber,
        timestamp
    };
    
    history.unshift(historyEntry);
    
    // Limit history to 20 entries
    if (history.length > 20) {
        history.pop();
    }
    
    // Save to localStorage
    saveHistory();
    
    // Update the history display
    updateHistoryDisplay();
    
    generatorStatus.textContent = `Generated number between ${min} and ${max}`;
}

// Animate the number display
function animateNumberDisplay(number) {
    // Reset display to question mark
    randomNumberDisplay.textContent = '?';
    
    // Add animation class
    randomNumberDisplay.classList.add('animate-number');
    
    // Generate random numbers during animation
    let iterations = 0;
    const interval = setInterval(() => {
        randomNumberDisplay.textContent = Math.floor(Math.random() * 1000);
        iterations++;
        
        if (iterations >= 10) {
            clearInterval(interval);
            randomNumberDisplay.textContent = number;
            randomNumberDisplay.classList.remove('animate-number');
        }
    }, 80);
}

// Validate inputs to ensure maximum is greater than minimum
function validateInputs() {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    
    if (!isNaN(min) && !isNaN(max) && min >= max) {
        generatorStatus.textContent = 'Maximum must be greater than minimum';
        generateButton.disabled = true;
    } else {
        generatorStatus.textContent = 'Set your range and generate a random number';
        generateButton.disabled = false;
    }
}

// Update the history display
function updateHistoryDisplay() {
    generationHistory.innerHTML = '';
    
    if (history.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No history yet';
        generationHistory.appendChild(emptyMessage);
        return;
    }
    
    history.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.timestamp}: Generated ${entry.result} (range: ${entry.min} to ${entry.max})`;
        generationHistory.appendChild(listItem);
    });
}

// Clear history
function clearHistory() {
    history = [];
    localStorage.removeItem('randomNumberHistory');
    updateHistoryDisplay();
    generatorStatus.textContent = 'History cleared';
}

// Save history to localStorage
function saveHistory() {
    localStorage.setItem('randomNumberHistory', JSON.stringify(history));
}

// Add animation keyframes to the document
const style = document.createElement('style');
style.textContent = `
@keyframes animate-number {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
}

.animate-number {
    animation: animate-number 0.2s;
}
`;
document.head.appendChild(style);

// Initialize the generator on page load
initGenerator();
