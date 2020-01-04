import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <div className="container__inner">
        <h2 className="container__title">Blog posts <em>({data.allMarkdownRemark.totalCount})</em>:</h2>
        <div className="posts">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id} className="post">
              <Link to={node.fields.slug} title={node.frontmatter.title}><img className="post__image" src={node.frontmatter.image} alt="" /></Link>
              <h3 className="post__title"><Link to={node.fields.slug} title={node.frontmatter.title}>{node.frontmatter.title}{" "}</Link></h3>
              <p className="post__date">{node.frontmatter.date}</p>
              
              <div className="post__excerpt">{node.excerpt}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            subtitle
            date(formatString: "DD MMMM, YYYY")
            image
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