---
title: How to use Gatsby Image API with markdown and static files.
subtitle: Some notes about working with Images in Markdown Posts and JSX Pages. Belongs to Challenge 3 - Auto-Optimize Images on Your Gatsby Site.
date: 2020-01-21
update: 2020-01-21
banner: ../../images/blog/100-days-of-gatsby-challenge.png
tags: ['JavaScript', '#100DaysOfGatsby', 'Gatsby', 'performance', 'audit', 'SEO']
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
banner: ../../images/blog/100-days-of-gatsby-challenge.png
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
```

---

### At this point we can follow with the scope of this post: Gatsby API images with Frontmatter metadata

We are going to grab the image filename from the *image* frontmatter field and then we will transform it with **gatsby-plugin-sharp** in a GraphQL query.

Assuming we have gatsby-image, gatsby-transformer-sharp and gatsby-plugin-sharp node packages already installed, we are going to add into *gatsby-config.js* file a new `gatsby-source-filesystem` entry, so previosly we had:

```javascript
[…]
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


Hey! But when I try to render blog index page (/blog/index.js)* I got thiserror as well:

```
TypeError: Cannot read property 'childImageSharp' of null
```

Ok, this is again the same error, one of your .md pages still has a wrong path in the frontmatter 'banner' field.
I swear you, check it.


## And what about to adding optim images to static pages?

**Even easier!**

In any static page, for example my *about.js* was previously:

```javascript
import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutMe = ({ children }) => {
  const data = useStaticQuery(graphql`
     {
      site {
        siteMetadata {
          title
          role
          description
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Alberto Fortes" description={data.site.siteMetadata.description} />
      <article className="article">
        <h2 className="article__title article__title--remark t-c">I’m Freelance UI Engineer / Front-end developer from 2006.</h2>
        <div className="article__image"><img src="/images/albertofortes-web-developer.png" alt="" /></div>
        <div className="article__cont">
          <h3 className="article__claim t-c">More than 14 years coding as JavaScript, CSS, HTML, PHP expert that can help you to code the HTML5, CSS3 and JavaScript of your project. I have my own team to help me when the work requires it.</h3>
          <div className="article__cont__cols t-j">
            <p>From 2006 I've been working as freelance front-end developer helping important brands to achieve their projects on time. Working with their own teams or other external agencies to provide expertise view in HTML, CSS, JavaScript, Load optimization, Accessibility, Usability and other related skills.</p>
            <p>My rate starts at 35€/hour with long time collaborations increasing rate with short term works. Currently I'm working as UI Engineer expert at Avallain, anyway, I'm always open to discussing new opportunities for full time work or freelance clients. Write me a line in the form below, maybe me or my colleagues have some time.</p>
            <p>I like to do things right, to work with professional people but most important is to be a friendly person, so for me, like good Andalusian spaniard, I like the cordiality and fellowship.</p>
            <p>My specialty is web design and front-end development, I work with Photoshop, Adobe Illustrator or Sketch App and I turn pixels into semantic HTML, CSS and JavaScript code. Take a look to mu uses page to now more about <Link to="/uses/">what I use for working</Link>.</p>
          </div>
        </div>
      </article>
    </Layout>
  )
}

AboutMe.propTypes = {
  children: PropTypes.node.isRequired,
} 

export default AboutMe
````


So we just have to remove any call to static page by the hook: [useStaticQuery](https://www.gatsbyjs.org/blog/2019-02-20-introducing-use-static-query/) 

So add the query to the file:

```javascript
const data = useStaticQuery(graphql`
    {
    site {
      siteMetadata {
        title
        role
        description
      }
    }
  }
`)
```

And then add the Img component:

```javascript
import Img from "gatsby-image"
```

and switch regular HTML img with Img component:

```javascript
<Img fluid={data.file.childImageSharp.fluid} alt="Me walking down the beach" />
```

**And tha's all!**

Final file would be:

```javascript
import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import Img from "gatsby-image"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutMe = ({ children }) => {
  const data = useStaticQuery(graphql`
     {
      file(relativePath: { eq: "images/albertofortes-web-developer.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      site {
        siteMetadata {
          title
          role
          description
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Alberto Fortes" description={data.site.siteMetadata.description} />
      <article className="article">
        <h2 className="article__title article__title--remark t-c">I’m Freelance UI Engineer / Front-end developer from 2006.</h2>
        <div className="article__image"><Img fluid={data.file.childImageSharp.fluid} alt="Alberto Fortes is a Front-End freelance developer working as contractor." /></div>
        <div className="article__cont">
          <h3 className="article__claim t-c">More than 14 years coding as JavaScript, CSS, HTML, PHP expert that can help you to code the HTML5, CSS3 and JavaScript of your project. I have my own team to help me when the work requires it.</h3>
          <div className="article__cont__cols t-j">
            <p>From 2006 I've been working as freelance front-end developer helping important brands to achieve their projects on time. Working with their own teams or other external agencies to provide expertise view in HTML, CSS, JavaScript, Load optimization, Accessibility, Usability and other related skills.</p>
            <p>My rate starts at 35€/hour with long time collaborations increasing rate with short term works. Currently I'm working as UI Engineer expert at Avallain, anyway, I'm always open to discussing new opportunities for full time work or freelance clients. Write me a line in the form below, maybe me or my colleagues have some time.</p>
            <p>I like to do things right, to work with professional people but most important is to be a friendly person, so for me, like good Andalusian spaniard, I like the cordiality and fellowship.</p>
            <p>My specialty is web design and front-end development, I work with Photoshop, Adobe Illustrator or Sketch App and I turn pixels into semantic HTML, CSS and JavaScript code. Take a look to mu uses page to now more about <Link to="/uses/">what I use for working</Link>.</p>
          </div>
        </div>
      </article>
    </Layout>
  )
}

AboutMe.propTypes = {
  children: PropTypes.node.isRequired,
} 

export default AboutMe

```