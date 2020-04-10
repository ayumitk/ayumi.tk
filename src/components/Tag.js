import React from 'react'
import { makeStyles, useTheme, Chip } from '@material-ui/core'
import { Link } from 'gatsby-plugin-intl'
import myTheme from '../styles/theme'

const useStyles = makeStyles(theme => ({
  root: {
    margin: `0px 0.25rem 0.25rem 0px`,
    textDecoration: `none`,
    display: `inline-block`,
    '& .MuiChip-root': {
      cursor: `pointer`,
    },
    '&:hover .MuiChip-root': {
      background: `rgba(0, 0, 0, 0.15)`,
    },
  },
}))

const Tag = ({ to, label }) => {
  const classes = useStyles()
  const theme = useTheme()
  return (
    <Link to={to} className={classes.root} style={{ margin: '0 0.25rem 0.25rem 0' }}>
      <Chip label={label} />
    </Link>
  )
}

export default Tag
