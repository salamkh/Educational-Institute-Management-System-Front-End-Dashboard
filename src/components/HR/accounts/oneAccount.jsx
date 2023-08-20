import { Button, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, makeStyles, MenuItem, Modal, OutlinedInput, Select, TextField } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import "./editAccount.css";
import userPic from "../../../img/images.png"
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./oneAccount.css"
import LOADING from "../../Loading";
const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(12),
        marginLeft: theme.spacing(0),
        backgroundColor: "#232730",
        color: "rgb(211, 206, 199)",
        height: "100vh",
        width: "100%",
        position: "sticky",
        top: 0,

    },


    userImg: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        marginTop: "20px",
        marginLeft: "50px",
        boxShadow: "0px 0 30px #232730",
        '&:hover': {
            cursor: "pointer",
            boxShadow: "0px 0 30px #cc65a6",
        }

    },



    line: {
        width: "150px",
        height: "4px",
        margin: "10px auto",
        marginBottom: "20px",
        background: "rgb(177, 194, 211)",
        borderRadius: "5px",
        [theme.breakpoints.down("md")]: {
            width: "100px",

        },

    },

    select: {
        width: "100px",
        marginLeft: "25px",
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

    modalStatus: {
        width: 500,
        height: 450,
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

        direction: "rtl",
    },


    submit: {
        display: "flex",
        marginTop: 40,
    },

    addButton: {
        borderRadius: "22px",
        border: "none",
        backgroundColor: "#3095C3",
        color: "beige",
        cursor: "pointer",
        width: "120px",
        padding: "8px",
        margin: "10px",
        marginTop: 30,
        fontSize: "15px",
        marginLeft: "50px",

        '&:hover': {
            backgroundColor: "#6c8997",
        },
    },

    modalImg: {
        width: 500,
        height: 450,

        borderRadius: "20px",
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

    sameItemCon: {
        marginTop: "20px",
        borderRadius: "20px",
        height: "50px",
        boxShadow: "0px 0 30px #3095C3",
        zIndex: 15,
        marginBottom: "30px",
        position: "relative",
        overflowWrap: "break-word",
        background: "whitesmoke",
        width: "100px",

        '&:hover': {

            boxShadow: "0px 0 30px #3095C3",

        },
    },

    sameItemConUser: {
        marginTop: "60px",
        borderRadius: "20px",
        height: "50px",
        boxShadow: "0px 0 15px #3095C3",
        zIndex: 15,
        marginBottom: "30px",
        position: "relative",
        overflowWrap: "break-word",
        background: "whitesmoke",
        width: "70%",
        color: "#333",

    },




})
);


const OneAccount = ({setTitle}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openRole, setOpenRole] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [role, setRole] = useState("");
    const [img, setImg] = useState("");
    const [one_user, setUser] = useState(null);
    const [retired, setRetired] = useState(null);
    const [Loading, setLoading] = useState(false);
    const params = useParams();
    const id = params.id;
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const url = "http://127.0.0.1:8000/api/userProfile/" + id;
    const url_retired = "http://127.0.0.1:8000/api/get_user_retired/" + id;
    // const [open, setOpen] = useState(false);
    // const [role, setRole] = useState("");

    ///////// fetch user ////////////
    useEffect(() => {
        let isMounted = true;
        setTitle("عرض حساب موظف")
        // console.log("fetchLeft",user);
        setLoading(true)
        axios.get(url, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("uuuuuu", response.data)
                    setUser(response.data.data);
                    setLoading(false)
                    // setError(null);
                    // setLoad(false);
                }
            })
            .catch((err) => {
                setLoading(false)
                if (err.name === 'AbortError') {
                    console.log('clean up');
                }
                else {
                    // setLoading(false);
                    // setError(err.message);
                }

            })

        axios.get(url_retired, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("uuuuuu", response.data)
                    setRetired(response.data.data);

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


    const renderImg = (item) => {
        setImg(item);

        setOpenImg(true);
    }


    return (
        <>
            {Loading && <LOADING />}
            {one_user &&
                <div className="containerAddAccount">
                    <Grid container >
                        <Grid item sm={2} xs={1} md={8} lg={8} >

                            <>

                                <Grid container >
                                    <Grid item sm={2} xs={1} md={5} lg={5} style={{ marginLeft: "10px", }}>
                                        <div className="label_user_div" style={{ marginTop: "30px", marginBottom: "12px" }}> <span className="label_user-left">الإيميل </span></div>

                                        <div className={classes.sameItemConUser} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                                {one_user.user.email != undefined && <span>{one_user.user.email}</span>}

                                            </div>

                                        </div>
                                        {/*                                         
                                        <div className="label_user_div" style={{ marginTop: "30px" ,overflowX:"auto"}}> <span className="label_user-left">الإيميل </span></div>
                                        <div className="input-field-user-left" style={{overflowX:"auto"}}>
                                            {one_user.user.email != undefined && <input type="text" className="input-form-user" style={{overflowX:"auto"}}  placeholder={one_user.user.email}
                                                readOnly />}
                                        </div> */}
                                    </Grid>
                                    <Grid item sm={2} xs={1} md={5} lg={5} style={{ marginLeft: "50px", overflow: "visible" }}>
                                        <div className="label_user_div" style={{ marginTop: "30px", marginBottom: "12px" }}> <span className="label_user-left">رقم الهاتف  </span></div>
                                        <div className={classes.sameItemConUser} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                                <span>{one_user.user.phoneNumber}</span>

                                            </div>

                                        </div>


                                        {/* <div className="label_user_div" style={{ marginTop: "30px" }}> <span className="label_user-left"> رقم الهاتف </span></div>
                                        <div className="input-field-user-left">
                                            <input type="text" className="input-form-user" placeholder={one_user.user.phoneNumber} readOnly />

                                        </div> */}
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item sm={2} xs={1} md={5} lg={5} style={{ marginLeft: "10px" }}>

                                        <div className="label_user_div" style={{ marginBottom: "12px" }} > <span className="label_user-left" >  الحالة</span></div>
                                        <div className={classes.sameItemConUser} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }} onClick={() => renderImg(one_user.user)}>
                                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                                <span>{one_user.user.accountStatus}</span>
                                            </div>
                                        </div>
                                        {/* <div className="label_user_div" style={{ marginLeft: "80px" }} > <span className="label_user-left">صورة الهوية </span> <Publish className={classes.uploadIcon} /></div>
                                        <div className={classes.sameItemConUser} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }} onClick={() => renderImg(one_user.user)}>

                                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>


                                            </div>

                                        </div> */}

                                        {/* <div className="label_user_div" style={{ marginLeft: "80px" }} > <span className="label_user-left">صورة الهوية </span> <Publish className={classes.uploadIcon} /></div>
                                        <div className="input-field-user-left" style={{ width: "150px" }} onClick={() => renderImg(one_user.user)}>
                                            <input type="text" className="input-form-user" placeholder="عرض  " />
                                        </div> */}

                                    </Grid>

                                    <Grid item sm={2} xs={1} md={5} lg={5} style={{ marginLeft: "50px" }}>
                                        <div className="label_user_div" style={{ marginBottom: "12px" }}> <span className="label_user-left"> مكان الإقامة  </span></div>
                                        <div className={classes.sameItemConUser} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }} onClick={() => renderImg(one_user.user)}>
                                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                                <span>{one_user.user.address}</span>
                                            </div>
                                        </div>

                                        {/* <div className="label_user_div" > <span className="label_user-left"> مكان الإقامة  </span></div>
                                        <div className="input-field-user-left">
                                            <input type="text" className="input-form-user" placeholder={one_user.user.address} readOnly />

                                        </div> */}
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid item sm={2} xs={1} md={5} lg={5} style={{ marginLeft: "10px" }}>
                                        <div className="label_user_div" style={{ marginBottom: "12px" }} > <span className="label_user-left"> الراتب   </span></div>
                                        <div className={classes.sameItemConUser} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }} onClick={() => renderImg(one_user.user)}>
                                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                                <span>{one_user.user.salary}</span>
                                            </div>
                                        </div>


                                        {/* <div className="input-field-user-left">
                                            <input type="text" className="input-form-user" placeholder={one_user.user.accountStatus} readOnly />

                                        </div> */}



                                    </Grid>
                                    <Grid item sm={2} xs={1} md={5} lg={5} style={{ marginLeft: "50px" }}>
                                        <div className="label_user_div" style={{ marginBottom: "12px" }}   > <span className="label_user-left"> أوقات الدوام </span></div>
                                        <div className={classes.sameItemConUser} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }} onClick={() => renderImg(one_user.user)}>
                                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                                <span>{one_user.user.workTime}</span>
                                            </div>
                                        </div>


                                        {/* <div className="input-field-user-left">
                                            <input type="text" className="input-form-user" placeholder={one_user.user.workTime} readOnly />


                                        </div> */}



                                    </Grid>
                                </Grid>

                                <Grid container style={{ marginRight: "20px" }}>
                                    <Grid item sm={2} xs={1} md={5} lg={5}>

                                        <button className={classes.addButton} onClick={() => setOpen(true)}>الصلاحيات</button>

                                    </Grid>

                                    <Grid item sm={2} xs={1} md={5} lg={5} style={{ marginLeft: "40px" }}>

                                        <button className={classes.addButton} onClick={() => setOpenRole(true)}>الدور</button>
                                    </Grid>


                                </Grid>
                                {retired &&
                                    <div className="retired">
                                        <span>معلومات الاستقالة</span>
                                        <div className="retired_line"></div>
                                        <p>تاريخ الاستقالة :{retired.retieredDate} </p>
                                        <p>السبب :{retired.cause} </p>
                                    </div>
                                }

                                <Grid container>
                                    <Grid item sm={2} xs={1} md={4} lg={4} style={{ marginLeft: "20px" }}>


                                    </Grid>
                                    <Grid item sm={2} xs={1} md={5} lg={5} style={{ marginLeft: "50px" }}>


                                        {/* <div className="input-field-user-left">
                                            <input type="text" className="input-form-user" placeholder={one_user.user.salary} readOnly />
                                        </div> */}
                                    </Grid>
                                </Grid>

                            </>

                        </Grid>
                        <Grid item sm={2} xs={1} md={4} lg={4} className="picRight" >
                            <>
                                <img src={userPic} alt="" className={classes.userImg} />
                                <div className={classes.line}></div>
                                <div className="label_user_div"> <span className="label_user">الاسم الكامل</span></div>
                                <div className="input-field-user">
                                    <input type="text" className="input-form-user" placeholder={one_user.user.name} readOnly />

                                </div>
                                <div className="label_user_div"> <span className="label_user">اسم المستخدم </span></div>
                                <div className="input-field-user">
                                    <input type="text" className="input-form-user" placeholder={one_user.user.userName} readOnly />

                                </div>

                                <button className={classes.addButton} style={{ backgroundColor: "whitesmoke", color: "rgba(109, 44, 134, 0.9)", marginRight: "20px" }} onClick={() => renderImg(one_user.user)}>صورة الهوية </button>





                            </>
                        </Grid>
                    </Grid>


                </div>
            }

            <Modal open={openImg} >
                <Container className={classes.modalImg}>
                    <Button variant="outlined" onClick={() => setOpenImg(false)} style={{ color: "pink" }}>X </Button>
                    <img src={`http://127.0.0.1:8000/storage/images/${img.imageIdentity}`} alt="" style={{ width: "100%", height: "700px" }} />
                </Container>
            </Modal >

            <Modal open={open} >
                <Container className={classes.modal}>
                    <Button variant="outlined" onClick={() => setOpen(false)} style={{ color: "pink", marginBottom: "10px" }}>X </Button>
                    {one_user && one_user.permissions.length != 0 &&

                        one_user.permissions.map((item) => (
                            <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                                <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>

                                    <span>{item.name}</span>
                                </div>

                            </div>
                        ))}

                </Container>
            </Modal>

            <Modal open={openRole} >
                <Container className={classes.modal}>
                    <Button variant="outlined" onClick={() => setOpenRole(false)} style={{ color: "pink", marginBottom: "10px" }}>X </Button>
                    {one_user && one_user.roles.length != 0 && one_user.roles.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                <span>{item.role}</span>

                            </div>

                        </div>
                    ))}

                </Container>
            </Modal>


        </>
    );
}

export default OneAccount;