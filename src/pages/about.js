import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="Alberto Fortes. Front-end developer working remotely for the best companies" />
    <div className="container__inner">
      <article className="article">
        <h2 className="article__title">I’m Freelance UI Engineer / Front-end developer from 2006.</h2>
        {/*<div className="article__image"><img src="" alt="" /></div>*/}
        <div className="article__cont">
          <h3 className="article__claim">More than 13 years coding as JavaScript, CSS, HTML, PHP expert that can help you to code the HTML5, CSS3 and JavaScript of your project. I have my own team to help me when the work requires it.</h3>
          <div className="article__cont__cols">
            <p>From 2006 I've been working as freelance front-end developer helping important brands to achieve their projects on time. Working with their own teams or other external agencies to provide expertise view in HTML, CSS, JavaScript, Load optimization, Accessibility, Usability and other related skills.</p>
            <p>My rate starts at 30€/hour with long time collaborations increasing rate with short term works. Currently I'm working as UI Engineer expert at Avallain, anyway, for unique projects, write me a line in the form below, maybe me or my colleagues have some time.</p>
            <p>I like to do things right, to work with professional people but most important is to be a easy-going person, so for me, like good Andalusian spaniard, I like the cordiality and fellowship.</p>
            <p>My specialty is web design and front-end development, I work with Photoshop, Adobe Illustrator or Sketch App and I turn pixels into semantic HTML, CSS and JavaScript code.</p>
            <p>I've been working with all kinds of CMS but my preffer is WordPress which I'm been working on since 2006 (2.x), anyway you have to know that I use WordPress like frameworks that means I do special content type usign WordPress API, I don't like nothing Visual Composer or Backery, which in my opinion are a lack into WordPress hearth. In fact they do no usable, not scalable and pretty easy to be hacked sites.</p>
            <p>Also, I don't like to use Bootdstrap, but I use it if is needed, in fact I use it everyday due to my customers legacy, but for somebody expertise, to do custom code is quicker and clean than use frameworks or tools thought to non expertise people.</p>
          </div>
        </div>
      </article>
    </div>
  </Layout>
)

export default NotFoundPage