import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Particles from 'react-particles-js';
import Layout from "../components/layout"
import SEO from "../components/seo"

const CookiesPage = ({ children }) => {
  const particlesOptions = {
    "particles": {
      "color": {
        "value": "#172b4d"
      },
      "line_linked": {
        "distance": 250,
        "color": "#172b4d",
        "width": 2,
        "opacity": 0.35
      }
    }
  };

  const data = useStaticQuery(graphql`
     {
      site {
        siteMetadata {
          title
          role
          description
        }
      }
      file(relativePath: { eq: "cookies.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title={data.site.siteMetadata.title} description={data.site.siteMetadata.description} />
      <article className="article">
        <div className="container">
          <h2 className="article__title article__title--remark t-c">Cookie Policy</h2>
          <div className="article__image"><Img fluid={data.file.childImageSharp.fluid} alt="Cookie Monster" /></div>
        </div>
        <div className="greyed">
          <div className="article__cont">
            <div className="article__cont__cols t-j">
              <h3>What Are Cookies</h3>
              <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.</p>
              <p>For more general information on cookies see the Wikipedia article on HTTP Cookies.</p>
              <h3>How I Use Cookies</h3>
              <p>We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>
              <h3>Disabling Cookies</h3>
              <p>You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.</p>
              <p>The Cookies I Set: Site preferences cookies</p>
              <p>In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.</p>
              <h3>Third Party Cookies</h3>
              <p>In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
              <p>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</p>
              <p>For more information on Google Analytics cookies, see the official Google Analytics page.</p>
              <p>From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.</p>
              <h3>More Information</h3>
              <p>Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site. This Cookies Policy was created with the help of the Cookies Policy Template Generator and the WebTerms Generator.</p>
              <p>However if you are still looking for more information then you can contact me through an email.</p>
            </div>
          </div>
        </div>
        <Particles params={particlesOptions} className={'particles'} />
      </article>
    </Layout>
  )
}

export default CookiesPage
