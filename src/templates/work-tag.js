import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby-plugin-intl'
import Img from 'gatsby-image'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import SEO from '../components/seo'
import Layout from '../components/layout'
import myTheme from '../styles/theme'

const useStyles = makeStyles(theme => ({
  root: {},
  workGrid: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr 1fr`,
    margin: theme.spacing(5, 0),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: `1fr 1fr 1fr`,
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `1fr 1fr`,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: `1fr 1fr`,
    },
  },
}))

const WorkTagRoute = ({ data, intl, pageContext }) => {
  const classes = useStyles()
  const { tag } = pageContext

  let totalCount = 0
  data.allContentfulWork.nodes.forEach(post => {
    if (post.title) {
      totalCount += 1
    }
  })

  return (
    <Layout>
      <SEO title={tag} />
      <Container maxWidth="lg" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          {`#${tag}`} <small>({totalCount})</small>
        </Typography>
        <div className={classes.workGrid}>
          {data.allContentfulWork.nodes.map(work => (
            <div key={work.contentful_id}>
              <Link to={`/${work.path}`}>
                <Img fluid={work.hero.fluid} />
                {work.title}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query workTagQuery($tag: String, $locale: String) {
    allContentfulWork(
      sort: { fields: publishedAt, order: DESC }
      filter: { tag: { in: [$tag] }, node_locale: { eq: $locale } }
    ) {
      nodes {
        contentful_id
        title
        path
        description
        publishedAt(formatString: "MMMM DD, YYYY")
        hero {
          title
          description
          fluid(maxWidth: 1200) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export default WorkTagRoute
