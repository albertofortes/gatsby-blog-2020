import React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="container__inner">
        <article className="article">
          <h2 className="article__title">{post.frontmatter.title}</h2>
          <h3 className="article__subtitle">{post.frontmatter.subtitle}</h3>
          <p className="article__date">{post.frontmatter.date}</p>
          <p className="article__tags">Tags: {post.frontmatter.tags.map((tag, i) => [
              <Link to={`/blog/tags/${kebabCase(tag)}/`}>
                {tag}{i < post.frontmatter.tags.length - 1 ? ', ' : ''}
              </Link>
              
            ])}
          </p>
          <div className="article__image"><img src={post.frontmatter.image} alt="" /></div>
          <div className="article__cont" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subtitle
        date(formatString: "DD MMMM, YYYY")
        image
        tags
      }
    }
  }
`