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
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)
  const workDetailTemplate = path.resolve(`src/templates/work-post.js`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter
  return graphql(
    `
      query MyQuery {
        allContentfulPost {
          edges {
            node {
              path
              tag
            }
          }
        }
        allContentfulWork {
          edges {
            node {
              path
              tag
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
    result.data.allContentfulPost.edges.forEach(edge => {
      const { path } = edge.node

      createPage({
        // Path for this page — required
        path: `/blog/${path}`,
        component: blogPostTemplate,
        context: {
          slug: path,
        },
      })
    })

    // Tag pages for post:
    let postTags = []
    // Iterate through each post, putting all found tags into `tags`
    result.data.allContentfulPost.edges.forEach(edge => {
      if (_.get(edge, 'node.tag')) {
        postTags = postTags.concat(edge.node.tag)
      }
    })
    // Eliminate duplicate tags
    postTags = _.uniq(postTags)

    // Make tag pages
    postTags.forEach(tag => {
      const tagPath = `/blog/tag/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve('src/templates/blog-tag.js'),
        context: {
          tag,
        },
      })
    })

    // Create work detail pages.
    result.data.allContentfulWork.edges.forEach(edge => {
      const { path } = edge.node

      createPage({
        // Path for this page — required
        path: `/work/${path}`,
        component: workDetailTemplate,
        context: {
          slug: path,
        },
      })
    })

    // Tag pages for work:
    let workTags = []
    // Iterate through each post, putting all found tags into `tags`
    result.data.allContentfulWork.edges.forEach(edge => {
      if (_.get(edge, 'node.tag')) {
        workTags = workTags.concat(edge.node.tag)
      }
    })
    // Eliminate duplicate tags
    workTags = _.uniq(workTags)

    // Make tag pages
    workTags.forEach(tag => {
      const tagPath = `/work/tag/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve('src/templates/work-tag.js'),
        context: {
          tag,
        },
      })
    })
  })
}
