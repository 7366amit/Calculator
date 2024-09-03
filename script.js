const display = document.getElementById('display');
const historyList = document.getElementById('history-list');
const historySection = document.getElementById('history-section');
const toggleHistoryButton = document.getElementById('toggle-history');
let history = [];

// Function to append text to the display
function appendToDisplay(value) {
    display.value += value;
}

// Functions for calculator operations
function appendNumber(number) {
    appendToDisplay(number);
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (/[+\-*/]/.test(lastChar)) return;
    appendToDisplay(operator);
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = eval(display.value);
        addToHistory(display.value, result);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Function to add calculation to history with timestamp
function addToHistory(expression, result) {
    const timestamp = new Date().toLocaleString(); // Get current date and time
    const historyItem = `${expression} = ${result}`;
    history.push({ expression: historyItem, timestamp: timestamp });

    // Update history display
    updateHistory();
}

function updateHistory() {
    historyList.innerHTML = ''; // Clear previous history

    if (history.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = 'No history available';
        emptyMessage.style.textAlign = 'center'; // Center the text
        historyList.appendChild(emptyMessage);
    } else {
        history.forEach(item => {
            const listItem = document.createElement('li');
            
            // Expression
            const expressionElement = document.createElement('div');
            expressionElement.textContent = item.expression;

            // Timestamp
            const timestampElement = document.createElement('div');
            timestampElement.textContent = item.timestamp;
            timestampElement.style.color = '#FF5733'; // Highlight color for the timestamp
            timestampElement.style.fontSize = '0.85em';
            timestampElement.style.marginTop = '5px';

            listItem.appendChild(expressionElement);
            listItem.appendChild(timestampElement);
            historyList.appendChild(listItem);
        });
    }
}

function calculateSin() {
    const result = Math.sin(toRadians(parseFloat(display.value)));
    addToHistory(`sin(${display.value})`, result);
    display.value = result;
}

function calculateCos() {
    const result = Math.cos(toRadians(parseFloat(display.value)));
    addToHistory(`cos(${display.value})`, result);
    display.value = result;
}

function calculateTan() {
    const result = Math.tan(toRadians(parseFloat(display.value)));
    addToHistory(`tan(${display.value})`, result);
    display.value = result;
}

function calculateLog() {
    const result = Math.log10(parseFloat(display.value));
    addToHistory(`log(${display.value})`, result);
    display.value = result;
}

function calculateSqrt() {
    const result = Math.sqrt(parseFloat(display.value));
    addToHistory(`√(${display.value})`, result);
    display.value = result;
}

function calculatePow() {
    let base = prompt("Enter base:");
    let exponent = prompt("Enter exponent:");
    const result = Math.pow(parseFloat(base), parseFloat(exponent));
    addToHistory(`${base}^${exponent}`, result);
    display.value = result;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key.toLowerCase();

    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'enter') {
        event.preventDefault();
        calculate();
    } else if (key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'backspace') {
        deleteLast();
    } else if (key === 'escape') {
        clearDisplay();
    } else if (key === 'h') {
        toggleHistory();
    }
}

document.addEventListener('keydown', handleKeyboardInput);

// Function to toggle history section visibility
function toggleHistory() {
    if (historySection.style.display === 'none' || historySection.style.display === '') {
        historySection.style.display = 'block';
        toggleHistoryButton.textContent = 'Hide';
    } else {
        historySection.style.display = 'none';
        toggleHistoryButton.textContent = 'History';
    }
}

toggleHistoryButton.addEventListener('click', toggleHistory);

// Hide history when clicking outside of it
document.addEventListener('click', (event) => {
    if (!historySection.contains(event.target) && !toggleHistoryButton.contains(event.target)) {
        historySection.style.display = 'none';
        toggleHistoryButton.textContent = 'History';
    }
});

// Prevent hiding when clicking inside the history section
historySection.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Function to set dynamic background based on location
function setDynamicBackground(latitude, longitude) {
    const now = new Date();
    const hour = now.getHours();
    let sunrise = 6;
    let sunset = 18;

    if (latitude < 0) {
        sunrise += 1;
        sunset -= 1;
    }

    const body = document.body;

    if (hour >= sunrise && hour < 12) {
        body.style.background = 'linear-gradient(45deg, #FFD194, #70E1F5)';
    } else if (hour >= 12 && hour < sunset) {
        body.style.background = 'linear-gradient(45deg, #FF7E5F, #FEB47B)';
    } else if (hour >= sunset && hour < 20) {
        body.style.background = 'linear-gradient(45deg, #6a82fb, #fc5c7d)';
    } else {
        body.style.background = 'linear-gradient(45deg, #2C3E50, #4CA1AF)';
    }
}

function getLocationAndSetBackground() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setDynamicBackground(latitude, longitude);
        }, function(error) {
            console.error('Geolocation error: ', error);
            setDynamicBackground(0, 0);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        setDynamicBackground(0, 0);
    }
}

getLocationAndSetBackground();
