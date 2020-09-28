/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import Header from "./header";

const Layout = ({ children, page }) => {
  const footerClass = (page === 'home') ? 'footer footer--home' : 'footer'

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="main">
        {children}
      </main>      
      <footer className={footerClass} >
        <p>2006 - {new Date().getFullYear()} Alberto Fortes. Coded with React JavaScript, GatsbyJS, HTML5, CSS / SASS, Grunt. | <Link to="/cookies" activeClassName="active">Cookies</Link></p>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
