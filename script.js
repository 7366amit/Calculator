const display = document.getElementById('display');

// Function to append text to the display
function appendToDisplay(value) {
    display.value += value;
}

// Functions for calculator operations
function appendNumber(number) {
    appendToDisplay(number);
}

function appendOperator(operator) {
    // Ensure operator isn't appended if last character is already an operator
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
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateSin() {
    display.value = Math.sin(toRadians(parseFloat(display.value)));
}

function calculateCos() {
    display.value = Math.cos(toRadians(parseFloat(display.value)));
}

function calculateTan() {
    display.value = Math.tan(toRadians(parseFloat(display.value)));
}

function calculateLog() {
    display.value = Math.log10(parseFloat(display.value));
}

function calculateSqrt() {
    display.value = Math.sqrt(parseFloat(display.value));
}

function calculatePow() {
    let base = prompt("Enter base:");
    let exponent = prompt("Enter exponent:");
    display.value = Math.pow(parseFloat(base), parseFloat(exponent));
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to handle keyboard input
function handleKeyboardInput(event) {
    const key = event.key;

    // Number keys and operators
    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
    } else if (key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
}

// Add event listener for keyboard input
document.addEventListener('keydown', handleKeyboardInput);

// Function to set dynamic background based on location
function setDynamicBackground(latitude, longitude) {
    const now = new Date();
    const hour = now.getHours();
    const sunrise = 6; // Approximate sunrise hour
    const sunset = 18; // Approximate sunset hour

    if (latitude < 0) { // Southern Hemisphere
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

// Function to get location and set background
function getLocationAndSetBackground() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setDynamicBackground(latitude, longitude);
        }, function(error) {
            console.error('Geolocation error: ', error);
            setDynamicBackground(0, 0); // Use default location (Equator)
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        setDynamicBackground(0, 0); // Use default location (Equator)
    }
}

// Set the background when the page loads
getLocationAndSetBackground();
