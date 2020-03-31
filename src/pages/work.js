import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'gatsby-plugin-intl'
import { Container, Typography, makeStyles } from '@material-ui/core'
import { graphql } from 'gatsby'
import { Layout, SEO, Chip, WorkGrid } from '../components'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const WorkPage = ({ data, intl }) => {
  const classes = useStyles()

  let tags = []
  data.allContentfulWork.nodes.forEach(tag => {
    tags = tags.concat(tag.tag)
  })

  function uniq(array) {
    return array.filter((elem, index, self) => self.indexOf(elem) === index)
  }

  const uniqTags = uniq(tags).sort()

  const kebabCase = string =>
    string
      .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
      .filter(Boolean)
      .map(x => x.toLowerCase())
      .join('-')

  let totalCount = 0
  data.allContentfulWork.nodes.forEach(post => {
    if (post.title) {
      totalCount += 1
    }
  })

  return (
    <Layout>
      <SEO title={intl.formatMessage({ id: 'workTitle' })} />
      <Container maxWidth="lg" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Work <small>({totalCount})</small>
        </Typography>

        <div>
          {uniqTags.map(tag => (
            <Chip
              label={`#${tag}`}
              to={`/work/tag/${kebabCase(tag)}`}
              clickable
              style={{ margin: '0 0.25rem 0.25rem 0' }}
              key={kebabCase(tag)}
            />
          ))}
        </div>

        <WorkGrid works={data.allContentfulWork.nodes} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query workQuery($locale: String) {
    allContentfulWork(sort: { fields: publishedAt, order: DESC }, filter: { node_locale: { eq: $locale } }) {
      nodes {
        contentful_id
        title
        path
        tag
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

WorkPage.propTypes = {
  data: PropTypes.shape({
    allContentfulWork: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }).isRequired,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(WorkPage)
