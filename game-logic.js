const width = 10
const height = 20

const root = document.querySelector(':root')
root.style.setProperty('--well-rows', height)
root.style.setProperty('--well-columns', width)

let id = 0

const tetrominos = [
  {
    type: 'I',
    axis: { x: 1.5, y: -0.5 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ]
  },
  {
    type: 'o',
    axis: { x: 0.5, y: 0.5 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]
  },
  {
    type: 'T',
    axis: { x: 1, y: 0 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 1 }
    ]
  },
  {
    type: 'L',
    axis: { x: 1, y: 0 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 }
    ]
  },
  {
    type: 'J',
    axis: { x: 1, y: 0 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 }
    ]
  },
  {
    type: 'S',
    axis: { x: 1, y: 0 },
    squares: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]
  },
  {
    type: 'Z',
    axis: { x: 1, y: 0 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 }
    ]
  }
]

const pickRandom = array => array[Math.floor(Math.random() * array.length)]

const rndTetromino = () => {
  const tetromino = pickRandom(tetrominos)
  // const tetromino = tetrominos[0]
  const squares = tetromino.squares.map(p => ({ ...p, id: id++ }))
  return { ...tetromino, ...{ squares } }
}

const add = p1 => p2 => ({
  x: p1.x + p2.x,
  y: p1.y + p2.y
})

const sub = p1 => p2 => ({
  x: -p1.x + p2.x,
  y: -p1.y + p2.y
})

const pipe = (...fs) => x => fs.reduce((y, f) => f(y), x)

const right = { x: 1, y: 0 }
const left = { x: -1, y: 0 }
const down = { x: 0, y: 1 }

const moveSquare = vector => square => ({ ...square, ...add(square)(vector) })

const move = vector => tetromino => {
  const squares = tetromino.squares.map(moveSquare(vector))
  const axis = add(tetromino.axis)(vector)
  return {
    type: tetromino.type,
    axis,
    squares
  }
}

const rotatePointaRoundOrigin = p => ({ x: -p.y, y: p.x })

const rotatePoint = axis => pipe(
  sub(axis),
  rotatePointaRoundOrigin,
  add(axis)
)

const rotateSquare = axis => square => ({ ...square, ...rotatePoint(axis)(square) })

const rotate = tetromino => {
  const squares = tetromino.squares.map(rotateSquare(tetromino.axis))
  return {
    ...tetromino,
    squares
  }
}

const emptyRow = Array(width).fill(undefined)

const emptyRows = Array(height).fill(emptyRow)

const empty = square => square === undefined
const notEmpty = square => square !== undefined

const equal = p1 => p2 =>
  p1.x === p2.x &&
  p1.y === p2.y

const mount = tetronimo => rows =>
  rows.map((row, y) =>
    row.map((square, x) =>
      tetronimo.squares.find(equal({ x, y })) || square
    )
  )

const inBounds = p =>
  p.x >= 0 &&
  p.x < width &&
  p.y < height

const collision = rows => tetromino =>
  rows.some((row, y) =>
    row.some((square, x) =>
      notEmpty(square) &&
      tetromino.squares.some(equal({ x, y }))
    )
  )

const valid = rows => tetromino =>
  tetromino.squares.every(inBounds) &&
  !collision(rows)(tetromino)

const push = vector => state => {
  if (!state.tetromino) return state

  const tetromino = move(vector)(state.tetromino)
  if (valid(state.rows)(tetromino)) return { ...state, tetromino }

  return state
}

const wellCenter = {
  x: width >> 2 - 1,
  y: 0
}

const notFull = row =>
  row.some(empty)

const clearFullRows = rows =>
  rows.filter(notFull)

const drop = state => {
  if (!state.tetromino) return {
    ...state,
    tetromino: move(wellCenter)(state.next),
    next: rndTetromino()
  }

  const tetromino = move(down)(state.tetromino)
  if (valid(state.rows)(tetromino)) return { ...state, tetromino }

  const mountedRows = mount(state.tetromino)(state.rows)
  const clearedRows = clearFullRows(mountedRows)

  if (clearedRows.length === height) {
    return {
      ...state,
      rows: mountedRows,
      tetromino: move(wellCenter)(state.next),
      next: rndTetromino()
    }
  }

  const rows = Array(height - clearedRows.length).fill(emptyRow).concat(clearedRows)
  return {
    ...state,
    rows,
    tetromino: undefined
  }
}

const turn = state => {
  if (!state.tetromino) return state

  const tetromino = rotate(state.tetromino)
  if (valid(state.rows)(tetromino)) return { ...state, tetromino }

  return state
}

const initialState = {
  tetromino: move(wellCenter)(rndTetromino()),
  next: rndTetromino(),
  rows: emptyRows
}

const nextState = (state, action) => action(state)
