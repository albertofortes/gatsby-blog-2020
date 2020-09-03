import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
//import Particles from 'react-particles-js';
import Layout from "../components/layout"
import Img from "gatsby-image"
import portfolioVideo from "../videos/office.mp4"
import SEO from "../components/seo"
//import { dotNav } from '../components/dot-nav.js';

const IndexPage = (props) => {
  const [canvasSizeState, setCanvasSizeState] = useState([]);
  const [points, setPoints] = useState(0);
  const [playSound, setPlaySound] = useState(false);

  const widthGameMultiplicator = 3.0;
  const heightGameMultiplicator = 1.5;
  const cellsGame = 20;

  /*const particlesOptions = {
    "particles": {
      "color": {
        "value": "#172b4d"
      },
      "line_linked": {
        "distance": 250,
        "color": "#172b4d",
        "width": 2,
        "opacity": 0.35
      }
    }
  };*/

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          role
          description
          who
          siteUrl
        }
      }

      avatarImage: file(relativePath: { eq: "albertofortes-avallain.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      logos: allFile(filter: {relativeDirectory: {eq: "logos"}}) {
        edges {
          node {
            id
            childImageSharp {
              fixed(width: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }

      portfolio: allFile(
        filter: {
          relativeDirectory: {eq: "portfolio"}
        },
        sort: {
          order: DESC, fields: name
        }) {
        edges {
          node {
            id
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    snakeGame();
    canvasSize();
   // dotNav('section', 'easeInOutCubic');

    window.addEventListener('resize', () => {
      canvasSize();
    });
  }, []);

  const canvasSize = () => {   
    var wrap = document.getElementsByClassName('home-profile')[0];
    if (wrap) {
      setCanvasSizeState( canvasSizeState => [canvasSizeState[0], parseInt(wrap.offsetWidth / widthGameMultiplicator)]);
      setCanvasSizeState( canvasSizeState => [canvasSizeState[1], parseInt(wrap.offsetHeight / heightGameMultiplicator)]);
    };
  };

  const playSounds = () => {
    const audio = new Audio('../audio/ping-short-positive.mp3');
    setPlaySound(true);
    audio.play();
  };

  const snakeGame = () => {
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
      playSounds();
      setPoints( prevPoints => prevPoints + 1);
      setPlaySound(false);
      return {
        x: rnd(0)(table.cols - 1),
        y: rnd(0)(table.rows - 1)
      };
    };

    // Initial state
    const initialState = () => ({
      cols:  parseInt(cellsGame * widthGameMultiplicator),
      rows:  parseInt(cellsGame * heightGameMultiplicator),
      moves: [EAST],
      snake: [],
      apple: { x: parseInt(cellsGame * widthGameMultiplicator / 2), y: parseInt(cellsGame * heightGameMultiplicator / 2) },
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

    // mouse events
    canvas.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      const RECT = e.target.getBoundingClientRect();
      let relativeX = (e.clientX - RECT.left) * state.cols / canvas.width ; //x position within the element.
      let relativeY = (e.clientY - RECT.top) * state.cols / canvas.height;  //y position within the element.
      let snakePositionX = state.snake[0]['x'];
      let snakePositionY = state.snake[0]['y'];

        if (relativeY < snakePositionY) {
          console.log('NORTH');
          state = enqueue(state, NORTH);
        } else if (relativeY > snakePositionY) {
          console.log('SOUTH');
          state = enqueue(state, SOUTH);
        } 
        
        if (relativeX > snakePositionX) {
          console.log('EAST');
          state = enqueue(state, EAST);
        } else if (relativeX < snakePositionX) {
          console.log('WEST4');
          state = enqueue(state, WEST);
        }
    }, false);

    // Main
    draw(); window.requestAnimationFrame(step(0));
  };

  return (
    <Layout>
      <SEO title="Alberto Fortes" description={data.site.siteMetadata.description} siteUrl={data.site.siteMetadata.siteUrl} />
      <section className="container container--home">
        {/*<nav id="dot-nav"></nav>*/}
        <div className="home-profile">
          <div className="home-profile-who">
            <div className="home-profile-avatar">
              <Img fluid={data.avatarImage.childImageSharp.fluid} />
            </div>
            <h1>Hi there, I'm <strong>Alberto</strong>,</h1>
            <h2>a {data.site.siteMetadata.role}</h2>
            <p dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.description }} />
            <p className="who__links">
              <a href="https://www.linkedin.com/in/albertofortes">Linkedin</a>
              <a href="https://codepen.io/albertofortes">Codepen</a>
              <a href="https://dribbble.com/albertofortes">Dribble</a>
              <a href="https://twitter.com/albertofs">Twitter</a>
              <a href="mailto:alberto@fortesand.co">Email</a>
            </p>
          </div>
          <div className="home-profile-game">
            <canvas id="snake-canvas" width={canvasSizeState[0]} height={canvasSizeState[0]}></canvas>
            <div className="score-board">{points}</div>
          </div>
        </div>
        {/*<Particles params={particlesOptions} className={'particles'} />*/}
      </section>

      <section className="container container--customers">
        <div className="brands">
          <h3 className="brands__tit"><strong>Brands</strong> I've been working as freelance, full-time or as contractor </h3>
          <div className="brands__logos">
            {data.logos.edges.map(({ node }) => (
              <div className="logo" key={node.id}>
                <Img fixed={node.childImageSharp.fixed} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container container--video">
        <div className="portfolio__home">
          <h3 className="portfolio__home__tit"><strong>Portfolio</strong> Some old and new work without <abbr title="Non-Disclosure Agreement">NDA</abbr></h3>
          <div className="portfolio__wrapper">
            {data.portfolio.edges.map(({ node }) => (
              <div className="work" key={node.id}>
                <Img fluid={node.childImageSharp.fluid} />
              </div>
            ))}
          </div>          
        </div>        
        <video autoPlay loop>
          <source src={portfolioVideo} type="video/mp4" />
        </video>
      </section>

      <section className="container container--foot container__home">
        <div className="about__home">
          <h3 className="about__home__claim">More than 14 years coding as <span className="size-4">JavaScript, CSS, HTML, PHP expert</span> <span className="size-1">that can help you to code the HTML5, CSS3 and JavaScript of your project.</span> I have my own team to help me when the work requires it.</h3>
          <div className="about__home__cont">
            <p>From 2006 I've been working as freelance front-end developer helping important brands to achieve their projects on time. Working with their own teams or other external agencies to provide expertise view in HTML, CSS, JavaScript, Load optimization, Accessibility, Usability and other related skills.</p>
            <p>My rate starts at 40€/hour with long time collaborations increasing rate with short term works. Currently I'm working as UI Engineer expert at Avallain, anyway, I'm always open to discussing new opportunities for full time work or freelance clients. Write me a line in the form below, maybe me or my colleagues have some time.</p>
            <p>I like to do things right, to work with professional people but most important is to be a friendly person, so for me, like good Andalusian spaniard, I like the cordiality and fellowship.</p>
            <p>My specialty is web design and front-end development, I work with Photoshop, Adobe Illustrator or Sketch App and I turn pixels into semantic HTML, CSS and JavaScript code. Take a look to mu uses page to now more about <Link to="/uses/">what I use for working</Link>.</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
