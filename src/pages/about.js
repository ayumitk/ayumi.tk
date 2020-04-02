import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, Link } from 'gatsby-plugin-intl'
import { makeStyles, Container, Typography, Button } from '@material-ui/core'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Layout, SEO } from '../components'
import myTheme from '../styles/theme'

const useStyles = makeStyles(theme => ({
  root: {},
  about: {
    marginBottom: `5rem`,
    [theme.breakpoints.up('sm')]: {
      display: `flex`,
    },
  },
  bio: {
    flex: 1,
    '& p': {
      marginBottom: `1.5rem`,
    },
    [theme.breakpoints.up('sm')]: {
      order: 1,
      marginRight: `2rem`,
    },
  },
  image: {
    [theme.breakpoints.up('sm')]: {
      order: 2,
      width: `300px`,
    },
    [theme.breakpoints.down('xs')]: {
      width: `200px`,
      margin: `0 auto 1.5rem auto`,
    },
  },
  skills: {
    [theme.breakpoints.up('sm')]: {
      display: `flex`,
      '& div': {
        width: `50%`,
      },
    },
  },
  button: {
    [theme.breakpoints.down('xs')]: {
      textAlign: `center`,
    },
    '& a': {
      textDecoration: `none`,
      display: `inline-block`,
    },
  },
}))

const AboutPage = ({ data, intl }) => {
  const classes = useStyles()

  const bio =
    intl.locale === 'en' ? (
      <>
        <Typography variant="h5" component="h2" gutterBottom>
          Ayumi Takahashi
        </Typography>
        <Typography variant="body1" component="p">
          Freelance UI/UX Designer
        </Typography>
        <Typography variant="body1" component="p">
          I've worked as a web designer for over 10 years in the Tech industry in Japan and Canada, responsible for
          branding, art direction, UI/UX design, and front-end development for websites and mobile apps. My extensive
          experience and background in graphic design allow me to bridge the gap between design and development to
          create the most beautiful and highly functional websites and mobile apps.
        </Typography>
        <Typography variant="body1" component="p">
          I'm passionate about improving the lives of others through design and am continually looking to learn new
          things every day.
        </Typography>
        <Typography variant="body1" component="p">
          Outside of design, I love reading books as well as audiobooks. I write book reviews on my blog and am
          currently working on an online book club app as my personal project.
        </Typography>
        <Typography variant="body1" component="p">
          Currently, I'm based in Vancouver, Canada, but originally hail from the tiny town of Nagasaki, Japan.
        </Typography>
        <Typography variant="body1" component="p">
          Resume available upon request.
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="h5" component="h2" gutterBottom>
          高橋あゆみ
        </Typography>
        <Typography variant="body1" component="p">
          フリーランスUI/UXデザイナー
        </Typography>
        <Typography variant="body1" component="p">
          日本とカナダのIT企業にて10年以上、Webデザイナーとして勤務。
          <br />
          Webサイトやモバイルアプリのブランディング、アートディレクション、UI/UXデザイン及びフロントエンド開発を担当。豊富な経験とグラフィックデザインのバックグラウンドにより、デザインと開発のギャップを埋め、美しく高機能なウェブサイトやモバイルアプリを制作します。
        </Typography>
        <Typography variant="body1" component="p">
          また、日々新しいことを学び、デザインを通して人々の生活を向上させるのが目標。
        </Typography>
        <Typography variant="body1" component="p">
          デザイン以外では、本を読むのが好きで、最近では常にオーディオブックを聴いています。それでも一向に減らない積読が悩み。数年前から英語圏のミステリー･ロマンス小説沼にハマり、勢いで本のレビューブログを立ち上げました。また、パーソナルプロジェクトとして、オンラインブッククラブのアプリを開発中。
        </Typography>
        <Typography variant="body1" component="p">
          現在はカナダのバンクーバーに住んでいますが、もともとは長崎の小さな町の出身です。
        </Typography>
        <Typography variant="body1" component="p">
          お問い合わせ頂けましたら、履歴書及び職務経歴書の送付も可能ですので、お気軽にお問い合わせください。
        </Typography>
      </>
    )

  return (
    <Layout>
      <SEO title={intl.formatMessage({ id: 'aboutTitle' })} />
      <Container maxWidth="md" style={{ paddingTop: '2.5rem' }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          About Me
        </Typography>
        <div className={classes.about}>
          <div className={classes.image}>
            <Img fluid={data.file.childImageSharp.fluid} />
          </div>
          <div className={classes.bio}>
            {bio}
            <div className={classes.button}>
              <Link to="/contact">
                <Button variant="contained" color="primary">
                  {intl.formatMessage({ id: 'getInTouch' })}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <h2>Skills</h2>
        <div className={classes.skills}>
          <div>
            <h3>{intl.formatMessage({ id: 'index.design.title' })}</h3>
            <h4>{intl.formatMessage({ id: 'index.design.field.dt' })}</h4>
            <ul>
              <li>UX/UI</li>
              <li>Web Application</li>
              <li>Landing Page</li>
              <li>iOS/Android App</li>
              <li>Branding</li>
              <li>Logo</li>
              <li>Wireframe</li>
            </ul>
            <h4>{intl.formatMessage({ id: 'index.design.tool.dt' })}</h4>
            <ul>
              <li>Adode Creative Suite</li>
              <li>Sketch</li>
              <li>Figma</li>
              <li>InVision</li>
              <li>iPad & ApplePencil</li>
            </ul>
          </div>
          <div>
            <h3>{intl.formatMessage({ id: 'index.dev.title' })}</h3>
            <h4>{intl.formatMessage({ id: 'index.dev.language.dt' })}</h4>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <h4>{intl.formatMessage({ id: 'index.dev.tool.dt' })}</h4>
            <ul>
              <li>VSCode</li>
              <li>React</li>
              <li>Gulp</li>
              <li>Webpack</li>
              <li>npm</li>
              <li>Git</li>
              <li>Gatsby</li>
              <li>Wordpress</li>
              <li>Bootstrap</li>
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

AboutPage.propTypes = {
  intl: PropTypes.object.isRequired,
  data: PropTypes.shape({
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.object,
      }),
    }),
  }).isRequired,
}

export const query = graphql`
  query {
    file(relativePath: { eq: "profile.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default injectIntl(AboutPage)
