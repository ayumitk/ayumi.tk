import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { FormattedMessage } from 'gatsby-plugin-intl'
import Img from 'gatsby-image'
import {
  makeStyles,
  useTheme,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Container,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { DiscussionEmbed } from 'disqus-react'
import myTheme from '../styles/theme'
import { Layout, SEO, Bio, Tag } from '../components'
import '../styles/prism.scss'

const useStyles = makeStyles(theme => ({
  root: {
    '& h1': {
      fontSize: `2.5rem`,
      [theme.breakpoints.down('xs')]: {
        fontSize: `1.75rem`,
      },
    },
  },
  hero: {
    lineHeight: 0,
    '& img': {
      width: `100%`,
    },
  },
  tableOfContents: {
    background: `#ececec`,
    maxWidth: `500px`,
    margin: `3rem auto`,
    fontSize: `1rem`,
    lineHeight: 1.6,
    '&:before': {
      display: `none`,
    },
    '&.Mui-expanded': {
      margin: `3rem auto`,
    },
    '& ul': {
      margin: 0,
      // padding: 0,
    },
    '& li': {
      fontWeight: '700',
      // listStyle: `none`,
    },
    '& li ul': {
      // paddingLeft: `1.5rem`,
    },
    '& li li': {
      fontWeight: '400',
    },
    '& a': {
      color: myTheme.palette.secondary.main,
      textDecoration: `none`,
    },
    '& li p': {
      margin: `1rem 0 0.5rem 0`,
    },
  },
  tableOfContentsHeading: {
    fontWeight: `700`,
    fontSize: `1.125rem`,
  },
  content: {
    fontSize: `1.125rem`,
    lineHeight: `1.8`,
    '& a': {
      color: myTheme.palette.primary.main,
    },
    '& .gatsby-resp-image-wrapper': {
      maxWidth: `680px !important`,
    },
    '& img': {
      width: `100%`,
    },
    '& hr': {
      display: `block`,
      height: `4px`,
      width: `120px`,
      backgroundColor: `rgba(33, 37, 41, 0.1)`,
      margin: `4rem auto`,
      borderWidth: `0px`,
      borderRadius: `4px`,
    },
    '& h2': {
      fontSize: `2rem`,
      margin: `0 0 1.5rem 0`,
    },
    '& h3': {
      fontSize: `1.5rem`,
      margin: `5rem 0 0 0`,
    },
    '& h2 + h3': {
      margin: `3rem 0 0 0`,
    },
    '& p': {
      margin: `1.5rem 0 0 0`,
    },
    '& ul, & ol': {
      margin: `3rem 0`,
    },
    '& ol': {
      padding: `2rem 3rem`,
      backgroundColor: `#f6eeee`,
      border: `solid 2px #f6d4d4`,
      '& li': {
        borderBottom: `dashed 2px #f6d4d4`,
        padding: `0.5rem 0`,
      },
    },
    '& p img': {
      margin: `2rem 0`,
    },
    '& blockquote': {
      background: `rgba(0, 0, 0, 0.05)`,
      padding: `0.01rem 2rem 1.5rem 2rem`,
      margin: `3rem 0px`,
      borderLeft: `3px solid rgb(28, 27, 32)`,
      fontSize: `1rem`,
      '& a': {
        color: myTheme.palette.secondary.main,
      },
    },
    '& table': {
      width: `100%`,
      margin: `3rem 0`,
      borderCollapse: `collapse`,
      borderSpacing: 0,
    },
    '& table th, & table td': {
      border: `solid 1px #CCC`,
      padding: `0.5rem`,
    },
    '& table tbody td': {
      textAlign: `center`,
    },
  },
  publishedDate: {
    color: myTheme.palette.primary.main,
    textAlign: `center`,
    fontWeight: 700,
    fontSize: `1.25rem`,
    margin: `3rem 0 0.5rem 0`,
    fontFamily: `Gilroy, NotoSansJP, sans-serif`,
  },
  postTitle: {
    fontSize: `2rem`,
    margin: 0,
  },
  postDescription: {
    color: `#666`,
  },
  postTag: {
    display: `flex`,
    marginBottom: `1rem`,
  },
}))

const BlogPost = ({ data }) => {
  const classes = useStyles()
  const theme = useTheme()

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: data.contentfulPost.path, title: data.contentfulPost.title },
  }

  const kebabCase = string =>
    string
      .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
      .filter(Boolean)
      .map(x => x.toLowerCase())
      .join('-')

  if (!data.contentfulPost.title) {
    return (
      <Layout>
        <Container maxWidth="md" style={{ paddingTop: `5rem` }}>
          <Typography variant="body1" align="center">
            Sorry, no English version of this post available.
          </Typography>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO
        title={data.contentfulPost.title}
        description={data.contentfulPost.description && data.contentfulPost.description}
      />
      <Container maxWidth="md">
        <article className={classes.root}>
          {/* Blog Post Header */}
          <header>
            <p className={classes.publishedDate}>{data.contentfulPost.publishedAt}</p>
            <h1 className={classes.postTitle}>{data.contentfulPost.title}</h1>
            <p className={classes.postDescription}>
              {data.contentfulPost.description && data.contentfulPost.description}
            </p>
            <div className={classes.postTag}>
              {data.contentfulPost.tag &&
                data.contentfulPost.tag
                  .sort()
                  .map(tag => <Tag label={`#${tag}`} to={`/blog/tag/${kebabCase(tag)}`} key={kebabCase(tag)} />)}
            </div>
          </header>

          {/* Hero Image */}
          <div className={classes.hero}>
            <Img fluid={data.contentfulPost.hero.fluid} />
          </div>

          {/* Table of Contents */}
          <ExpansionPanel className={classes.tableOfContents}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography className={classes.tableOfContentsHeading}>
                <FormattedMessage id="tableOfContents" />
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.contentfulPost.childContentfulPostMarkdownTextNode.childMarkdownRemark.tableOfContents,
                }}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          {/* Markdown */}
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: data.contentfulPost.markdown.childMarkdownRemark.html }}
          />

          {/* Blog Post Footer */}
          <footer style={{ marginTop: '5rem' }}>
            <div className={classes.postTag}>
              {data.contentfulPost.tag &&
                data.contentfulPost.tag
                  .sort()
                  .map(tag => <Tag label={`#${tag}`} to={`/blog/tag/${kebabCase(tag)}`} key={kebabCase(tag)} />)}
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
  query ContentFulPost($slug: String, $locale: String) {
    contentfulPost(path: { eq: $slug }, node_locale: { eq: $locale }) {
      path
      node_locale
      title
      description
      tag
      publishedAt(formatString: "MMMM DD, YYYY")
      markdown {
        childMarkdownRemark {
          html
        }
      }
      hero {
        title
        description
        fluid(maxWidth: 1400) {
          ...GatsbyContentfulFluid
        }
      }
      childContentfulPostMarkdownTextNode {
        childMarkdownRemark {
          tableOfContents(absolute: false, maxDepth: 3)
        }
      }
    }
  }
`

BlogPost.propTypes = {
  data: PropTypes.shape({
    contentfulPost: PropTypes.object,
  }).isRequired,
}

export default BlogPost
