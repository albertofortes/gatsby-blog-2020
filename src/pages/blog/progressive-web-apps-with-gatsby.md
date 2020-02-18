---
title: How to do a Progressive Web App with Gatsby
subtitle: Gatsby challenge to set you website in a true PWA
date: 2020-02-18
update: 2020-02-18
banner: ../../images/blog/gatsby-pwa.jpg
tags: ['JavaScript', 'PWA', 'Progressive Web App',  'Gatsby']
---

This 7th Challenge is about [turning our Gatsby site in a RealProgressive Web APP](https://www.gatsbyjs.org/blog/100days/pwa/ "Challenge 7 - Turn Your Gatsby Site into a Progressive Web App").

> “Progressive web app” (PWA) is both a general term for a new philosophy toward building websites and a specific term with an established set of three explicit, testable, baseline requirements.

A PWA must be responsive, accessible, connectivity independent so it would work offline and really quick, App-like UI and interactions, safe (https is a must), installable to the home screen, engaging through the OS push notifications, identifiable as “applications” thanks to W3C Manifests and Service Worker registration scope, always up-to-date thanks to service workers, SEO optimized, easy to share (linkable).

### In the practice, how it is the whole flow in action?

1. The site begins life as a regular tab but it is built using Progressive App features including TLS, Service Workers, Manifests, and Responsive Design.
2. The second time a user visits the page, a prompt is shown by the browser so one can add it the home screen.
3. Launching from the home screen, the app is full-screen, and works offline after step 1.


So as Alex Russell says, 

> they’re just websites that took all the right vitamins.

### Ok, so how a Gatsby site works as PWA?

It has to satisfy three points:

1. It must run under HTTPS.
2. It must include a [Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/ "W3C Manifest"), which is a JSON file that provides the browser with information about your web app (name, icons, start_url, background-color, etc), and makes it possible for users to save to their home screen.
3. Implement a [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/ "Google introduction to the service workers") that provides support for an offline experience and makes your site more resilient to bad network connections. It’s a script that runs separately in the background, supporting features like push notifications and background sync.

### How to set up these points in your Gtasby site?

For the 2nd point: **Web App Manifest**, [Gatsby provides an official manifest plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest "Gatsby Web Manifest Plugin").

```shell
npm install --save gatsby-plugin-manifest
```

And then, *in gatsby-config.js*:

```javascript
module.exports = {
  plugins: [
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
        icons: [ // manually, so they go to static folder:
          {
            src: `/static/icons/android-icon-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `/static/icons/android-icon-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/static/icons/android-icon-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `/static/icons/android-icon-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/static/icons/android-icon-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/static/icons/ms-icon-310x310.png`,
            sizes: `310x310`,
            type: `image/png`,
          }
        ]
      }
    },
  ],
}
```

For the 3rd point: **Service workers**, [Gatsby also provides a plugin interface to create and load a service worker into your site](https://www.gatsbyjs.org/packages/gatsby-plugin-offline "Gatsy service worker plugin").

```shell
npm install --save gatsby-plugin-offline
```
And then, *in gatsby-config.js*:

```javascript
plugins: [`gatsby-plugin-offline`]
```


It is important that this plugin should be listed before the offline plugin so that it can cache the created manifest.webmanifest.

**We need to install both, and don’t forget to list the offline plugin after the manifest plugin so that the manifest file can be included in the service worker.**