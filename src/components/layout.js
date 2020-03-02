/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import Particles from 'react-particles-js';
import Header from "./header"

const particlesOptions = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "speed": 2,
        "size_min": 0.3
      }
    },
    "line_linked": {
      "enable": false
    },
    "move": {
      "random": true,
      "speed": 1,
      "direction": "top",
      "out_mode": "out"
    },
    "color": {
      "value": ["#b284be", "#ed4567"] 
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      }
    },
    "modes": {
      "bubble": {
        "distance": 250,
        "duration": 2,
        "size": 0,
        "opacity": 0
      },
      "repulse": {
        "distance": 400,
        "duration": 4
      }
    }
  }
}

const Layout = ({ children }) => {

  return (
    <>
      <Header className="header" />
      <div className="container">
        {children}
        <Particles params={particlesOptions} className={'particles'} />
      </div>
      <footer className="footer">
        <p>2006 - {new Date().getFullYear()} Alberto Fortes. Coded with React JavaScript, GatsbyJS, HTML5, CSS / SASS, Grunt. | <Link to="/cookies" activeClassName="active">Cookies</Link></p>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
