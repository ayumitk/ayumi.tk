import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Card, CardContent, Button } from '@material-ui/core'
import theme from '../styles/theme'

const useStyles = makeStyles({
  root: {},
  amazonBooks: {
    '& a': {
      display: `block`,
      marginTop: `3rem`,
      textDecoration: `none`,
      fontSize: `1rem`,
      lineHeight: `1.5`,
    },
    '& a + a': {
      marginTop: `1rem`,
    },
    '& .MuiCardContent-root': {
      display: `flex`,
      alignItems: `center`,
    },
  },
  amazonBookImage: {
    lineHeight: 0,
    '& img': {
      width: `100px !important`,
    },
  },
  amazonBookInfo: {
    flex: 1,
    marginLeft: `1rem`,
    '& p': {
      margin: `0 !important`,
    },
    '& .MuiButton-root': {
      marginTop: theme.spacing(1),
      boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2)`,
    },
  },
  amazonBookTitle: {
    fontWeight: `600`,
  },
})

const AmazonBook = ({ books }) => {
  const classes = useStyles()
  return (
    <div className={classes.amazonBooks}>
      {books.map(book => (
        <a href={book.src} target="_blank" rel="noopener noreferrer" key={book.asin}>
          <Card>
            <CardContent>
              <div className={classes.amazonBookImage}>
                <img
                  src={`//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=JP&ASIN=${book.asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=ayutak04-22`}
                  alt={`${book.title} - ${book.author}`}
                />
              </div>
              <div className={classes.amazonBookInfo}>
                <p className={classes.amazonBookTitle}>{book.title}</p>
                <p>作者 : {book.author}</p>
                <Button variant="contained" color="primary" component="span">
                  Amazonで購入
                </Button>
              </div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  )
}

const Tomato = ({ children }) => <div style={{ backgroundColor: `tomato` }}>{children}</div>

export { AmazonBook, Tomato }

AmazonBook.propTypes = {
  books: PropTypes.array.isRequired,
}
