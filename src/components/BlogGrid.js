import React from 'react'
import { Link } from 'gatsby-plugin-intl'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import Img from 'gatsby-image'
import Typography from '@material-ui/core/Typography'
import myTheme from '../styles/theme'

const useStyles = makeStyles(theme => ({
  root: {
    display: `grid`,
    gridTemplateColumns: `1fr 1fr 1fr 1fr`,
    gridGap: `20px`,
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
    '& a': {
      textDecoration: `none`,
    },
  },
}))

const BlogGrid = ({ posts }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {posts.map(post => {
        if (!post.title) {
          return null
        }

        return (
          <Link to={`/${post.path}`} key={post.contentful_id}>
            <Card>
              <CardActionArea>
                <Img fluid={post.hero.fluid} />
                <CardContent className={classes.blogCardContent}>
                  <Typography gutterBottom component="h2" style={{ fontWeight: '400' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {post.publishedAt}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}

export default BlogGrid
