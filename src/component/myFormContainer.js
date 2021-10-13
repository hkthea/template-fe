import React, { Children } from 'react';
import propsTypes from 'prop-types'
import { Box, Container, Divider,  Paper, Typography } from '@material-ui/core';

const MyPage = ({boxPadding, title, children})=>{

    return (
        <Container disableGutters maxWidth={false}>
            <Paper style={{display:'flex', flexDirection:'column', minHeight:'calc(100vh - 68px)'}}>        
                <Box p={boxPadding}>
                    <Typography variant="h5" style={{marginBottom:10}}> {title} </Typography>
                    <Divider/>
                    {children}
                </Box>
            </Paper>
        </Container>
    )
}

MyPage.defaultProps={
    boxPadding:4,
    title:'Title',
    columns:[],
    rowPerPage:10,
    loading:false,
    data:[],
    pagination:{}
}

MyPage.propsTypes={
    boxPadding:propsTypes.number,
    title:propsTypes.string.isRequired,    
}

export default MyPage;