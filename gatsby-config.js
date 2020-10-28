require('dotenv').config({
  path: `.env`,
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  host: process.env.CONTENTFUL_HOST,
}
if (process.env.CONTEXT !== 'production') {
  contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_TOKEN
}

module.exports = {
  siteMetadata: {
    title: `Ayumi Takahashi`,
    description: ``,
    author: `@ayumitk__`,
    siteUrl: `https://ayumi.tk`,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        tableOfContents: {
          heading: null,
          maxDepth: 6,
        },
        plugins: [
          'gatsby-remark-code-titles', // IMPORTANT: this must be ahead of other plugins that use code blocks
          {
            resolve: 'gatsby-remark-code-buttons',
            options: {
              svgIcon:
                '<svg viewBox="0 0 561 561"><path d="M395.25 0h-306c-28.05 0-51 22.95-51 51v357h51V51h306V0zm76.5 102h-280.5c-28.05 0-51 22.95-51 51v357c0 28.05 22.95 51 51 51h280.5c28.05 0 51-22.95 51-51V153c0-28.05-22.95-51-51-51zm0 408h-280.5V153h280.5v357z"/></svg>',
              tooltipText: 'COPY',
              toasterText: 'Copied to clipboard!',
            },
          },
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: '100',
              icon:
                '<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>',
            },
          },
          // {
          //   resolve: 'gatsby-remark-images',
          //   options: {
          //     maxWidth: 1200,
          //     quality: 90,
          //     withWebp: true,
          //     linkImagesToOriginal: false,
          //     wrapperStyle: 'text-align:center;',
          //   },
          // },
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1280,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin: auto;',
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`, // point!
            options: {
              background: 'rgba(30,30,30,0.8)',
            },
          },
          // `gatsby-remark-lazy-load`,
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/intl`,
        // supported language
        languages: [`en`, `ja`],
        // language file path
        defaultLanguage: `en`,
        // option to redirect to `/en` when connecting `/`
        redirect: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ayumi Takahashi - Freelance UI/UX Designer`,
        short_name: `ayumi.tk`,
        start_url: `/`,
        background_color: `#FF5851`,
        theme_color: `#FF5851`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-121956784-1',
      },
    },
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
