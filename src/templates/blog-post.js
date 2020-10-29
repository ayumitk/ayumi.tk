import React from 'react'
import { graphql } from 'gatsby'
import { Link, FormattedMessage } from 'gatsby-plugin-intl'
import Img from 'gatsby-image'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Container from '@material-ui/core/Container'
import { DiscussionEmbed } from 'disqus-react'
import myTheme from '../styles/theme'
import Layout from '../components/layout'
import '../styles/prism.scss'
import SEO from '../components/seo'
import Chip from '../components/Chip'
import Bio from '../components/Bio'

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: `1rem`,
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
      listStyle: `decimal`,
      paddingLeft: `2rem`,
      color: myTheme.palette.primary.main,
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
  },
  tableOfContentsDetails: {
    borderTop: `solid 1px #ccc`,
    display: `block`,
  },
  content: {
    fontSize: `1.125rem`,
    lineHeight: `1.8`,
    '& img.emoji': {
      height: `1em`,
      width: `1em`,
      margin: `0 .05em 0 .1em`,
      verticalAlign: `-0.1em`,
    },
    '& strong': {
      background: `linear-gradient(transparent 60%, #ffb0ad 60%)`,
    },
    '& a': {
      // color: myTheme.palette.primary.main,
      color: `#0062DA`,
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
    '& h2,& h3': {
      marginTop: `8rem`,
      marginBottom: `-0.75rem`,
    },
    '& h2': {
      fontSize: `1.75rem`,
      // margin: `2rem 0`,
    },
    '& h3': {
      fontSize: `1.375rem`,
      // margin: `5rem 0 0 0`,
    },
    '& h2 + h3': {
      // margin: `3rem 0 0 0`,
    },
    '& p': {
      marginTop: `2.5rem`,
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
    '& a': {
      background: `#EEE`,
      color: myTheme.palette.secondary.main,
      textDecoration: `none`,
    },
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
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase()

  if (!data.contentfulPost.title) {
    return <Layout>Sorry, no English version of this post available. Please check related posts.</Layout>
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
                  .map(tag => (
                    <Chip
                      label={`#${tag}`}
                      to={`/blog/tag/${kebabCase(tag)}`}
                      clickable
                      style={{ margin: '0 0.25rem 0.25rem 0' }}
                      key={kebabCase(tag)}
                    />
                  ))}
            </div>
          </header>

          {/* Hero Image */}
          <div className={classes.hero}>
            <Img fluid={data.contentfulPost.hero.fluid} />
          </div>

          {/* Table of Contents */}
          <ExpansionPanel className={classes.tableOfContents} defaultExpanded="true">
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
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
                  .map(tag => (
                    <Chip
                      label={`#${tag}`}
                      to={`/blog/tag/${kebabCase(tag)}`}
                      clickable
                      style={{ margin: '0 0.25rem 0.25rem 0' }}
                      key={kebabCase(tag)}
                    />
                  ))}
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

export default BlogPost
