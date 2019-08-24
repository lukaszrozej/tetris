const { fromEvent, merge } = rxjs
const { filter, map, scan, startWith, switchMap } = rxjs.operators

const keyMapping = {
  37: push(left),
  39: push(right),
  40: drop
}

const keyboardActions = fromEvent(document, 'keydown').pipe(
  filter(e => e.keyCode in keyMapping),
  map(e => keyMapping[e.keyCode])
)

const actions = keyboardActions

gameStates = actions.pipe(
  scan(nextState, initialState),
  startWith(initialState)
)

gameStates.forEach(render)
