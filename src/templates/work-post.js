import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { makeStyles, Container, Typography } from '@material-ui/core'
import { DiscussionEmbed } from 'disqus-react'
import { Layout, SEO, Tag, Bio } from '../components'
import Markdown from '../components/Markdown'

const useStyles = makeStyles({
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
})

const WorkPost = ({ data }) => {
  const classes = useStyles()
  const post = data.contentfulWork

  const disqusConfig = {
    shortname: process.env.GATSBY_DISQUS_NAME,
    config: { identifier: post.slug, title: post.title },
  }

  if (!post.title) {
    return <Layout>Sorry, no English version of this work available.</Layout>
  }

  return (
    <Layout customSEO>
      <SEO post={post} article />
      <Container maxWidth="lg">
        <article className={classes.root}>
          {/* Hero Image */}
          <div className={classes.hero}>
            <Img fluid={post.hero.fluid} />
          </div>

          {/* Blog Post Header */}
          <header style={{ margin: '6rem 0' }}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
              {post.title}
            </Typography>
            {/* <h1 className={classes.workTitle}>{post.title}</h1> */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {post.tags &&
                post.tags.map(tag => <Tag label={`#${tag.title}`} to={`/work/tag/${tag.slug}/`} key={tag.slug} />)}
            </div>
            <p className={classes.workDescription}>{post.description && post.description.description}</p>
          </header>

          {/* Markdown */}
          <Markdown>{post.markdown.childMdx.body}</Markdown>

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
              {post.tags &&
                post.tags.map(tag => <Tag label={`#${tag.title}`} to={`/work/tag/${tag.slug}/`} key={tag.slug} />)}
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
  query ContentFulWork($slug: String, $locale: String) {
    contentfulWork(slug: { eq: $slug }, node_locale: { eq: $locale }) {
      slug
      node_locale
      title
      tags {
        title
        slug
      }
      description {
        description
      }
      markdown {
        childMdx {
          body
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
