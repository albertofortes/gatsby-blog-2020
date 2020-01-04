// base
const adjust    = n => f => xs => mapi(x => i => i == n ? f(x) : x)(xs);
const dropFirst = xs => xs.slice(1);
const dropLast  = xs => xs.slice(0, xs.length - 1);
const id        = x => x;
const k         = x => y => x;
const map       = f => xs => xs.map(f);
const mapi      = f => xs => xs.map((x, i) => f(x)(i));
const merge     = o1 => o2 => Object.assign({}, o1, o2);
const mod       = x => y => ((y % x) + x) % x; // http://bit.ly/2oF4mQ7
const objOf     = k => v => ({ [k]: v });
const pipe      = (...fns) => x => [...fns].reduce((acc, f) => f(acc), x);
const prop      = k => o => o[k];
const range     = n => m => Array.apply(null, Array(m - n)).map((_, i) => n + i);
const rep       = c => n => map(k(c))(range(0)(n));
const rnd       = min => max => Math.floor(Math.random() * max) + min;
const spec      = o => x => Object.keys(o)
  .map(k => objOf(k)(o[k](x)))
  .reduce((acc, o) => Object.assign(acc, o));

const base = { adjust, dropFirst, dropLast, id, k, map, merge, mod, objOf, pipe, prop, range, rep, rnd, spec };
Object.getOwnPropertyNames(base).map(p => global[p] = base[p]);

// Constants
const NORTH = { x: 0, y:-1 };
const SOUTH = { x: 0, y: 1 };
const EAST  = { x: 1, y: 0 };
const WEST  = { x:-1, y: 0 };

// Point operations
const pointEq = p1 => p2 => p1.x == p2.x && p1.y == p2.y;

// Booleans
const willEat   = state => pointEq(nextHead(state))(state.apple);
const willCrash = state => state.snake.find(pointEq(nextHead(state)));
const validMove = move => state => state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0;

// Next values based on state
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves;
const nextApple = state => willEat(state) ? rndPos(state) : state.apple;
const nextHead  = state => state.snake.length == 0
  ? { x: 2, y: 2 }
  : {
    x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
  };
const nextSnake = state => willCrash(state)
  ? []
  : (willEat(state)
    ? [nextHead(state)].concat(state.snake)
    : [nextHead(state)].concat(dropLast(state.snake)));

// Randomness
const rndPos = table => ({
  x: rnd(0)(table.cols - 1),
  y: rnd(0)(table.rows - 1)
});

// Initial state
const initialState = () => ({
  cols:  20,
  rows:  14,
  moves: [EAST],
  snake: [],
  apple: { x: 16, y: 2 },
});

const next = spec({
  rows:  prop('rows'),
  cols:  prop('cols'),
  moves: nextMoves,
  snake: nextSnake,
  apple: nextApple
});

const enqueue = (state, move) => validMove(move)(state) ? merge(state)({ moves: state.moves.concat([move]) }) : state;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Mutable state
let state = initialState();

// Position helpers
const x = c => Math.round(c * canvas.width / state.cols);
const y = r => Math.round(r * canvas.height / state.rows);

// Game loop draw
const draw = () => {
  // clear
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // draw snake
  ctx.fillStyle = 'rgb(0,200,50)';
  state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)));

  // draw apples
  ctx.fillStyle = 'rgb(255,50,0)';
  ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

  // add crash
  if (state.snake.length == 0) {
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// Game loop update
const step = t1 => t2 => {
  if (t2 - t1 > 100) {
    state = next(state);
    draw();
    window.requestAnimationFrame(step(t2));
  } else {
    window.requestAnimationFrame(step(t1));
  }
}

// Key events
window.addEventListener('keydown', e => {
  switch (e.key) {
    case 'w': case 'h': case 'ArrowUp':    state = enqueue(state, NORTH); break
    case 'a': case 'j': case 'ArrowLeft':  state = enqueue(state, WEST);  break
    case 's': case 'k': case 'ArrowDown':  state = enqueue(state, SOUTH); break
    case 'd': case 'l': case 'ArrowRight': state = enqueue(state, EAST);  break
  }
});

// Main
draw(); window.requestAnimationFrame(step(0));