import numeral from 'numeral';

export const Version=0;
export const MajorVersion=0;
export const MinorVersion=0;
export const buildNumber=0;
export const AppVersion=`${Version}.${MajorVersion}.${MinorVersion}.${numeral(buildNumber).format('0000')}`;

export const updateLog=[

]