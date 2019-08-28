const { fromEvent, merge, animationFrame, interval } = rxjs
const { filter, map, scan, startWith, distinct } = rxjs.operators

const keyMapping = {
  27: newGame,
  37: push(left),
  38: turn,
  39: push(right),
  40: drop
}

const keyboardActions = fromEvent(document, 'keydown').pipe(
  filter(e => e.keyCode in keyMapping),
  map(e => keyMapping[e.keyCode])
)

const timeActions = interval(0, animationFrame).pipe(
  map(() => tick(Date.now()))
)

const actions = merge(keyboardActions, timeActions)

const initialState = newGame()

gameStates = actions.pipe(
  scan(nextState, initialState),
  startWith(initialState),
  distinct()
)

gameStates.forEach(render)
