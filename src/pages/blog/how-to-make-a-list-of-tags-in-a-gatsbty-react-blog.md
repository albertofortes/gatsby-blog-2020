---
title: How to make a list of tags in a Gatsby JS blog
subtitle: Basic how to code a simple comma separated tag list in a blog post done with Gatsby JS (React).
date: 2020-01-04
update: 2020-01-04
banner: ../../images/blog/100-days-of-gatsby-challenge.png
tags: ['JavaScript', '#100DaysOfGatsby', 'Gatsby']
---

This is a basic tutorial belongs to [#100DaysOfGatsby Challenge](https://twitter.com/hashtag/100DaysOfGatsby).

### Problem:

We have a Markdown basic blog system under [GatsbyJS](https://www.gatsbyjs.org/).
We want to do a basic tag list for each post. So in the Frontmatter we could add a new field with an array of tags:

```markdown
---
title: "How to make a list of tags in a Gatsby JS blog"
subtitle: "Basic how to code a simple comma separated tag list in a blog post done with Gatsby JS (React)."
date: "2020-01-04"
banner: "/blog/100-days-of-gatsby-challenge.png"
tags: ['javascript', '#100DaysOfGatsby', 'gatsby']
---
```

Note: You need previously understand how to do a Markdown post page with [Gatsby's transformer plugin*(https://www.gatsbyjs.org/tutorial/part-six/).

### Solution: Arrow function + map() method:

We need to have previously a Gatsby template to show each markdown post page. [Again visit Basic Gatsby Blog tutorial](https://www.gatsbyjs.org/tutorial/part-seven/):

```javascript
import React from "react"
import { graphql } from "gatsby"
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
          <p className="article__tags">Tags: TO DO</p>
          <div className="article__image"><img src={post.frontmatter.banner} alt="" /></div>
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
        banner
        tags
      }
    }
  }
`
```

So as frontmatter tag field is an array, we can use the power of map() function with an arrow function to display a list of tags, comma separated but avoiding last comma: 

```javascript
{post.frontmatter.tags.map((tag, i) => [
  <strong key={i}>
    {tag}
    {i < post.frontmatter.tags.length - 1 ? ', ' : ''}
  </strong>
])}
```

Final code (used in this page under src/templates/blog-post.js) would be:

```javascript
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>s
      <article className="article">
        <h2 className="article__title">{post.frontmatter.title}</h2>
        <h3 className="article__subtitle">{post.frontmatter.subtitle}</h3>
        <p className="article__date">{post.frontmatter.date}</p>
        <p className="article__tags">Tags: {post.frontmatter.tags.map((tag, i) => [
            <strong key={i}>
              {tag}
              {i < post.frontmatter.tags.length - 1 ? ', ' : ''}
            </strong>
          ])}
        </p>
        <div className="article__image"><img src={post.frontmatter.banner} alt="" /></div>
        <div className="article__cont" dangerouslySetInnerHTML={{ __html: post.html }} />
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
        banner
        tags
      }
    }
  }
`
```

That's all, pretty basic, but a nice to have snippet.
To go beyond, visit the official Gatsby Documentation [How to do a tag list page](https://www.gatsbyjs.org/docs/adding-tags-and-categories-to-blog-posts/ "Gatsby How to do a tag list page").