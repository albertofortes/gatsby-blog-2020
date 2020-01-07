module.exports = {
  //pathPrefix: "/gatsby-blog-2020",
  siteMetadata: {
    title: `Alberto Fortes`,
    role: `Front-end developer building cool websites and apps for Avallain and Warner Music Spain.`,
    description: `<p>Along side more than 14 years I've doing fast and SEO on page optimized HTML5 and CSS website and I develop JavaScript front-end code in my day a day, applying the latest techniques to achieve page load optimization time and clear and easy to read code. As front-end HTML, CSS and JavaScript and with a past background as UX and web designer I've coded along these years for great end customers (mine or white-label for agencies).</p>
                  <p>Currently I'm Front-end team lead at Avallain, working for the top Press companies at the Globe. Also I'm lead developer at my own small studio working with side projects and important customers like Warner Music Spain</p>`,
    author: `@albertofortes`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `PT Serif`,
          `source sans pro\:300,400,400i,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
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
    {
      resolve: `gatsby-plugin-lodash`,
      options: {
        disabledFeatures: [`shorthands`, `cloning`],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Alberto Fortes, Senior Front-end developer`,
        short_name: `Alberto Fortes`,
        start_url: `/`,
        background_color: `#0e2439`,
        theme_color: `#0e2439`,
        display: `standalone`,
        icon: `src/images/icon-48x48.png`, // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    //`gatsby-plugin-offline`,
  ],
}
