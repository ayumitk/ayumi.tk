import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { makeStyles, Typography, Container } from '@material-ui/core'
import { SEO, Layout, WorkGrid } from '../components'
import myTheme from '../styles/theme'

const useStyles = makeStyles(theme => ({
  root: {},
  workGrid: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr 1fr`,
    margin: theme.spacing(5, 0),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: `1fr 1fr 1fr`,
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `1fr 1fr`,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: `1fr 1fr`,
    },
  },
}))

const WorkTagRoute = ({ data, pageContext }) => {
  const classes = useStyles()
  const { tag } = pageContext

  let totalCount = 0
  data.allContentfulWork.nodes.forEach(post => {
    if (post.title) {
      totalCount += 1
    }
  })

  return (
    <Layout>
      <SEO title={tag} />
      <Container maxWidth="lg" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {`#${tag}`} <small>({totalCount})</small>
        </Typography>
        <WorkGrid works={data.allContentfulWork.nodes} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query workTagQuery($tag: String, $locale: String) {
    allContentfulWork(
      sort: { fields: publishedAt, order: DESC }
      filter: { tag: { in: [$tag] }, node_locale: { eq: $locale } }
    ) {
      nodes {
        contentful_id
        title
        path
        description
        publishedAt(formatString: "MMMM DD, YYYY")
        hero {
          title
          description
          fluid(maxWidth: 1200) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

WorkTagRoute.propTypes = {
  data: PropTypes.shape({
    allContentfulWork: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }).isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default WorkTagRoute
