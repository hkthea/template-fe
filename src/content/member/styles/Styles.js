import {makeStyles, createStyles} from '@material-ui/core/styles';
import { red, grey, orange, blueGrey } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        marginBottom:theme.spacing(4)
      },
      '& .MuiButton-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    tblHead:{
      fontWeight:600
    },
    paperDropZone: {
      borderWidth:'2px',
      borderStyle:'dashed',
      backgroundColor:'#f4f4f7',
      width:'120px',
      height:'120px',
      padding: theme.spacing(2),
      alignItems: "center",
      alignContent: "center",
      textAlign: "center"
    },
    detailExpandDtWrap:{
      padding:"30px 0px", 
      display:"flex", 
      justifyContent:"center",
    },
    paperForm:{
        padding:theme.spacing(3)
    },
    formConMaster:{
        margin:"20px 0px", 
        padding:"0px 20px"
    },
    btnContainerForm:{
        display:"flex", 
        justifyContent:"flex-end", 
        marginTop:"30px", 
        padding:"0px 20px"
    },
    btnContainerDialog:{
      display:"flex", 
        justifyContent:"flex-end", 
        marginTop:"30px",
    },
    formLine:{
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'flex-start', 
        flexWrap:'wrap', 
        flexGrow:'1',
        alignItems:'center',
        marginTop:20
    },
    formLineThin:{
      display:'flex', 
      flexDirection:'row', 
      justifyContent:'flex-start', 
      flexWrap:'wrap', 
      flexGrow:'1',
      alignItems:'center',
      marginTop:5
    },
    formLine2:{
      justifyItems:'flex', 
      flexDirection:'row', 
      flexWrap:'wrap', 
      justifyContent:"flex-start", 
      alignContent:'center'
    },
    input:{
        marginRight:15,
        width:200        
    },
    inputHalf:{
        marginRight:15,
        width:100        
    },
    //font-font
    fs15fw600:{
      fontSize:"15px",
      fontWeight:"600"
    },
    fs16fw600:{
      fontSize:"16px",
      fontWeight:"600"
    },
    fs14fw500:{
      fontSize:"14px",
      fontWeight:"500"
    },
    //end font-font
    
    //color
    clBlueG800:{
      color:blueGrey[800]
    },
    //end color

    //produk
    listAtcProd:{
      maxHeight:"40vh",
      overflow:"auto",
      [theme.breakpoints.down('sm')]:{
        maxHeight:"250px", 
        overflow:"auto"
      }
    },
    headPageProduk:{
      marginBottom:"30px", 
      padding:"10px", 
      display:"flex", 
      alignItems:"center", 
      justifyContent:"space-between"
    },
    actHeadProduct:{
      display:"flex",
      flexDirection:"row",
    },
    paperSearch:{
      padding:"4px 5px", 
      display:"flex",
      alignItems:"center"
    },
    inputSearch:{
      marginLeft: theme.spacing(1),
      flex: 1,
    },

    titleCardFont:{
      fontWeight:"600",
      fontSize:"18px",
      color:blueGrey[700],
    },

    priceCardFont:{
      fontWeight:"600",
      fontSize:"16px",
      color:orange[800],
    },

    titlePageFont:{
      fontWeight:"800",
      fontSize:"24px",
      color:blueGrey[700]
    },

    titleALertFont:{
      fontWeight:"600",
      fontSize:"22px",
      color:blueGrey[700],
    },

    cardRootProd:{
      width:"100%",
      [theme.breakpoints.down("sm")]:{
        maxWidth:"345px"
      }
    },
    media: {
      marginTop:"10px",
      height: "200px",
      // paddingTop: '56.25%', // 16:9
      width: '60%',
      objectFit: 'scale-down',
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    //end produk

    //login
    loginGridContainer:{
      display:"flex",
      height:"100vh", 
      justifyContent:"center", 
      background:"url('/bg.jpeg')",
      alignItems:"center", 
      padding:"auto 100px"
    },
    loginPaperContainer:{
      padding:"30px",
      minWidth:"55%",
      [theme.breakpoints.down('xs')]:{
        width:"90%"
      }
    },
    headTitlePaperLogin:{
      fontWeight:'700',
      marginBottom:"30px"
    },
    //end login
    //charts
    titleChart: {
      textAlign:"center",
      marginBottom:"30px"
    },
    //end charts
    //pembayaran
    distanceHeader : {
      marginLeft: 25, 
      padding: "15px 0"
    },

    modalPaper: {
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
    //end pembayaran
  }),
);