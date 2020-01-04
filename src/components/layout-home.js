/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import HeaderHome from "./header-home.js"
import "./layout.css"

const LayoutHome = ({ children }) => {
  const data = useStaticQuery(graphql`
    query HeaderHomeQuery {
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
    <>
      <HeaderHome 
        siteTitle={data.site.siteMetadata.title}
        siteRole={data.site.siteMetadata.role}
        siteDescription={data.site.siteMetadata.description}
      />
    </>
  )
}

LayoutHome.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutHome
