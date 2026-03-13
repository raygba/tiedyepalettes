// TO DO:
// add delete btn to each saved pal
// clear and random palette btns
// more colors
// save toggle prefs
// maybe suggest complementary/analogous/etc colors

// FIX:
// its possible to save an empty palette

// get colors json array, parse data, add colors to li and append to color list element
fetch('colors.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('network response error');
        }
        return response.json(); // parse json data
    })
    .then(data => {
        // access json data
        const colors = data
        console.log(colors)

        var colorList = document.getElementById('colorList')

        colors.forEach(element => {
            var color = document.createElement('li');
            var image = document.createElement('img');
            var colorName = document.createElement('p');
            var colorBtn = document.createElement('button');
            var colorLi = document.createElement('li');
            colorLi.setAttribute('name', 'colorNode');
            colorLi.style.setProperty('--hex', element.hex)

            image.src = element.imageUrl;
            image.alt = '';
            colorName.innerHTML = element.name;
            colorBtn.setAttribute('id', 'colorBtn');

            colorBtn.appendChild(image);
            colorBtn.appendChild(colorName);
            colorLi.appendChild(colorBtn);
            colorList.append(colorLi);

            // console.log(element.hex)

        });
    })
    .then(colorNodes => {
        colorNodes = document.getElementsByName('colorNode')
        console.log(colorNodes)
        var currentPal = document.getElementById('currentPalette');
        console.log(currentPal)
        colorNodes.forEach(node => {
            const clone = node.cloneNode(true);

            node.addEventListener('click', cloneColors)
            function cloneColors() {
                currentPal.appendChild(clone);
            }
            clone.addEventListener('click', killClone)
            function killClone() {
                currentPal.removeChild(clone);
            }
        })
        var saveBtn = document.getElementById('saveBtn');
        var saveList = document.getElementById('saveList');
        saveBtn.addEventListener('click', savePal);

        function savePal() {
            const paletteHTML = currentPal.innerHTML

            // create palette list item
            const li = document.createElement('li')
            // create nested ul for list of colors
            const ul = document.createElement('ul')
            // for styling
            ul.classList.add('savedPal')
            li.classList.add('savedLi')

            // show it immediately
            ul.innerHTML = paletteHTML
            li.append(ul)
            saveList.append(li)

            // save to localStorage
            let palettes = JSON.parse(localStorage.getItem('palettes')) || []
            palettes.push(paletteHTML)
            localStorage.setItem('palettes', JSON.stringify(palettes))
        }
        function loadPalettes() {
            const palettes = JSON.parse(localStorage.getItem('palettes')) || []

            palettes.forEach(html => {
                const li = document.createElement('li')
                // create delete button
                const delEach = document.createElement('button')
                delEach.innerHTML = '❌'
                delEach.classList.add('button', 'delete')
                delEach.addEventListener('click', () => deleteEachPal(id = html.id, li))

                function deleteEachPal(id, li) {
                    let palettes = JSON.parse(localStorage.getItem('palettes')) || []
                    palettes.splice(id, 1)
                    localStorage.setItem('palettes', JSON.stringify(palettes))
                    li.remove()
                    console.log('deleted pal')
                }

                li.classList.add('savedPal')
                li.innerHTML = html
                li.append(delEach)
                saveList.append(li)
            })
        }

        loadPalettes()

        const delBtn = document.getElementById('delBtn')
        delBtn.addEventListener('click', deletePals)
        function deletePals() {
            localStorage.removeItem('palettes')
            saveList.innerHTML = ''
            console.log('deleted all')
        }

    }
    )
    .catch(error => {
        console.error('error fetching JSON:', error)
    });

// dark mode
var darkBtn = document.getElementById('darkBtn');
function darkMode() {
    console.log('button clicked')
    document.body.classList.toggle('dark')
    var main = document.getElementsByTagName('main')
    // var darkBtn = document.getElementById('darkBtn')
}

// toggle font
var fontBtn = document.getElementById('fontBtn')
function toggleFont() {
    console.log('button clicked')
    document.body.classList.toggle('serif')
}