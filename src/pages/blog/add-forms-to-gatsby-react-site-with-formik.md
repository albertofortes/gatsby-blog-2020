---
title: How to add a form in your Gatsby React site..
subtitle: Adding a contact Form using Formik. Belongs to Challenge 4 - Add Third-Party React Components to Your Gatsby Site.
date: 2020-01-25
update: 2020-01-25
banner: ../../images/blog/100-days-of-gatsby-challenge.png
tags: ['JavaScript', '#100DaysOfGatsby', 'Gatsby', 'forms', 'Formik']
---

This Challenge is about learning to [add React components to your Gatsby sites](https://www.gatsbyjs.org/docs/adding-react-components/), and specifically adding a contact form with the [Formik React Library into your site](https://jaredpalmer.com/formik/docs/tutorial).

## Installing Formik library.

First at all install the npm into your site folder:

```
npm i formik
```

Now create a new *contact.js page*, adding *import { useFormik } from 'formik'* there:


```javascript
import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { useFormik } from 'formik';

const ContactPage = ({ children }) => {
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
      <SEO title="Contact me" description={data.site.siteMetadata.description} />
      <article className="article">
        <h2 className="article__title article__title--remark t-c">I’m Alberto Fortes, Front-end developer. Drop me a few lines!</h2>
        <div className="article__cont">
          TO DO: FORM
        </div>
      </article>
    </Layout>
  )
}

ContactPage.propTypes = {
  children: PropTypes.node.isRequired,
} 

export default ContactPage
````

We can add form now:

