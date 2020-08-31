import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Thanks = ({ children }) => {
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
    <SEO title="Contact me" description={data.site.siteMetadata.description} />
    <article className="article">
      <div className="container">
        <h2 className="article__title article__title--remark t-c">Thank you!</h2>
      </div>
      <div className="greyed">
        <div className="article__cont">
          <h3 className="article__claim t-c">I will read your message ASAP and for sure that I will answer you!.</h3>
        </div>
      </div>
      </article>
    </Layout>
  )
}

export default Thanks
