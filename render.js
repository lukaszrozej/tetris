const well = document.querySelector('.well')
const squareElems = {}

const setPosition = squareElem => p => {
  squareElem.style.top = `calc(${p.y} * var(--square-size))`
  squareElem.style.left = `calc(${p.x} * var(--square-size))`
}

const createSquareElem = type => {
  const squareElem = document.createElement('div')
  squareElem.classList.add('square')
  squareElem.classList.add(type)
  return squareElem
}

const renderSquare = type => square => {
  const squareElem = squareElems[square.id] || createSquareElem(type)
  squareElems[square.id] = squareElem
  setPosition(squareElem)(square)
  well.appendChild(squareElem)
}

const renderTetronimo = tetronimo => {
  tetronimo.squares.forEach(renderSquare(tetronimo.type))
}

var t = rndTetronimo()
