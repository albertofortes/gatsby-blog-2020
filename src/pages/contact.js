import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { navigate } from 'gatsby-link'
import Layout from "../components/layout"
import SEO from "../components/seo"

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

class ContactPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isValidated: false }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    return (
      <Layout>
        <SEO title="Contact me" description={this.props.description} />
        <article className="article">
          <h2 className="article__title article__title--remark t-c">I’m Alberto Fortes, Front-end developer. Drop me a few lines!</h2>
          <div className="article__cont">
            <h3 className="article__claim t-c">Do you have any project I can help you as freelance? Do you have a cool project and you need to hire me as long-time contractor into the company staff? I've been more than 14 years coding as JavaScript, CSS, HTML… Working with several companies and startups so maybe I can help you.</h3>
        
            <form
              name="contact"
              method="post"
              action="/thanks/"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={this.handleSubmit}
              className="genericforms" >

              {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
              <input type="hidden" name="form-name" value="contact" />
              <div hidden>
                <label>
                  Don’t fill this out:{' '}
                  <input name="bot-field" onChange={this.handleChange} />
                </label>
              </div>

              <div className="genericforms__field">
                <label className="sr-only" htmlFor="your_email">Your Email address</label>
                <input className="genericforms__field__text" placeholder="Type your Email address" id={'your_email'} name={'your_email'} type={'email'} required={true} onChange={this.handleChange} />
              </div>

              <div className="genericforms__field">
                <label className="sr-only" htmlFor="your_email">Your Email address</label>
                <input className="genericforms__field__text" placeholder="What's your name?" id={'your_name'} name={'your_name'} type={'text'} required={true} onChange={this.handleChange} />
              </div>

              <div className="genericforms__field genericforms__field--one-row">
                <label className="sr-only" htmlFor="your_message">Your message</label>
                <textarea className="genericforms__field__text" placeholder="Your message" id={'your_message'} name={'your_message'} onChange={this.handleChange} />
              </div>

              <div className="genericforms__field genericforms__field--one-row">
                <button className="genericforms__field__btn" type="submit">Send</button>
              </div>
            </form>

            <p className="t-c"><strong>Pss… <br />or even better sending me a direct <a href="mailto:albertofortes@gmail.com">Email</a>.</strong></p>
      
          </div>
        </article>
      </Layout>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
            role
            description
          }
        }
        staticMap {
          childFile {
            publicURL
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <ContactPage description={data.site.siteMetadata.description} />
    )}
  />
)