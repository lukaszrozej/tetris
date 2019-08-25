const well = document.querySelector('.well')
const next = document.querySelector('.next')
const squareElems = {}

const setPosition = squareElem => p => {
  squareElem.style.top = `calc(${p.y} * var(--square-size))`
  squareElem.style.left = `calc(${p.x} * var(--square-size))`
}

const createSquareElem = (type, id) => {
  const squareElem = document.createElement('div')
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
    const rowIsFull = row.every(notEmpty)
    row.forEach((square, x) => {
      if (!square) return

      const squareElem = squareElems[square.id]
      squareElem.classList.add('row-square')
      if (rowIsFull) squareElem.classList.add('full')

      setPosition(squareElem, { x, y })
    })
  })
}

const render = state => {
  if (state.tetromino) renderTetromino(well)(state.tetromino)
  renderTetromino(next)(state.next)
  renderRows(state.rows)
}

// var t = rndTetromino()
// var r = emptyRows
