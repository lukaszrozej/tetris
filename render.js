const root = document.querySelector(':root')
root.style.setProperty('--well-rows', height)
root.style.setProperty('--well-columns', width)

root.style.setProperty('--transition-left-time', `${minTime * width / (width + 4)}ms`)
root.style.setProperty('--transition-down-time', `${minTime * 4 / (width + 4)}ms`)

const well = document.querySelector('.well')
const next = document.querySelector('.next')
const scoreElem = document.querySelector('.score')
const pauseElem = document.querySelector('.pause')
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
    // parent.appendChild(squareElem)
    parent.prepend(squareElem)
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
  ...state.next.squares.map(square => square.id),
  ...(
    state.tetromino
      ? state.tetromino.squares.map(square => square.id)
      : []
  )
]

const clearSquareElems = state => {
  const squareIds = ids(state)
  Object.entries(squareElems).forEach(([id, squareElem]) => {
    if (!(squareIds.includes(parseInt(id)))) {
      delete squareElems[id]
      squareElem.remove()
    }
  })
}

const renderScore = score => {
  scoreElem.textContent = score
}

const renderPause = state =>
  state.paused
    ? pauseElem.classList.add('show')
    : pauseElem.classList.remove('show')

const render = state => {
  if (state.tetromino) {
    renderTetromino(well)(state.tetromino)
    clearSquareElems(state)
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
  renderScore(state.score)

  renderPause(state)
}
