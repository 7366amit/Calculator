let display = document.getElementById('display');

function appendNumber(number) {
    display.value += number;
}

function appendOperator(operator) {
    display.value += operator;
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
function setDynamicBackground(latitude, longitude) {
    const now = new Date();
    const hour = now.getHours();
    const sunrise = 6; // Approximate sunrise hour
    const sunset = 18; // Approximate sunset hour

    // Adjust sunrise and sunset times based on location (simple approximation)
    // You can refine this with more accurate solar calculations
    if (latitude < 0) { // Southern Hemisphere
        sunrise += 1;
        sunset -= 1;
    }

    const body = document.body;

    if (hour >= sunrise && hour < 12) {
        // Morning: from sunrise to noon
        body.style.background = 'linear-gradient(45deg, #FFD194, #70E1F5)';
    } else if (hour >= 12 && hour < sunset) {
        // Afternoon: from noon to sunset
        body.style.background = 'linear-gradient(45deg, #FF7E5F, #FEB47B)';
    } else if (hour >= sunset && hour < 20) {
        // Evening: from sunset to 9 PM
        body.style.background = 'linear-gradient(45deg, #6a82fb, #fc5c7d)';
    } else {
        // Night: from 9 PM to sunrise
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
            // Fallback in case of error or user denies location access
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
