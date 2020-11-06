import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { injectIntl } from 'gatsby-plugin-intl'
import { Container, Typography } from '@material-ui/core'
import { Layout, SEO, BlogGrid, Tag } from '../components'

const BlogIndex = ({ data, intl }) => {
  const posts = data.allContentfulBlog.nodes

  let allTags = []
  posts.forEach(post => {
    allTags = allTags.concat(post.tags)
  })

  const tags = allTags.filter((item, index, array) => array.findIndex(item2 => item.slug === item2.slug) === index)

  const page = {
    title: intl.locale === 'en' ? 'Blog' : 'ブログ記事',
    description:
      intl.locale === 'en'
        ? ''
        : 'UI/UXデザインについて、フロントエンド開発について、日々学んだことを発信しているブログの一覧ページです。',
    image: '',
    slug: 'blog',
  }

  return (
    <Layout customSEO>
      <SEO page={page} />
      <Container maxWidth="lg" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Blog <small>({posts.length})</small>
        </Typography>

        <div>
          {tags.map(tag => (
            <Tag label={`#${tag.title}`} to={`/blog/tag/${tag.slug}/`} key={tag.slug} />
          ))}
        </div>

        <BlogGrid posts={posts} />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogIndexQuery($locale: String) {
    allContentfulBlog(sort: { fields: publishedAt, order: DESC }, filter: { node_locale: { eq: $locale } }) {
      nodes {
        contentful_id
        title
        slug
        tags {
          title
          slug
        }
        description {
          description
        }
        publishedAt(formatString: "MMMM DD, YYYY")
        hero {
          title
          description
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allContentfulBlog: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }).isRequired,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(BlogIndex)
