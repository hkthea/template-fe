import { red } from '@material-ui/core/colors';
import { baseUrl, imgUrl, GoogleAPIKey, selfStationCode, rootUrl, sidebarColor, 
    headerColor, sidebarHover, sidebarSelected, logoDashboard, logoPadding, 
    title, splashLogo, attachmentUrl } from '../env';
import { AppVersion } from './appVersion';

export const BaseUrl= baseUrl || 'http://localhost:11611/';
export const AttachmentUrl= attachmentUrl || '/attachments/';
export const ImgBaseUrl=imgUrl || 'https://localhost:11611/';
export const RootUrl=rootUrl || '/';
export const PlacesAPIKey=GoogleAPIKey||'';
export const HttpTimeOut=60000;
export const selfStation=selfStationCode || 'XXX';
export const sidebarColorCfg=sidebarColor || red[900];
export const headerColorCfg=headerColor || red[800];
export const sidebarHoverCfg=sidebarHover || red[800];
export const sidebarSelectedCfg=sidebarSelected || red[800];
export const logoDashboardCfg=logoDashboard || '/assets/imgs/dashboard-logo.png';
export const logoPaddingCfg=logoPadding || '5px';
export const titleCfg=title || '';
export const splashLogoCfg=splashLogo || '/assets/imgs/splash-logo.png';
export const APPVersion=AppVersion;