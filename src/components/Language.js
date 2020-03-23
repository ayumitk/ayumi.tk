import React from 'react'
import { IntlContextConsumer, changeLocale } from 'gatsby-plugin-intl'
import { makeStyles } from '@material-ui/core/styles'
import myTheme from '../styles/theme'

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: `center`,
    fontSize: `1rem`,
    textTransform: `uppercase`,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
      borderLeft: `1px solid rgb(204, 204, 204)`,
      marginLeft: theme.spacing(1),
    },
  },
  link: {
    color: `#888`,
    cursor: `pointer`,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 1),
      display: `inline-block`,
    },
  },
  active: {
    fontWeight: `bold`,
    [theme.breakpoints.up('sm')]: {
      color: myTheme.palette.secondary.main,
    },
    [theme.breakpoints.down('xs')]: {
      color: myTheme.palette.secondary.light,
    },
  },
}))

export default function Language() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map(language => (
            <a
              key={language}
              onClick={() => changeLocale(language)}
              className={`${classes.link} ${currentLocale === language ? classes.active : ''}`}
            >
              {language}
            </a>
          ))
        }
      </IntlContextConsumer>
    </div>
  )
}
