import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import myTheme from '../styles/theme'
import Nav from './Nav'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: myTheme.palette.background.dark,
    color: myTheme.palette.secondary.light,
    textAlign: `center`,
    padding: theme.spacing(6, 0),
    marginTop: theme.spacing(10),
    '& a': {
      color: myTheme.palette.secondary.light,
      '&:hover': { color: myTheme.palette.primary.main },
    },
  },
  footerNav: {
    marginBottom: theme.spacing(2),
    '& a': {
      fontSize: `1.125rem`,
      padding: theme.spacing(1),
      textDecoration: `none`,
      '&:hover': {
        textDecoration: `underline`,
      },
    },
  },
  social: {
    '& a': {
      margin: theme.spacing(0.5),
      padding: `0.75rem`,
      display: `inline-block`,
      background: myTheme.palette.background.default,
      color: myTheme.palette.secondary.main,
      borderRadius: `50%`,
      lineHeight: 0,
      '&:hover': {
        background: myTheme.palette.primary.main,
        color: myTheme.palette.secondary.main,
      },
    },
  },
  email: {
    fontSize: `1.125rem`,
    '& svg': {
      verticalAlign: `middle`,
    },
  },
}))

export default function Footer() {
  const classes = useStyles()
  return (
    <footer className={classes.root}>
      <div className={classes.footerNav}>
        <Nav />
      </div>
      <div className={classes.social}>
        <Link href="https://twitter.com/ayumitk__" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </Link>
        <Link href="https://github.com/ayumitk" target="_blank" rel="noopener noreferrer">
          <GitHubIcon />
        </Link>
        <Link href="https://www.linkedin.com/in/ayumi-takahashi-951831a9/" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </Link>
      </div>
      <p className={classes.email}>
        <Link href="mailto:hello@ayumi.tk " rel="external">
          <MailOutlineIcon /> hello@ayumi.tk
        </Link>
      </p>
      <p>
        © {new Date().getFullYear()}, Built with
        {` `}
        <Link href="https://www.gatsbyjs.org" target="_blank" rel="noopener noreferrer">
          Gatsby
        </Link>
      </p>
    </footer>
  )
}
