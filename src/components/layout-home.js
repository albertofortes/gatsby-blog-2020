/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header.js"
import HomeGame from "./home-game.js"

const LayoutHome = ({ children }) => {
  const data = useStaticQuery(graphql`
     {
      site {
        siteMetadata {
          title
          role
          description
          who
        }
      }
    }
  `)

  return (
    <>
      <Header className="header" 
        siteTitle={data.site.siteMetadata.title}
        siteRole={data.site.siteMetadata.role}
        siteDescription={data.site.siteMetadata.description}
      />
      <HomeGame 
        siteRole={data.site.siteMetadata.role}
        siteDescription={data.site.siteMetadata.who}
      />
    </>
  )
}



export default LayoutHome
