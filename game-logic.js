const width = 10
const height = 20

const root = document.querySelector(':root')
root.style.setProperty('--well-rows', height)
root.style.setProperty('--well-columns', width)

let id = 0

const tetronimos = [
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

const rndTetronimo = () => {
  // const tetronimo = pickRandom(tetronimos)
  const tetronimo = tetronimos[6]
  const squares = tetronimo.squares.map(p => ({ ...p, id: id++ }))
  return { ...tetronimo, ...{ squares } }
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

const move = vector => tetronimo => {
  const squares = tetronimo.squares.map(moveSquare(vector))
  const axis = add(tetronimo.axis)(vector)
  return {
    type: tetronimo.type,
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

const rotate = tetronimo => {
  const squares = tetronimo.squares.map(rotateSquare(tetronimo.axis))
  return {
    ...tetronimo,
    squares
  }
}
