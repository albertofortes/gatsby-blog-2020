module.exports = {
  //pathPrefix: "/gatsby-blog-2020",
  siteMetadata: {
    title: `Front-End freelance developer working remotely as contractor for the best companies.`,
    role: `Front-End developer building cool websites and apps for Avallain and Warner Music Spain.`,
    description: `Front-End developer with more than 14 years of experience. Expertise with CSS, JavaScript, React, gatsby JS... available to hire as contractor.`,
    who: `<p>Along side more than 14 years I've been doing many fast and SEO on Page websites. I develop HTML5 and CSS and JavaScript (Vanilla, React...)  front-end code in my day a day, applying the latest techniques to achieve page load optimal time and clear and easy to read code. As front-end HTML, CSS and JavaScript and with a past background as UX and web designer I've coded along these years for great end customers (mine or white-label for agencies).</p>
    <p>Currently I'm Front-end team lead at Avallain, working for the top Press companies. Also I'm lead developer at my own small studio working with side projects and important customers like Warner Music Spain.</p>`,
    author: `@albertofortes`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-642316-2",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        //anonymize: true,
        // Setting this parameter is also optional
        //respectDNT: true,
        // Avoids sending pageview hits from custom paths
        //exclude: ["/preview/**"],
        // Delays sending pageview hits on route update (in milliseconds)
        //pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        //optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        //experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
       // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        //sampleRate: 5,
        //siteSpeedSampleRate: 10,
       // cookieDomain: "example.com",
      },
    },
    {
      resolve: `gatsby-source-googlemaps-static`,
      options: {
        key: `AIzaSyDgpAywijmTC10P6L0f9h9l-0U2yCxStnM`,
        center: `Seville`,
        zoom: `15`,
        //size: `100x300`,
        scale: `1`,
        mapType: `ROADMAP`,
        styles: [
          {
        elementType: `geometry`, 
        stylers: [{color: `#0067b3`}]
      },
      {
        elementType: `labels.text.stroke`, stylers: [{color: `#0063b2`}]
      },
      {
        elementType: `labels.text.fill`, stylers: [{color: `#23bde1`}]
      },
      {
        featureType: `administrative.country`,
        elementType: `labels.text.fill`,
        stylers: [{color: `#23bde1`}]
      },
      {
        featureType: `administrative.land_parcel`,
        elementType: `labels.text.fill`,
        stylers: [{color: `#23bde1`}]
      },
      {
        featureType: `administrative.locality`,
        elementType: `labels.text.fill`,
        stylers: [{color: `#23bde1`}]
      },
      {
        featureType: `administrative.neighborhood`,
        elementType: `labels.text.fill`,
        stylers: [{color: `#23bde1`}]
      },
      {
        featureType: `administrative.province`,
        elementType: `labels.text.fill`,
        stylers: [{color: `#23bde1`}]
      },
      {
        featureType: `poi`,
        elementType: `geometry`,
        stylers: [{color: `#1a71b3`}]
      },
      {
        featureType: `poi`,
        elementType: `labels.text.fill`,
        stylers: [{color: `#0089da`}]
      },
      {
        featureType: `poi.park`,
        elementType: `geometry`,
        stylers: [{color: `#006bdc`}]
      },
      {
        featureType: `administrative.locality`,
        stylers: [{color: `#0068d8`}]
      },
      {
        featureType: `water`,
        elementType: `geometry`,
        stylers: [{color: `#006bdc`}]
      },
      {
        featureType: `road`,
        elementType: `geometry`,
        stylers: [{color: `#0061aa`}]
      },
      {
        featureType: `road.highway`,
        elementType: `geometry`,
        stylers: [{color: `#0061aa`}]
      },
        ]
      },
    },
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
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/blog/`,
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
