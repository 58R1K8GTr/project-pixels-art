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
const inputSize = document.createElement('input');
const buttonVQV = document.createElement('button');

// configurar elementos.
function loadLengthPageDiv() {
  return JSON.parse(window.localStorage.getItem('length'));
} // obrigatório criar aqui.

mainH1.innerText = 'Paleta de Cores';
mainH1.id = 'title';
colorPaletteDiv.id = 'color-palette';
pageDiv.id = 'pixel-board';
pageDiv.style.display = 'grid';
const lengthItems = loadLengthPageDiv();
let repeat = 5;
if (lengthItems) { repeat = lengthItems[1]}
pageDiv.style.gridTemplateColumns = `repeat(${repeat}, 40px)`;
pageDiv.style.gridTemplateRows = `repeat(${repeat}, 40px)`;
buttonClear.id = 'clear-board';
buttonClear.innerText = 'Limpar';
buttonClear.classList.add('widgets');
buttonGenerateRandomColors.id = 'button-random-color';
buttonGenerateRandomColors.innerText = 'Cores aleatórias';
buttonGenerateRandomColors.classList.add('widgets');
inputSize.id = 'board-size';
inputSize.classList.add('widgets');
inputSize.type = 'number';
inputSize.min = 1;
inputSize.max = 50;
buttonVQV.innerText = 'VQV';
buttonVQV.id = 'generate-board';
buttonVQV.classList.add('widgets');

// conectando elementos.
body.appendChild(main);
main.appendChild(mainDiv);
mainDiv.appendChild(mainH1);
mainDiv.appendChild(colorPaletteDiv);
mainDiv.appendChild(buttonClear);
mainDiv.appendChild(buttonGenerateRandomColors);
mainDiv.appendChild(inputSize);
mainDiv.appendChild(buttonVQV);
mainDiv.appendChild(pageDiv);

// criando elementos com laço for aqui.
const colors = ['green', 'black', 'yellow', 'red'];
for (let indexDiv = 0; indexDiv < 4; indexDiv += 1) {
  const div = document.createElement('div');
  div.classList.add('color');
  div.classList.add('square');
  div.style.backgroundColor = colors[indexDiv];
  colorPaletteDiv.appendChild(div);
}

const colorsOld = JSON.parse(window.localStorage.getItem('colors'));
let length = 25;
if (lengthItems) { length = lengthItems[0] }
for (let indexColumn = 0; indexColumn < length; indexColumn += 1) {
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

function saveColorsPalette(colorsToSave, forceSave) {
  const colorsOldVerify = window.localStorage.getItem('colors');
  if (!forceSave && colorsOldVerify) { return }
  window.localStorage.setItem('colors', JSON.stringify(colorsToSave));
}

function getColorsFromPageDivChildren() {
  const colorsToReturn = [];
  for (let indexDiv = 0; indexDiv < pageDiv.children.length; indexDiv += 1) {
    const div = pageDiv.children[indexDiv];
    colorsToReturn.push(div.style.backgroundColor);
  }
  return colorsToReturn;
}

function saveLengthPageDiv(valueRepeat) {
  const itens = JSON.stringify([pageDiv.children.length, valueRepeat]);
  window.localStorage.setItem('length', itens);
}

function colorizeDiv(event) {
  const selected = document.querySelector('.selected');
  event.target.style.backgroundColor = selected.style.backgroundColor;
  saveColorsPalette(getColorsFromPageDivChildren(), true);
  saveLengthPageDiv(repeat);
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
  saveLengthPageDiv(repeat);
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

saveColorsPalette(getColorsFromPageDivChildren(), false);
saveLengthPageDiv(repeat);

function removeDivsFromPageDiv() {
  while (pageDiv.firstElementChild) {
    pageDiv.removeChild(pageDiv.firstElementChild);
  }
}

function addEventListenerToPageDiv() {
  const length = pageDiv.children.length;
  for (let indexDiv = 0; indexDiv < length; indexDiv += 1) {
    const div = pageDiv.children[indexDiv];
    div.addEventListener('click', colorizeDiv);
  }
}

function reshape(value) {
  removeDivsFromPageDiv();
  for (let indexDiv = 0; indexDiv < value ** 2; indexDiv += 1) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    div.classList.add('square');
    pageDiv.appendChild(div);
  }
  addEventListenerToPageDiv();
  pageDiv.style.gridTemplateColumns = `repeat(${value}, 40px)`;
  pageDiv.style.gridTemplateRows = `repeat(${value}, 40px)`;
}

function verifyConditionsReshape() {
  if (!inputSize.value) {
    alert('Board inválido!');
    return;
  }
  repeat = Number(inputSize.value);
  if (repeat < 1) { return }
  if (repeat < 5) {
    repeat = 5;
  } else if (repeat > 50) {
    repeat = 50;
  }
  reshape(repeat);
  saveColorsPalette(getColorsFromPageDivChildren(), true);
  saveLengthPageDiv(repeat);
}

buttonVQV.addEventListener('click', verifyConditionsReshape);
