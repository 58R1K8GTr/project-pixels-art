// DOM.
// pegar elementos.
const body = document.querySelector('body');

// criar elementos.
const main = document.createElement('main');
const mainDiv = document.createElement('div');
const mainH1 = document.createElement('h1');
const colorPaletteDiv = document.createElement('div');
const pageDiv = document.createElement('div');
const buttonClear = document.createElement('button');
const buttonGenerateRandomColors = document.createElement('button');

// configurar elementos.
mainH1.innerText = 'Paleta de Cores';
mainH1.id = 'title';
colorPaletteDiv.id = 'color-palette';
pageDiv.id = 'pixel-board';
buttonClear.id = 'clear-board';
buttonClear.innerText = 'Limpar';
buttonClear.classList.add('buttons');
buttonGenerateRandomColors.id = 'button-random-color';
buttonGenerateRandomColors.innerText = 'Cores aleatórias';
buttonGenerateRandomColors.style.display = 'inline-block';
buttonGenerateRandomColors.classList.add('buttons');

// conectando elementos.
body.appendChild(main);
main.appendChild(mainDiv);
mainDiv.appendChild(mainH1);
mainDiv.appendChild(colorPaletteDiv);
mainDiv.appendChild(buttonClear);
mainDiv.appendChild(buttonGenerateRandomColors);
mainDiv.appendChild(pageDiv);

// criando elementos com laço for aqui.
colors = ['green', 'black', 'yellow', 'red'];
for (let indexDiv = 0; indexDiv < 4; indexDiv += 1) {
  const div = document.createElement('div');
  div.classList.add('color');
  div.classList.add('square');
  div.style.backgroundColor = colors[indexDiv];
  colorPaletteDiv.appendChild(div);
}

const colorsOld = JSON.parse(window.localStorage.getItem('colors'));
for (let indexColumn = 0; indexColumn < 25; indexColumn += 1) {
  const div = document.createElement('div');
  div.classList.add('pixel');
  div.classList.add('square');
  if (colorsOld) {
    div.style.backgroundColor = colorsOld[indexColumn];
  }
  pageDiv.appendChild(div);
}

// código.

function selectColor(event) {
  const previousSelected = document.querySelector('.selected');
  if (previousSelected) {
    previousSelected.classList.remove('selected');
  }
  event.target.classList.add('selected');
}

for (let indexDiv = 0; indexDiv < colorPaletteDiv.children.length; indexDiv += 1) {
  const div = colorPaletteDiv.children[indexDiv];
  div.addEventListener('click', selectColor);
}

function colorizeDiv(event) {
  const selected = document.querySelector('.selected');
  event.target.style.backgroundColor = selected.style.backgroundColor;
  saveColorsPalette(getColorsFromPageDivChildren(), true);
}

for (let indexDiv = 0; indexDiv < pageDiv.children.length; indexDiv += 1) {
  const div = pageDiv.children[indexDiv];
  div.addEventListener('click', colorizeDiv);
}

function clearAllSquares() {
  for (let indexDiv = 0; indexDiv < pageDiv.children.length; indexDiv += 1) {
    const div = pageDiv.children[indexDiv];
    div.style.backgroundColor = 'white';
  }
  saveColorsPalette(getColorsFromPageDivChildren(), true);
}

buttonClear.addEventListener('click', clearAllSquares);

function generateRandomColor() {
  const letters = '123456789ABCDEF';
  let color = '#';
  for (let indexLetter = 0; indexLetter < 6; indexLetter += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function randomColorizeDivs() {
  for (let indexDiv = 0; indexDiv < colorPaletteDiv.children.length; indexDiv += 1) {
    const div = colorPaletteDiv.children[indexDiv];
    div.style.backgroundColor = generateRandomColor();
  }
}

buttonGenerateRandomColors.addEventListener('click', randomColorizeDivs);

function saveColorsPalette(colors, forceSave) {
  let colorsOld = window.localStorage.getItem('colors');
  if (!forceSave) {
    if (colorsOld) {
      return;
    }
  }
  window.localStorage.setItem('colors', JSON.stringify(colors));
}

function getColorsFromPageDivChildren() {
  const colors = [];
  for (let indexDiv = 0; indexDiv < pageDiv.children.length; indexDiv += 1) {
    const div = pageDiv.children[indexDiv];
    colors.push(div.style.backgroundColor);
  }
  return colors;
}

saveColorsPalette(getColorsFromPageDivChildren(), false);