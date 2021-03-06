import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const BlogIndex = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog" description={data.site.siteMetadata.description} />
      <h2 className="container__title">Blog posts <em>({data.allMarkdownRemark.totalCount})</em>:</h2>
      <div className="posts">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id} className="post">
            <Link to={node.fields.slug} title={node.frontmatter.title}><Img className="post__image" fluid={node.frontmatter.banner.childImageSharp.fluid} /></Link>
            <h3 className="post__title"><Link to={node.fields.slug} title={node.frontmatter.title}>{node.frontmatter.title}{" "}</Link></h3>
            <p className="post__date">{node.frontmatter.date}</p>
            
            <div className="post__excerpt">{node.excerpt}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const query = graphql`
  query {
    site {
      siteMetadata {
        role
        description
      }
    }
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___date]
        order: DESC
      }
    ) 
    {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            date(formatString: "DD MMMM, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 500) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`