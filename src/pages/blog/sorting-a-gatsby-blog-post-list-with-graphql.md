---
title: Sorting a GatsbyJS-blog posts list with GraphQL
subtitle: How to sort a list with GraphQL in Gatsby and React.
date: 2019-01-13
update: 2019-01-13
banner: ../../images/blog/100-days-of-gatsby-challenge.png
tags: ['JavaScript', '#100DaysOfGatsby', 'Gatsby']
---

Problem.
We have a list of .md pages to display in a page, and we want to show them in a certain order, usually, date.

To show them, a basic naked-HTML way (forget class-name to styling, SEO on page, accesibility and so on) should be:

```javascript
export default ({ data }) => {
  return (
    <div>
     <p>{data.allMarkdownRemark.totalCount} posts:</p>
      <div>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug}><img src={node.frontmatter.banner} /></Link>
          <Link to={node.fields.slug} title={node.frontmatter.title}>{node.frontmatter.title}{" "}</Link>
          <small>{node.frontmatter.date}</small>
          <div>{node.excerpt}</div>
        </div>
      ))}
    </div>
  )
}
```

And the GraphQL query should be:

```javascript
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
```

Thank you for reading.