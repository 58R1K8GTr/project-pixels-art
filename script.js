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

// configurar elementos.
mainH1.innerText = 'Paleta de Cores';
mainH1.id = 'title';
colorPaletteDiv.id = 'color-palette';
pageDiv.id = 'pixel-board';
pageDiv.style.display = 'grid';
pageDiv.style.gridTemplateColumns = 'repeat(5, 40px)';
pageDiv.style.gridTemplateRows = 'repeat(5, 40px)';
buttonClear.id = 'clear-board';
buttonClear.innerText = 'Limpar';

// conectando elementos.
body.appendChild(main);
main.appendChild(mainDiv);
mainDiv.appendChild(mainH1);
mainDiv.appendChild(colorPaletteDiv);
mainDiv.appendChild(buttonClear);
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

for (let indexColumn = 0; indexColumn < 5; indexColumn += 1) {
  for (let indexDiv = 0; indexDiv < 5; indexDiv += 1) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    div.classList.add('square');
    pageDiv.appendChild(div);
  }
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

function colorize(event) {
  const selected = document.querySelector('.selected');
  event.target.style.backgroundColor = selected.style.backgroundColor;
}

for (let indexDiv = 0; indexDiv < pageDiv.children.length; indexDiv += 1) {
  const div = pageDiv.children[indexDiv];
  div.addEventListener('click', colorize);
}

function clearAllSquares() {
  for (let indexDiv = 0; indexDiv < pageDiv.children.length; indexDiv++) {
    const div = pageDiv.children[indexDiv];
    div.style.backgroundColor = 'white';
  }
}

buttonClear.addEventListener('click', clearAllSquares);