require('dotenv').config({
  path: `.env`,
})

let contentfulConfig = {}
if (process.env.CONTEXT !== 'production') {
  contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    host: process.env.CONTENTFUL_HOST,
  }
} else {
  contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
  }
}

module.exports = {
  siteMetadata: {
    pathPrefix: '/',
    siteTitle: {
      en: 'Freelance UI/UX Designer, Ayumi Takahashi',
      ja: 'フリーランス UI/UXデザイナー 高橋あゆみ',
    },
    siteUrl: 'https://ayumi.tk',
    siteDescription: {
      en: 'Freelance UI/UX Designer with 10+ years of experience based in Vancouver, Canada.',
      ja: '10年以上の経験を持ち、カナダ、バンクーバーを拠点に活動する、フリーランスのUI/UXデザイナーです',
    },
    author: {
      en: 'Ayumi Takahashi',
      ja: '高橋あゆみ',
    },
    siteBanner: '/og-image.png',
    siteLogo: '/logo.png',
    userTwitter: '@ayumitk__',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          'gatsby-remark-code-titles', // IMPORTANT: this must be ahead of other plugins that use code blocks
          {
            resolve: 'gatsby-remark-autolink-headers',
            options: {
              offsetY: `100`,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          // {
          //   resolve: 'gatsby-remark-responsive-iframe',
          //   options: {
          //     wrapperStyle: 'margin-bottom: 1.0725rem',
          //   },
          // },
          // 'gatsby-remark-twemoji',
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin: auto;',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-medium-zoom`,
            options: {
              background: 'rgba(30,30,30,0.8)',
            },
          },
        ],
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-intl`,
      options: {
        path: `${__dirname}/src/intl`,
        languages: [`en`, `ja`],
        defaultLanguage: `en`,
        redirect: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static`,
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
        icon: `static/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
