import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby-plugin-intl'
import Img from 'gatsby-image'
import { makeStyles, Card, CardActionArea, CardContent, Typography, Container } from '@material-ui/core'
import { SEO, Layout } from '../components'
import myTheme from '../styles/theme'

const useStyles = makeStyles(theme => ({
  root: {},
  blogGrid: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr 1fr 1fr`,
    gridGap: `20px`,
    margin: theme.spacing(5, 0),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: `1fr 1fr 1fr`,
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `1fr 1fr`,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: `1fr`,
    },
    '& a': {
      textDecoration: `none`,
    },
  },
}))

const WorkTagRoute = ({ data, intl, pageContext }) => {
  const classes = useStyles()
  const { tag } = pageContext

  let totalCount = 0
  data.allContentfulPost.nodes.forEach(post => {
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

        <div className={classes.blogGrid}>
          {data.allContentfulPost.nodes.map(post => {
            if (!post.title) {
              return null
            }

            return (
              <Link to={`/${post.path}`} key={post.contentful_id}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <Img fluid={post.hero.fluid} />
                    <CardContent className={classes.blogCardContent}>
                      <Typography gutterBottom component="h2" style={{ fontWeight: '400' }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {post.publishedAt}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            )
          })}
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query blogTagQuery($tag: String, $locale: String) {
    allContentfulPost(
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
