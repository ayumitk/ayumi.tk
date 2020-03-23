import React from 'react'
import { graphql } from 'gatsby'
import { injectIntl } from 'gatsby-plugin-intl'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '../components/Chip'
import Layout from '../components/layout'
import SEO from '../components/seo'
import myTheme from '../styles/theme'
import BlogGrid from '../components/BlogGrid'

const useStyles = makeStyles(theme => ({
  root: {},
}))

const BlogPage = ({ data, intl }) => {
  const classes = useStyles()

  let tags = []
  data.allContentfulPost.nodes.forEach(tag => {
    tags = tags.concat(tag.tag)
  })
  function uniq(array) {
    return array.filter((elem, index, self) => self.indexOf(elem) === index)
  }
  const uniqTags = uniq(tags).sort()

  let totalCount = 0
  data.allContentfulPost.nodes.forEach(post => {
    if (post.title) {
      totalCount += 1
    }
  })

  const kebabCase = string =>
    string
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase()

  return (
    <Layout>
      <SEO title={intl.formatMessage({ id: 'blogTitle' })} />
      <Container maxWidth="lg" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Blog <small>({totalCount})</small>
        </Typography>

        <div>
          {uniqTags.map(tag => (
            <Chip
              label={`#${tag}`}
              to={`/blog/tag/${kebabCase(tag)}`}
              clickable
              style={{ margin: '0 0.25rem 0.25rem 0' }}
              key={kebabCase(tag)}
            />
          ))}
        </div>

        <BlogGrid posts={data.allContentfulPost.nodes} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query blogQuery($locale: String) {
    allContentfulPost(sort: { fields: publishedAt, order: DESC }, filter: { node_locale: { eq: $locale } }) {
      nodes {
        contentful_id
        title
        path
        tag
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

export default injectIntl(BlogPage)
