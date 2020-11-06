import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { useIntl } from 'gatsby-plugin-intl'
import Img from 'gatsby-image'
import { makeStyles, Typography, Container, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { ExpandMore, Update } from '@material-ui/icons'
import { DiscussionEmbed } from 'disqus-react'
import Prism from 'prismjs'
import theme from '../styles/theme'
import { Layout, SEO, Bio, Tag } from '../components'
import '../styles/prism.scss'

const useStyles = makeStyles({
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
      color: theme.palette.primary.main,
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
      color: theme.palette.secondary.main,
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
    '& p, & ul, & ol, & h2 + h3, & table, & .code-toolbar, & .gatsby-code-title': {
      marginTop: `3rem`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `2rem`,
      },
    },
    '& .gatsby-code-title + .code-toolbar': {
      marginTop: 0,
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
    color: theme.palette.primary.main,
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
  updatedAt: {
    marginBottom: `1rem`,
    '& svg': {
      width: `1rem`,
      height: `1rem`,
      verticalAlign: `middle`,
      marginRight: `0.25rem`,
    },
  },
  postTag: {
    display: `flex`,
    marginBottom: `0.5rem`,
  },
})

const BlogPostTemplate = ({ data }) => {
  const classes = useStyles()
  const intl = useIntl()
  const post = data.contentfulBlog
  const { tags } = data.contentfulBlog

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: post.slug, title: post.title },
  }

  useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll()
  })

  if (!post.title) {
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
    <Layout customSEO>
      <SEO post={post} article />
      <Container className={classes.postContainer}>
        <article className={classes.root}>
          {/* Blog Post Header */}
          <header>
            <p className={classes.publishedDate}>{post.publishedAt}</p>
            <h1 className={classes.postTitle}>{post.title}</h1>
            <p className={classes.postDescription}>{post.description && post.description.description}</p>
            <div className={classes.postTag}>
              {tags && tags.map(tag => <Tag label={`#${tag.title}`} to={`/blog/tag/${tag.slug}/`} key={tag.slug} />)}
            </div>
            <Typography variant="body2" className={classes.updatedAt}>
              <Update />
              Updated at {post.updatedAt}
            </Typography>
          </header>

          {/* Hero Image */}
          <div className={classes.hero}>
            <Img fluid={post.hero.fluid} />
          </div>

          {/* Table of Contents */}
          <Accordion defaultExpanded className={classes.tableOfContents}>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography className={classes.tableOfContentsHeading}>
                {intl.locale === 'en' ? 'Table of Contents' : '目次'}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.tableOfContentsDetails}>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.childContentfulBlogMarkdownTextNode.childMarkdownRemark.tableOfContents,
                }}
              />
            </AccordionDetails>
          </Accordion>

          {/* Markdown */}
          <div
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: post.markdown.childMarkdownRemark.html }}
          />

          {/* Blog Post Footer */}
          <footer style={{ marginTop: '5rem' }}>
            <div className={classes.postTag}>
              {tags && tags.map(tag => <Tag label={`#${tag.title}`} to={`/blog/tag/${tag.slug}/`} key={tag.slug} />)}
            </div>
            <Bio />
            <DiscussionEmbed {...disqusConfig} />
          </footer>
        </article>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String, $locale: String) {
    contentfulBlog(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      slug
      node_locale
      title
      description {
        description
      }
      tags {
        title
        slug
      }
      publishedAt(formatString: "MMMM DD, YYYY")
      updatedAt(formatString: "MMMM DD, YYYY")
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
      childContentfulBlogMarkdownTextNode {
        childMarkdownRemark {
          tableOfContents(absolute: false, maxDepth: 3)
        }
      }
    }
  }
`

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({
    contentfulBlog: PropTypes.object,
  }).isRequired,
}

export default BlogPostTemplate
