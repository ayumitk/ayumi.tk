import React from 'react'
import { graphql } from 'gatsby'
import { injectIntl, Link, FormattedMessage } from 'gatsby-plugin-intl'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import myTheme from '../styles/theme'
import WorkGrid from '../components/WorkGrid'
import BlogGrid from '../components/BlogGrid'

const useStyles = makeStyles(theme => ({
  root: {},
  hero: {
    padding: theme.spacing(8),
    textAlign: `center`,
    '& strong': {
      letterSpacing: `-0.2rem`,
      fontSize: `7rem`,
      lineHeight: 0.9,
      color: myTheme.palette.primary.main,
    },
    '& span': {
      color: myTheme.palette.secondary.main,
    },
    '& small': {
      fontSize: `2rem`,
      display: `block`,
      lineHeight: 1.1,
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      '& strong': {
        fontSize: `5.5rem`,
      },
      '& small': {
        fontSize: `1.25rem`,
      },
    },
  },
  seeMoreBtn: {
    textAlign: `center`,
    '& a': {
      textDecoration: `none`,
    },
  },
  skillSet: {
    marginBottom: `7.5rem`,
    [theme.breakpoints.up('sm')]: {
      display: `flex`,
    },
  },
  skillContainer: {
    textAlign: `center`,
    display: `flex`,
    [theme.breakpoints.up('sm')]: {
      width: `50%`,
    },
    '& div': {
      maxWidth: `640px`,
      padding: `3rem 24px`,
    },
  },
  seeMore: {
    '& svg': {
      width: `1rem`,
      height: `1rem`,
    },
  },
}))

const IndexPage = ({ data, intl }) => {
  const classes = useStyles()
  return (
    <Layout>
      <SEO title="Home" />

      <h1 className={classes.hero}>
        <strong>
          Hello<span>.</span>
          <br />I am Ayumi,
        </strong>
        <small>
          <FormattedMessage id="index.profile1" />
          <br />
          <FormattedMessage id="index.profile2" />
          <br />
          <FormattedMessage id="index.profile3" />
        </small>
      </h1>

      <div className={classes.skillSet}>
        <div style={{ background: '#ff5851', color: '#FFF' }} className={classes.skillContainer}>
          <div style={{ marginLeft: 'auto' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              <FormattedMessage id="index.design.title" />
            </Typography>
            <Typography variant="body1" component="h3">
              <FormattedMessage id="index.design.field.dt" />
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '0.75rem' }}>
              <FormattedMessage id="index.design.field.dd" />
            </Typography>
            <Typography variant="body1" component="h3">
              <FormattedMessage id="index.design.tool.dt" />
            </Typography>
            <Typography variant="body1" component="p">
              Sketch, Photoshop, Illustrator, Adobe DX, iPad&Pencil
            </Typography>
          </div>
        </div>
        <div style={{ background: '#1c1b20', color: '#ababab' }} className={classes.skillContainer}>
          <div style={{ marginRight: 'auto' }}>
            <Typography variant="h4" component="h2" gutterBottom style={{ color: '#FFF' }}>
              <FormattedMessage id="index.dev.title" />
            </Typography>
            <Typography variant="body1" component="h3" style={{ color: '#FFF' }}>
              <FormattedMessage id="index.dev.language.dt" />
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '0.75rem' }}>
              HTML, CSS, JavaScript
            </Typography>
            <Typography variant="body1" component="h3" style={{ color: '#FFF' }}>
              <FormattedMessage id="index.dev.tool.dt" />
            </Typography>
            <Typography variant="body1" component="p">
              VSCode, React, Gulp, Webpack, npm, Git, Gatsby, Wordpress, Bootstrap
            </Typography>
          </div>
        </div>
      </div>

      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom align="center" style={{ marginBottom: '2.5rem' }}>
          <FormattedMessage id="blogTitle" />
        </Typography>

        <BlogGrid posts={data.allContentfulPost.nodes} />

        <div className={classes.seeMoreBtn} style={{ marginBottom: '7.5rem' }}>
          <Link to="/blog">
            <Button variant="contained" color="primary" size="large" className={classes.seeMore}>
              <FormattedMessage id="seeMore" />
              <ChevronRightIcon />
            </Button>
          </Link>
        </div>

        <Typography variant="h4" component="h2" gutterBottom align="center" style={{ marginBottom: '2.5rem' }}>
          <FormattedMessage id="workTitle" />
        </Typography>

        <WorkGrid works={data.allContentfulWork.nodes} />

        <div className={classes.seeMoreBtn}>
          <Link to="/work">
            <Button variant="contained" color="primary" size="large" className={classes.seeMore}>
              <FormattedMessage id="seeMore" />
              <ChevronRightIcon />
            </Button>
          </Link>
        </div>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query indexQuery($locale: String) {
    allContentfulPost(sort: { fields: publishedAt, order: DESC }, filter: { node_locale: { eq: $locale } }, limit: 4) {
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
    allContentfulWork(sort: { fields: publishedAt, order: DESC }, filter: { node_locale: { eq: $locale } }, limit: 6) {
      nodes {
        contentful_id
        title
        path
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

export default injectIntl(IndexPage)
