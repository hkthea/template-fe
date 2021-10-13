import {makeStyles, createStyles} from '@material-ui/core/styles';
import { red, grey, orange, blueGrey, brown } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) =>
    createStyles({
        panelContainer:{
            display:'flex',
            flexDirection:'column',
            width:'100%',
            borderColor:brown[200],
            borderWidth:1,
            borderStyle:'solid',
            padding:0,
            marginBottom:15
        },
        panelTitle:{
            padding:4,
            background:brown[400],
            color:grey[100],
            width:'100%',
            fontWeight:'500',
            fontSize:20
        },
        panelBodyRow:{
            display:'flex',
            flexDirection:'row',
            padding:15,
            flexWrap:'wrap'
        },
        panelBodyCol:{
            display:'flex',
            flexDirection:'column',
            padding:15
        },
        title:{
            fontFamily:'sans-serif',
            fontWeight:'500'
        },
        titleRight:{
            fontFamily:'sans-serif',
            fontWeight:'500',
            textAlign:'right'
        },
        caption:{
            display:'block'
        },
        captionRight:{
            display:'block',
            textAlign:'right'
        },
        g5:{
            width:'20%'
        },
        g4:{
            width:'25%'
        },
        g2:{
            width:'50%'
        },
        g3:{
            width:'33.33%'
        },
        g1:{
            width:'100%'
        },
        imgCarrier:{
            width:64,
            borderRadius:16,
            height:64,
            borderColor:orange[400],
            borderStyle:'solid',
            borderWidth:1,
            margin:5
        },
        inpSm:{
            width:160,
            marginRight:10
        },
        inpMd:{
            width:240,
            marginRight:10
        },
        inpLg:{
            width:320,
            marginRight:10
        },
        inpXl:{
            width:400,
            marginRight:10
        },
        modalContainer: {
            position: 'absolute',
            width: 500,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,      
        },
        modalInpContainer:{
            display:'flex',
            flexDirection:'row',
            textAlign:'center',
            padding:10
        }
    })
);