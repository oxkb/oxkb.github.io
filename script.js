// script.js
document.addEventListener('DOMContentLoaded', () => {
    const outputTextarea = document.getElementById('output');
    const baseKeysContainer = document.getElementById('base-keys');
    const variationKeysContainer = document.getElementById('variation-keys');
    const punctuationKeysContainer = document.getElementById('punctuation-keys');
    const symbolEmojiKeysContainer = document.getElementById('symbol-emoji-keys');
    const numberKeysContainer = document.getElementById('number-keys');
    const specialKeysContainer = document.getElementById('special-keys');

    // --- Character Data ---
    const fidelGroups = {
        // ... (fidelGroups data remains the same) ...
        'ሀ': ['ሀ', 'ሁ', 'ሂ', 'ሃ', 'ሄ', 'ህ', 'ሆ', 'ኋ'], 'ለ': ['ለ', 'ሉ', 'ሊ', 'ላ', 'ሌ', 'ል', 'ሎ', 'ሏ'],
        'ሐ': ['ሐ', 'ሑ', 'ሒ', 'ሓ', 'ሔ', 'ሕ', 'ሖ', 'ሗ'], 'መ': ['መ', 'ሙ', 'ሚ', 'ማ', 'ሜ', 'ም', 'ሞ', 'ሟ'],
        'ሠ': ['ሠ', 'ሡ', 'ሢ', 'ሣ', 'ሤ', 'ሥ', 'ሦ', 'ሧ'], 'ረ': ['ረ', 'ሩ', 'ሪ', 'ራ', 'ሬ', 'ር', 'ሮ', 'ሯ'],
        'ሰ': ['ሰ', 'ሱ', 'ሲ', 'ሳ', 'ሴ', 'ስ', 'ሶ', 'ሷ'], 'ሸ': ['ሸ', 'ሹ', 'ሺ', 'ሻ', 'ሼ', 'ሽ', 'ሾ', 'ሿ'],
        'ቀ': ['ቀ', 'ቁ', 'ቂ', 'ቃ', 'ቄ', 'ቅ', 'ቆ', 'ቋ' /* ቈ ቊ ቋ ቌ ቍ */],
        'በ': ['በ', 'ቡ', 'ቢ', 'ባ', 'ቤ', 'ብ', 'ቦ', 'ቧ'], 'ተ': ['ተ', 'ቱ', 'ቲ', 'ታ', 'ቴ', 'ት', 'ቶ', 'ቷ'],
        'ቸ': ['ቸ', 'ቹ', 'ቺ', 'ቻ', 'ቼ', 'ች', 'ቾ', 'ቿ'], 'ኀ': ['ኀ', 'ኁ', 'ኂ', 'ኃ', 'ኄ', 'ኅ', 'ኆ', 'ኋ' /* ኈ ኊ ኋ ኌ ኍ */],
        'ነ': ['ነ', 'ኑ', 'ኒ', 'ና', 'ኔ', 'ን', 'ኖ', 'ኗ'], 'ኘ': ['ኘ', 'ኙ', 'ኚ', 'ኛ', 'ኜ', 'ኝ', 'ኞ', 'ኟ'],
        'አ': ['አ', 'ኡ', 'ኢ', 'ኣ', 'ኤ', 'እ', 'ኦ'], 'ከ': ['ከ', 'ኩ', 'ኪ', 'ካ', 'ኬ', 'ክ', 'ኮ', 'ኳ' /* ኰ ኲ ኳ ኴ ኵ */],
        'ኸ': ['ኸ', 'ኹ', 'ኺ', 'ኻ', 'ኼ', 'ኽ', 'ኾ','ዃ' /* ዀ ዂ ዃ ዄ ዅ */],
        'ወ': ['ወ', 'ዉ', 'ዊ', 'ዋ', 'ዌ', 'ው', 'ዎ'], 'ዐ': ['ዐ', 'ዑ', 'ዒ', 'ዓ', 'ዔ', 'ዕ', 'ዖ'],
        'ዘ': ['ዘ', 'ዙ', 'ዚ', 'ዛ', 'ዜ', 'ዝ', 'ዞ', 'ዟ'], 'ዠ': ['ዠ', 'ዡ', 'ዢ', 'ዣ', 'ዤ', 'ዥ', 'ዦ', 'ዧ'],
        'የ': ['የ', 'ዩ', 'ዪ', 'ያ', 'ዬ', 'ይ', 'ዮ'], // Note: 5th form is ዬ
        'ደ': ['ደ', 'ዱ', 'ዲ', 'ዳ', 'ዴ', 'ድ', 'ዶ', 'ዷ'], 'ጀ': ['ጀ', 'ጁ', 'ጂ', 'ጃ', 'ጄ', 'ጅ', 'ጆ', 'ጇ'],
        'ገ': ['ገ', 'ጉ', 'ጊ', 'ጋ', 'ጌ', 'ግ', 'ጎ', 'ጓ' /* ጐ ጒ ጓ ጔ ጕ */],
        'ጠ': ['ጠ', 'ጡ', 'ጢ', 'ጣ', 'ጤ', 'ጥ', 'ጦ', 'ጧ'], 'ጨ': ['ጨ', 'ጩ', 'ጪ', 'ጫ', 'ጬ', 'ጭ', 'ጮ', 'ጯ'],
        'ጰ': ['ጰ', 'ጱ', 'ጲ', 'ጳ', 'ጴ', 'ጵ', 'ጶ', 'ጷ'], 'ጸ': ['ጸ', 'ጹ', 'ጺ', 'ጻ', 'ጼ', 'ጽ', 'ጾ', 'ጿ'],
        'ፀ': ['ፀ', 'ፁ', 'ፂ', 'ፃ', 'ፄ', 'ፅ', 'ፆ', 'ፇ'], 'ፈ': ['ፈ', 'ፉ', 'ፊ', 'ፋ', 'ፌ', 'ፍ', 'ፎ', 'ፏ'],
        'ፐ': ['ፐ', 'ፑ', 'ፒ', 'ፓ', 'ፔ', 'ፕ', 'ፖ', 'ፗ']
    };

    const punctuationVirtual = ['፡', '።', '፣', '፤', '፥', '፦', '፧', '፨', '(', ')', '!', '?'];
    const numbersVirtual = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const specialKeysVirtual = ['Backspace', 'Space', 'Enter'];
    const symbolsAndEmojis = [
        '@', '#', '$', '%', '&', '*', '-', '+', '=', '/', '\\', '|', '<', '>',
        '😀', '😂', '👍', '🙏', '❤️'
    ];

    // --- Physical Keyboard Sequence Mapping ---
    let keySequence = '';
    let sequenceTimer = null;
    const SEQUENCE_TIMEOUT = 2000; // ms

    const sequenceMapping = {}; // Maps "le", "ly", "!" etc. to output chars
    const potentialPrefixes = new Set(); // Stores "l", "x", "Y", "lw" etc.
    const baseConsonantToSixthForm = {}; // Maps "l" -> "ል", "x" -> "እ", "Y" -> "ይ" etc.
    let lastDisplayedVariationsBase = null;

    // Define base key triggers (physical key -> base fidel)
    // ** UPDATED TRIGGERS **
    const baseKeyTriggers = {
        'h': 'ሀ', 'l': 'ለ', 'H': 'ሐ', 'm': 'መ', 'S': 'ሠ', 'r': 'ረ', 's': 'ሰ',
        'X': 'ሸ', // Shift+x for ሸ
        'q': 'ቀ', 'b': 'በ', 'v': 'ቨ', 't': 'ተ', 'c': 'ቸ',
        'V': 'ኀ', // Shift+v for ኀ
        'n': 'ነ', 'N': 'ኘ',
        'x': 'አ', // 'x' for አ family
        'k': 'ከ', 'K': 'ኸ', 'w': 'ወ', '`': 'ዐ', 'z': 'ዘ', 'Z': 'ዠ',
        // 'y': 'የ', // REMOVED: y is now for 5th form vowel
        'Y': 'የ', // NEW: Shift+y for የ family
        'd': 'ደ', 'j': 'ጀ', 'g': 'ገ', 'T': 'ጠ', 'C': 'ጨ', 'P': 'ጰ',
        // 'Y': 'ጸ', // REMOVED: Shift+y is now for የ family
        '~': 'ጸ', // NEW: Tilde key for ጸ as an example (choose another if preferred)
        'f': 'ፈ', 'p': 'ፐ'
    };

    // Generate sequence mappings
    for (const keyTrigger in baseKeyTriggers) {
        const baseFidel = baseKeyTriggers[keyTrigger];
        const variations = fidelGroups[baseFidel];
        if (!variations || variations.length < 7) continue;

        potentialPrefixes.add(keyTrigger); // The consonant key itself is a prefix (e.g., "l", "Y")

        // ** UPDATED VOWEL MAPPING LOGIC **
        sequenceMapping[keyTrigger + 'e'] = variations[0]; // 1st form (ግዕዝ) - e.g., le = ለ, Ye = የ
        sequenceMapping[keyTrigger + 'u'] = variations[1]; // 2nd form (ካዕብ) - e.g., lu = ሉ, Yu = ዩ
        sequenceMapping[keyTrigger + 'i'] = variations[2]; // 3rd form (ሣልስ) - e.g., li = ሊ, Yi = ዪ
        sequenceMapping[keyTrigger + 'a'] = variations[3]; // 4th form (ራብዕ) - e.g., la = ላ, Ya = ያ
        // sequenceMapping[keyTrigger + 'ee'] = variations[4]; // REMOVED 'ee' mapping
        sequenceMapping[keyTrigger + 'y'] = variations[4]; // NEW: 5th form (ኃምስ) - using 'y' - e.g., ly = ሌ, Yy = ዬ
        // potentialPrefixes.add(keyTrigger + 'e'); // REMOVED: 'le' is no longer a prefix for 'lee'
        sequenceMapping[keyTrigger + 'o'] = variations[6]; // 7th form (ሳብዕ) - e.g., lo = ሎ, Yo = ዮ

        // Add mapping for simple labialized form (e.g., l + w + a = ሏ)
        if (variations.length > 7 && variations[7]) {
            const labializedSequence = keyTrigger + 'wa'; // e.g., "lwa"
            sequenceMapping[labializedSequence] = variations[7];
            potentialPrefixes.add(keyTrigger + 'w'); // Add "lw" as a prefix
        }

        // Store mapping for timer resolution (consonant key -> 6th form)
        baseConsonantToSixthForm[keyTrigger] = variations[5]; // 6th form (ሳድስ) - e.g., l -> ል, Y -> ይ
    }

    // Direct mappings (punctuation, Shift+Number for Ethiopic numerals)
    const directMappings = {
        '.': '።', ',': '፣', ';': '፤', ':': '፡', '?': '፧',
        '!': '፩', '@': '፪', '#': '፫', '$': '፬', '%': '፭',
        '^': '፮', '&': '፯', '*': '፰', '(': '፱', ')': '፲',
    };
    for (const key in directMappings) {
        sequenceMapping[key] = directMappings[key];
    }
    // Note: 'y' (lowercase) is NOT in baseKeyTriggers or directMappings,
    // so it will fall through and type its default character 'y'.



    /*
    // --- Helper Function to Create Keys ---
    function createKey(keyChar, container, clickHandler, cssClasses = []) {
        const keyElement = document.createElement('button');
        keyElement.textContent = keyChar;
        keyElement.classList.add('key', ...cssClasses);
        keyElement.addEventListener('click', clickHandler);
        container.appendChild(keyElement);
        return keyElement;
    }   */

// --- Helper Function to Create Keys ---
function createKey(keyChar, container, clickHandler, cssClasses = [], ariaLabel = null) { // Added ariaLabel parameter
    const keyElement = document.createElement('button');
    keyElement.textContent = keyChar;
    keyElement.classList.add('key', ...cssClasses);
    keyElement.addEventListener('click', clickHandler);

    // NEW: Add aria-label if provided, otherwise use keyChar
    keyElement.setAttribute('aria-label', ariaLabel || keyChar);

    container.appendChild(keyElement);
    return keyElement;
}

// --- Keyboard Initialization (Virtual Keyboard) ---
function initKeyboard() {
    // ... (other key creations) ...

    // 3. Symbol and Emoji Keys
    symbolsAndEmojis.forEach(item => {
        // Provide a more descriptive label if needed, especially for symbols
        let label = item;
        if (item === '@') label = 'At symbol';
        if (item === '#') label = 'Hash symbol';
        // Add more specific labels as needed...
        const itemKey = createKey(item, symbolEmojiKeysContainer, handleCharKeyClick, [], label); // Pass label
        itemKey.addEventListener('click', clearSequenceStateOnly);
    });

    // ... (number key creation) ...

    // 5. Special Keys
    specialKeysVirtual.forEach(keyName => {
        const classes = ['key-special'];
        let ariaLabel = keyName; // Default label
        if (keyName === 'Space') {
            classes.push('key-space');
            ariaLabel = 'Spacebar'; // More descriptive label
        }
        if (keyName === 'Backspace') {
            classes.push('key-backspace');
        }
        // Add more specific labels if needed (e.g., for Enter)
        createKey(keyName, specialKeysContainer, handleSpecialKeyClick, classes, ariaLabel); // Pass ariaLabel
    });
}




    // --- Event Handlers ---
    function resolveSequence() {
        if (sequenceTimer) {
             clearTimeout(sequenceTimer);
             sequenceTimer = null;
        }
        if (baseConsonantToSixthForm[keySequence]) {
            insertAtCursor(outputTextarea, baseConsonantToSixthForm[keySequence]);
        }
        keySequence = '';
    }

    function clearSequenceStateOnly() {
        if (sequenceTimer) clearTimeout(sequenceTimer);
        resolveSequence();
        keySequence = '';
    }

    function displayVariations(baseFidel) {
        const variations = fidelGroups[baseFidel];
        variationKeysContainer.innerHTML = '';

        if (variations) {
            variations.forEach(variation => {
                createKey(variation, variationKeysContainer, handleCharKeyClick);
            });
            lastDisplayedVariationsBase = baseFidel;
        } else {
            lastDisplayedVariationsBase = null;
        }
    }

    // Virtual Keyboard Click Handlers
    function handleBaseKeyClick(event) {
        clearSequenceStateOnly();
        const baseKey = event.target.textContent;
        displayVariations(baseKey);
    }

    function handleCharKeyClick(event) {
        clearSequenceStateOnly();
        const char = event.target.textContent;
        insertAtCursor(outputTextarea, char);
    }

    function handleSpecialKeyClick(event) {
        clearSequenceStateOnly();
        const keyType = event.target.textContent;
        processSpecialKey(keyType);
        outputTextarea.focus();
    }

    // Helper function to insert text
    function insertAtCursor(textarea, textToInsert) {
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const currentVal = textarea.value;
        textarea.value = currentVal.substring(0, startPos) + textToInsert + currentVal.substring(endPos);
        const newCursorPos = startPos + textToInsert.length;
        textarea.selectionStart = textarea.selectionEnd = newCursorPos;
        textarea.focus();
    }

     // Helper function to process Backspace, Space, Enter
     function processSpecialKey(keyType) {
         const currentVal = outputTextarea.value;
         const selectionStart = outputTextarea.selectionStart;
         const selectionEnd = outputTextarea.selectionEnd;

         switch (keyType) {
            case 'Backspace':
                if (selectionStart === selectionEnd && selectionStart > 0) {
                    outputTextarea.value = currentVal.substring(0, selectionStart - 1) + currentVal.substring(selectionEnd);
                    outputTextarea.selectionStart = outputTextarea.selectionEnd = selectionStart - 1;
                } else if (selectionStart !== selectionEnd) {
                     outputTextarea.value = currentVal.substring(0, selectionStart) + currentVal.substring(selectionEnd);
                     outputTextarea.selectionStart = outputTextarea.selectionEnd = selectionStart;
                }
                break;
            case 'Space': case ' ':
                insertAtCursor(outputTextarea, ' ');
                break;
            case 'Enter':
                insertAtCursor(outputTextarea, '\n');
                break;
        }
     }

    // --- Physical Keyboard Event Listener (Sequence Logic) ---
    outputTextarea.addEventListener('keydown', (event) => {
        if (event.ctrlKey || event.altKey || event.metaKey) {
            clearSequenceStateOnly();
            return;
        }

        const key = event.key;

        // 1. Handle Special Keys
        if (key === 'Backspace' || key === 'Enter' || key === ' ') {
            event.preventDefault();
            clearSequenceStateOnly();
            processSpecialKey(key);
            return;
        }

        // 2. Ignore Navigation/Modifier/Function keys, but resolve sequence first
        if (key.startsWith('Arrow') || key === 'Tab' || key === 'Escape' ||
            key === 'Home' || key === 'End' || key === 'PageUp' || key === 'PageDown' ||
            key === 'Delete' || key.startsWith('F') || key === 'Shift' ||
            key === 'Control' || key === 'Alt' || key === 'Meta' || key === 'CapsLock') {
            resolveSequence();
            return;
        }

        // --- Sequence Logic for character keys ---
        if (sequenceTimer) {
            clearTimeout(sequenceTimer);
            sequenceTimer = null;
        }

        // Use the actual key pressed for mapping lookups
        const keyForMapping = key;
        const potentialNewSequence = keySequence + keyForMapping;

        // A. Check if the potential new sequence is a complete, defined mapping (e.g., "le", "ly", "lwa", "!", "Yy")
        if (sequenceMapping.hasOwnProperty(potentialNewSequence)) {
            event.preventDefault();
            insertAtCursor(outputTextarea, sequenceMapping[potentialNewSequence]);
            keySequence = '';
            return;
        }

        // B. Check if the potential new sequence is a known prefix (e.g., "l", "x", "Y", "lw")
        if (potentialPrefixes.has(potentialNewSequence)) {
            event.preventDefault();
            keySequence = potentialNewSequence;
            sequenceTimer = setTimeout(resolveSequence, SEQUENCE_TIMEOUT);

            // Update variations display if the base consonant changed
            // Handle multi-char prefixes like "lw" correctly
            let baseTrigger = potentialNewSequence;
            if (potentialNewSequence.endsWith('w') && potentialNewSequence.length > 1) {
                 baseTrigger = potentialNewSequence.slice(0, -1); // Get 'l' from 'lw'
            } else if (potentialNewSequence.length > 1) {
                 // This case shouldn't happen with current prefixes, but good practice
                 baseTrigger = potentialNewSequence.charAt(0);
            }
            const baseFidel = baseKeyTriggers[baseTrigger];
            if (baseFidel && baseFidel !== lastDisplayedVariationsBase) {
                 displayVariations(baseFidel);
            }
            return;
        }

        // C. Key didn't form a match or prefix. Resolve old sequence.
        if (keySequence.length > 0) {
            resolveSequence();
        }

        // D. Check if the current key *itself* is a direct mapping (Punctuation, Shift+Number)
        if (sequenceMapping.hasOwnProperty(keyForMapping)) {
            event.preventDefault();
            insertAtCursor(outputTextarea, sequenceMapping[keyForMapping]);
            keySequence = '';
            return;
        }

        // E. Check if the current key *itself* could start a new sequence (is a prefix like "l", "x", "Y")
        if (potentialPrefixes.has(keyForMapping)) {
            event.preventDefault();
            keySequence = keyForMapping;
            sequenceTimer = setTimeout(resolveSequence, SEQUENCE_TIMEOUT);

            const baseFidel = baseKeyTriggers[keyForMapping];
             if (baseFidel && baseFidel !== lastDisplayedVariationsBase) {
                 displayVariations(baseFidel);
            }
            return;
        }

        // F. If the key is none of the above (like '1', '2', 'e', '[', and now 'y'):
        keySequence = '';
        // Allow the default browser behavior (typing '1', 'e', 'y', '[')
    });


    // --- Keyboard Initialization (Virtual Keyboard) ---
    function initKeyboard() {
        // 1. Base Fidel Keys
        Object.keys(fidelGroups).forEach(baseKey => {
            createKey(baseKey, baseKeysContainer, handleBaseKeyClick);
        });
        // 2. Punctuation Keys
        punctuationVirtual.forEach(punc => {
             const puncKey = createKey(punc, punctuationKeysContainer, handleCharKeyClick);
             puncKey.addEventListener('click', clearSequenceStateOnly);
        });
        // 3. Symbol and Emoji Keys
        symbolsAndEmojis.forEach(item => {
            const itemKey = createKey(item, symbolEmojiKeysContainer, handleCharKeyClick);
            itemKey.addEventListener('click', clearSequenceStateOnly);
        });
        // 4. Number Keys (Standard 1-0)
        numbersVirtual.forEach(num => {
             const numKey = createKey(num, numberKeysContainer, handleCharKeyClick);
             numKey.addEventListener('click', clearSequenceStateOnly);
        });
        // 5. Special Keys
        specialKeysVirtual.forEach(keyName => {
            const classes = ['key-special'];
            if (keyName === 'Space') classes.push('key-space');
            if (keyName === 'Backspace') classes.push('key-backspace');
            createKey(keyName, specialKeysContainer, handleSpecialKeyClick);
        });
    }

    initKeyboard();

    // --- Event Listeners for Focus/Click Outside ---
    document.addEventListener('click', (event) => {
        if (!event.target.closest('#keyboard-container') &&
            !event.target.closest('#variation-keys') &&
            event.target !== outputTextarea) {
             clearSequenceStateOnly();
             variationKeysContainer.innerHTML = '';
             lastDisplayedVariationsBase = null;
        }
    });

    outputTextarea.addEventListener('blur', () => {
        setTimeout(() => {
            if (!document.activeElement ||
                (!document.activeElement.closest('#keyboard-container') &&
                 !document.activeElement.closest('#variation-keys') &&
                  document.activeElement !== outputTextarea))
            {
                 clearSequenceStateOnly();
                 variationKeysContainer.innerHTML = '';
                 lastDisplayedVariationsBase = null;
            }
        }, 150);
    });

});
