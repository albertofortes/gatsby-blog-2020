---
title: How to use Gatsby Image API with markdown files.
subtitle: Some notes about working with Images in Markdown Posts and Pages
date: 2020-01-21
update: 2020-01-21
banner: ../blog/great-gatsby.jpg
tags: ['javascript', '#100DaysOfGatsby', 'gatsby', 'performance', 'audit', 'SEO']
---

Third Challenge on [#100DaysOfGatsby Challenge](https://twitter.com/hashtag/100DaysOfGatsby "100 Days of Gatsby Challenge") is about performance: **Auto-Optimize Images on Your Gatsby Site**.

You can just follow [Gatsby documentation](https://www.gatsbyjs.org/blog/100days/gatsby-image/), but I will write some notes just to myself.

Before this point we have a blog based in markdown files. In the Markdown Frontmatter we set featured images, in this same MD page we have:

```markdown
---
title: "How to use Gatsby Image API with markdown files."
subtitle: "Some notes about working with Images in Markdown Posts and Pages"
date: "2020-01-21"
update: "2020-01-21"
image: "/blog/great-gatsby.jpg"
tags: ['javascript', '#100DaysOfGatsby', 'gatsby', 'performance', 'audit', 'SEO']
---
```

We just get all frontmatter fields in a GraphQL query and we print in the JSX. So, in *gatsby-node.js*:

```javascript
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })

  const tagResult = await graphql(`
  {
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
  }
`)

  const tags = tagResult.data.allMarkdownRemark.group

  tags.forEach(tag => {
    createPage({
      path: `/blog/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: path.resolve(`./src/templates/blog-tags.js`),
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}
```

And in the blog template, *blog-post.js*:

```javascript
import React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.frontmatter.subtitle} />
      <article className="article">
        <h2 className="article__title">{post.frontmatter.title}</h2>
        <h3 className="article__subtitle">{post.frontmatter.subtitle}</h3>
        <p className="article__date">{post.frontmatter.date}</p>
        <p className="article__tags">Tags: {post.frontmatter.tags.map((tag, i) => [
            <Link key={tag} to={`/blog/tags/${kebabCase(tag)}/`}>
              {tag}{i < post.frontmatter.tags.length - 1 ? ', ' : ''}
            </Link>
            
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
        image
        tags
      }
    }
  }
`
```
Ok...
Yeah...
Fair enough, we are also adding tags here, so to see how I added tags to a blog post based in markdown, visit my previous post: [How to make a list of tags in a Gatsby JS blog](https://www.albertofortes.com/blog/how-to-make-a-list-of-tags-in-a-gatsbty-react-blog/).

---

### At this point we can follow with the scope of this post: Gatsby API images with Frontmatter metadata

We are going to grab the image filename from the *image* frontmatter field and then we will transform it with **gatsby-plugin-sharp** in a GraphQL query.

Assuming we have gatsby-image, gatsby-transformer-sharp and gatsby-plugin-sharp node packages already installed, we are going to add into *gatsby-config.js* file a new `gatsby-source-filesystem` entry, so previosly we had:

```
[…]
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `images`,
    path: `${__dirname}/src/images`,
  },
},
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `src`,
    path: `${__dirname}/src/`,
  },
},
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-prismjs`,
        options: {
          classPrefix: "language-",
          showLineNumbers: true,
        }
      }
    ]
  }
},
`gatsby-transformer-sharp`,
`gatsby-plugin-sharp`,
[…]
```

And now we will add a new directory *path: `${__dirname}/src/blog`*:

```javascript
[…]
{
  resolve: `gatsby-source-filesystem`,
  options: {
    path: `${__dirname}/src/blog`,
  },
},
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `images`,
    path: `${__dirname}/src/images`,
  },
},
{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `src`,
    path: `${__dirname}/src/`,
  },
},
{
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      {
        resolve: `gatsby-remark-prismjs`,
        options: {
          classPrefix: "language-",
          showLineNumbers: true,
        }
      }
    ]
  }
},
`gatsby-transformer-sharp`,
`gatsby-plugin-sharp`,
[…]
```
#### Once the new frontmatter remark directory has been added to the gatsby-config file, let's see how to query the featured images.


**First at all you can get an error:**

```
Field "image" must not have a selection since type "String" has no subfields
```