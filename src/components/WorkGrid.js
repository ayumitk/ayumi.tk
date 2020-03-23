import React from 'react'
import { Link } from 'gatsby-plugin-intl'
import { makeStyles } from '@material-ui/core/styles'
import Img from 'gatsby-image'
import Typography from '@material-ui/core/Typography'
import myTheme from '../styles/theme'

const useStyles = makeStyles(theme => ({
  root: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr 1fr`,
    margin: theme.spacing(3, 0),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: `1fr 1fr 1fr`,
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `1fr 1fr`,
    },
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: `1fr`,
    },
  },
  workItem: {
    display: `blogk`,
    position: `relative`,
  },
  workItemTitle: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    background: `rgba(0,0,0,0.6)`,
    opacity: 0,
    transition: `.2s ease-out`,
    '&:hover': {
      opacity: 1,
    },
    '& h3': {
      color: 'rgba(255,255,255,0.9)',
    },
  },
}))

const WorkGrid = ({ works }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {works.map(work => (
        <Link to={`/${work.path}`} key={work.contentful_id} className={classes.workItem}>
          <Img fluid={work.hero.fluid} />
          <div className={classes.workItemTitle}>
            <Typography variant="h4" component="h3" align="center">
              {work.title}
            </Typography>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default WorkGrid
