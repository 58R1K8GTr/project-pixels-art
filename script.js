// DOM.
// pegar elementos.
const body = document.querySelector('body');

// criar elementos.
const main = document.createElement('main');
const mainDiv = document.createElement('div');
const mainH1 = document.createElement('h1');
const colorPaletteDiv = document.createElement('div');

// configurar elementos.
mainH1.innerText = 'Paleta de Cores';
mainH1.id = 'title';
colorPaletteDiv.id = 'color-palette';

// conectando elementos.
body.appendChild(main);
main.appendChild(mainDiv);
mainDiv.appendChild(mainH1);
mainDiv.appendChild(colorPaletteDiv);

// criando elementos com laço for aqui.
colors = ['green', 'black', 'yellow', 'red'];
for (let indexDiv = 0; indexDiv < 4; indexDiv += 1) {
  const div = document.createElement('div');
  div.classList.add('color');
  div.style.border = "1px solid black";
  div.style.display = 'inline-block';
  div.style.padding = '40px';
  div.style.marginRight = '5px';
  div.style.backgroundColor = colors[indexDiv];
  colorPaletteDiv.appendChild(div);
}

// código.
