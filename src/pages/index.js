import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import PropTypes from "prop-types"
import LayoutHome from "../components/layout-home"
import SEO from "../components/seo"

const IndexPage = ({ children }) => {
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
  `)

  return (
    <LayoutHome>
      <SEO title={data.site.siteMetadata.title} description={data.site.siteMetadata.description} />
    </LayoutHome>
  )
}

export default IndexPage
