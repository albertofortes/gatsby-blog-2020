/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
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
      <Header className="header" 
        siteTitle={data.site.siteMetadata.title}
        siteRole={data.site.siteMetadata.role}
        siteDescription={data.site.siteMetadata.description}
      />
      <div className="container">
        {children}
      </div>
      <footer className="footer">
        <p>2006 - {new Date().getFullYear()} Alberto Fortes. Coded with React JavaScript, GatsbyJS, HTML5, CSS / SASS, Grunt.</p>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
