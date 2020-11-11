import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { makeStyles, Typography, Container } from '@material-ui/core'
import { Update } from '@material-ui/icons'
import { DiscussionEmbed } from 'disqus-react'
import Prism from 'prismjs'
import theme from '../styles/theme'
import { Layout, SEO, Bio, Tag } from '../components'
import Markdown from '../components/Markdown'
import TableOfContents from '../components/TableOfContents'

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
    [theme.breakpoints.down('xs')]: {
      display: `none`,
    },
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
    margin: `1rem 0 0.5rem 0`,
  },
})

const BlogPostTemplate = ({ data }) => {
  const classes = useStyles()
  const post = data.contentfulBlog
  const { tags } = data.contentfulBlog

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: post.slug, title: post.title },
  }

  useEffect(() => {
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
          <TableOfContents toc={post.markdown.childMdx.tableOfContents.items} />

          {/* Markdown */}
          <Markdown>{post.markdown.childMdx.body}</Markdown>

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
        childMdx {
          tableOfContents(maxDepth: 3)
          body
        }
      }
      hero {
        title
        description
        fluid(maxWidth: 1400) {
          ...GatsbyContentfulFluid
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
