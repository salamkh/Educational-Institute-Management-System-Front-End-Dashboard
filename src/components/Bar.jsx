import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import img from "../img/e776803fd4166f14dd8a68832db7aa6f (1).jpg"
import "./Bars.css"

const useStyles = makeStyles((theme) => ({
    toolBar: {
        display: "flex",
        justifyContent: "space-between",
        direction:"rtl",
    },


    logoLg: {
        fontSize:"20px",
        marginRight:"250px",
        marginBottom:"20px",
        fontWeight: 600,
      
        // display: "none",
        // [theme.breakpoints.up("sm")]: {
        //     display: "block",
        // },
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },

    },

    iconButton: {

        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
 
    },

    nom: {
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },

    getstarted:{
        padding: "8px 20px",
        marginLeft: "30px",
        borderRadius: "50px",
        color: "#fff",
        fontSize: "14px",
        border: "2px solid rgb(207, 66, 101)",
        fontWeight: "600",
        textDecoration:"none",
      '&:hover':{
        color:"#fff",
        background:"rgb(170, 138, 146)",
      }
    },

    
})
);

const NavBar = ({title}) => {
    const classes = useStyles();
    return (
            <AppBar style={{ backgroundColor: "white" ,height:"40px" ,boxShadow: "0 0px 8px #868c93"}} position="fixed">
                <span className="spanBar">{title}</span>
                <img src={img} className="imgBar"></img>
                <Toolbar className={classes.toolBar}>
                    <Typography variant="h6" className={classes.logoLg} style={{ color:"#333" }} >
                        معهد التفوق والنجاح 
                    </Typography>
                
                    
                </Toolbar>
             
            </AppBar>
        
    );
}

export default NavBar;