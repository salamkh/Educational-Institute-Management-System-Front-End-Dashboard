import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import userPic from "../../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './allTeachers.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(10),


    },

    deleteIcon: {

        color: "rgb(161, 37, 37)",
        cursor: "pointer",
    },

    editIcon: {
        color: "rgb(17, 126, 199)",
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
        color: "rgb(17, 126, 199)",
        cursor: "pointer",
    },

    searchInput: {
        height: "25px",
        width: "200px",
        borderRadius: "5px",
        marginTop: "5px",
        border: "1px  solid rgb(121, 115, 115)",
        padding: "5px",
        backgroundColor: "",
        color: "rgb(37, 37, 37)",
        direction: "rtl",
    },

    searchIcon: {
        backgroundColor: "rgba(109, 44, 134, 0.9)",
        padding: "5px",
        borderRadius: "5px",
        color: "white",
    },

    addIcon: {
        backgroundColor: "rgba(109, 44, 134, 0.9)",
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
        height: 550,
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
        borderRadius: "6px",
        border: "none",
        backgroundColor: "rgba(109, 44, 134, 0.9)",
        color: "beige",
        cursor: "pointer",
        width: "400px",
        padding: "8px",
        margin: "10px",
        marginTop: 30,
        fontSize: "20px",

        '&:hover': {
            backgroundColor: "rgb(189, 76, 119)",
        },
    },


    submit: {
        display: "flex",
        marginTop: 40,
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
        backgroundColor: "rgb(29, 28, 31)",
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


        color: "rgb(58, 21, 63)",
        fontSize: "30px",
        marginLeft: "5px",



    },

    line: {
        marginTop: "20px",
        width: "100%",
        height: "3px",
        margin: "10px auto",
        background: "rgba(109, 44, 134, 0.9)",
        borderRadius: "5px",
        [theme.breakpoints.down("md")]: {
            width: "100px",

        },

    },



})
);


const ALLTeachers = () => {
    const classes = useStyles();

    const url = "http://127.0.0.1:8000/api/allTeachers";

    const [users, setUsers] = useState(null);


    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const navigate = useNavigate();


    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);

        axios.get(url, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data.teachers)
                    setUsers(response.data.teachers);
                    // setError(null);
                    // setLoad(false);
                }
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('clean up');
                }
                else {
                    // setLoading(false);
                    // setError(err.message);
                }

            })

    }, [])




    return (
        <Container className={classes.container}>
            <div className={classes.header}>
             

            <span style={{ color: "#333", fontSize: "20px" }}> إضافة أستاذ </span>
                        <Tooltip title="إضافة أستاذ" area-label="add" >
                            <Link to='/addTeacher'>
                                <Button><Add className={classes.addIcon} /></Button>
                            </Link>
                        </Tooltip>
                      


            </div>
            <div className={classes.line}></div>
            <Grid container spacing={2} style={{ direction: "rtl", marginTop: "120px", marginRight: "30%" }}>

                {users && users.length != 0 && users.map((item) => (



                    <Grid item xs={10} sm={10} md={3} lg={3}>


                        <div className="tcard">

                            <div className="teacherBox">

                                {/* <img src={userPic} alt="" className="imTec" /> */}

                            </div>

                            <div className="content">
                                <div className="details">
                                    <h3> {item.name} <br /><span >الرقم  :  {item.phoneNumber}</span> <br /><span >حالة الحساب : {item.accountStatus == "موظف" && <span style={{ color: "rgb(72, 202, 61)" }}>موظف</span>} {item.accountStatus == "مستقيل" && <span style={{ color: "rgb(167, 32, 99)" }}>مستقيل</span>} </span><br />
                                        <Link to={'/oneTeacher/' + item.userId} ><span>التفاصيل</span></Link><br />
                                        <div className="social" style={{ marginRight: "20px", bottom: 0, left: 0 }}>
                                            {/* <IconButton className={classes.Icons} >
                                                <DeleteOutlined className={classes.deleteIcon} onClick={() => handleDelete(item.userInfo.userId)} />
                                            </IconButton> */}
                                            <IconButton >
                                                <Link to={'/editTeatcher/' + item.userId}>
                                                    <Edit className={classes.editIcon} />
                                                </Link>
                                            </IconButton>
                                        </div>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}


            </Grid>


        </Container>
    );
}

export default ALLTeachers;