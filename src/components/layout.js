import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles'
import { Link } from 'gatsby-plugin-intl'
import { useStaticQuery, graphql } from 'gatsby'
import Container from '@material-ui/core/Container'
import myTheme from '../styles/theme'
import Nav from './Nav'
import Language from './Language'
import Footer from './Footer'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& h1': {
      fontFamily: `Gilroy, NotoSansJP, sans-serif`,
      fontWeight: 700,
    },
    '& h2': {
      fontWeight: 700,
    },
    '& h3': {
      fontWeight: 700,
    },
  },
  title: {
    '& a': {
      color: myTheme.palette.secondary.main,
      textDecoration: `none`,
      textTransform: `uppercase`,
      fontWeight: `600`,
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      display: `none`,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: myTheme.palette.background.dark,
    color: myTheme.palette.secondary.light,
    '& hr': {
      backgroundColor: `rgba(255, 255, 255, 0.15)`,
    },
  },
  drawerNav: {
    '& a': {
      color: myTheme.palette.secondary.light,
      display: `block`,
      padding: theme.spacing(2),
      fontSize: `1.125rem`,
      textDecoration: `none`,
      '&:hover': {
        textDecoration: `none`,
        backgroundColor: `rgba(255,255,255,0.1)`,
      },
    },
  },
  appBar: {
    backgroundColor: `#FFF`,
    boxShadow: `none`,
  },
  menuButton: {
    color: myTheme.palette.secondary.main,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
  },
  nav: {
    [theme.breakpoints.up('sm')]: {
      display: `flex`,
      alignItems: `center`,
    },
    [theme.breakpoints.down('xs')]: {
      display: `none`,
    },
  },
  headerNav: {
    '& a': {
      fontSize: `1.125rem`,
      padding: theme.spacing(1),
      color: myTheme.palette.secondary.main,
      textDecoration: `none`,
      '&:hover': {
        textDecoration: `underline`,
      },
    },
  },
  headerContainer: {
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
    },
  },
}))

const Layout = ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const drawer = (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List className={classes.drawerNav}>
        <Nav />
      </List>
      <Divider />
      <Language />
    </>
  )

  return (
    <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Container maxWidth="lg" className={classes.headerContainer}>
            <Toolbar style={{ justifyContent: 'space-between', padding: 0 }}>
              <Typography variant="h6" noWrap className={classes.title}>
                <Link to="/">{data.site.siteMetadata.title}</Link>
              </Typography>

              <div className={classes.nav}>
                <div className={classes.headerNav}>
                  <Nav />
                </div>
                <Language />
              </div>

              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default Layout
