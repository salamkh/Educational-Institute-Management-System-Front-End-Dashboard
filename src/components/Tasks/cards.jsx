import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar, AppBar, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import "./cards.css"
import { useEffect } from "react";
import AssistantIcon from '@mui/icons-material/Assistant';
const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(10),


    },

    deleteIcon: {

        color: "rgb(161, 37, 37)",
        cursor: "pointer",
    },

    editIcon: {
        color: "#543961",
        cursor: "pointer",
    },


    header: {

        direction: "rtl",

    },



    deleteIcon: {

        color: "rgb(161, 37, 37)",
        cursor: "pointer",
    },

    editIcon: {
        color: "#543961",
        cursor: "pointer",
    },

    searchInput: {
        height: "25px",
        width: "200px",
        borderRadius: "5px",
        marginTop: "5px",
        border: "1px  solid #543961",
        padding: "5px",
        backgroundColor: "",
        color: "rgb(37, 37, 37)",
        direction: "rtl",
    },

    searchIcon: {
        backgroundColor: "#543961",
        padding: "5px",
        borderRadius: "5px",
        color: "white",
    },

    addIcon: {
        backgroundColor: "#543961",
        padding: "5px",
        borderRadius: "50%",
        color: "white",
        width: "25px",
        height: "25px",

    },

    addIconButton: {
        direction: "ltr",
    },

    modal: {
        width: 500,
        height: 500,
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
        overflow: "scroll",
        direction: "rtl",
    },


    addUniAdminForm: {
        display: "flex",
        flexWrap: "wrap",
    },

    addItem: {
        width: "200px",
        margin: "5px",
        display: "flex",
        flexDirection: "column"

    },

    userAddInput: {
        height: "30px",
        borderRadius: "5px",
        marginTop: "5px",
        border: " 1px  solid rgb(59, 53, 53)",

    },

    work: {
        width: "150px",
        direction: "rtl",
        color: "rgb(160, 20, 78)",
        borderColor: "rgb(160, 20, 78)",
        marginTop: 5,
    },

    select: {
        width: "150px",
        marginBottom: 8,
    },


    label: {
        marginBottom: 5,
        color: "rgb(160, 20, 78)",
        direction: "rtl",
    },

    addButton: {
        borderRadius: "22px",
        border: "none",
        backgroundColor: "#543961",
        color: "beige",
        cursor: "pointer",
        width: "130px",
        padding: "8px",
        margin: "10px",
        fontSize: "16px",
        

        '&:hover': {
            backgroundColor: "#6c8997",
        },
    },

    addButtonTask: {
        borderRadius: "22px",
        border: "none",
        backgroundColor: "#543961",
        color: "beige",
        cursor: "pointer",
        width: "80px",
        padding: "8px",
        // margin: "10px",
        // marginTop: 30,
        fontSize: "20px",
        // marginLeft: "350px",

        '&:hover': {
            backgroundColor: "#6c8997",
        },
    },


    submit: {
        display: "flex",
        
    },


    order_content: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    orderItem: {
        width: "85%",
        height: "200px",
        borderRadius: "10px",
        marginBottom: "20px",
        marginLeft: "10px",
        marginRight: "10px",
        padding: "30px",
        backgroundColor: "#543961",
        display: "flex",
        overflow: "scroll",


    },

    imgOrder: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        marginRight: "10px",
    },

    name: {
        fontSize: "25px",
        color: "pink",
        fontWeight: "400",

    },

    job: {
        fontSize: "18px",
        fontWeight: 300,
        color: "rgb(196, 178, 185)",

    },

    userImportant: {
        direction: "rtl",
    },

    rightOrder: {
        direction: "rtl",
    },

    divIcons: {
        marginTop: 5,
        marginLeft: 2,
    },
    leftPart: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "8px",

    },
    item: {
        display: "flex",
        marginBottom: theme.spacing(1),
        direction: "rtl",


    },

    text: {

        color: "rgb(58, 21, 63)",
        fontSize: "18px",


    },
    icon: {


        color: "#543961",
        fontSize: "30px",
        marginLeft: "5px",



    },

    line: {
        marginTop: "20px",
        width: "100%",
        height: "3px",
        margin: "10px auto",
        background: "#766c7a",
        borderRadius: "5px",
        [theme.breakpoints.down("md")]: {
            width: "100px",

        },

    },
    modalStatus: {
        width: 500,
        height: 400,
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
const CARD = () => {
    const classes = useStyles();

    return (
        <>
           <AppBar style={{ backgroundColor: "#543961" ,height:"40px" ,boxShadow: "0 8px 8px rgba(61, 32, 61, 0.5)"}} position="fixed">
               
                <Toolbar className={classes.toolBar}>
                    <Typography variant="h1" className={classes.logoLg} style={{ color:"#fff" }} >
                       elixir
                    </Typography>
                
                    
                </Toolbar>
             
            </AppBar>
            <div className="headCard">
                <h1>البطاقات</h1>
                <div className={classes.line}></div>
            </div>

            <div className="sec_containerCard">

            <div className="sec_cardCard" >
                    <div>
                        <IconButton className={classes.Icons} >
                            <AssistantIcon className={classes.editIcon} />
                        </IconButton>
                    </div>
                    <div className="sec_contentCard" >
                        <div>
                            <span>Task1</span>
                            <div className={classes.line}></div>
                            <p>الوصف: تصميم واجهات إدخال المهام</p>
                            <p>مسندة إلى : <span style={{color:"rgb(93, 51, 109)"}}>نجمة إسلام الطير</span></p>
                            <p>الحالة:<span style={{color:"rgb(33, 177, 76)"}}>منتهية</span></p>
                            <p>تاريخ الانتهاء المتوقع:<span>6-10-2023</span></p>
                            <div className={classes.submit}>
                                <button className={classes.addButton}  >المهام السابقة</button>
                                <button className={classes.addButton} style={{ backgroundColor: "#826d8b"}} >إنهاء بطاقة</button>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="sec_cardCard" >
                    <div>
                        <IconButton className={classes.Icons} >
                            <AssistantIcon className={classes.editIcon} />
                        </IconButton>
                    </div>
                    <div className="sec_contentCard" >
                        <div>
                            <span>Task1</span>
                            <div className={classes.line}></div>
                            <p>الوصف: تصميم واجهات إدخال المهام</p>
                            <p>مسندة إلى : <span style={{color:"rgb(93, 51, 109)"}}>نجمة إسلام الطير</span></p>
                            <p>الحالة:<span style={{color:"rgb(33, 177, 76)"}}>منتهية</span></p>
                            <p>تاريخ الانتهاء المتوقع:<span>6-10-2023</span></p>
                            <div className={classes.submit}>
                                <button className={classes.addButton}  >المهام السابقة</button>
                                <button className={classes.addButton} style={{ backgroundColor: "#826d8b"}} >إنهاء بطاقة</button>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="sec_cardCard" >
                    <div>
                        <IconButton className={classes.Icons} >
                            <AssistantIcon className={classes.editIcon} />
                        </IconButton>
                    </div>
                    <div className="sec_contentCard" >
                        <div>
                            <span>Task1</span>
                            <div className={classes.line}></div>
                            <p>الوصف: تصميم واجهات إدخال المهام</p>
                            <p>مسندة إلى : <span style={{color:"rgb(93, 51, 109)"}}>نجمة إسلام الطير</span></p>
                            <p>الحالة:<span style={{color:"rgb(33, 177, 76)"}}>منتهية</span></p>
                            <p>تاريخ الانتهاء المتوقع:<span>6-10-2023</span></p>
                            <div className={classes.submit}>
                                <button className={classes.addButton}  >المهام السابقة</button>
                                <button className={classes.addButton} style={{ backgroundColor: "#826d8b"}} >إنهاء بطاقة</button>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="sec_cardCard" >
                    <div>
                        <IconButton className={classes.Icons} >
                            <AssistantIcon className={classes.editIcon} />
                        </IconButton>
                    </div>
                    <div className="sec_contentCard" >
                        <div>
                            <span>Task1</span>
                            <div className={classes.line}></div>
                            <p>الوصف: تصميم واجهات إدخال المهام</p>
                            <p>مسندة إلى : <span style={{color:"rgb(93, 51, 109)"}}>نجمة إسلام الطير</span></p>
                            <p>الحالة:<span style={{color:"rgb(33, 177, 76)"}}>منتهية</span></p>
                            <p>تاريخ الانتهاء المتوقع:<span>6-10-2023</span></p>
                            <div className={classes.submit}>
                                <button className={classes.addButton}  >المهام السابقة</button>
                                <button className={classes.addButton} style={{ backgroundColor: "#826d8b"}} >إنهاء بطاقة</button>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="sec_cardCard" >
                    <div>
                        <IconButton className={classes.Icons} >
                            <AssistantIcon className={classes.editIcon} />
                        </IconButton>
                    </div>
                    <div className="sec_contentCard" >
                        <div>
                            <span>Task1</span>
                            <div className={classes.line}></div>
                            <p>الوصف: تصميم واجهات إدخال المهام</p>
                            <p>مسندة إلى : <span style={{color:"rgb(93, 51, 109)"}}>نجمة إسلام الطير</span></p>
                            <p>الحالة:<span style={{color:"rgb(33, 177, 76)"}}>منتهية</span></p>
                            <p>تاريخ الانتهاء المتوقع:<span>6-10-2023</span></p>
                            <div className={classes.submit}>
                                <button className={classes.addButton}  >المهام السابقة</button>
                                <button className={classes.addButton} style={{ backgroundColor: "#826d8b"}} >إنهاء بطاقة</button>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="sec_cardCard" >
                    <div>
                        <IconButton className={classes.Icons} >
                            <AssistantIcon className={classes.editIcon} />
                        </IconButton>
                    </div>
                    <div className="sec_contentCard" >
                        <div>
                            <span>Task1</span>
                            <div className={classes.line}></div>
                            <p>مسندة إلى : <span style={{color:"rgb(93, 51, 109)"}}>نجمة إسلام الطير</span></p>
                            <p>الحالة:<span style={{color:"rgb(33, 177, 76)"}}>منتهية</span></p>
                            <p>تاريخ الانتهاء المتوقع:<span>6-10-2023</span></p>
                            <div className={classes.submit}>
                                <button className={classes.addButton}  >المهام السابقة</button>
                                <button className={classes.addButton} style={{ backgroundColor: "#826d8b"}} >إنهاء بطاقة</button>

                            </div>
                        </div>

                    </div>
                </div>


            </div >
        </>
    );
}

export default CARD;