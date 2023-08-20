import { Button, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, makeStyles, MenuItem, Modal, OutlinedInput, Select, TextField } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import "./profile.css";
import userPic from "../../../img/undraw_co-working_re_w93t.svg"
import program from "../../../img/undraw_live_collaboration_re_60ha.svg"
import imgGrid from "../../../img/undraw_digital_nomad_re_w8uy (1).svg";
import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
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


    userEditImg: {
        width: "150px",
        height: "120px",
        borderRadius: "20px",
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
        background: "rgb(194, 177, 211)",
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
        width: "100px",
        padding: "8px",
        margin: "10px",
        marginTop: 30,
        fontSize: "15px",
        marginLeft: "300px",

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


const PROFILE = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openRole, setOpenRole] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [role, setRole] = useState("");
    const [img, setImg] = useState("");
    const [Loading, setLoading] = useState(false)
    const [one_user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [auth, setAuth] = useState([]);
    const [id, setId] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const url = "http://127.0.0.1:8000/api/myProfile";
    const url_auth = "http://127.0.0.1:8000/api/userAuthorizations/";
    const url_role = "http://127.0.0.1:8000/api/userRoles/";
    // const [open, setOpen] = useState(false);
    // const [role, setRole] = useState("");

    ///////// fetch user ////////////
    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);
        setLoading(true)
        axios.get(url, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("uuuuuu", response.data)
                    setUser(response.data.data);
                    setId(response.data.data.userId);
                    setLoading(false)
                }
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('clean up');
                    setLoading(false)
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

    const fetchRoles = (userId) => {
        setLoading(true)
        axios.get(url_role + userId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {

                console.log("uuuuuu", response.data.user_roles)
                setRoles(response.data.user_roles);
                // setError(null);
                // setLoad(false);
                setLoading(false)

            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('clean up');
                    setLoading(false)
                }
                else {
                    // setLoading(false);
                    // setError(err.message);
                }

            })

        setOpenRole(true);
    }

    const fetchAuth = (userId) => {
        axios.get(url_auth + userId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {

                console.log("uuuuuu", response.data)
                setAuth(response.data.userAuth);


                // setError(null);
                // setLoad(false);

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
        setOpen(true);
    }

    const goAdvance = (userId) => {
        console.log("userId", userId)
        navigate('/profileAdvance/' + userId);
    }

    const goPanch = (userId) => {
        console.log("userId", userId)
        navigate('/profilePanch/' + userId);
    }
    const goGift = (userId) => {
        console.log("userId", userId)
        navigate('/profileGift/' + userId);
    }
    const goWorkLeave = (userId) => {
        console.log("userId", userId)
        navigate('/profileWorkLeave/' + userId);
    }
    return (

        <>
            {Loading && <LOADING />}
            {one_user &&
                <>
                    <div className="containerAddAccount" style={{ padding: "10px" }}>

                        <Grid container >
                            <Grid item sm={2} xs={1} md={8} lg={8} >

                                <>

                                    <Grid container style={{ direction: "rtl", marginRight: "20px" }} >
                                        {one_user.userData && one_user.userData.length != 0 && one_user.userData.map((item) => (
                                            <>
                                                {item.viewType == "visible" &&
                                                    <Grid item md={4} lg={4}><span style={{ color: "rgb(51, 83, 114)" }}>{item.arabicName}:</span><p style={{ color: "rgb(51, 38, 51)" }}> {item.value} </p></Grid>

                                                }
                                            </>

                                        ))}

                                    </Grid>

                                    <Grid container style={{ marginTop: "20px" }} >
                                        <Grid item sm={2} xs={1} md={5} lg={5}>
                                            <div className={classes.sameItemConUser} style={{
                                                width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px", backgroundColor: "#3095C3",
                                                color: "beige", height: "30px"
                                            }} onClick={() => setOpen(true)}>
                                                <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "40%", marginTop: "10px" }}>
                                                    <span>الصلاحيات</span>
                                                </div>
                                            </div>


                                        </Grid>

                                        <Grid item sm={2} xs={1} md={5} lg={5} >
                                            <div className={classes.sameItemConUser} style={{
                                                width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px", marginLeft: "60px", backgroundColor: "#3095C3",
                                                color: "beige", height: "30px"
                                            }} onClick={() => setOpenRole(true)}>
                                                <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "40%", marginTop: "10px" }}>
                                                    <span>الدور</span>
                                                </div>
                                            </div>
                                        </Grid>


                                    </Grid>



                                </>

                            </Grid>
                            <Grid item sm={2} xs={1} md={4} lg={4} className="picRightProfile" >
                                <img src={userPic} className="picProfile" />


                            </Grid>
                        </Grid>
                    </div>

                    <Grid container style={{ marginTop: "100px" }}>
                        <Grid item md={5} lg={5}>
                            <span style={{ color: "#333", fontSize: "30px", fontWeight: "600" }}>   استعراض معلوماتي    </span>

                            <img src={imgGrid} className="imgAccountProfile" />
                        </Grid>
                        <Grid item md={7} lg={7}>
                            <Grid container style={{ marginRight: "2%" }}>

                                <Grid item md={6} lg={6}>
                                    <div className="sec_card_profile_1" onClick={() => goAdvance(id)} >
                                        <div className="sec_content_no">
                                            <h3>السلف </h3>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={6} lg={6} >
                                    <div className="sec_card_profile_2" onClick={() => goPanch(id)} >
                                        <div className="sec_content_profile" style={{ width: "70px", height: "40px", left: 0, bottom: 0, borderRadius: "20px" }}>
                                            <h3>الخصميات </h3>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={6} lg={6} >
                                    <div className="sec_card_profile_6" onClick={() => goGift(id)}>
                                        <div className="sec_content_profile" style={{ height: "50px", right: 0, bottom: 0, borderRadius: "20px" }}>
                                            <h3>المكافئات </h3>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={6} lg={6} >
                                    <div className="sec_card_profile_3" onClick={() => goWorkLeave(id)} >
                                        <div className="sec_content_profile"
                                            style={{ width: "70px", height: "50px", right: 0, bottom: 0, borderRadius: "20px" }}>
                                            <h3>الإجازات </h3>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={6} lg={6} >
                                    <div className="sec_card_profile_4"  >
                                        <div className="sec_content_profile" style={{ left: 0, bottom: 0, borderRadius: "20px" }}>
                                            <h3>أوقات الدوام </h3>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item md={6} lg={6}>
                                    {/* <div className="sec_card_profile_5" >
                                        <div className="sec_content_profile" style={{ left: 0, bottom: 0, borderRadius: "20px" }}>
                                            <h3>الرواتب </h3>
                                        </div>
                                    </div> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>



                </>
            }

            <Modal open={openImg} >
                <Container className={classes.modalImg}>
                    <Button variant="outlined" onClick={() => setOpenImg(false)} style={{ color: "pink" }}>X </Button>
                    <img src={`http://127.0.0.1:8000/storage/images/${img.imageIdentity}`} alt="" style={{ width: "100%", height: "700px" }} />
                </Container>
            </Modal >

            <Modal open={open} >
                {one_user &&
                    <Container className={classes.modal}>
                        <Button variant="outlined" onClick={() => setOpen(false)} style={{ color: "pink", marginBottom: "10px" }}>X </Button>
                        {one_user.userPermissions && one_user.userPermissions.length != 0 &&

                            one_user.userPermissions.map((item) => (
                                <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                                    <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>

                                        <span>{item}</span>
                                    </div>

                                </div>
                            ))}

                    </Container>
                }
            </Modal>

            <Modal open={openRole} >
                {one_user &&
                    <Container className={classes.modal}>
                        <Button variant="outlined" onClick={() => setOpenRole(false)} style={{ color: "pink", marginBottom: "10px" }}>X </Button>
                        {one_user.userRoles && one_user.userRoles.length != 0 && one_user.userRoles.map((item) => (
                            <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                                <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                    <span>{item}</span>

                                </div>

                            </div>
                        ))}

                    </Container>
                }
            </Modal>


        </>
    );
}

export default PROFILE;