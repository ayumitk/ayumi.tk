import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import { injectIntl } from 'gatsby-plugin-intl'
import { Container } from '@material-ui/core'
import { Layout, SEO, Link } from '../components'

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
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    file: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fixed: PropTypes.object,
      }),
    }),
  }).isRequired,
}

export default injectIntl(NotFoundPage)
