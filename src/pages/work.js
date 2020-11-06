import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'gatsby-plugin-intl'
import { Container, Typography } from '@material-ui/core'
import { graphql } from 'gatsby'
import { Layout, SEO, WorkGrid, Tag } from '../components'

const WorkPage = ({ data, intl }) => {
  const works = data.allContentfulWork.nodes

  let allTags = []
  works.forEach(work => {
    allTags = allTags.concat(work.tags)
  })

  const tags = allTags.filter((item, index, array) => array.findIndex(item2 => item.slug === item2.slug) === index)

  const page = {
    title: intl.locale === 'en' ? 'Work' : '制作実績',
    description:
      intl.locale === 'en'
        ? ''
        : '過去に制作させていただいたwebサイトやロゴ、名刺などのグラフィックデザインを実績として紹介する一覧ページです。',
    image: '',
    slug: 'work',
  }

  return (
    <Layout customSEO>
      <SEO page={page} />
      <Container maxWidth="lg" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          Work <small>({works.length})</small>
        </Typography>

        <div>
          {tags.map(tag => (
            <Tag label={`#${tag.title}`} to={`/work/tag/${tag.slug}/`} key={tag.slug} />
          ))}
        </div>

        <WorkGrid posts={works} />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query workQuery($locale: String) {
    allContentfulWork(sort: { fields: publishedAt, order: DESC }, filter: { node_locale: { eq: $locale } }) {
      nodes {
        contentful_id
        title
        slug
        tags {
          title
          slug
        }
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

WorkPage.propTypes = {
  data: PropTypes.shape({
    allContentfulWork: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }).isRequired,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(WorkPage)
