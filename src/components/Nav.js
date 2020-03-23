import React from 'react'
import { Link } from 'gatsby-plugin-intl'
// import Link from './Link'

export default function Nav() {
  return (
    <>
      {['About', 'Blog', 'Work', 'Contact'].map(text => (
        <Link to={`/${text.toLowerCase()}`} key={text}>
          {text}
        </Link>
      ))}
    </>
  )
}
