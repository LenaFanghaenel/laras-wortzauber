const vowels = ['A', 'E', 'I', 'O', 'U', 'Ä', 'Ö', 'Ü'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'ß'];

const wordList = ['MAMA', 'PAPA', 'HAUS', 'BALL', 'BAUM', 'FISCH', 'HUND', 'KATZE', 'VOGEL', 'SONNE', 'MOND', 'STERN', 'WASSER', 'BLUME', 'BUCH'];

let currentMode = 'free';
let clickModeEnabled = false;
let multiletterRowVisible = false;
let currentWord = '';
let draggedLetter = null;
let draggedFromSlot = null;
let ghostElement = null;
let isDragging = false;
let selectedSlot = null;

function init() {
    initBackground();
    initStars();
    initKacheln();
    initMultiletterKacheln();
    initGlobalEvents();
    initGridSlots();
}

function initBackground() {
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    let offset = 0;
    
    function drawWaves() {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(0.2, '#feca57');
        gradient.addColorStop(0.4, '#48dbfb');
        gradient.addColorStop(0.6, '#ff9ff3');
        gradient.addColorStop(0.8, '#54a0ff');
        gradient.addColorStop(1, '#5f27cd');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const colors = [
            'rgba(255, 107, 107, 0.4)',
            'rgba(254, 202, 87, 0.4)',
            'rgba(72, 219, 251, 0.4)',
            'rgba(255, 159, 243, 0.4)',
            'rgba(84, 160, 255, 0.4)',
            'rgba(95, 39, 205, 0.4)'
        ];
        
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height);
            
            for (let x = 0; x <= canvas.width; x += 10) {
                const y = canvas.height - 100 - i * 60 + 
                    Math.sin((x + offset + i * 50) * 0.01) * 40 +
                    Math.sin((x + offset + i * 30) * 0.02) * 20;
                ctx.lineTo(x, y);
            }
            
            ctx.lineTo(canvas.width, canvas.height);
            ctx.closePath();
            ctx.fillStyle = colors[i];
            ctx.fill();
        }
        
        offset += 2;
        requestAnimationFrame(drawWaves);
    }
    
    drawWaves();
}

function initStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = (Math.random() * 4 + 2) + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        starsContainer.appendChild(star);
    }
}

function initKacheln() {
    const kachelnContainer = document.getElementById('kacheln');
    
    const keyboardRows = [
        ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
        ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
    ];
    
    keyboardRows.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(letter => {
            const kachel = document.createElement('div');
            kachel.className = 'kachel';
            kachel.classList.add(isVowel(letter) ? 'vowel' : 'consonant');
            kachel.textContent = letter;
            kachel.dataset.letter = letter;
            
            kachel.addEventListener('mousedown', (e) => {
                e.preventDefault();
                draggedLetter = letter;
                draggedFromSlot = null;
                isDragging = true;
                createGhost(e.clientX, e.clientY, letter);
            });
            
            kachel.addEventListener('click', (e) => {
                if (clickModeEnabled) {
                    handleLetterClick(letter, null);
                } else if (!isDragging) {
                    playSound(letter);
                }
            });
            
            rowDiv.appendChild(kachel);
        });
        
        kachelnContainer.appendChild(rowDiv);
    });
}

function initGlobalEvents() {
    const kachelnContainer = document.getElementById('kacheln');
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            moveGhost(e.clientX, e.clientY);
            
            if (draggedFromSlot) {
                const kachelnRect = kachelnContainer.getBoundingClientRect();
                if (e.clientX >= kachelnRect.left && e.clientX <= kachelnRect.right &&
                    e.clientY >= kachelnRect.top && e.clientY <= kachelnRect.bottom) {
                    kachelnContainer.classList.add('drop-zone-active');
                } else {
                    kachelnContainer.classList.remove('drop-zone-active');
                }
            }
        }
    });
    
    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            if (draggedFromSlot && draggedLetter) {
                const kachelnRect = kachelnContainer.getBoundingClientRect();
                if (e.clientX >= kachelnRect.left && e.clientX <= kachelnRect.right &&
                    e.clientY >= kachelnRect.top && e.clientY <= kachelnRect.bottom) {
                    draggedFromSlot.innerHTML = '';
                    updateWordGroups();
                }
            }
        }
        
        draggedLetter = null;
        draggedFromSlot = null;
        isDragging = false;
        removeGhost();
        document.querySelectorAll('.grid-slot').forEach(slot => {
            slot.classList.remove('drop-zone-active');
        });
        kachelnContainer.classList.remove('drop-zone-active');
    });
}

function createGhost(x, y, letter) {
    ghostElement = document.createElement('div');
    ghostElement.className = 'drag-ghost';
    ghostElement.classList.add(isVowel(letter) ? 'vowel' : 'consonant');
    ghostElement.textContent = letter;
    ghostElement.style.left = x + 'px';
    ghostElement.style.top = y + 'px';
    document.body.appendChild(ghostElement);
}

function moveGhost(x, y) {
    if (ghostElement) {
        ghostElement.style.left = x + 'px';
        ghostElement.style.top = y + 'px';
    }
}

function removeGhost() {
    if (ghostElement) {
        ghostElement.remove();
        ghostElement = null;
    }
}

function initGridSlots() {
    document.querySelectorAll('.setzkasten .grid-slot').forEach(slot => {
        slot.addEventListener('mouseup', (e) => {
            const row = slot.closest('.row');
            const isFirstRow = row && row.dataset.row === '0';
            
            if (currentMode === 'copy' && isFirstRow) return;
            
            if (isDragging && draggedLetter && !slot.hasChildNodes()) {
                if (draggedLetter.length > 1) {
                    if (canPlaceMultiletter(slot, draggedLetter)) {
                        placeMultiletter(slot, draggedLetter);
                    }
                } else {
                    placeLetter(slot, draggedLetter);
                    if (draggedFromSlot) {
                        draggedFromSlot.innerHTML = '';
                        updateWordGroups();
                        checkWord();
                    }
                }
            }
        });
        
        slot.addEventListener('click', (e) => {
            if (!slot.hasChildNodes()) {
                handleSlotClick(slot);
            }
        });
        
        slot.addEventListener('mouseenter', (e) => {
            const row = slot.closest('.row');
            const isFirstRow = row && row.dataset.row === '0';
            
            if (currentMode === 'copy' && isFirstRow) return;
            
            if (isDragging && draggedLetter) {
                if (draggedLetter.length > 1) {
                    if (canPlaceMultiletter(slot, draggedLetter)) {
                        highlightMultiletterSlots(slot, draggedLetter.length, true);
                    }
                } else if (!slot.hasChildNodes()) {
                    slot.classList.add('drop-zone-active');
                }
            }
        });
        
        slot.addEventListener('mouseleave', (e) => {
            slot.classList.remove('drop-zone-active');
            const row = slot.closest('.row');
            if (row) {
                row.querySelectorAll('.grid-slot').forEach(s => {
                    s.classList.remove('drop-zone-active');
                });
            }
        });
    });
}

function canPlaceMultiletter(gridSlot, letters) {
    const row = gridSlot.closest('.row');
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const startIndex = slots.indexOf(gridSlot);
    
    if (startIndex + letters.length > slots.length) return false;
    
    for (let i = 0; i < letters.length; i++) {
        if (slots[startIndex + i].hasChildNodes()) return false;
    }
    
    return true;
}

function highlightMultiletterSlots(gridSlot, count, highlight) {
    const row = gridSlot.closest('.row');
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const startIndex = slots.indexOf(gridSlot);
    
    for (let i = 0; i < count && (startIndex + i) < slots.length; i++) {
        if (highlight) {
            slots[startIndex + i].classList.add('drop-zone-active');
        } else {
            slots[startIndex + i].classList.remove('drop-zone-active');
        }
    }
}

function placeLetter(gridSlot, letter) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.classList.add(isVowel(letter) ? 'vowel' : 'consonant');
    slot.textContent = letter;
    slot.dataset.letter = letter;
    
    slot.addEventListener('mousedown', (e) => {
        if (slot.classList.contains('template-letter')) return;
        e.preventDefault();
        e.stopPropagation();
        draggedLetter = letter;
        draggedFromSlot = gridSlot;
        isDragging = true;
        createGhost(e.clientX, e.clientY, letter);
    });
    
    slot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (clickModeEnabled && selectedSlot) {
            handleLetterClick(letter, gridSlot);
        } else if (!isDragging) {
            const word = getWordAtSlot(gridSlot);
            if (word.length > 1) {
                playSound(word);
            } else {
                playSound(letter);
            }
        }
    });
    
    slot.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        if (clickModeEnabled && !slot.classList.contains('template-letter')) {
            gridSlot.innerHTML = '';
            updateWordGroups();
        }
    });
    
    slot.addEventListener('mouseenter', (e) => {
        highlightWord(gridSlot, true);
    });
    
    slot.addEventListener('mouseleave', (e) => {
        highlightWord(gridSlot, false);
    });
    
    gridSlot.innerHTML = '';
    gridSlot.appendChild(slot);
    gridSlot.classList.remove('drop-zone-active');
    
    updateWordGroups();
    
    playSound(letter);
    
    checkWord();
}

function highlightWord(slot, highlight) {
    const row = slot.parentElement;
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const slotIndex = slots.indexOf(slot);
    
    let startIdx = slotIndex;
    while (startIdx > 0 && slots[startIdx - 1].querySelector('.slot')) {
        startIdx--;
    }
    
    let endIdx = slotIndex;
    while (endIdx < slots.length - 1 && slots[endIdx + 1].querySelector('.slot')) {
        endIdx++;
    }
    
    for (let i = startIdx; i <= endIdx; i++) {
        const slotEl = slots[i].querySelector('.slot');
        if (slotEl) {
            if (highlight) {
                slotEl.classList.add('word-hover');
            } else {
                slotEl.classList.remove('word-hover');
            }
        }
    }
}

function getWordAtSlot(slot) {
    const row = slot.parentElement;
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const slotIndex = slots.indexOf(slot);
    
    let word = '';
    let startIdx = slotIndex;
    
    while (startIdx > 0 && slots[startIdx - 1].querySelector('.slot')) {
        startIdx--;
    }
    
    for (let i = startIdx; i < slots.length && slots[i].querySelector('.slot'); i++) {
        word += slots[i].querySelector('.slot').dataset.letter;
    }
    
    return word;
}

function updateWordGroups() {
    document.querySelectorAll('.setzkasten .row').forEach(row => {
        const slots = Array.from(row.querySelectorAll('.grid-slot'));
        
        slots.forEach(slot => {
            slot.classList.remove('word-start', 'word-middle', 'word-end', 'word-single');
            const slotElement = slot.querySelector('.slot');
            if (slotElement) {
                slotElement.classList.remove('word-group');
            }
        });
        
        let wordStart = -1;
        
        for (let i = 0; i < slots.length; i++) {
            const hasLetter = slots[i].querySelector('.slot');
            
            if (hasLetter && wordStart === -1) {
                wordStart = i;
            } else if (!hasLetter && wordStart !== -1) {
                const wordLength = i - wordStart;
                if (wordLength >= 2) {
                    for (let j = wordStart; j < i; j++) {
                        const slotEl = slots[j].querySelector('.slot');
                        if (slotEl) {
                            slotEl.classList.add('word-group');
                        }
                        if (j === wordStart) {
                            slots[j].classList.add('word-start');
                        } else if (j === i - 1) {
                            slots[j].classList.add('word-end');
                        } else {
                            slots[j].classList.add('word-middle');
                        }
                    }
                }
                wordStart = -1;
            }
        }
        
        if (wordStart !== -1) {
            const wordLength = slots.length - wordStart;
            if (wordLength >= 2) {
                for (let j = wordStart; j < slots.length; j++) {
                    const slotEl = slots[j].querySelector('.slot');
                    if (slotEl) {
                        slotEl.classList.add('word-group');
                    }
                    if (j === wordStart) {
                        slots[j].classList.add('word-start');
                    } else if (j === slots.length - 1) {
                        slots[j].classList.add('word-end');
                    } else {
                        slots[j].classList.add('word-middle');
                    }
                }
            }
        }
    });
}

function isVowel(letter) {
    return vowels.includes(letter);
}

function playSound(letter) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(letter);
        utterance.lang = 'de-DE';
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        
        window.speechSynthesis.speak(utterance);
    }
}

function resetSetzkasten() {
    clearSelectedSlot();
    
    if (currentMode === 'copy') {
        document.querySelectorAll('.setzkasten .row[data-row="1"], .setzkasten .row[data-row="2"]').forEach(row => {
            row.querySelectorAll('.grid-slot').forEach(slot => {
                slot.innerHTML = '';
                slot.classList.remove('word-start', 'word-middle', 'word-end', 'word-single');
            });
        });
    } else {
        document.querySelectorAll('.setzkasten .grid-slot').forEach(slot => {
            slot.innerHTML = '';
            slot.classList.remove('word-start', 'word-middle', 'word-end', 'word-single');
        });
    }
}

function setMode(mode) {
    currentMode = mode;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    clearSelectedSlot();
    
    document.querySelectorAll('.setzkasten .grid-slot').forEach(slot => {
        slot.innerHTML = '';
        slot.classList.remove('word-start', 'word-middle', 'word-end', 'word-single');
    });
    
    const firstRow = document.querySelector('.setzkasten .row[data-row="0"]');
    
    if (mode === 'copy') {
        firstRow.classList.add('template-row');
        nextWord();
    } else {
        firstRow.classList.remove('template-row');
        currentWord = '';
    }
}

function toggleClickMode() {
    clickModeEnabled = !clickModeEnabled;
    
    const btn = document.getElementById('click-toggle-btn');
    if (clickModeEnabled) {
        btn.classList.add('active');
    } else {
        btn.classList.remove('active');
        clearSelectedSlot();
    }
}

function toggleMultiletterRow() {
    multiletterRowVisible = !multiletterRowVisible;
    
    const row = document.getElementById('multiletter-row');
    const btn = document.getElementById('toggle-multiletter-btn');
    
    if (multiletterRowVisible) {
        row.classList.add('visible');
        btn.classList.add('active');
    } else {
        row.classList.remove('visible');
        btn.classList.remove('active');
    }
}

function initMultiletterKacheln() {
    const multiletterKacheln = document.querySelectorAll('.multiletter');
    
    multiletterKacheln.forEach(kachel => {
        const letters = kachel.dataset.letters;
        
        kachel.addEventListener('mousedown', (e) => {
            e.preventDefault();
            draggedLetter = letters;
            draggedFromSlot = null;
            isDragging = true;
            createGhostForMultiletter(e.clientX, e.clientY, letters);
        });
        
        kachel.addEventListener('click', (e) => {
            if (clickModeEnabled && selectedSlot) {
                if (canPlaceMultiletter(selectedSlot, letters)) {
                    placeMultiletter(selectedSlot, letters);
                }
                clearSelectedSlot();
            } else if (!isDragging) {
                playSound(letters.toLowerCase());
            }
        });
    });
}

function createGhostForMultiletter(x, y, letters) {
    ghostElement = document.createElement('div');
    ghostElement.className = 'drag-ghost';
    ghostElement.classList.add(isVowel(letters[0]) ? 'vowel' : 'consonant');
    ghostElement.textContent = letters;
    ghostElement.style.left = x + 'px';
    ghostElement.style.top = y + 'px';
    ghostElement.style.width = '95px';
    ghostElement.style.fontSize = '1.5rem';
    document.body.appendChild(ghostElement);
}

function placeMultiletter(gridSlot, letters) {
    const row = gridSlot.closest('.row');
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const startIndex = slots.indexOf(gridSlot);
    
    for (let i = 0; i < letters.length && (startIndex + i) < slots.length; i++) {
        const letter = letters[i];
        const targetSlot = slots[startIndex + i];
        
        if (!targetSlot.hasChildNodes()) {
            placeLetter(targetSlot, letter);
        }
    }
    
    checkWord();
}

function clearSelectedSlot() {
    if (selectedSlot) {
        selectedSlot.classList.remove('slot-selected');
        selectedSlot = null;
    }
}

function selectSlot(slot) {
    clearSelectedSlot();
    selectedSlot = slot;
    selectedSlot.classList.add('slot-selected');
}

function handleSlotClick(gridSlot) {
    if (!clickModeEnabled) return;
    
    const row = gridSlot.closest('.row');
    const isFirstRow = row && row.dataset.row === '0';
    
    if (currentMode === 'copy' && isFirstRow) return;
    
    if (selectedSlot === gridSlot) {
        clearSelectedSlot();
    } else {
        selectSlot(gridSlot);
    }
}

function handleLetterClick(letter, sourceSlot) {
    if (!clickModeEnabled) return;
    
    if (selectedSlot) {
        if (!selectedSlot.hasChildNodes()) {
            placeLetter(selectedSlot, letter);
            if (sourceSlot) {
                sourceSlot.innerHTML = '';
                updateWordGroups();
                checkWord();
            }
        }
        clearSelectedSlot();
    }
}

function nextWord() {
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    
    const firstRow = document.querySelector('.setzkasten .row[data-row="0"]');
    const slots = firstRow.querySelectorAll('.grid-slot');
    
    const startCol = Math.floor((10 - currentWord.length) / 2);
    
    for (let i = 0; i < currentWord.length; i++) {
        const letter = currentWord[i];
        const slot = document.createElement('div');
        slot.className = 'slot template-letter';
        slot.classList.add(isVowel(letter) ? 'vowel' : 'consonant');
        slot.textContent = letter;
        slot.dataset.letter = letter;
        
        slot.addEventListener('click', () => {
            playSound(currentWord);
        });
        
        slots[startCol + i].appendChild(slot);
    }
    
    updateWordGroups();
}

function checkWord() {
    if (currentMode !== 'copy' || !currentWord) return;
    
    const rows = document.querySelectorAll('.setzkasten .row[data-row="1"], .setzkasten .row[data-row="2"]');
    
    for (const row of rows) {
        const slots = row.querySelectorAll('.grid-slot');
        let foundWord = '';
        let wordStartIdx = -1;
        
        for (let i = 0; i < slots.length; i++) {
            const slotEl = slots[i].querySelector('.slot');
            if (slotEl) {
                if (wordStartIdx === -1) wordStartIdx = i;
                foundWord += slotEl.dataset.letter;
            } else {
                if (foundWord === currentWord) {
                    showSuccess();
                    return;
                }
                foundWord = '';
                wordStartIdx = -1;
            }
        }
        
        if (foundWord === currentWord) {
            showSuccess();
            return;
        }
    }
}

function showSuccess() {
    playSound(currentWord);
    
    const msg = document.getElementById('success-message');
    msg.classList.add('show');
    msg.onclick = () => {
        msg.classList.remove('show');
        document.querySelectorAll('.setzkasten .grid-slot').forEach(slot => {
            slot.innerHTML = '';
            slot.classList.remove('word-start', 'word-middle', 'word-end', 'word-single');
        });
        nextWord();
    };
}

document.addEventListener('DOMContentLoaded', init);
