import React from 'react'
import { injectIntl, FormattedMessage } from 'gatsby-plugin-intl'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'

const ContactThanksPage = ({ data, intl }) => (
  <Layout>
    <SEO title={intl.formatMessage({ id: 'thanksTitle' })} />
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '5rem 0 2.5rem 0' }}>
      <Img fixed={data.file.childImageSharp.fixed} />
      <Typography variant="h2" component="h1" gutterBottom>
        Thank you!
      </Typography>
      <p>
        <FormattedMessage id="contact.thanks" />
      </p>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "thanks.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default injectIntl(ContactThanksPage)
