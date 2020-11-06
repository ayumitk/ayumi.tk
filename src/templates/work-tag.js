import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Typography, Container } from '@material-ui/core'
import { SEO, Layout, WorkGrid } from '../components'

const WorkTagRoute = ({ data }) => {
  const posts = data.allContentfulWork.nodes
  const tag = data.allContentfulTag.nodes[0]

  return (
    <Layout customSEO>
      <SEO archive={tag} />
      <Container maxWidth="lg" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {`#${tag.title}`} <small>({posts.length})</small>
        </Typography>
        <WorkGrid posts={posts} />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query WorkTagIndexQuery($slug: String, $locale: String) {
    allContentfulWork(
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

WorkTagRoute.propTypes = {
  data: PropTypes.shape({
    allContentfulWork: PropTypes.shape({
      nodes: PropTypes.array,
    }),
    allContentfulTag: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }).isRequired,
}

export default WorkTagRoute
