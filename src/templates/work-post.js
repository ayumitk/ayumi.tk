import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { makeStyles, useTheme, Container, Typography } from '@material-ui/core'
import { DiscussionEmbed } from 'disqus-react'
import myTheme from '../styles/theme'
import { Layout, SEO, Tag, Bio } from '../components'
import '../styles/prism.scss'

const useStyles = makeStyles(theme => ({
  root: {},
  workDescription: {
    maxWidth: `640px`,
    margin: `auto`,
    fontSize: `1.25rem`,
    color: `#666`,
  },
  content: {
    textAlign: `center`,
    '& img': {
      width: `100%`,
    },
    '& p': {
      fontSize: `1.5rem`,
      color: `#666`,
    },
  },
  footer: {
    maxWidth: `680px`,
    margin: `auto`,
  },
}))

const WorkPost = ({ data }) => {
  const classes = useStyles()
  const theme = useTheme()

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: data.contentfulWork.path, title: data.contentfulWork.title },
  }

  const kebabCase = string =>
    string
      .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
      .filter(Boolean)
      .map(x => x.toLowerCase())
      .join('-')

  if (!data.contentfulWork.title) {
    return <Layout>Sorry, no English version of this post available. Please check related posts.</Layout>
  }

  return (
    <Layout>
      <SEO
        title={data.contentfulWork.title}
        description={data.contentfulWork.description && data.contentfulWork.description}
      />
      <Container maxWidth="lg">
        <article className={classes.root}>
          {/* Hero Image */}
          <div className={classes.hero}>
            <Img fluid={data.contentfulWork.hero.fluid} />
          </div>

          {/* Blog Post Header */}
          <header style={{ margin: '6rem 0' }}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
              {data.contentfulWork.title}
            </Typography>
            {/* <h1 className={classes.workTitle}>{data.contentfulWork.title}</h1> */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {data.contentfulWork.tag &&
                data.contentfulWork.tag
                  .sort()
                  .map(tag => <Tag label={`#${tag}`} to={`/work/tag/${kebabCase(tag)}`} key={kebabCase(tag)} />)}
            </div>
            <p className={classes.workDescription}>
              {data.contentfulWork.description && data.contentfulWork.description}
            </p>
          </header>

          {/* Markdown */}
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: data.contentfulWork.markdown.childMarkdownRemark.html }}
          />

          {/* Blog Post Footer */}
          <footer className={classes.footer}>
            <Typography
              variant="h5"
              component="p"
              gutterBottom
              align="center"
              style={{ color: '#666', margin: '5rem 0' }}
            >
              Thank you for scrolling!
            </Typography>
            <div style={{ textAlign: 'center' }}>
              {data.contentfulWork.tag &&
                data.contentfulWork.tag
                  .sort()
                  .map(tag => <Tag label={`#${tag}`} to={`/work/tag/${kebabCase(tag)}`} key={kebabCase(tag)} />)}
            </div>
            <Bio />
            <DiscussionEmbed {...disqusConfig} />
          </footer>
        </article>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ContentFulWork($slug: String) {
    contentfulWork(path: { eq: $slug }) {
      path
      title
      tag
      description
      markdown {
        childMarkdownRemark {
          html
        }
      }
      hero {
        title
        description
        fluid(maxWidth: 1200) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

WorkPost.propTypes = {
  data: PropTypes.shape({
    contentfulWork: PropTypes.object,
  }).isRequired,
}

export default WorkPost
