import React from 'react'
import { injectIntl, FormattedMessage } from 'gatsby-plugin-intl'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const AboutPage = ({ intl }) => (
  <Layout>
    <SEO title={intl.formatMessage({ id: 'aboutTitle' })} />
    <Container maxWidth="md" style={{ paddingTop: '2.5rem' }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        About Me
      </Typography>
      <p style={{ textAlign: 'center', fontSize: '1rem' }}>Under Construction</p>
    </Container>
  </Layout>
)

export default injectIntl(AboutPage)
