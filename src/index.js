/* eslint-env browser */
const span = document.querySelector('span');
const btn = document.querySelector('button');
const cells = document.querySelector('.cells');
const cellsArray = document.getElementsByClassName('cell');

// Функция getRandomCells сортирует в случайном порядке
// клетки игрового поля
const getRandomCells = () => {
  const cellsArrayIndexes = [];
  let i;
  for (i = 0; i < cellsArray.length; i += 1) {
    cellsArrayIndexes.push(i);
  }
  const compare = () => Math.random() - 0.5;
  cellsArrayIndexes.sort(compare);
  let j;
  for (j = 0; j < cellsArrayIndexes.length; j += 1) {
    cells.insertBefore(cellsArray[cellsArrayIndexes[j]], cellsArray[j]);
    cellsArray[j].style.backgroundColor = 'white';
    cellsArray[j].style.transition = 'all .3s ease';
  }
};

// Показываем цвет элемента
const openColor = () => {
  let i;
  for (i = 0; i < cellsArray.length; i += 1) {
    const id = cellsArray[i].attributes[0].value;
    const elemBgrColor = getComputedStyle(cellsArray[i]).backgroundColor;
    cellsArray[i].addEventListener('click', () => {
      const elem = document.getElementById(id);
      elem.style.backgroundColor = elemBgrColor;
    });
  }
};


// Обработчики
btn.addEventListener('click', () => {
  openColor();
  setTimeout(() => getRandomCells(), 500);
});
