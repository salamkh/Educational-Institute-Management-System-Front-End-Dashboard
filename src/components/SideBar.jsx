import { Container, makeStyles, Typography, Modal, Button } from "@material-ui/core";
import { DeleteOutlined, Search, Add, Home, Input, AssignmentInd, MailOutline, PermIdentity, CalendarToday, LocationSearching, Book, } from "@material-ui/icons";
import IconButton from '@mui/material/IconButton';
import { Edit, Phone, Publish } from "@material-ui/icons";
import { AutoAwesomeMotionOutlined, WorkspacePremium } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom"

import MuiAlert from '@mui/material/Alert';

import React, { useState, useEffect } from "react";
import axios from "axios";
import najma from "../img/nn logo NEW.png"
const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(12),
        marginLeft: theme.spacing(0),
        backgroundColor: "white",
        color: "rgb(40, 36, 43)",
        height: "100vh",
        width: "20%",
        top: 0,
        right: 0,
        position: "fixed",
        boxShadow: "0 8px 8px rgba(61, 32, 61, 0.5)"
    },

    item: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(3),
            cursor: "pointer",
            direction: "rtl",
            '&:hover': {
                backgroundColor: "rgb(165, 61, 179)",
                borderRadius: "20px",
                padding: "8px",
                marginBottom: "2px",
                color: "#fff"
            }
        },

        '&:hover': {
            backgroundColor: "#3095C3",
            borderRadius: "20px",
            padding: "8px",
            marginBottom: "2px",
            color: "#fff"
        }
    },

    text: {
        marginRight: theme.spacing(1),
        color: "#333",
        fontSize: "18px",
        fontWeight: "500",
        [theme.breakpoints.down("sm")]: {
            display: "none",

        },
        '&:hover': {
            color: "#fff"
        }
    },
    icon: {
        [theme.breakpoints.down("sm")]: {
            cursor: "pointer",
            color: "#c5a9c3",
            margin: "auto",
            paddingRight: "2px"

        },
    },

    iconProfile: {
        cursor: "pointer",
        color: "#c5a9c3",
        margin: "auto",
        paddingRight: "2px",

        [theme.breakpoints.up("md")]: {
            display: "none",


        },
    },
    showImp: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        marginBottom: "25px",
        width: "100%",
        [theme.breakpoints.down("sm")]: {
            display: "none",

        },
    },

    userImg: {
        width: "150px",
        height: "100px",
        // borderRadius: "50%",
        objectFit: "cover",
        marginLeft: "10px",
        // boxShadow: "0px 0 30px #cc65a6",
        // '&:hover': {
        //     cursor: "pointer",
        //     boxShadow: "0px 0 30px #ca1744",
        // }

    },

    userInfo: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "12px 0px",

    },
    name: {
        fontSize: "20px",
        color: "#245268",
        right: 0,
    },
    userUni: {
        fontSize: "20px",
        color: "rgb(151, 93, 151, 0.9)",
    },

    line: {
        width: "150px",
        height: "4px",
        margin: "10px auto",
        background: "#3095C3",
        borderRadius: "5px",
        [theme.breakpoints.down("md")]: {
            width: "100px",

        },

    },

    modal: {
        width: 600,
        height: 600,
        background: "linear-gradient(rgb(49, 5, 43, 0.9), rgba(37, 41, 48, 0.9))",
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

        borderRadius: "20px",
        direction: "rtl",



        boxShadow: "0px 0 30px #2c152b",
    },

    social: {
        [theme.breakpoints.down("sm")]: {
            left: "100%",
            top: "100%",

        },
    },
    mydeleteIcon: {

        color: "rgb(161, 37, 37)",
        cursor: "pointer",
    },

    myeditIcon: {
        color: "rgb(17, 126, 199)",
        cursor: "pointer",
    },



})
);

const SideBar = ({ setSign }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const local_user = localStorage.getItem("userName");
    const [user, setUser] = useState(JSON.parse(local_user));
    console.log("profile User",user)
    const logout = () => {
        localStorage.clear();
        setSign(false)
        navigate('/');
    }

    return (
        <Container className={classes.container}>


            <div className={classes.showImp}>
                <>
                    <img src={najma} alt="" className={classes.userImg} />
                    {user &&
                        <div className={classes.userImportant}>
                            <h3 className={classes.name}>{user.userName}</h3>

                        </div>
                    }
                </>


                <div className={classes.line}></div>
            </div>

            <div className={classes.item}>
                < PermIdentity className={classes.iconProfile} />
            </div>

            <Link to="/hr">
                <div className={classes.item}>
                    <Home className={classes.icon} />
                    <Typography className={classes.text}> الموارد البشرية </Typography>
                </div>
            </Link>

            <Link to='/profile' style={{ textDecoration: "none" }}>
                <div className={classes.item}>
                    <AssignmentInd className={classes.icon} />
                    <Typography className={classes.text}>عرض المعلومات الشخصية </Typography>
                </div>
            </Link>

            <Link to='/EducationComponents/Education/Education'  style={{textDecoration:"none"}}>

            <div className={classes.item}>
                <AssignmentInd className={classes.icon} />

                <Typography className={classes.text}>العملية التعليمية</Typography>
            </div>
            </Link>


            <Link to="/accounting">
                <div className={classes.item}>
                    <Search className={classes.icon} />

                    <Typography className={classes.text}>المحاسبة </Typography>
                </div>
            </Link>

            <Link to="/addField">
                <div className={classes.item}>
                    <Book className={classes.icon} />

                    <Typography className={classes.text}>إضافة واصفة </Typography>
                </div>
            </Link>

            {/* <div className={classes.item}>
                <Book className={classes.icon} />

                <Typography className={classes.text}>الرسائل </Typography>
            </div> */}

            <div className={classes.item} onClick={() => logout()}>
                <Input className={classes.icon} />
                <Typography className={classes.text}>تسجيل الخروج  </Typography>
            </div>




        </Container >
    );

}

export default SideBar;