async function init() {
    try {
        const response = await fetch('colors.json');
        if (!response.ok) throw new Error('Network response error');

        const colors = await response.json();

        renderColorList(colors);
        setupPaletteControls();
        loadPalettes();
    } catch (error) {
        console.error('error fetching JSON:', error);
    }
}
init();
/* -------- COLOR LIST -------- */
function renderColorList(colors) {
    const colorList = document.getElementById('colorList');
    const currentPal = document.getElementById('currentPalette');

    colors.forEach(color => {

        const li = document.createElement('li');
        li.classList.add('colorNode');
        li.style.setProperty('--hex', color.hex);

        const btn = document.createElement('button');
        btn.classList.add('colorBtn');

        const img = document.createElement('img');
        img.src = color.imageUrl;
        img.alt = '';

        const name = document.createElement('p');
        name.textContent = color.name;

        btn.append(img, name);
        li.append(btn);
        colorList.append(li);

        // add to palette
        li.addEventListener('click', () => {
            const clone = li.cloneNode(true);
            currentPal.append(clone);

            //remove when clicked
            clone.addEventListener('click', () => clone.remove());
        });
    });
}
/* -------- PALETTE STORAGE -------- */
function getPalettes() {
    return JSON.parse(localStorage.getItem('palettes')) || [];
}
function savePalettes(palettes) {
    localStorage.setItem('palettes', JSON.stringify(palettes));
}
function setupPaletteControls() {
    const saveBtn = document.getElementById('saveBtn');
    const delBtn = document.getElementById('delBtn');

    saveBtn.addEventListener('click', savePal);
    delBtn.addEventListener('click', deleteAllPalettes);
}
function savePal() {
    const currentPal = document.getElementById('currentPalette');
    const paletteHTML = currentPal.innerHTML;

    const palettes = getPalettes();
    palettes.push(paletteHTML);

    savePalettes(palettes);

    renderSavedPalette(paletteHTML);
}
function loadPalettes() {
    const palettes = getPalettes();
    palettes.forEach(renderSavedPalette);
}
function renderSavedPalette(html) {
    const saveList = document.getElementById('saveList');

    const li = document.createElement('li');
    li.classList.add('savedPal');
    li.innerHTML = html;

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.classList.add('button', 'delete');

    delBtn.addEventListener('click', () => {
        deletePalette(li, html);
    });

    li.append(delBtn);
    saveList.append(li);
}
function deletePalette(li, html) {
    let palettes = getPalettes();

    palettes = palettes.filter(p => p !== html);

    savePalettes(palettes);

    li.remove();
}
function deleteAllPalettes() {
    localStorage.removeItem('palettes');
    document.getElementById('saveList').innerHTML = '';
}
/* -------- UI TOGGLES -------- */
function setupUI() {

    const darkBtn = document.getElementById('darkBtn');
    const fontBtn = document.getElementById('fontBtn');

    /* restore saved settings */
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark');
    }

    if (localStorage.getItem('serifMode') === 'true') {
        document.body.classList.add('serif');
    }

    /* dark mode toggle */
    darkBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');

        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('darkMode', isDark);
    });

    /* font toggle */
    fontBtn.addEventListener('click', () => {
        document.body.classList.toggle('serif');

        const isSerif = document.body.classList.contains('serif');
        localStorage.setItem('serifMode', isSerif);
    });
}
setupUI();
