import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { injectIntl } from 'gatsby-plugin-intl'
import Container from '@material-ui/core/Container'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Link from '../components/Link'

const NotFoundPage = ({ data }) => (
  <Layout>
    <SEO title="404: Not found" />
    <Container maxWidth="md" style={{ textAlign: 'center', padding: '5rem 0 2.5rem 0' }}>
      <Img fixed={data.file.childImageSharp.fixed} />
      <h1>Oh no! Page not found.</h1>
      <p>
        Return to the <Link to="/">homepage</Link>.
      </p>
    </Container>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "404.png" }) {
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

export default injectIntl(NotFoundPage)
