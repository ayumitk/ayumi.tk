import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby-plugin-intl'
import Img from 'gatsby-image'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import myTheme from '../styles/theme'
import Layout from '../components/layout'
import '../styles/prism.scss'
import SEO from '../components/seo'
import Chip from '../components/Chip'

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
}))

const WorkPost = ({ pageContext, data }) => {
  const classes = useStyles()
  const theme = useTheme()

  const kebabCase = string =>
    string
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase()

  if (!data.contentfulWork.title) {
    return <Layout>Sorry, no English version of this post available. Please check related posts.</Layout>
  }

  return (
    <Layout>
      <SEO title={data.contentfulWork.title} />
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
                  .map(tag => (
                    <Chip
                      label={`#${tag}`}
                      to={`/work/tag/${kebabCase(tag)}`}
                      clickable
                      style={{ margin: '0.25rem' }}
                      key={kebabCase(tag)}
                    />
                  ))}
            </div>
            <p className={classes.workDescription}>{data.contentfulWork.description}</p>
          </header>

          {/* Markdown */}
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: data.contentfulWork.markdown.childMarkdownRemark.html }}
          />

          {/* Blog Post Footer */}
          <footer>
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
                  .map(tag => (
                    <Chip
                      label={`#${tag}`}
                      to={`/work/tag/${kebabCase(tag)}`}
                      clickable
                      style={{ margin: '0.25rem' }}
                      key={kebabCase(tag)}
                    />
                  ))}
            </div>
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

export default WorkPost
