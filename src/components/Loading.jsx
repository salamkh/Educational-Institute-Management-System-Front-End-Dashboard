import { Container, Modal, makeStyles } from "@material-ui/core"
import "./Loading.css"

const useStyles = makeStyles((theme) => ({

   

    modal: {
        width:250,
        height: 250,
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",

        },
       
      
    },

    modalDiv: {
     
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: "auto",
        marginLeft:"40%",
        marginTop:"20%"
      
       
      
    },


})
);

const LOADING = () => {
    const classes = useStyles();
    return (
        <>
         
                <Container >
                <div className={classes.modalDiv}>
                 
                    <br/><br/>
                    <div class="loader">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </Container>
      
    </>
     );
}

export default LOADING;