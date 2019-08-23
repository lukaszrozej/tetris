const width = 10
const height = 20

const root = document.querySelector(':root')
root.style.setProperty('--well-rows', height)
root.style.setProperty('--well-columns', width)

let id = 0

const tetronimos = [
  {
    type: 'I',
    axis: { x: 5, y: 1 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ]
  },
  {
    type: 'o',
    axis: { x: 5, y: 1 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]
  },
  {
    type: 'T',
    axis: { x: 4.5, y: 0.5 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 1, y: 1 }
    ]
  },
  {
    type: 'L',
    axis: { x: 4.5, y: 0.5 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 }
    ]
  },
  {
    type: 'J',
    axis: { x: 4.5, y: 0.5 },
    squares: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 }
    ]
  },
  {
    type: 'S',
    axis: { x: 4.5, y: 0.5 },
    squares: [
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 }
    ]
  },
  {
    type: 'Z',
    axis: { x: 4.5, y: 0.5 },
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

