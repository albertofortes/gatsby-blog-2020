import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutMe = ({ children }) => {
  const data = useStaticQuery(graphql`
     {
      site {
        siteMetadata {
          title
          role
          description
        }
      }
      file(relativePath: { eq: "images/alberto-fortes-desk.jpeg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} description={data.site.siteMetadata.description} />
      <article className="article">
        <h2 className="article__title article__title--remark t-c">What I use in my day a day as front-end developer.</h2>
        <div className="article__image"><Img fluid={data.file.childImageSharp.fluid} alt="Alberto Fortes, front-end developer office desk" /></div>
        <div className="article__cont">
          <h3 className="article__claim t-c">As remote front-end developer, working as team lead in a 100% remote team I need to uses a combination of tech stuff and software, but also some other even more important like a comfortable office, big desk, coworkers to share my space, books, gym machine and a retro arcade. Yes, we need it.</h3>
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
            <li>🖨️ Printer and scanner.</li>
            <li>Arcade cabinet made by me 🕹️ + 24" Monitor + Raspberry Pi 3B Plus.</li>
            <li>💪 Multigym machine.</li>
            <li>TV + Playstation + Sofa 🛋️ Relax zone.</li>
            <li>Bookcase stand with many books and mags 📚 in the relax zone.</li>
            <li>A desk 🏄🏻 ready for desksurfing. Developer / designer interested?</li>
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
      </article>
    </Layout>
  )
}

export default AboutMe
