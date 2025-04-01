const textDisplay = document.getElementById('text-display');
const keys = document.querySelectorAll('.key'); // Select all elements with class 'key'

// --- Event Listener for Physical Keyboard Press ---
window.addEventListener('keydown', function(e) {
    const keyElement = document.querySelector(`.key[data-key="${e.code}"]`);

    if (!keyElement) return;

    // Prevent default behavior ONLY if the target isn't the textarea itself
    // (Allows navigation keys like arrows inside textarea if not readonly)
    // However, since it's readonly, we can prevent default more broadly
    // if we are handling the key.
     e.preventDefault();

    keyElement.classList.add('active');
    handleInput(e.key, e.code);
});

// --- Event Listener for Physical Keyboard Release ---
window.addEventListener('keyup', function(e) {
    const keyElement = document.querySelector(`.key[data-key="${e.code}"]`);
    if (!keyElement) return;
    keyElement.classList.remove('active');
});


// --- Function to Handle Text Input ---
function handleInput(key, code) {
    // *** UPDATED TO USE .value ***
    if (code === 'Backspace') {
        textDisplay.value = textDisplay.value.slice(0, -1);
    } else if (code === 'Space') {
        textDisplay.value += ' ';
    } else if (code === 'Enter') {
        textDisplay.value += '\n';
    } else if (code === 'Tab') {
         textDisplay.value += '    '; // Or handle focus change if not readonly
    }
    else if (key && key.length === 1) {
        textDisplay.value += key;
    }

    // Keep textarea scrolled to the bottom (optional)
    textDisplay.scrollTop = textDisplay.scrollHeight;
}

// --- Add Click/Touch Listeners for Virtual Keyboard ---
keys.forEach(key => {
    key.addEventListener('mousedown', function() {
        const keyCode = this.getAttribute('data-key');
        let character = this.textContent;
        // Simplified character determination (same as before)
        if (keyCode === 'Space') character = ' ';
        else if (keyCode === 'Enter') character = '\n';
        else if (keyCode === 'Tab') character = '    ';
        else if (keyCode === 'Backspace') character = null;
        else if (character.length > 1 && !['Backspace', 'Enter', 'Tab', 'Shift', 'Ctrl', 'Alt', 'CapsLock'].includes(keyCode)) {
             character = character[0];
        } else if (character.length > 1) {
             character = '';
        }

        this.classList.add('active');

        if (keyCode === 'Backspace') {
            handleInput(null, keyCode); // Handle backspace
        } else if (character) {
             handleInput(character, keyCode); // Handle other chars
        }

         // Optional: Focus the textarea when a virtual key is pressed
         textDisplay.focus();
    });

    key.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });
    key.addEventListener('mouseleave', function() {
         this.classList.remove('active');
    });

    // Basic touch support
     key.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.dispatchEvent(new MouseEvent('mousedown'));
    });
    key.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.dispatchEvent(new MouseEvent('mouseup'));
    });
});

// Allow clicking into the textarea to show cursor
textDisplay.addEventListener('focus', function() {
    // You could add a visual indicator if needed, but cursor appears automatically
    console.log("Textarea focused");
});