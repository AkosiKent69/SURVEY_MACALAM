// Survey data storage - Where the legend stats go!
const surveyData = [];

// Get all the epic elements
const form = document.getElementById('surveyForm');
const surveyCard = document.getElementById('surveyCard');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');
const favoriteNumberInput = document.getElementById('favoriteNumber');
const charCounter = document.getElementById('charCounter');

// Character counter with extra swag
nameInput.addEventListener('input', function() {
    const length = this.value.length;
    const maxLength = 50;
    
    if (length > maxLength) {
        this.value = this.value.substring(0, maxLength);
        charCounter.innerHTML = `<span class="counter-text">🔥 ${maxLength}/${maxLength} characters - MAX POWER! 🔥</span>`;
    } else if (length > 40) {
        charCounter.innerHTML = `<span class="counter-text">⚡ ${length}/${maxLength} characters - Almost there! ⚡</span>`;
    } else if (length > 25) {
        charCounter.innerHTML = `<span class="counter-text">💪 ${length}/${maxLength} characters - Looking good! 💪</span>`;
    } else {
        charCounter.innerHTML = `<span class="counter-text">📝 ${length}/${maxLength} characters</span>`;
    }
});

// Validation functions with extra sauce
function validateName(name) {
    return name.trim().length > 0;
}

function validateAge(age) {
    const trimmedAge = age.trim();
    const isInteger = /^\d+$/.test(trimmedAge);
    const numAge = parseInt(trimmedAge);
    return isInteger && numAge > 0 && numAge < 150;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateFavoriteNumber(number) {
    const trimmedNumber = number.trim();
    return /^-?\d+$/.test(trimmedNumber);
}

// Show error with maximum meme energy
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.innerHTML = `<span class="error-emoji">${getRandomErrorEmoji()}</span> ${message}`;
    errorElement.classList.add('show');
    surveyCard.classList.add('shake');
    setTimeout(() => surveyCard.classList.remove('shake'), 600);
}

// Random error emojis for extra fun
function getRandomErrorEmoji() {
    const emojis = ['❌', '🚫', '💀', '🤦', '😵', '🙅', '⛔', '🚨'];
    return emojis[Math.floor(Math.random() * emojis.length)];
}

// Clear error function
function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.classList.remove('show');
}

// Clear errors on input (with positive vibes)
nameInput.addEventListener('input', () => clearError(nameInput, document.getElementById('nameError')));
ageInput.addEventListener('input', () => clearError(ageInput, document.getElementById('ageError')));
emailInput.addEventListener('input', () => clearError(emailInput, document.getElementById('emailError')));
favoriteNumberInput.addEventListener('input', () => clearError(favoriteNumberInput, document.getElementById('favoriteNumberError')));

// Form submission with MAXIMUM ENERGY
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;

    // Validate name
    if (!validateName(nameInput.value)) {
        showError(nameInput, document.getElementById('nameError'), 'Yo, we need your name fam! Don\'t be shy! 😎');
        isValid = false;
    }

    // Validate age
    if (!validateAge(ageInput.value)) {
        let errorMsg = 'Bruh, age is a NUMBER not words! 🧮';
        if (!/^\d+$/.test(ageInput.value.trim())) {
            errorMsg = 'Nice try! Use digits like 25, not "twenty-five" 🤪';
        } else if (parseInt(ageInput.value.trim()) >= 150) {
            errorMsg = 'Bruh are you a time traveler? That\'s too old! 👴';
        } else if (parseInt(ageInput.value.trim()) === 0) {
            errorMsg = 'Zero? You a ghost or something? 👻';
        }
        showError(ageInput, document.getElementById('ageError'), errorMsg);
        isValid = false;
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, document.getElementById('emailError'), 'That email ain\'t it chief! Need that @ symbol! 📧');
        isValid = false;
    }

    // Validate favorite number
    if (!validateFavoriteNumber(favoriteNumberInput.value)) {
        let errorMsg = 'Numbers only fam! No letters allowed! 🔢';
        if (!/^-?\d+$/.test(favoriteNumberInput.value.trim())) {
            errorMsg = 'Bro... use actual numbers! Like 7, not "seven" 🎲';
        }
        showError(favoriteNumberInput, document.getElementById('favoriteNumberError'), errorMsg);
        isValid = false;
    }

    // If everything is fire, let's gooooo!
    if (isValid) {
        const formData = {
            name: nameInput.value.trim(),
            age: parseInt(ageInput.value.trim()),
            email: emailInput.value.trim(),
            favoriteNumber: parseInt(favoriteNumberInput.value.trim()),
            timestamp: new Date().toISOString(),
            vibeLevel: '💯'
        };

        surveyData.push(formData);
        console.log('🔥 LEGENDARY SURVEY DATA STORED! 🔥', surveyData);
        console.log('Latest submission:', formData);

        // Delay redirect so you can see the console log
        setTimeout(() => {
            window.location.href = 'thankyou.html';
        }, 2000); // 2 seconds delay
    }
});