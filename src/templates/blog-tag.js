import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Typography, Container } from '@material-ui/core'
import { SEO, Layout, BlogGrid } from '../components'

const BlogTagIndex = ({ data }) => {
  const posts = data.allContentfulBlog.nodes
  const tag = data.allContentfulTag.nodes[0]

  return (
    <Layout customSEO>
      <SEO archive={tag} />
      <Container maxWidth="lg" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {`#${tag.title}`} <small>({posts.length})</small>
        </Typography>

        <BlogGrid posts={posts} />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PostTagIndexQuery($slug: String, $locale: String) {
    allContentfulBlog(
      sort: { fields: publishedAt, order: DESC }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } }, node_locale: { eq: $locale } }
    ) {
      nodes {
        contentful_id
        title
        slug
        description {
          description
        }
        publishedAt(formatString: "MMMM DD, YYYY")
        hero {
          title
          description
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
    allContentfulTag(filter: { node_locale: { eq: $locale }, slug: { eq: $slug } }) {
      nodes {
        title
        description {
          description
        }
        slug
      }
    }
  }
`

BlogTagIndex.propTypes = {
  data: PropTypes.shape({
    allContentfulBlog: PropTypes.shape({
      nodes: PropTypes.array,
    }),
    allContentfulTag: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }).isRequired,
}

export default BlogTagIndex
