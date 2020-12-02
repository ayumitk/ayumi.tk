import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { injectIntl, Link } from 'gatsby-plugin-intl'
import { makeStyles, Button, Typography, Container } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'
import { Layout, WorkGrid, BlogGrid, SEO } from '../components'
import theme from '../styles/theme'

const useStyles = makeStyles({
  root: {},
  hero: {
    padding: theme.spacing(8, 0),
    textAlign: `center`,
    '& strong': {
      letterSpacing: `-0.2rem`,
      fontSize: `7rem`,
      lineHeight: 0.9,
      color: theme.palette.primary.main,
    },
    '& span': {
      color: theme.palette.secondary.main,
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
})

const RootIndex = ({ intl, data }) => {
  const classes = useStyles()
  const { locale } = intl

  return (
    <Layout customSEO>
      <SEO />
      <h1 className={classes.hero}>
        <strong>
          Hello<span>.</span>
          <br />I am Ayumi,
        </strong>
        <small>
          {locale === 'en' ? (
            <>
              Freelance UI/UX Designer
              <br />
              with 10+ years of experience
              <br />
              based in Vancouver, Canada.
            </>
          ) : (
            <>
              10年以上の経験を持ち、
              <br />
              カナダ、バンクーバーを拠点に活動する、
              <br />
              フリーランスのUI/UXデザイナーです
            </>
          )}
        </small>
      </h1>

      <div className={classes.skillSet}>
        <div style={{ background: '#ff5851', color: '#FFF' }} className={classes.skillContainer}>
          <div style={{ marginLeft: 'auto' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {locale === 'en' ? 'UI/UX Design' : 'UI/UXデザイン'}
            </Typography>
            <Typography variant="body1" component="h3">
              {locale === 'en' ? 'Things I enjoy designing:' : '得意分野'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '0.75rem' }}>
              {locale === 'en'
                ? 'Web Application, Landing Page, iOS/Android App, Branding, Logo, Wireframe'
                : 'Webアプリケーション, ランディングページ, iOS/Androidアプリ, ブランディング, ロゴ, ワイヤーフレーム'}
            </Typography>
            <Typography variant="body1" component="h3">
              {locale === 'en' ? 'Design Tools:' : 'ツール:'}
            </Typography>
            <Typography variant="body1" component="p">
              Adobe DX, Photoshop, Illustrator, iPad&Pencil
            </Typography>
          </div>
        </div>
        <div style={{ background: '#1c1b20', color: '#ababab' }} className={classes.skillContainer}>
          <div style={{ marginRight: 'auto' }}>
            <Typography variant="h4" component="h2" gutterBottom style={{ color: '#FFF' }}>
              {locale === 'en' ? 'Front-end Dev' : 'フロントエンド開発'}
            </Typography>
            <Typography variant="body1" component="h3" style={{ color: '#FFF' }}>
              {locale === 'en' ? 'Languages I speak:' : '言語:'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '0.75rem' }}>
              HTML, CSS, JavaScript
            </Typography>
            <Typography variant="body1" component="h3" style={{ color: '#FFF' }}>
              {locale === 'en' ? 'Dev Tools:' : 'ツール:'}
            </Typography>
            <Typography variant="body1" component="p">
              VSCode, React, Gulp, Webpack, npm, Git, Gatsby, Wordpress, Bootstrap
            </Typography>
          </div>
        </div>
      </div>

      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom align="center" style={{ marginBottom: '2.5rem' }}>
          {locale === 'en' ? 'Blog' : 'ブログ記事'}
        </Typography>

        <BlogGrid posts={data.allContentfulBlog.nodes} />

        <div className={classes.seeMoreBtn} style={{ marginBottom: '7.5rem' }}>
          <Link to="/blog">
            <Button variant="contained" color="primary" size="large" className={classes.seeMore}>
              {locale === 'en' ? 'See More' : 'もっと見る'}
              <ChevronRight />
            </Button>
          </Link>
        </div>

        <Typography variant="h4" component="h2" gutterBottom align="center" style={{ marginBottom: '2.5rem' }}>
          {locale === 'en' ? 'Work' : '制作実績'}
        </Typography>

        <WorkGrid posts={data.allContentfulWork.nodes} />

        <div className={classes.seeMoreBtn}>
          <Link to="/work">
            <Button variant="contained" color="primary" size="large" className={classes.seeMore}>
              {locale === 'en' ? 'See More' : 'もっと見る'}
              <ChevronRight />
            </Button>
          </Link>
        </div>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query RootIndexQuery($locale: String) {
    allContentfulBlog(sort: { fields: publishedAt, order: DESC }, filter: { node_locale: { eq: $locale } }, limit: 4) {
      nodes {
        contentful_id
        title
        slug
        description {
          description
        }
        publishedAt(formatString: "MMMM DD, YYYY")
        tags {
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
    allContentfulWork(sort: { fields: publishedAt, order: DESC }, filter: { node_locale: { eq: $locale } }, limit: 3) {
      nodes {
        contentful_id
        title
        slug
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

RootIndex.propTypes = {
  intl: PropTypes.object.isRequired,
  data: PropTypes.shape({
    allContentfulBlog: PropTypes.shape({
      nodes: PropTypes.array,
    }),
    allContentfulWork: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }).isRequired,
}

export default injectIntl(RootIndex)
