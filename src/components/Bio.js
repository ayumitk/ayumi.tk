import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { useIntl } from 'gatsby-plugin-intl'
import Typography from '@material-ui/core/Typography'
import avatarImg from '../images/avatar.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    display: `flex`,
    alignItems: `center`,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))

const Bio = () => {
  const classes = useStyles()
  const intl = useIntl()

  return (
    <div className={classes.root}>
      <Avatar alt={intl.formatMessage({ id: 'name' })} src={avatarImg} className={classes.large} />
      <Typography variant="body2" component="p" style={{ marginLeft: '1rem' }}>
        {intl.formatMessage({ id: 'name' })}
        <br />
        {intl.formatMessage({ id: 'bio' })}
      </Typography>
    </div>
  )
}

export default Bio
