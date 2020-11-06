import React from 'react'
import { Link } from 'gatsby-plugin-intl'

export default function Nav() {
  return (
    <>
      {['About', 'Blog', 'Work', 'Contact'].map(nav => (
        <Link to={`/${nav.toLowerCase()}/`} key={nav}>
          {nav}
        </Link>
      ))}
    </>
  )
}
