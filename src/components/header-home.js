import { Link } from "gatsby"
//import PropTypes from "prop-types"
import React from "react"

class HeaderHome extends React.Component {
  constructor() {
    super();

    // Define the initial state:
    this.state = {
      headerWidth: 0,
      headerHeight: 0,
      points: 0,
      playSoundEat: false
    };

    //this.soundEat = new Audio('http://localhost:8000/static/ping-short-positive-355e760f613061fdd24340dde5a4cd7c.mp3')
    this.soundEat = new Audio('../audio/ping-short-positive.mp3')
  }

  componentDidMount () {
    window.addEventListener("scroll", function (event) {
      var scroll = this.scrollY;
    });

    window.addEventListener("resize", function (event) {
      this.canvasSize();
    }.bind(this));

    this.canvasSize();
    this.snakeGame();
  }

  componentWillUnmount() {}

  playSounds() {
    this.setState({ playSoundEat: !this.state.playSoundEat }, () => {
      this.state.playSoundEat ? this.soundEat.play() : this.soundEat.pause();
    });
  }

  canvasSize() {
    var wrap = document.getElementById('wrap');
    var who = document.getElementsByClassName('who');
    
    if (wrap) {
      this.setState({
        headerWidth: wrap.offsetWidth,
        headerHeight: wrap.offsetHeight - who[0].offsetHeight,
      })
    }
  }

  snakeGame() {
    // base
    const adjust    = n => f => xs => mapi(x => i => i === n ? f(x) : x)(xs);
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
    const pointEq = p1 => p2 => p1.x === p2.x && p1.y === p2.y;

    // Booleans
    const willEat   = state => pointEq(nextHead(state))(state.apple);
    const willCrash = state => state.snake.find(pointEq(nextHead(state)));
    const validMove = move => state => state.moves[0].x + move.x !== 0 || state.moves[0].y + move.y !== 0;

    // Next values based on state
    const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves;
    const nextApple = state => willEat(state) ? rndPos(state) : state.apple;
    const nextHead  = state => state.snake.length === 0
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

    const rndPos = function(table) {
      this.playSounds();
      this.setState({
        points: this.state.points + 1,
        playSoundEat: false
      })
      return {
        x: rnd(0)(table.cols - 1),
        y: rnd(0)(table.rows - 1)
      };
    }.bind(this);

    // Initial state
    const initialState = () => ({
      cols:  160,
      rows:  80,
      moves: [EAST],
      snake: [],
      apple: { x: 20, y: 20 },
    });

    const next = spec({
      rows:  prop('rows'),
      cols:  prop('cols'),
      moves: nextMoves,
      snake: nextSnake,
      apple: nextApple
    });

    const enqueue = (state, move) => validMove(move)(state) ? merge(state)({ moves: state.moves.concat([move]) }) : state;

    const canvas = document.getElementById('snake-canvas');
    const ctx = canvas.getContext('2d');

    // Mutable state
    let state = initialState();

    // Position helpers
    const x = c => Math.round(c * canvas.width / state.cols);
    const y = r => Math.round(r * canvas.height / state.rows);

    // Game loop draw
    const draw = () => {
      // clear
      ctx.fillStyle = '#0e2439';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // draw snake
      ctx.fillStyle = '#ffe600';
      state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)));

      // draw apples
      ctx.fillStyle = '#ed4567';
      ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

      // add crash
      if (state.snake.length === 0) {
        ctx.fillStyle = '#B4582F';
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
        default: break;
      }
    });

    // Main
    draw(); window.requestAnimationFrame(step(0));
  }

  render () {
    const { siteRole, siteDescription } = this.props

    return (
      <header id="headerHome" className="header-home">
        <div id="wrap" className="wrapper">
          <div className="who">
            <h1>Hola, I'm <strong>Alberto Fortes</strong>,</h1>
            <h2>{siteRole}</h2>
            <div className="who__desc" dangerouslySetInnerHTML={{ __html: siteDescription }} />
            <p className="who__links">
              <a href="https://www.linkedin.com/in/albertofortes">Linkedin</a>
              <a href="https://dribbble.com/albertofortes">Dribble</a>
              <a href="https://twitter.com/albertofs">Twitter</a>
              <Link to="/about/">About me</Link>
              <Link to="/blog/">Blog</Link>
              <a href="mailto:albertofortes@gmail.com">Email</a>
            </p>
          </div>
          <canvas id="snake-canvas" width={this.state.headerWidth} height={this.state.headerHeight}></canvas>
          <div className="score-board">{this.state.points}</div>
        </div>
      </header>
    )
  }
}

export default HeaderHome
