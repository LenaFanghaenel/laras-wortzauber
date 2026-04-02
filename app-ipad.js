const vowels = ['A', 'E', 'I', 'O', 'U', 'Ä', 'Ö', 'Ü'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const wordList = ['MAMA', 'PAPA', 'HAUS', 'BALL', 'BAUM', 'FISCH', 'HUND', 'KATZE', 'VOGEL', 'SONNE', 'MOND', 'STERN', 'WASSER', 'BLUME', 'BUCH'];

let currentMode = 'free';
let clickModeEnabled = false;
let multiletterRowVisible = false;
let currentWord = '';
let draggedLetter = null;
let draggedFromSlot = null;
let ghostElement = null;
let selectedSlot = null;
let touchStartPos = null;
let isDragging = false;

function init() {
    initBackground();
    initStars();
    initKacheln();
    initMultiletterKacheln();
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
    
    keyboardRows.forEach((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';
        
        row.forEach(letter => {
            const kachel = document.createElement('div');
            kachel.className = 'kachel';
            kachel.classList.add(isVowel(letter) ? 'vowel' : 'consonant');
            kachel.textContent = letter;
            kachel.dataset.letter = letter;
            
            kachel.addEventListener('touchstart', (e) => {
                touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                isDragging = false;
                draggedLetter = letter;
                draggedFromSlot = null;
            }, { passive: true });
            
            kachel.addEventListener('touchmove', (e) => {
                if (!touchStartPos) return;
                
                const touch = e.touches[0];
                const dx = touch.clientX - touchStartPos.x;
                const dy = touch.clientY - touchStartPos.y;
                
                if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
                    if (!isDragging) {
                        isDragging = true;
                        createGhost(touch.clientX, touch.clientY, letter);
                    } else {
                        moveGhost(touch.clientX, touch.clientY);
                    }
                    
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (element && element.classList.contains('grid-slot')) {
                        element.classList.add('drop-zone-active');
                    }
                    
                    document.querySelectorAll('.grid-slot').forEach(s => {
                        if (s !== element) {
                            s.classList.remove('drop-zone-active');
                        }
                    });
                }
            }, { passive: true });
            
            kachel.addEventListener('touchend', (e) => {
                if (isDragging) {
                    const touch = e.changedTouches[0];
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);
                    
                    if (element && element.classList.contains('grid-slot')) {
                        const row = element.closest('.row');
                        const isFirstRow = row && row.dataset.row === '0';
                        
                        if (!(currentMode === 'copy' && isFirstRow) && !element.hasChildNodes()) {
                            placeLetter(element, draggedLetter);
                        }
                    }
                    
                    removeGhost();
                    document.querySelectorAll('.grid-slot').forEach(s => {
                        s.classList.remove('drop-zone-active');
                    });
                }
                
                touchStartPos = null;
                isDragging = false;
                draggedLetter = null;
                draggedFromSlot = null;
            });
            
            kachel.addEventListener('click', (e) => {
                if (isDragging) return;
                
                if (clickModeEnabled && selectedSlot) {
                    handleLetterClick(letter, null);
                } else {
                    playSound(letter);
                }
            });
            
            rowDiv.appendChild(kachel);
        });
        
        kachelnContainer.appendChild(rowDiv);
    });
}

function initMultiletterKacheln() {
    const multiletterKacheln = document.querySelectorAll('.multiletter');
    
    multiletterKacheln.forEach(kachel => {
        const letters = kachel.dataset.letters;
        
        kachel.addEventListener('touchstart', (e) => {
            touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            isDragging = false;
            draggedLetter = letters;
            draggedFromSlot = null;
        }, { passive: true });
        
        kachel.addEventListener('touchmove', (e) => {
            if (!touchStartPos) return;
            
            const touch = e.touches[0];
            const dx = touch.clientX - touchStartPos.x;
            const dy = touch.clientY - touchStartPos.y;
            
            if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
                if (!isDragging) {
                    isDragging = true;
                    createGhost(touch.clientX, touch.clientY, letters);
                } else {
                    moveGhost(touch.clientX, touch.clientY);
                }
                
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if (element && element.classList.contains('grid-slot')) {
                    element.classList.add('drop-zone-active');
                }
                
                document.querySelectorAll('.grid-slot').forEach(s => {
                    if (s !== element) {
                        s.classList.remove('drop-zone-active');
                    }
                });
            }
        }, { passive: true });
        
        kachel.addEventListener('touchend', (e) => {
            if (isDragging) {
                const touch = e.changedTouches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                
                if (element && element.classList.contains('grid-slot')) {
                    const row = element.closest('.row');
                    const isFirstRow = row && row.dataset.row === '0';
                    
                    if (!(currentMode === 'copy' && isFirstRow) && !element.hasChildNodes()) {
                        if (canPlaceMultiletter(element, draggedLetter)) {
                            placeMultiletter(element, draggedLetter);
                        }
                    }
                }
                
                removeGhost();
                document.querySelectorAll('.grid-slot').forEach(s => {
                    s.classList.remove('drop-zone-active');
                });
            }
            
            touchStartPos = null;
            isDragging = false;
            draggedLetter = null;
            draggedFromSlot = null;
        });
        
        kachel.addEventListener('click', (e) => {
            if (isDragging) return;
            
            if (clickModeEnabled && selectedSlot) {
                if (canPlaceMultiletter(selectedSlot, letters)) {
                    placeMultiletter(selectedSlot, letters);
                }
                clearSelectedSlot();
            } else {
                playSound(letters);
            }
        });
    });
}

function handleTouchStart(e) {
    e.preventDefault();
    const letter = e.target.dataset.letter;
    if (!letter) return;
    
    draggedLetter = letter;
    draggedFromSlot = null;
    
    const touch = e.touches[0];
    createGhost(touch.clientX, touch.clientY, letter);
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!draggedLetter) return;
    
    const touch = e.touches[0];
    moveGhost(touch.clientX, touch.clientY);
    
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.classList.contains('grid-slot')) {
        element.classList.add('drop-zone-active');
    }
    
    document.querySelectorAll('.grid-slot').forEach(slot => {
        if (slot !== element) {
            slot.classList.remove('drop-zone-active');
        }
    });
}

function handleTouchEnd(e) {
    if (!draggedLetter) return;
    
    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    
    if (draggedFromSlot && (!element || !element.classList.contains('grid-slot'))) {
        draggedFromSlot.innerHTML = '';
        updateWordGroups();
        checkWord();
    } else if (element && element.classList.contains('grid-slot')) {
        const row = element.closest('.row');
        const isFirstRow = row && row.dataset.row === '0';
        
        if (!(currentMode === 'copy' && isFirstRow) && !element.hasChildNodes()) {
            if (draggedLetter.length > 1) {
                if (canPlaceMultiletter(element, draggedLetter)) {
                    placeMultiletter(element, draggedLetter);
                }
            } else {
                placeLetter(element, draggedLetter);
                if (draggedFromSlot) {
                    draggedFromSlot.innerHTML = '';
                    updateWordGroups();
                    checkWord();
                }
            }
        }
    }
    
    removeGhost();
    document.querySelectorAll('.grid-slot').forEach(slot => {
        slot.classList.remove('drop-zone-active');
    });
    
    draggedLetter = null;
    draggedFromSlot = null;
}

function handleKachelClick(e) {
    const letter = e.target.dataset.letter;
    if (!letter || draggedLetter) return;
    
    if (clickModeEnabled && selectedSlot) {
        handleLetterClick(letter, null);
    } else {
        playSound(letter);
    }
}

function createGhost(x, y, letter) {
    removeGhost();
    ghostElement = document.createElement('div');
    ghostElement.className = 'drag-ghost';
    ghostElement.classList.add(isVowel(letter[0]) ? 'vowel' : 'consonant');
    ghostElement.textContent = letter;
    ghostElement.style.left = x + 'px';
    ghostElement.style.top = y + 'px';
    if (letter.length > 1) {
        ghostElement.style.width = '50px';
        ghostElement.style.fontSize = '0.75rem';
    }
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
        slot.addEventListener('click', () => {
            if (!slot.hasChildNodes()) {
                handleSlotClick(slot);
            }
        });
    });
}

function handleSlotClick(slot) {
    if (!clickModeEnabled) return;
    
    const row = slot.closest('.row');
    const isFirstRow = row && row.dataset.row === '0';
    
    if (currentMode === 'copy' && isFirstRow) return;
    
    if (selectedSlot === slot) {
        clearSelectedSlot();
    } else {
        selectSlot(slot);
    }
}

function handleLetterClick(letter, sourceSlot) {
    if (!clickModeEnabled || !selectedSlot) return;
    
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

function selectSlot(slot) {
    clearSelectedSlot();
    selectedSlot = slot;
    selectedSlot.classList.add('slot-selected');
}

function clearSelectedSlot() {
    if (selectedSlot) {
        selectedSlot.classList.remove('slot-selected');
        selectedSlot = null;
    }
}

function placeLetter(gridSlot, letter) {
    const slot = document.createElement('div');
    slot.className = 'slot';
    slot.classList.add(isVowel(letter) ? 'vowel' : 'consonant');
    slot.textContent = letter;
    slot.dataset.letter = letter;
    
    slot.addEventListener('touchstart', (e) => {
        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        isDragging = false;
        draggedLetter = letter;
        draggedFromSlot = gridSlot;
    }, { passive: true });
    
    slot.addEventListener('touchmove', (e) => {
        if (!touchStartPos) return;
        
        const touch = e.touches[0];
        const dx = touch.clientX - touchStartPos.x;
        const dy = touch.clientY - touchStartPos.y;
        
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
            if (!isDragging) {
                isDragging = true;
                createGhost(touch.clientX, touch.clientY, letter);
            } else {
                moveGhost(touch.clientX, touch.clientY);
            }
            
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            if (element && element.classList.contains('grid-slot')) {
                element.classList.add('drop-zone-active');
            }
            
            document.querySelectorAll('.grid-slot').forEach(s => {
                if (s !== element) {
                    s.classList.remove('drop-zone-active');
                }
            });
        }
    }, { passive: true });
    
    slot.addEventListener('touchend', (e) => {
        if (isDragging) {
            const touch = e.changedTouches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (draggedFromSlot && (!element || !element.classList.contains('grid-slot'))) {
                draggedFromSlot.innerHTML = '';
                updateWordGroups();
                checkWord();
            } else if (element && element.classList.contains('grid-slot')) {
                const row = element.closest('.row');
                const isFirstRow = row && row.dataset.row === '0';
                
                if (!(currentMode === 'copy' && isFirstRow) && !element.hasChildNodes()) {
                    placeLetter(element, draggedLetter);
                    if (draggedFromSlot) {
                        draggedFromSlot.innerHTML = '';
                        updateWordGroups();
                        checkWord();
                    }
                }
            }
            
            removeGhost();
            document.querySelectorAll('.grid-slot').forEach(s => {
                s.classList.remove('drop-zone-active');
            });
        }
        
        touchStartPos = null;
        isDragging = false;
        draggedLetter = null;
        draggedFromSlot = null;
    });
    
    slot.addEventListener('click', (e) => {
        if (isDragging) return;
        
        if (clickModeEnabled && selectedSlot) {
            handleLetterClick(letter, gridSlot);
        } else {
            const word = getWordAtSlot(gridSlot);
            const wordSlots = getWordSlots(slot);
            highlightWordSlots(wordSlots, true);
            playSound(word.length > 1 ? word : letter);
            setTimeout(() => highlightWordSlots(wordSlots, false), 500);
        }
    });
    
    slot.addEventListener('dblclick', () => {
        if (clickModeEnabled) {
            gridSlot.innerHTML = '';
            updateWordGroups();
        }
    });
    
    gridSlot.innerHTML = '';
    gridSlot.appendChild(slot);
    gridSlot.classList.remove('drop-zone-active');
    
    updateWordGroups();
    playSound(letter);
    checkWord();
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

function placeMultiletter(gridSlot, letters) {
    const row = gridSlot.closest('.row');
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const startIndex = slots.indexOf(gridSlot);
    
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const targetSlot = slots[startIndex + i];
        if (!targetSlot.hasChildNodes()) {
            placeLetter(targetSlot, letter);
        }
    }
    
    checkWord();
}

function getWordAtSlot(gridSlot) {
    const row = gridSlot.closest('.row');
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const slotIndex = slots.indexOf(gridSlot);
    
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

function getWordSlots(slotElement) {
    const gridSlot = slotElement.closest('.grid-slot');
    if (!gridSlot) return [slotElement.parentElement];
    
    const row = gridSlot.closest('.row');
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const slotIndex = slots.indexOf(gridSlot);
    
    let startIdx = slotIndex;
    while (startIdx > 0 && slots[startIdx - 1].querySelector('.slot')) {
        startIdx--;
    }
    
    let endIdx = slotIndex;
    while (endIdx < slots.length - 1 && slots[endIdx + 1].querySelector('.slot')) {
        endIdx++;
    }
    
    const result = [];
    for (let i = startIdx; i <= endIdx; i++) {
        result.push(slots[i]);
    }
    return result;
}

function highlightWordSlots(slots, highlight) {
    slots.forEach(gridSlot => {
        const slotEl = gridSlot.querySelector('.slot');
        if (slotEl) {
            if (highlight) {
                slotEl.classList.add('word-hover');
            } else {
                slotEl.classList.remove('word-hover');
            }
        }
    });
}

function updateWordGroups() {
    document.querySelectorAll('.setzkasten .row').forEach(row => {
        const slots = Array.from(row.querySelectorAll('.grid-slot'));
        
        slots.forEach(slot => {
            slot.classList.remove('word-start', 'word-middle', 'word-end');
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
                if (i - wordStart >= 2) {
                    for (let j = wordStart; j < i; j++) {
                        const slotEl = slots[j].querySelector('.slot');
                        if (slotEl) slotEl.classList.add('word-group');
                        if (j === wordStart) slots[j].classList.add('word-start');
                        else if (j === i - 1) slots[j].classList.add('word-end');
                        else slots[j].classList.add('word-middle');
                    }
                }
                wordStart = -1;
            }
        }
        
        if (wordStart !== -1 && slots.length - wordStart >= 2) {
            for (let j = wordStart; j < slots.length; j++) {
                const slotEl = slots[j].querySelector('.slot');
                if (slotEl) slotEl.classList.add('word-group');
                if (j === wordStart) slots[j].classList.add('word-start');
                else if (j === slots.length - 1) slots[j].classList.add('word-end');
                else slots[j].classList.add('word-middle');
            }
        }
    });
}

function highlightWord(slot, highlight) {
    const row = slot.parentElement;
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const slotIndex = slots.indexOf(slot);
    
    let startIdx = slotIndex;
    while (startIdx > 0 && slots[startIdx - 1].querySelector('.slot')) startIdx--;
    
    let endIdx = slotIndex;
    while (endIdx < slots.length - 1 && slots[endIdx + 1].querySelector('.slot')) endIdx++;
    
    for (let i = startIdx; i <= endIdx; i++) {
        const slotEl = slots[i].querySelector('.slot');
        if (slotEl) {
            if (highlight) slotEl.classList.add('word-hover');
            else slotEl.classList.remove('word-hover');
        }
    }
}

function isVowel(letter) {
    return vowels.includes(letter);
}

function playSound(text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE';
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        
        speechSynthesis.speak(utterance);
    }
}

function setMode(mode) {
    currentMode = mode;
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    clearSelectedSlot();
    
    document.querySelectorAll('.setzkasten .grid-slot').forEach(slot => {
        slot.innerHTML = '';
        slot.classList.remove('word-start', 'word-middle', 'word-end');
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
        
        slot.addEventListener('click', () => playSound(currentWord));
        
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
        
        for (let i = 0; i < slots.length; i++) {
            const slotEl = slots[i].querySelector('.slot');
            if (slotEl) {
                foundWord += slotEl.dataset.letter;
            } else {
                if (foundWord === currentWord) {
                    showSuccess();
                    return;
                }
                foundWord = '';
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
            slot.classList.remove('word-start', 'word-middle', 'word-end');
        });
        nextWord();
    };
}

function toggleClickMode() {
    clickModeEnabled = !clickModeEnabled;
    document.getElementById('click-toggle-btn').classList.toggle('active', clickModeEnabled);
    if (!clickModeEnabled) clearSelectedSlot();
}

function toggleMultiletterRow() {
    multiletterRowVisible = !multiletterRowVisible;
    document.getElementById('multiletter-row').classList.toggle('visible', multiletterRowVisible);
    document.getElementById('toggle-multiletter-btn').classList.toggle('active', multiletterRowVisible);
}

function resetSetzkasten() {
    clearSelectedSlot();
    if (currentMode === 'copy') {
        document.querySelectorAll('.setzkasten .row[data-row="1"], .setzkasten .row[data-row="2"]').forEach(row => {
            row.querySelectorAll('.grid-slot').forEach(slot => {
                slot.innerHTML = '';
                slot.classList.remove('word-start', 'word-middle', 'word-end');
            });
        });
    } else {
        document.querySelectorAll('.setzkasten .grid-slot').forEach(slot => {
            slot.innerHTML = '';
            slot.classList.remove('word-start', 'word-middle', 'word-end');
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
