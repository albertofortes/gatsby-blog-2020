import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const BlogIndex = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          role
          description
          who
          siteUrl
        }
      }

      placeholderImage: file(relativePath: { eq: "albertofortes-avallain.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      allMarkdownRemark(
        sort: {
          fields: [
            frontmatter___update, 
            frontmatter___title
          ],
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
  `);

  return (
    <Layout>
      <SEO title="Blog" description={data.site.siteMetadata.description} />
      <div className="home-profile home-profile--inner container">
        <div className="home-profile-who">
          <div className="home-profile-avatar">
            <Img fluid={data.placeholderImage.childImageSharp.fluid} />
          </div>
          <h1>Hi there, I'm <strong>Alberto</strong>,</h1>
          <h2>a {data.site.siteMetadata.role}</h2>
          <p dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.description }} />
          <p className="who__links">
            <a href="https://www.linkedin.com/in/albertofortes">Linkedin</a>
            <a href="https://codepen.io/albertofortes">Codepen</a>
            <a href="https://dribbble.com/albertofortes">Dribble</a>
            <a href="https://twitter.com/albertofs">Twitter</a>
            <a href="mailto:albertofortes@gmail.com">Email</a>
          </p>
        </div>
      </div>

      <div className="container container--greyed">
        <h2 className="container__title">Blog posts <span className="count">({data.allMarkdownRemark.totalCount})</span></h2>
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
      </div>
    </Layout>
  )
}

export default BlogIndex
