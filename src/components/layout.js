import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby-plugin-intl'
import MenuIcon from '@material-ui/icons/Menu'
import {
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  Typography,
  makeStyles,
  ThemeProvider,
  Container,
  AppBar,
  Toolbar,
} from '@material-ui/core'
import theme from '../styles/theme'
import Nav from './Nav'
import Language from './Language'
import Footer from './Footer'
import SEO from './seo'
import useBuildTime from '../hooks/useBuildTime'

const drawerWidth = 240

const useStyles = makeStyles({
  root: {
    display: 'flex',
    '& h1': {
      fontFamily: `Gilroy, NotoSansJP, sans-serif`,
      fontWeight: 700,
      fontSize: `3.75rem`,
      [theme.breakpoints.down('xs')]: {
        fontSize: `3rem`,
      },
      '& small': {
        fontSize: `1.75rem`,
      },
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
      color: theme.palette.secondary.main,
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
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.secondary.light,
    '& hr': {
      backgroundColor: `rgba(255, 255, 255, 0.15)`,
    },
  },
  drawerNav: {
    '& a': {
      color: theme.palette.secondary.light,
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
    color: theme.palette.secondary.main,
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
      color: theme.palette.secondary.main,
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
})

const Layout = ({ children, customSEO }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

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

  const buildTime = useBuildTime()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        {!customSEO && <SEO buildTime={buildTime} />}
        <AppBar position="fixed" className={classes.appBar}>
          <Container maxWidth="lg" className={classes.headerContainer}>
            <Toolbar style={{ justifyContent: 'space-between', padding: 0 }}>
              <Typography variant="h6" noWrap className={classes.title}>
                <Link to="/">Ayumi Takahashi</Link>
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

Layout.propTypes = {
  children: PropTypes.array.isRequired,
  customSEO: PropTypes.bool,
}

Layout.defaultProps = {
  customSEO: false,
}
