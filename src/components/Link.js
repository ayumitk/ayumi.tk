import React from 'react'
import MuiLink from '@material-ui/core/Link'
import { Link as GatsbyPluginIntlLink } from 'gatsby-plugin-intl'

const Link = React.forwardRef(function Link(props, ref) {
  return <MuiLink component={GatsbyPluginIntlLink} ref={ref} {...props} />
})

export default Link
