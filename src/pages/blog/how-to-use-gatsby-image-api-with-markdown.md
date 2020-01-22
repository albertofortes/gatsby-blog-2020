---
title: How to use Gatsby Image API with markdown files.
subtitle: Some notes about working with Images in Markdown Posts and Pages
date: 2020-01-21
update: 2020-01-21
banner: ../../images/blog/great-gatsby.jpg
tags: ['javascript', '#100DaysOfGatsby', 'gatsby', 'performance', 'audit', 'SEO']
---

Third Challenge on [#100DaysOfGatsby Challenge](https://twitter.com/hashtag/100DaysOfGatsby "100 Days of Gatsby Challenge") is about performance: **Auto-Optimize Images on Your Gatsby Site**.

You can just follow [Gatsby documentation](https://www.gatsbyjs.org/blog/100days/gatsby-image/), but I will write some notes just to myself.

Before this point we have a blog based in markdown files. In the Markdown Frontmatter we set featured images, in this same MD page we have:

```markdown
---
title: How to use Gatsby Image API with markdown files.
subtitle: Some notes about working with Images in Markdown Posts and Pages
date: 2020-01-21
update: 2020-01-21
banner: ../../images/blog/great-gatsby.jpg
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
import Img from "gatsby-image"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  let post = data.markdownRemark
  let bannerImgFluid = post.frontmatter.banner.childImageSharp.fluid
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
        <div className="article__image"><Img className="post__image" fluid={bannerImgFluid} /></div>
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
```
Ok...
Yeah...
Fair enough, we are also adding tags here, so to see how I added tags to a blog post based in markdown, visit my previous post: [How to make a list of tags in a Gatsby JS blog](https://www.albertofortes.com/blog/how-to-make-a-list-of-tags-in-a-gatsbty-react-blog/).

And in the *blog/index.js* file:

```javascript
import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Alberto Fortes. Front-end developer working remotely for the best companies" />
      <h2 className="container__title">Blog posts <em>({data.allMarkdownRemark.totalCount})</em>:</h2>
      <div className="posts">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id} className="post">
            <Link to={node.fields.slug} title={node.frontmatter.title}><Img className="post__image" fixed={node.frontmatter.banner.childImageSharp.fixed} /></Link>
            <h3 className="post__title"><Link to={node.fields.slug} title={node.frontmatter.title}>{node.frontmatter.title}{" "}</Link></h3>
            <p className="post__date">{node.frontmatter.date}</p>
            
            <div className="post__excerpt">{node.excerpt}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
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
                fixed(width: 500) {
                  ...GatsbyImageSharpFixed
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
```

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
        resolve: `gatsby-remark-images`,
        options: {
          maxWidth: 1000,
        },
      },
      {
        resolve: `gatsby-remark-prismjs`,
        options: {
          classPrefix: "language-",
          showLineNumbers: true,
        }
      },
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
Field "banner" must not have a selection since type "String" has no subfields
```

Ok, I lost many hours with this. And I can swear to you that this is only a path issue.
The path to the image in SRC folder that you set in frontmatter banner is not pointing t a real file. It can be both:
- the path to the image in src folder is not correct,
- the image name and/or extension is not correct, so you are pointing to a unexisting file.

You can be realy sure that you are pointing to a real image, but if you follow steps above, installed npm plugins, set correctly *gatsby-config.js* and *gatsby-node.js* files, the problem is just that the line:

```javascript
banner: ../../images/blog/great-gatsby.jpg
```

Is not working nicely due to it's incorrect in one or above points.

Did you know what? I had that problem and I was sure (wronly) that my parth was correct, my file was: 

```javascript
banner: "/blog/100-days-of-gatsby-challenge.png"
```

Then I tried:

- banner: /blog/100-days-of-gatsby-challenge.png
- banner: ../blog/100-days-of-gatsby-challenge.png
- banner: ../images/blog/100-days-of-gatsby-challenge.png

And finally I saw my wrong, OMG what the Hell path was I setting up?

My SRC tree is:

```
-src/
-- pages/
----blog/
------ *.md

-- images/
---- blog/
------ *.* // all images used for blogging.
````

So I was wrong with the path to src real files.

That's all!
Stop losing time with programming bugs, it's just a matter of path.

So the unfamous Gatsby / GraphQL error:

# Field "banner" must not have a selection since type "String" has no subfields

It's just a slip-up.


Hey! But when I try to render blog index page (/blog/inde.js)* I got thiserror as well:

```
TypeError: Cannot read property 'childImageSharp' of null
```

Ok, this is again the same error, one of your .md pages still has a wrong path in the frontmatter 'banner' field.
I swear you, check it.