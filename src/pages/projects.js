import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const CookiesPage = ({ children }) => {
  const data = useStaticQuery(graphql`
     {
      site {
        siteMetadata {
          title
          role
          description
        }
      }

      placeholderImage: file(relativePath: { eq: "albertofortes-avallain.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      moviesImage: file(relativePath: { eq: "projects/project-movie-db-react.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      giphyImage: file(relativePath: { eq: "projects/project-giphy.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      covidImage: file(relativePath: { eq: "projects/project-react-covid-radar.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      markdownImage: file(relativePath: { eq: "projects/project-react-markdown-previewer.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      pomodoroImage: file(relativePath: { eq: "projects/project-react-pomodoro-app.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }

      braunImage: file(relativePath: { eq: "projects/project-react-retro-calculator.png" }) {
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
      <SEO title="Projects" description={data.site.siteMetadata.description} />
      <div className="home-profile home-profile--inner container">
        <div className="home-profile-who">
          <div className="home-profile-avatar">
            <Img fluid={data.placeholderImage.childImageSharp.fluid} />
          </div>
          <h1>Hi there, I'm <strong>Alberto</strong>,</h1>
          <h2>a {data.site.siteMetadata.role}</h2>
          <p dangerouslySetInnerHTML={{ __html: data.site.siteMetadata.description }} />
          <p className="who__links">
            <a href="https://www.linkedin.com/in/albertofortes">Linkedin</a>
            <a href="https://codepen.io/albertofortes">Codepen</a>
            <a href="https://dribbble.com/albertofortes">Dribble</a>
            <a href="https://twitter.com/albertofs">Twitter</a>
            <a href="mailto:albertofortes@gmail.com">Email</a>
          </p>
        </div>
      </div>

      <div className="container container--greyed">
        <h2 className="container__title">Some projects <br /><span className="count">Just for fun and learning!</span></h2>
        <div className="posts">

          <div className="post">
            <a href="https://thirsty-goldstine-c44661.netlify.app/" target="blank" title="React Covid APP">
              <Img fluid={data.covidImage.childImageSharp.fluid} alt="" className="post__image" title="React Covid APP screenshot" />
            </a>
            <h3 className="post__title">
              <a href="https://thirsty-goldstine-c44661.netlify.app/" target="blank" title="React Covid APP">React Covid APP</a>
            </h3>
            <p className="post__date">2020</p>
            <div className="post__excerpt">React App to serve up t date Covid data by country. I Use a well rated API. Using React Hooks and functional components and adding ststic graphs. Hosted in Netlify.</div>
          </div>

          <div className="post">
            <a href="https://kind-mclean-409fa6.netlify.app/" target="blank" title="React and Redux Movie APP">
              <Img fluid={data.moviesImage.childImageSharp.fluid} alt="" className="post__image" title="React and Redux Movie APP screenshot" />
            </a>
            <h3 className="post__title">
              <a href="https://kind-mclean-409fa6.netlify.app/" target="blank" title="React and Redux Movie APP">React + Redux Movies APP</a>
            </h3>
            <p className="post__date">2020</p>
            <div className="post__excerpt">Just a simple React + Readux Movie App. I use The Movie Database API. Freash design. For this learning project I used old React way with Class component and Redux. Hosted in Netlify.</div>
          </div>

          <div className="post">
            <a href="https://hungry-hawking-5b2ff4.netlify.app/" target="blank" title="React Animated GIFs APP">
              <Img fluid={data.giphyImage.childImageSharp.fluid} alt="" className="post__image" title="React Animated GIFs APP screenshot" />
            </a>
            <h3 className="post__title">
              <a href="https://hungry-hawking-5b2ff4.netlify.app//" target="blank" title="React Animated GIFs APP">Animated GIFs APP</a>
            </h3>
            <p className="post__date">2020</p>
            <div className="post__excerpt">React App to serve Animated Gifs. I use giphy API. Using React Hooks and functional components. The motivation came from the lack of an easy way to just download an animated gif to my computer instead of being blocked by Giphy. Hosted in Netlify.</div>            
          </div>

          <div className="post">
            <a href="https://codepen.io/albertofortes/full/BEQKOV" target="blank" title="React Markdown Previewer">
              <Img fluid={data.markdownImage.childImageSharp.fluid} alt="" className="post__image" title="React Markdown Previewer screenshot" />
            </a>
            <h3 className="post__title">
              <a href="https://codepen.io/albertofortes/full/BEQKOV/" target="blank" title="React Markdown Previewer">Animated GIFs APP</a>
            </h3>
            <p className="post__date">2019</p>
            <div className="post__excerpt">React App to preview Markdown output on the fly.</div>            
          </div>

          <div className="post">
            <a href="https://codepen.io/albertofortes/full/YMJvrL" target="blank" title="React Pomodoro app">
              <Img fluid={data.pomodoroImage.childImageSharp.fluid} alt="" className="post__image" title="React Pomodoro app screenshot" />
            </a>
            <h3 className="post__title">
              <a href="https://codepen.io/albertofortes/full/YMJvrL/" target="blank" title="React Pomodoro app">Animated GIFs APP</a>
            </h3>
            <p className="post__date">2019</p>
            <div className="post__excerpt">A simple React Pomodoro App.</div>            
          </div>

          <div className="post">
            <a href="https://codepen.io/albertofortes/full/YMvzME" target="blank" title="React Braun retro calculator">
              <Img fluid={data.braunImage.childImageSharp.fluid} alt="" className="post__image" title="React Braun retro calculator screenshot" />
            </a>
            <h3 className="post__title">
              <a href="https://codepen.io/albertofortes/full/YMvzME/" target="blank" title="React Braun retro calculator">Animated GIFs APP</a>
            </h3>
            <p className="post__date">2018</p>
            <div className="post__excerpt">A retro braun React Calculator.</div>            
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default CookiesPage
