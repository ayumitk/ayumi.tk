import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { makeStyles, Avatar, Typography } from '@material-ui/core'
import { useIntl } from 'gatsby-plugin-intl'

const useStyles = makeStyles(theme => ({
  root: {
    display: `flex`,
    alignItems: `center`,
    marginBottom: `2rem`,
    padding: `2rem 0`,
    borderBottom: `solid 1px #ccc`,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))

const Bio = () => {
  const classes = useStyles()
  const intl = useIntl()

  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site: site {
        siteMetadata {
          author {
            en
            ja
          }
        }
      }
    }
  `)

  const name = intl.locale === 'en' ? data.site.siteMetadata.author.en : data.site.siteMetadata.author.ja

  return (
    <div className={classes.root}>
      <Avatar alt={name} src={data.avatar.childImageSharp.fixed.src} className={classes.large} />
      <Typography variant="body2" component="p" style={{ marginLeft: '1rem' }}>
        {name}
        <br />
        {intl.locale === 'en'
          ? 'Freelance UI/UX designer, bookworm, craft beer lover, monster hunter based in Vancouver, Canada'
          : 'フリーランスのUI/UXデザイナー。英語圏のロマンス･ミステリー小説にハマり、一向に減らない積読が悩み。カナダのバンクーバー在住。'}
      </Typography>
    </div>
  )
}

export default Bio
