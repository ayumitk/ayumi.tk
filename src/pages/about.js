import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'gatsby-plugin-intl'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Layout from '../components/layout'
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

AboutPage.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(AboutPage)
