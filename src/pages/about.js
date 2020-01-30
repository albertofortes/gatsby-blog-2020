import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutMe = ({ children }) => {
  const data = useStaticQuery(graphql`
     {
      file(relativePath: { eq: "images/albertofortes-web-developer.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          title
          role
          description
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Alberto Fortes" description={data.site.siteMetadata.description} />
      <article className="article">
        <h2 className="article__title article__title--remark t-c">I’m Freelance UI Engineer / Front-end developer from 2006.</h2>
        <div className="article__image"><Img fluid={data.file.childImageSharp.fluid} alt="Alberto Fortes is a Front-End freelance developer working as contractor." /></div>
        <div className="article__cont">
          <h3 className="article__claim t-c">More than 14 years coding as JavaScript, CSS, HTML, PHP expert that can help you to code the HTML5, CSS3 and JavaScript of your project. I have my own team to help me when the work requires it.</h3>
          <div className="article__cont__cols t-j">
            <p>From 2006 I've been working as freelance front-end developer helping important brands to achieve their projects on time. Working with their own teams or other external agencies to provide expertise view in HTML, CSS, JavaScript, Load optimization, Accessibility, Usability and other related skills.</p>
            <p>My rate starts at 35€/hour with long time collaborations increasing rate with short term works. Currently I'm working as UI Engineer expert at Avallain, anyway, I'm always open to discussing new opportunities for full time work or freelance clients. Write me a line in the form below, maybe me or my colleagues have some time.</p>
            <p>I like to do things right, to work with professional people but most important is to be a friendly person, so for me, like good Andalusian spaniard, I like the cordiality and fellowship.</p>
            <p>My specialty is web design and front-end development, I work with Photoshop, Adobe Illustrator or Sketch App and I turn pixels into semantic HTML, CSS and JavaScript code. Take a look to mu uses page to now more about <Link to="/uses/">what I use for working</Link>.</p>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default AboutMe
