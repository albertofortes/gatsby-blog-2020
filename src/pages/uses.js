import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import Img from "gatsby-image"
import Particles from 'react-particles-js';
import Layout from "../components/layout"
import SEO from "../components/seo"

const Uses = ({ children }) => {
  const particlesOptions = {
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
  };

  const data = useStaticQuery(graphql`
     {
      site {
        siteMetadata {
          title
          role
          description
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Alberto Fortes' uses page" description={data.site.siteMetadata.description} />
      <article className="article">
        {/*
          <div className="article__image">
            <Img fluid={data.file.childImageSharp.fluid} alt="Alberto Fortes, front-end developer office desk" />
          </div>
        */}
        <div className="container">
          <h2 className="article__title">What I use in my day a day as front-end developer.</h2>
          <p className="article__subtitle">Technologies and goods I use for my day a day work as Front-end and UI developer.</p>
        </div>
        <div className="greyed">
          <div className="article__cont">
            <h3 className="article__claim">As remote front-end developer, working as team lead in a 100% remote team I need to uses a combination of tech stuff and software, but also some other even more important like a comfortable office, big desk, coworkers to share my space, books, gym machine and a retro arcade. Yes, we need it.</h3>
            <div className="article__cont__cols">
              <h4>My own full equiped office:</h4>
              <ul>
                <li>Late 2015 MacBook Pro Retina 15". 2,5 GHz Intel Core i7. 16GB. AMD Radeon R9 M370X 2 GB.</li>
                <li>Monitor 32", AOC. Cheap one.</li>
                <li>Apple Magic Keyboard.</li>
                <li>Custom PC with Win10 to test in real devices.</li>
                <li>Monitor 24" Dell (for Windows machine).</li>
                <li>Android Xiaomi Redmi Plus 5 to test in big mobiles.</li>
                <li>Android Samsung Galaxy A20e to test in regular size mobiles.</li>
                <li>iPad 2 to test on IOS tablets.</li>
                <li>Huawei M3 Lite 10.1" to test in 10" tablets.</li>
                <li>Jabra Evolve 65 Bluetooth with micro Headphones. I work on remote and we have several calls daily.</li>
                <li>Old mouse, I've spent money in expensive mouses as Magic Mouse, and I'm never happy with them. So an optical with cable one is OK to me.</li>
                <li>Griffin aluminium macbook stand.</li>
                <li>Ikea 150cm table + Ikea KALLAX Shelving unit lying on the floor as table.</li>
                <li><span role="img" aria-label="printer">🖨️</span> Printer and scanner.</li>
                <li>Arcade cabinet made by me <span role="img" aria-label="joystick">🕹️</span> + 24" Monitor + Raspberry Pi 3B Plus.</li>
                <li><span role="img" aria-label="strong">💪</span> Multigym machine.</li>
                <li>TV + Playstation + Sofa <span role="img" aria-label="sofa"></span>🛋️ Relax zone.</li>
                <li>Bookcase stand with many books and mags <span role="img" aria-label="books">📚</span> in the relax zone.</li>
                <li>A desk <span role="img" aria-label="surfing">🏄🏻</span> ready for desksurfing. Developer / designer interested?</li>
              </ul>
              <h4>Software:</h4>
              <ul>
                <li>Chrome as dev browser</li>
                <li>Visual Studio Code. Dark+ (default dark).</li>
                <li>iTerm 2.</li>
                <li>Oh my zsh.</li>
                <li>Slack.</li>
                <li>Photoshop.</li>
                <li>Illustrator.</li>
                <li>Sketch.</li>
                <li>Share Mouse.</li>
                <li>Image Optim.</li>
              </ul>
            </div>
          </div>
          <Particles params={particlesOptions} className={'particles'} />
        </div>
      </article>
    </Layout>
  )
}

export default Uses
