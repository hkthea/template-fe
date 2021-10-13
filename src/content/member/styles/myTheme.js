import SourceSansProWoff from './font/source-sans-pro-regular.woff2';
import { orange, blue, red, lightBlue} from '@material-ui/core/colors';
import {sidebarColorCfg, sidebarHoverCfg, sidebarSelectedCfg} from '../../../constants/config';
// import RalewayWoff2 from './font/raleway-regular.woff2';

const raleway = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Source Sans Pro'),
    url(${SourceSansProWoff}) format('woff2')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export default {
    typography:{
        fontFamily:'Source Sans Pro'
    },
    overrides: {
        MuiCssBaseline: {
          '@global': {
            '@font-face': [raleway],
          },
        },
        MuiListItem:{
          root:{
            '&$selected':{
                  '&:hover':{
                    backgroundColor:sidebarHoverCfg,
                    color:'#effffe !important;',
                    fontSize:14
                  },
                  backgroundColor:sidebarSelectedCfg,
                  '& *':{
                    // background:"#4caf50",
                    color:'#effffe',
                    fontSize:14
                  }
              },
          }
        },
        MuiDrawer:{
          paper:{
            backgroundColor:sidebarColorCfg,
            color:'#effffe'
          }
        }
    },
    palette: {
        primary: {
            light: lightBlue[800],
            main: lightBlue[900],
            dark: lightBlue[900],
            contrastText: '#fff'
        },
        secondary:{
            light: orange[600],
            main: orange[800],
            dark: orange[900],
            contrastText: '#fff'
        },        
    },
}