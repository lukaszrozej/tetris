const well = document.querySelector('.well')
const next = document.querySelector('.next')
const squareElems = {}

const setPosition = squareElem => p => {
  squareElem.style.top = `calc(${p.y} * var(--square-size))`
  squareElem.style.left = `calc(${p.x} * var(--square-size))`
}

const createSquareElem = (type, id) => {
  const squareElem = document.createElement('div')
  squareElem.textContent = id
  squareElem.classList.add('square')
  squareElem.classList.add(type)
  squareElems[id] = squareElem
  return squareElem
}

const renderTetromino = parent => tetromino => {
  tetromino.squares.forEach(square => {
    const squareElem = squareElems[square.id] || createSquareElem(tetromino.type, square.id)
    parent.appendChild(squareElem)
    setPosition(squareElem)(square)
  })
}

const renderRows = rows => {
  rows.forEach((row, y) => {
    row.forEach((square, x) => {
      if (!square) return

      const squareElem = squareElems[square.id]
      squareElem.classList.add('row-square')

      setPosition(squareElem)({ x, y })
    })
  })
}

const ids = state => [
  ...state.rows.flatMap(row =>
    row
      .filter(notEmpty)
      .map(square => square.id)
  ),
  ...state.next.squares.map(square => square.id)
]

const removeFull = () => {
  Object.entries(squareElems).forEach(([id, squareElem]) => {
    if (squareElem.classList.contains('full')) {
      delete squareElems[id]
      squareElem.remove()
    }
  })
}

const render = state => {
  if (state.tetromino) {
    renderTetromino(well)(state.tetromino)
    removeFull()
  } else {
    const squareIds = ids(state)
    Object.entries(squareElems).forEach(([id, squareElem]) => {
      if (!(squareIds.includes(parseInt(id)))) {
        squareElem.classList.add('full')
      }
    })
  }
  renderTetromino(next)(state.next)
  renderRows(state.rows)
}

// var t = rndTetromino()
// var r = emptyRows
