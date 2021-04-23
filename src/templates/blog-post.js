import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Banner from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  let post = data.markdownRemark
  let bannerImgFluid = post.frontmatter.banner.childImageSharp.fluid
  const [scrollPos, setScrollPos] = useState(0)
  let ticking = false;
  var last_known_scroll_position = 0;

  useEffect(() => {
    window.addEventListener('scroll', function(e) {
      last_known_scroll_position = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          parallax(last_known_scroll_position);
          ticking = false;
        });
      }
      ticking = true;
    });
  }, [])

  const parallax = (scroll_pos) => {
    setScrollPos(parseInt(scroll_pos / 100));
  }

  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.frontmatter.subtitle} />
      <article className="article">
        <div className="article__image"><Banner className="post__image" fluid={bannerImgFluid} /></div>
        
        <div className="container container--post">
          <h2 className="article__title">{post.frontmatter.title}</h2>
          <h3 className="article__subtitle">{post.frontmatter.subtitle}</h3>
          <p className="article__date">{post.frontmatter.date}</p>
          <p className="article__tags">Tags: {post.frontmatter.tags.map((tag, i) => [
              <Link key={tag} to={`/blog/tags/${kebabCase(tag)}/`}>
                {tag}{i < post.frontmatter.tags.length - 1 ? ', ' : ''}
              </Link>
              
            ])}
          </p>
        </div>
        <div className="greyed">
          <div className="article__cont" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
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
        banner {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
    }
  }
`