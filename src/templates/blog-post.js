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
    paddingTop: `1rem`,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0,
    },
    '& img.emoji': {
      height: `1em`,
      width: `1em`,
      margin: `0 .05em 0 .1em`,
      verticalAlign: `-0.1em`,
    },
  },
  hero: {
    lineHeight: 0,
    '& img': {
      width: `100%`,
    },
  },
  postContainer: {
    maxWidth: `728px`,
  },
  tableOfContents: {
    background: `#ececec`,
    maxWidth: `500px`,
    fontSize: `1rem`,
    lineHeight: 1.6,
    [theme.breakpoints.down('xs')]: {
      fontSize: `0.937rem`,
    },
    '&:before': {
      display: `none`,
    },
    '&.MuiPaper-root': {
      margin: `3rem auto`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `1rem`,
      },
    },
    '& ul': {
      margin: 0,
      listStyle: `decimal`,
      paddingLeft: `2rem`,
      color: myTheme.palette.primary.main,
      [theme.breakpoints.down('xs')]: {
        paddingLeft: `1rem`,
      },
    },
    '& li': {
      fontWeight: '700',
      borderBottom: `solid 1px #ccc`,
      padding: `0.75rem 0`,
    },
    '& li ul': {
      listStyle: `disc`,
      paddingLeft: `1.25rem`,
    },
    '& li li': {
      fontWeight: '400',
      border: 0,
      padding: `0.15rem 0`,
    },
    '& a': {
      color: myTheme.palette.secondary.main,
      textDecoration: `none`,
    },
    '& li p': {
      margin: `0 0 0.25rem 0`,
    },
  },
  tableOfContentsHeading: {
    fontWeight: `700`,
    fontSize: `1.125rem`,
    textAlign: `center`,
    width: `100%`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `1rem`,
    },
  },
  tableOfContentsDetails: {
    borderTop: `solid 1px #ccc`,
    display: `block`,
  },
  content: {
    fontSize: `1.125rem`,
    lineHeight: `1.8`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `1rem`,
    },
    '& strong': {
      background: `linear-gradient(transparent 70%, #ffdad9 70%)`,
    },
    '& a': {
      color: `#0062DA`,
    },
    '& code a': {
      color: `#cbccc6`,
      pointerEvents: `none`,
      textDecoration: `none`,
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
      margin: `5rem auto`,
      borderWidth: `0px`,
      borderRadius: `4px`,
      [theme.breakpoints.down('xs')]: {
        margin: `4rem auto`,
      },
    },
    '& h2, & h3': {
      marginTop: `8rem`,
      marginBottom: `-0.75rem`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `6rem`,
      },
    },
    '& h2': {
      fontSize: `1.75rem`,
      lineHeight: `1.25`,
      [theme.breakpoints.down('xs')]: {
        fontSize: `1.5rem`,
      },
    },
    '& h3': {
      fontSize: `1.375rem`,
      lineHeight: `1.25`,
      [theme.breakpoints.down('xs')]: {
        fontSize: `1.25rem`,
      },
    },
    '& p, & ul, & ol, & h2 + h3, & table': {
      marginTop: `3rem`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `2rem`,
      },
    },
    '& hr + h2': {
      marginTop: `5rem`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `4rem`,
      },
    },
    '& ol': {
      padding: `2rem 3rem`,
      backgroundColor: `#eef1f5`,
      border: `solid 2px #d7e0ea`,
      '& li': {
        borderBottom: `solid 1px #d7e0ea`,
        padding: `0.5rem 0`,
        color: `#0062DA`,
      },
    },
    '& blockquote': {
      background: `rgba(0, 0, 0, 0.05)`,
      padding: `1.5rem 2rem`,
      borderLeft: `3px solid rgb(28, 27, 32)`,
      fontSize: `1rem`,
      margin: `3rem 0`,
      lineHeight: `1.6`,
      [theme.breakpoints.down('xs')]: {
        padding: `1rem 1.5rem`,
      },
      '& p': {
        margin: 0,
      },
    },
    '& table': {
      width: `100%`,
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
    fontSize: `2rem !important`,
    lineHeight: `1.25`,
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: `1.75rem !important`,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: `1.5rem !important`,
    },
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
      <Container className={classes.postContainer}>
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
          <ExpansionPanel className={classes.tableOfContents} defaultExpanded="true">
            <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography className={classes.tableOfContentsHeading}>
                <FormattedMessage id="tableOfContents" />
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.tableOfContentsDetails}>
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
