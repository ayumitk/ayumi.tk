import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl } from 'gatsby-plugin-intl'
import { Container, Typography } from '@material-ui/core'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import { Layout, SEO } from '../components'

const ContactThanksPage = ({ data, intl }) => (
  <Layout>
    <SEO title={intl.formatMessage({ id: 'thanksTitle' })} />
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '5rem 0 2.5rem 0' }}>
      <Img fixed={data.file.childImageSharp.fixed} />
      <Typography variant="h2" component="h1" gutterBottom>
        Thank you!
      </Typography>
      <p>{intl.formatMessage({ id: 'contact.thanks' })}</p>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "thanks.png" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

ContactThanksPage.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.object,
      }),
    }),
  }).isRequired,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(ContactThanksPage)
