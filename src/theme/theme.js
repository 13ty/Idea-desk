import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f'
    },
    secondary: {
      main: '#ff4081',
      light: '#ff80ab',
      dark: '#f50057'
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
    h4: {
      fontWeight: 600
    },
    body1: {
      lineHeight: 1.6
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }
      }
    }
  }
})

export default theme
