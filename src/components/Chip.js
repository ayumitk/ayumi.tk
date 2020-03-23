import React from 'react'
import { Link as GatsbyPluginIntlLink } from 'gatsby-plugin-intl'
import MuiChip from '@material-ui/core/Chip'

const Chip = React.forwardRef(function Link(props, ref) {
  return <MuiChip component={GatsbyPluginIntlLink} ref={ref} {...props} />
})

export default Chip
