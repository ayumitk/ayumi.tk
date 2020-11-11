import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { makeStyles } from '@material-ui/core'
import theme from '../styles/theme'
import { AmazonBook, Tomato } from './shortcodes'

const shortcodes = { AmazonBook, Tomato }

const useStyles = makeStyles({
  root: {
    fontSize: `1.125rem`,
    lineHeight: `1.8`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `1rem`,
    },
    '& strong': {
      background: `linear-gradient(transparent 70%, #ffdad9 70%)`,
    },
    '& a': {
      color: `#0062DA`,
    },
    '& .gatsby-resp-image-wrapper': {
      maxWidth: `680px !important`,
    },
    '& img': {
      width: `100%`,
    },
    '& hr': {
      display: `block`,
      height: `4px`,
      width: `120px`,
      backgroundColor: `rgba(33, 37, 41, 0.1)`,
      margin: `5rem auto`,
      borderWidth: `0px`,
      borderRadius: `4px`,
      [theme.breakpoints.down('xs')]: {
        margin: `4rem auto`,
      },
    },
    '& h2, & h3': {
      marginTop: `8rem`,
      marginBottom: `-0.75rem`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `6rem`,
      },
    },
    '& h2': {
      fontSize: `1.75rem`,
      lineHeight: `1.25`,
      [theme.breakpoints.down('xs')]: {
        fontSize: `1.5rem`,
      },
    },
    '& .anchor.before': {
      display: `none`,
    },
    '& h3': {
      fontSize: `1.375rem`,
      lineHeight: `1.25`,
      [theme.breakpoints.down('xs')]: {
        fontSize: `1.25rem`,
      },
    },
    '& p, & ul, & ol, & h2 + h3, & table, & .code-toolbar, & .gatsby-code-title': {
      marginTop: `3rem`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `2rem`,
      },
    },
    '& .gatsby-code-title + .code-toolbar': {
      marginTop: 0,
    },
    '& hr + h2': {
      marginTop: `5rem`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `4rem`,
      },
    },
    '& ol': {
      padding: `2rem 3rem`,
      backgroundColor: `#eef1f5`,
      border: `solid 2px #d7e0ea`,
      '& li': {
        borderBottom: `solid 1px #d7e0ea`,
        padding: `0.5rem 0`,
        color: `#0062DA`,
      },
    },
    '& blockquote': {
      background: `rgba(0, 0, 0, 0.05)`,
      padding: `1.5rem 2rem`,
      borderLeft: `3px solid rgb(28, 27, 32)`,
      fontSize: `1rem`,
      margin: `3rem 0`,
      lineHeight: `1.6`,
      [theme.breakpoints.down('xs')]: {
        padding: `1rem 1.5rem`,
      },
      '& p': {
        margin: 0,
      },
    },
    '& table': {
      width: `100%`,
      borderCollapse: `collapse`,
      borderSpacing: 0,
    },
    '& table th, & table td': {
      border: `solid 1px #CCC`,
      padding: `0.5rem`,
    },
    '& table tbody td': {
      textAlign: `center`,
    },
    '& code': {
      display: 'inline-block',
      padding: '0 0.35rem',
      background: 'rgba(0, 0, 0, 0.075)',
      wordBreak: 'break-all',
    },
    '& pre[class*="language-"]': {
      margin: 0,
      borderRadius: 0,
      fontSize: '0.937rem',
    },
    '& pre code': {
      whiteSpace: 'pre-wrap !important',
      wordBreak: 'break-all !important',
      background: 'transparent',
    },
    '& .gatsby-code-title': {
      background: '#636363',
      color: '#cbccc6',
      padding: '0.5rem 0.75rem;',
      fontSize: '0.875rem',
      lineHeight: 1,
      fontWeight: 400,
      borderRadius: '3px 3px 0 0',
      display: 'inline-block',
      fontFamily: `SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`,
    },
  },
})

const Markdown = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{children}</MDXRenderer>
      </MDXProvider>
    </div>
  )
}

export default Markdown
