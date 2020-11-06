const _ = require('lodash')

const path = require(`path`)

// pages locale
exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  deletePage(page)
  // You can access the variable "locale" in your page queries now
  createPage({
    ...page,
    context: {
      ...page.context,
      locale: page.context.intl.language,
    },
  })
}

// Create post and work pages
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query MyQuery {
        allContentfulBlog {
          edges {
            node {
              slug
              tags {
                slug
              }
            }
          }
        }
        allContentfulWork {
          edges {
            node {
              slug
              tags {
                slug
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog post pages.
    const blogs = result.data.allContentfulBlog.edges
    blogs.forEach(edge => {
      const { slug } = edge.node

      createPage({
        // Path for this page — required
        path: `/blog/${slug}`,
        component: path.resolve(`src/templates/blog-post.js`),
        context: {
          slug,
        },
      })
    })

    // Tag pages for post:
    let allPostTags = []
    // Iterate through each post, putting all found tags into `tags`
    blogs.forEach(edge => {
      if (_.get(edge, 'node.tags')) {
        allPostTags = allPostTags.concat(edge.node.tags)
      }
    })

    // Eliminate duplicate tags
    const postTags = allPostTags.filter(
      (item, index, array) => array.findIndex(item2 => item.slug === item2.slug) === index
    )

    // Make tag pages
    postTags.forEach(tag => {
      createPage({
        path: `/blog/tag/${tag.slug}/`,
        component: path.resolve('src/templates/blog-tag.js'),
        context: {
          slug: tag.slug,
        },
      })
    })

    // Create work detail pages.
    const works = result.data.allContentfulWork.edges
    works.forEach(edge => {
      const { slug } = edge.node

      createPage({
        // Path for this page — required
        path: `/work/${slug}`,
        component: path.resolve(`src/templates/work-post.js`),
        context: {
          slug,
        },
      })
    })

    // Tag pages for work:
    let allWorkTags = []
    // Iterate through each work, putting all found tags into `tags`
    works.forEach(edge => {
      if (_.get(edge, 'node.tags')) {
        allWorkTags = allWorkTags.concat(edge.node.tags)
      }
    })

    // Eliminate duplicate tags
    const workTags = allWorkTags.filter(
      (item, index, array) => array.findIndex(item2 => item.slug === item2.slug) === index
    )

    // Make tag pages
    workTags.forEach(tag => {
      createPage({
        path: `/work/tag/${tag.slug}/`,
        component: path.resolve('src/templates/work-tag.js'),
        context: {
          slug: tag.slug,
        },
      })
    })
  })
}
