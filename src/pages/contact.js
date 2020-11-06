import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, navigate } from 'gatsby-plugin-intl'
import { Container, Button, Typography, TextField } from '@material-ui/core'
import { Layout, SEO } from '../components'

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

    const page = {
      title: intl.locale === 'en' ? 'Contact' : 'お問い合わせ',
      description:
        intl.locale === 'en'
          ? ''
          : 'UI/UXデザイン、フロントエンド開発など、お仕事のご依頼や料金のご相談、ご質問などどんなことでもかまいませんので、お気軽にこちらのフォームよりご送信ください。追ってお返事させていただきます。',
      image: '',
      slug: 'contact',
    }

    return (
      <Layout customSEO>
        <SEO page={page} />
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

            <TextField
              label={intl.locale === 'en' ? 'Your Name' : 'お名前'}
              style={{ margin: '0 0 2rem 0' }}
              fullWidth
              margin="normal"
              type="text"
              name="name"
              onChange={this.handleChange}
              id="name"
              required
            />

            <TextField
              label={intl.locale === 'en' ? 'Email' : 'Eメール'}
              style={{ margin: '0 0 2rem 0' }}
              fullWidth
              margin="normal"
              type="email"
              name="email"
              onChange={this.handleChange}
              id="email"
              required
            />

            <TextField
              label={intl.locale === 'en' ? 'Message' : 'メッセージ'}
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
                {intl.locale === 'en' ? 'Send' : '送信'}
              </Button>
            </div>
          </form>
        </Container>
      </Layout>
    )
  }
}

ContactPage.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(ContactPage)
