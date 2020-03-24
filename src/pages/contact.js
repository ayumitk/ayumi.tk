import React, { Component } from 'react'
import { injectIntl, FormattedMessage, navigate } from 'gatsby-plugin-intl'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Layout from '../components/layout'
import SEO from '../components/seo'

function encode(data) {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

class ContactPage extends Component {
  state = {
    isValidated: false,
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch(error => alert(error))
  }

  render() {
    const { intl } = this.props
    return (
      <Layout>
        <SEO title={intl.formatMessage({ id: 'contactTitle' })} />
        <Container maxWidth="sm" style={{ paddingTop: '2.5rem' }}>
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Contact
          </Typography>
          <form
            name="contact"
            method="post"
            action="/contact-thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label htmlFor="bot-field">
                Don’t fill this out:
                <input name="bot-field" id="bot-field" onChange={this.handleChange} />
              </label>
            </div>

            {/* <FormattedMessage id="contact.name" /> */}
            {/* <input type="text" name="name" onChange={this.handleChange} id="name" required /> */}
            <TextField
              label={intl.formatMessage({ id: 'contact.name' })}
              style={{ margin: '0 0 2rem 0' }}
              fullWidth
              margin="normal"
              type="text"
              name="name"
              onChange={this.handleChange}
              id="name"
              required
            />

            {/* <FormattedMessage id="contact.email" /> */}
            <TextField
              label={intl.formatMessage({ id: 'contact.email' })}
              style={{ margin: '0 0 2rem 0' }}
              fullWidth
              margin="normal"
              type="email"
              name="email"
              onChange={this.handleChange}
              id="email"
              required
            />

            {/* <FormattedMessage id="contact.message" /> */}
            <TextField
              label={intl.formatMessage({ id: 'contact.message' })}
              style={{ margin: '0 0 2rem 0' }}
              multiline
              fullWidth
              rowsMax="5"
              onChange={this.handleChange}
              name="message"
              id="message"
              required
            />

            <div style={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="primary" size="large">
                <FormattedMessage id="contact.send" />
              </Button>
            </div>
          </form>
        </Container>
      </Layout>
    )
  }
}

export default injectIntl(ContactPage)
