const vowels = ['A', 'E', 'I', 'O', 'U', 'Ä', 'Ö', 'Ü'];
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
const wordList = ['ADLER', 'AFFE', 'AMEISE', 'APFEL', 'AUTO', 'BACH', 'BACKEN', 'BAD', 'BADEN', 'BALL', 'BANANE', 'BANK', 'BAUEN', 'BAUM', 'BECHER', 'BERG', 'BESEN', 'BETT', 'BIENE', 'BILD', 'BIRNE', 'BLATT', 'BLAU', 'BLOCK', 'BLUME', 'BLUT', 'BOHNE', 'BOOT', 'BRAV', 'BREI', 'BRETT', 'BRIEF', 'BRILLE', 'BROT', 'BRÜCKE', 'BUCH', 'BURG', 'BUSCH', 'CLOWN', 'DACH', 'DACHS', 'DAUMEN', 'DECKEN', 'DICK', 'DINO', 'DOSE', 'DRACHE', 'DUMM', 'DUNKEL', 'DURST', 'EI', 'EIS', 'ENTE', 'ERDE', 'ESEL', 'ESSEN', 'EULE', 'FADEN', 'FAHREN', 'FALLEN', 'FAMILIE', 'FANGEN', 'FARBE', 'FAST', 'FEDER', 'FEIN', 'FELD', 'FENSTER', 'FERIEN', 'FERN', 'FEST', 'FILM', 'FINGER', 'FISCH', 'FLASCHE', 'FLEIßIG', 'FLIEGEN', 'FLOH', 'FLÖTE', 'FLUR', 'FLUSS', 'FOTO', 'FRAGE', 'FREI', 'FREUND', 'FROH', 'FUCHS', 'GABEL', 'GANZ', 'GARTEN', 'GEBEN', 'GEHEN', 'GELB', 'GELD', 'GEMÜSE', 'GERN', 'GESCHENK', 'GLAS', 'GLÜCK', 'GOLD', 'GRAS', 'GROSS', 'GRÜN', 'GUCKEN', 'GUT', 'HAARE', 'HABEN', 'HAHN', 'HALT', 'HAND', 'HART', 'HASE', 'HAUS', 'HEFT', 'HEISS', 'HELFEN', 'HELL', 'HEMD', 'HERD', 'HEXE', 'HIER', 'HILFE', 'HOCH', 'HOLEN', 'HONIG', 'HÖREN', 'HOSE', 'HUHN', 'HUND', 'HÜPFEN', 'HUT', 'IGEL', 'INSEL', 'JACKE', 'JAGEN', 'JUNGE', 'KÄFER', 'KALB', 'KALT', 'KAMM', 'KAROTTE', 'KÄSE', 'KAUEN', 'KEKS', 'KELLER', 'KERZE', 'KIND', 'KISTE', 'KITZ', 'KLEID', 'KLEIN', 'KOCHEN', 'KOHL', 'KOMMEN', 'KÖNIG', 'KOPF', 'KORB', 'KREIS', 'KROKODIL', 'KRONE', 'KÜCHE', 'KUCHEN', 'KÜKEN', 'KURZ', 'KUSS', 'LACHEN', 'LAMM', 'LAMPE', 'LANG', 'LAUT', 'LEER', 'LEISE', 'LESEN', 'LICHT', 'LIEB', 'LIED', 'LILA', 'LÖFFEL', 'LÖWE', 'LUFT', 'MACHEN', 'MÄDCHEN', 'MAIS', 'MALEN', 'MAMA', 'MANN', 'MANTEL', 'MASKE', 'MAUS', 'MEER', 'MEIN', 'MILCH', 'MOND', 'MÜCKE', 'MÜDE', 'MÜLL', 'MUSIK', 'MÜSLI', 'MÜTZE', 'NAME', 'NASE', 'NASS', 'NEIN', 'NETT', 'NETZ', 'NEU', 'NUDEL', 'NUSS', 'OBEN', 'OBST', 'OFEN', 'ONKEL', 'OMA', 'OPA', 'OTTER', 'PAKET', 'PAPA', 'PARK', 'PAUSE', 'PFERD', 'PILZ', 'PIRAT', 'PIZZA', 'PLATZ', 'PONY', 'PUPPE', 'PUNKT', 'QUALLE', 'QUARK', 'RAD', 'RADIO', 'RÄTSEL', 'RAUPE', 'RECHNEN', 'REGEN', 'REH', 'REIS', 'RIESE', 'RIND', 'RING', 'RITTER', 'ROCK', 'ROLLER', 'ROLLSCHUH', 'ROSA', 'ROSE', 'ROT', 'RUFEN', 'RUHE', 'RUND', 'SACK', 'SAFT', 'SAGEN', 'SALZ', 'SAND', 'SATT', 'SAUBER', 'SAUER', 'SCHAF', 'SCHAL', 'SCHARF', 'SCHATZ', 'SCHERE', 'SCHLAFEN', 'SCHLANGE', 'SCHLOSS', 'SCHMECKEN', 'SCHNECKE', 'SCHNEE', 'SCHNELL', 'SCHON', 'SCHÖN', 'SCHULE', 'SCHWAN', 'SCHWIMMEN', 'SEE', 'SEHEN', 'SEIFE', 'SEIL', 'SENF', 'SINGEN', 'SOFA', 'SONNE', 'SOSSE', 'SPASS', 'SPATZ', 'SPIEL', 'SPIELEN', 'SPINNE', 'SPORT', 'SPRINGEN', 'STADT', 'STAR', 'STARK', 'STEIN', 'STERN', 'STIFT', 'STOCK', 'STOPP', 'STRAND', 'STUHL', 'SUPPE', 'SÜSS', 'TANTE', 'TANZEN', 'TASCHE', 'TASSE', 'TEE', 'TEIG', 'TELLER', 'TEUER', 'TIGER', 'TISCH', 'TOAST', 'TOLL', 'TOPF', 'TOR', 'TORTE', 'TOT', 'TRAGEN', 'TRAUM', 'TRINKEN', 'TURM', 'UHR', 'UNTEN', 'VASE', 'VIEL', 'VOGEL', 'WALD', 'WAND', 'WARM', 'WASCHEN', 'WEG', 'WEIN', 'WEISS', 'WEIT', 'WELT', 'WENIG', 'WERFEN', 'WESPE', 'WIESE', 'WILD', 'WISSEN', 'WITZ', 'WOLF', 'WOLKE', 'WORT', 'WURM', 'ZAHL', 'ZAUBER', 'ZEBRA', 'ZEIT', 'ZELT', 'ZIEGE', 'ZIEL', 'ZIMMER', 'ZUG', 'ZUNGE', 'ZWEIG', 'LARA', 'NOAH'];

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
let collectedImages = [];
let successCountSinceLastNew = 0;

function init() {
    initBackground();
    initStars();
    initKacheln();
    initMultiletterKacheln();
    initGridSlots();
    initIconButtons();
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

function initIconButtons() {
    document.querySelectorAll('.icon-btn').forEach(btn => {
        let touchStartTime = 0;
        let touchStartPos = null;
        
        btn.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }, { passive: true });
        
        btn.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;
            const touch = e.changedTouches[0];
            const dx = Math.abs(touch.clientX - touchStartPos.x);
            const dy = Math.abs(touch.clientY - touchStartPos.y);
            
            if (touchDuration < 500 && dx < 20 && dy < 20) {
                e.preventDefault();
                btn.click();
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
            highlightAllSlotsInWord(gridSlot, true);
            playSound(word.length > 1 ? word : letter);
            setTimeout(() => highlightAllSlotsInWord(gridSlot, false), 500);
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
    if (!gridSlot) {
        const parent = slotElement.parentElement;
        if (parent && parent.classList.contains('grid-slot')) {
            return [parent];
        }
        return [];
    }
    
    const row = gridSlot.closest('.row');
    if (!row) return [gridSlot];
    
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const slotIndex = slots.indexOf(gridSlot);
    
    if (slotIndex === -1) return [gridSlot];
    
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

function getWordSlotsFromGridSlot(gridSlot) {
    const row = gridSlot.closest('.row');
    if (!row) return [gridSlot];
    
    const slots = Array.from(row.querySelectorAll('.grid-slot'));
    const slotIndex = slots.indexOf(gridSlot);
    
    if (slotIndex === -1) return [gridSlot];
    
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

function highlightAllSlotsInWord(gridSlot, highlight) {
    const row = gridSlot.closest('.row');
    if (!row) return;
    
    const allSlots = Array.from(row.querySelectorAll('.grid-slot'));
    const slotIndex = allSlots.indexOf(gridSlot);
    
    if (slotIndex === -1) return;
    
    let startIdx = slotIndex;
    while (startIdx > 0 && allSlots[startIdx - 1].querySelector('.slot')) {
        startIdx--;
    }
    
    let endIdx = slotIndex;
    while (endIdx < allSlots.length - 1 && allSlots[endIdx + 1].querySelector('.slot')) {
        endIdx++;
    }
    
    for (let i = startIdx; i <= endIdx; i++) {
        const slotEl = allSlots[i].querySelector('.slot');
        if (slotEl) {
            if (highlight) {
                slotEl.classList.add('word-hover');
            } else {
                slotEl.classList.remove('word-hover');
            }
        }
    }
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
        
        const voices = speechSynthesis.getVoices();
        const germanVoices = voices.filter(v => v.lang.startsWith('de'));
        
        if (germanVoices.length > 0) {
            const preferredVoice = germanVoices.find(v => 
                v.name.includes('Anna') || 
                v.name.includes('Markus') || 
                v.name.includes('German') ||
                v.name.includes('Deutsch')
            );
            if (preferredVoice) {
                utterance.voice = preferredVoice;
            } else {
                utterance.voice = germanVoices[0];
            }
        }
        
        speechSynthesis.speak(utterance);
    }
}

if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        const germanVoices = voices.filter(v => v.lang.startsWith('de'));
        console.log('Verfügbare deutsche Stimmen:', germanVoices.map(v => v.name));
    };
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
    const collectionSlots = document.querySelector('.collection-slots');
    
    if (mode === 'copy') {
        firstRow.classList.add('template-row');
        if (collectionSlots) collectionSlots.classList.add('visible');
        nextWord();
    } else {
        firstRow.classList.remove('template-row');
        if (collectionSlots) collectionSlots.classList.remove('visible');
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
    
    const images = ['Buch.png', 'Eule.png', 'Mond.png', 'Stern.png', 'Flasche.png', 'Zauberstab.png'];
    
    let randomImage = images[Math.floor(Math.random() * images.length)];
    
    const successImage = document.getElementById('success-image');
    successImage.src = randomImage;
    
    const msg = document.getElementById('success-message');
    msg.classList.add('show');
    
    const closeMsg = () => {
        if (!msg.classList.contains('show')) return;
        msg.classList.remove('show');
        
        if (!collectedImages.includes(randomImage)) {
            animateImageToCollection(randomImage, () => {
                collectedImages.push(randomImage);
                successCountSinceLastNew = 0;
                updateCollectionBar();
                
                if (collectedImages.length === 6) {
                    setTimeout(() => showFireworks(), 500);
                }
            });
        } else {
            successCountSinceLastNew++;
            
            if (successCountSinceLastNew >= 6 && collectedImages.length < 6) {
                const uncollectedImages = images.filter(img => !collectedImages.includes(img));
                if (uncollectedImages.length > 0) {
                    const guaranteedNew = uncollectedImages[Math.floor(Math.random() * uncollectedImages.length)];
                    animateImageToCollection(guaranteedNew, () => {
                        collectedImages.push(guaranteedNew);
                        successCountSinceLastNew = 0;
                        updateCollectionBar();
                        
                        if (collectedImages.length === 6) {
                            setTimeout(() => showFireworks(), 500);
                        }
                    });
                }
            }
        }
        
        document.querySelectorAll('.setzkasten .grid-slot').forEach(slot => {
            slot.innerHTML = '';
            slot.classList.remove('word-start', 'word-middle', 'word-end');
        });
        nextWord();
    };
    
    msg.onclick = closeMsg;
    msg.ontouchend = (e) => {
        e.preventDefault();
        closeMsg();
    };
}

function animateImageToCollection(imageSrc, callback) {
    const successImage = document.getElementById('success-image');
    const collectionSlots = document.querySelectorAll('.collection-slot');
    
    const targetIndex = collectedImages.length;
    if (targetIndex >= 6) {
        if (callback) callback();
        return;
    }
    
    const targetSlot = collectionSlots[targetIndex];
    if (!targetSlot) {
        if (callback) callback();
        return;
    }
    
    const startRect = successImage.getBoundingClientRect();
    const endRect = targetSlot.getBoundingClientRect();
    
    const flyingImage = document.createElement('img');
    flyingImage.src = imageSrc;
    flyingImage.className = 'flying-image';
    flyingImage.style.left = startRect.left + 'px';
    flyingImage.style.top = startRect.top + 'px';
    flyingImage.style.width = startRect.width + 'px';
    flyingImage.style.height = startRect.height + 'px';
    document.body.appendChild(flyingImage);
    
    requestAnimationFrame(() => {
        flyingImage.style.left = endRect.left + 'px';
        flyingImage.style.top = endRect.top + 'px';
        flyingImage.style.width = '6vh';
        flyingImage.style.height = '6vh';
    });
    
    setTimeout(() => {
        flyingImage.remove();
        if (callback) callback();
    }, 500);
}

function updateCollectionBar() {
    const slots = document.querySelectorAll('.collection-slot');
    const images = ['Buch.png', 'Eule.png', 'Mond.png', 'Stern.png', 'Flasche.png', 'Zauberstab.png'];
    
    slots.forEach((slot, index) => {
        if (index < collectedImages.length) {
            const img = document.createElement('img');
            img.src = collectedImages[index];
            img.alt = collectedImages[index].replace('.png', '');
            slot.innerHTML = '';
            slot.appendChild(img);
            slot.classList.add('filled');
        }
    });
}

function showFireworks() {
    const fireworksContainer = document.getElementById('fireworks');
    fireworksContainer.classList.add('active');
    
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            firework.style.boxShadow = `0 0 2vh ${firework.style.background}`;
            fireworksContainer.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 100);
    }
    
    const completionMsg = document.getElementById('completion-message');
    completionMsg.classList.add('show');
    
    completionMsg.onclick = () => {
        completionMsg.classList.remove('show');
        fireworksContainer.classList.remove('active');
        collectedImages = [];
        successCountSinceLastNew = 0;
        document.querySelectorAll('.collection-slot').forEach(slot => {
            slot.innerHTML = '?';
            slot.classList.remove('filled');
        });
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
