import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Accordion, AccordionSummary, Typography, AccordionDetails } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import { useIntl } from 'gatsby-plugin-intl'
import theme from '../styles/theme'

const useStyles = makeStyles({
  root: {},
  tableOfContents: {
    background: `#ececec`,
    maxWidth: `500px`,
    fontSize: `1rem`,
    lineHeight: 1.6,
    [theme.breakpoints.down('xs')]: {
      fontSize: `0.937rem`,
    },
    '&:before': {
      display: `none`,
    },
    '&.MuiPaper-root': {
      margin: `3rem auto`,
      [theme.breakpoints.down('xs')]: {
        marginTop: `1rem`,
      },
    },
    '& ul': {
      margin: 0,
      listStyle: `decimal`,
      paddingLeft: `2rem`,
      color: theme.palette.primary.main,
      [theme.breakpoints.down('xs')]: {
        paddingLeft: `1rem`,
      },
    },
    '& li': {
      fontWeight: '700',
      borderBottom: `solid 1px #ccc`,
      padding: `0.75rem 0`,
    },
    '& li ul': {
      listStyle: `disc`,
      paddingLeft: `1.25rem`,
      margin: `0.25rem 0 0 0`,
    },
    '& li li': {
      fontWeight: '400',
      border: 0,
      padding: `0.15rem 0`,
    },
    '& a': {
      color: theme.palette.secondary.main,
      textDecoration: `none`,
    },
  },
  tableOfContentsHeading: {
    fontWeight: `700`,
    fontSize: `1.125rem`,
    textAlign: `center`,
    width: `100%`,
    [theme.breakpoints.down('xs')]: {
      fontSize: `1rem`,
    },
  },
  tableOfContentsDetails: {
    borderTop: `solid 1px #ccc`,
    display: `block`,
  },
})

const TableOfContents = ({ toc }) => {
  const classes = useStyles()
  const intl = useIntl()

  return (
    <Accordion defaultExpanded className={classes.tableOfContents}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography className={classes.tableOfContentsHeading}>
          {intl.locale === 'en' ? 'Table of Contents' : '目次'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.tableOfContentsDetails}>
        <ul>
          {toc.map(link => (
            <li key={link.url}>
              <a href={link.url}>{link.title}</a>
              {link.items ? (
                <ul>
                  {link.items.map(sublink => (
                    <li key={sublink.url}>
                      <a href={sublink.url}>{sublink.title}</a>
                    </li>
                  ))}
                </ul>
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  )
}

export default TableOfContents

TableOfContents.propTypes = {
  toc: PropTypes.array,
}

TableOfContents.defaultProps = {
  toc: [],
}
