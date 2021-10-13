import React, { useMemo } from 'react';
import {Container} from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import myTheme from '../styles/myTheme';
import myThemeAp1 from '../styles/myThemeAp1';
import myThemeAp2 from '../styles/myThemeAp2';
import myThemeBubu from '../styles/myThemeBubu';

import { CssBaseline } from '@material-ui/core';
import DashboardContainer from './dashboard'
import { useSelector } from 'react-redux';

// const applyTheme = createMuiTheme(myTheme);

export default ()=>{
    const applyTheme=createMuiTheme(myTheme);
    return (
        <ThemeProvider theme={applyTheme}>
            <CssBaseline/>
            <DashboardContainer/>
        </ThemeProvider> 
    )
}