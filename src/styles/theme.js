import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'
import './fonts.scss'

// Load Montserrat typeface
import 'typeface-montserrat'

// A custom theme for this app
const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff817c',
      main: '#FF5851',
    },
    secondary: {
      main: '#1C1B20',
      light: '#F8F8F8',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F8F8F8',
      dark: '#1C1B20',
    },
  },
  // shadows: ['none'],
  typography: {
    fontFamily: [
      'Montserrat',
      'NotoSansJP',
      // '-apple-system',
      // 'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Apple Color Emoji"',
    ].join(','),
  },
})

export default myTheme
