import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

// Components
import { Link, graphql } from "gatsby"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with <em>${tag}</em>`

  return (
    <Layout>
      <SEO title="Blog tags" description={data.site.siteMetadata.description} />
      <h2 className="container__title" dangerouslySetInnerHTML={{ __html: tagHeader }} />
      <div className="posts">
        {edges.map(({ node }) => (
          <div key={node.fields.slug} className="post">
            <Link to={`/blog/${kebabCase(node.fields.slug)}/`} title={node.frontmatter.title}><Img className="post__image" fluid={node.frontmatter.banner.childImageSharp.fluid} /></Link>
            <h3 className="post__title"><Link to={`/blog/${kebabCase(node.fields.slug)}/`} title={node.frontmatter.title}>{node.frontmatter.title}{" "}</Link></h3>
            <p className="post__date">{node.frontmatter.date}</p>
            
            <div className="post__excerpt">{node.frontmatter.excerpt}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        role
        description
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            date(formatString: "DD MMMM, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt
        }
      }
    }
  }
`