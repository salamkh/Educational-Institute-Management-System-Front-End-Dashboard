import { Button, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, makeStyles, MenuItem, Modal, OutlinedInput, Select, TextField, Snackbar } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import "./editAccount.css";
import userPic from "../../../img/images.png"
import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
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
        width: "400px",
        height: 300,
        backgroundColor: "white",
        // position: "absolute",
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // margin: "auto",
        marginTop: "10%",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",

        },
        // boxShadow: "10px 10px 15px rgba(52, 23, 71, 0.5)",
        border: "4px solid rgba(52, 23, 71, 0.5)",

        overflowY: "auto",
        direction: "rtl",
    },


    submit: {
        display: "flex",
        // marginTop: 40,
    },

    addButton: {
        borderRadius: "22px",
        border: "none",
        backgroundColor: "#3095C3",
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




})
);


const EditAccount = ({ setTitle }) => {
    const classes = useStyles();
    const [openStatus, setOpenStatus] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    // const [open, setOpen] = useState(false);
    // const [role, setRole] = useState("");
    const [open, setOpen] = useState(false);
    const [openRole, setOpenRole] = useState(false);
    const [openCode, setOpenCode] = useState(false);

    const [roles, setRoles] = useState(null);
    const [authorizations, setAuthorizations] = useState(null);
    let role = [];
    let auth = [];
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState("");
    const [img, setImg] = useState(null);
    const [phone, setPhone] = useState("");
    const [address, setAdress] = useState("");
    const [status, setStatus] = useState("");
    const [time, setTime] = useState("");
    const [salary, setSalary] = useState("");
    const [cause, setCause] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [rolesPost, setRolesPost] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [one_user, setUser] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [obj, setObj] = useState([]);
    const [data, setData] = useState(null);

    const params = useParams();
    const id = params.id;
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const url_role = "http://127.0.0.1:8000/api/allRoles";
    const url_auth = "http://127.0.0.1:8000/api/allAuthorizations";
    const edit_user = "http://127.0.0.1:8000/api/editUserProfil";
    const edit_role = "http://127.0.0.1:8000/api/updateUserRoles/" + id;
    const edit_auth = "http://127.0.0.1:8000/api/updateUserAuths/" + id;
    const url = "http://127.0.0.1:8000/api/userProfile/" + id;
    const url_search = "http://127.0.0.1:8000/api/get_Table_Columns_For_User_Eddition/" + id;

    const navigate = useNavigate();
    useEffect(() => {
        let temp_obj = [];
        let temp = [];
        axios.get(url_search , { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {

                console.log("roleResponse", response.data.data)
                setData(response.data.data);
                temp = response.data.data;
                console.log("temp_obj", temp)
                temp.map((t) => {
                    if (t.viewType == "visible") {
                        console.log("t", { name: t.EnglishName, value: t.value });

                        temp_obj.push({ name: t.EnglishName, value: t.value })
                    }

                })

                setObj(temp_obj);
                console.log("temp_obj", temp_obj)
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setOpen(false);
                // setError(null);
                // setLoad(false);

            })
            .catch((err) => {
                setMsg(err.response.data.message);

                setOpenAlert(true);
                if (err.response.status == 422) {

                    setMsg(err.response.data.message);
                    setOpenAlert(true);
                    setOpen(false)
                    // setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
                if (err.name === 'AbortError') {
                    console.log('clean up');

                }
                else {
                    // setLoading(false);
                    // setError(err.message);
                }

            })

    }, [])

    ///////// fetch roles ////////////
    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);

        axios.get(url_role, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data)
                    setRoles(response.data.roles);
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


    ///////// fetch authorizations ////////////
    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);

        axios.get(url_auth, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("authResponse", response.data)
                    setAuthorizations(response.data.authorizations);
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
    ///////// fetch user ////////////
    useEffect(() => {
        let isMounted = true;
        setTitle("تعديل حساب موظف")
        // console.log("fetchLeft",user);
      
        axios.get(url, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("uuuuuu", response.data)
                    setUser(response.data.data);
                    setName(response.data.data.user.name);
                    setUserName(response.data.data.user.userName);
                    setPassword(response.data.data.user.password);
                    setEmail(response.data.data.user.email);
                    setSalary(response.data.data.user.salary);
                    setTime(response.data.data.user.workTime);
                    setStatus(response.data.data.user.accountStatus);
                    setAdress(response.data.data.user.address);
                    setPhone(response.data.data.user.phoneNumber);
                    setLoading(false)
                    // setError(null);
                    // setLoad(false);
                }
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('clean up');
                    setLoading(false)

                }
                else {
                    setLoading(false);
                    // setError(err.message);
                }

            })

    }, [])




    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };




    ///////////// change Authorization ///////////
    const handleChangeAuth = (id, checked) => {
        // console.log(e.target.checked);
        console.log("auth id", id);
        if (checked === true) {


            auth.push(id);


        }
        else {
            let temp = auth.filter(function (item) {
                return item !== id
            })
            auth = temp
        }

        console.log("auth array", auth);


    }

    /////////////////// change roles /////////////
    const handleChangeRole = (id, checked) => {
        // console.log(e.target.checked);
        console.log("role id", id);
        if (checked === true) {


            role.push(id);


        }
        else {
            let temp = role.filter(function (item) {
                return item !== id
            })
            role = temp
        }

        console.log("role array", role);


    }


    const checkStatus = (name, value) => {
        const newState = obj.map(item => {

            if (item.name === name) {
                return { ...item, value: value };
            }
            return item;
        });

        setObj(newState);
        setStatus(value)
        if (value == "مستقيل") {
            setOpenStatus(true);
        }

    }

    const submitAuth = () => {
        setPermissions(auth);
        setOpen(false)
    }

    const submitRoles = () => {
        setRolesPost(role);
        setOpenRole(false)
    }

    const handleSubmit = (e) => {


        
        let submit_obj = obj;
        e.preventDefault();
        const formData = new URLSearchParams()
        console.log("ooobbbj", submit_obj);
        submit_obj.map((item) => {
            if(item.value != null){
                formData.append(item.name, item.value);
            }
                
        })


        formData.append('id',Number(id));

        if (status == "مستقيل") {
            formData.append('retieredDate', date);
            formData.append('cause', cause);
        }

        console.log("fffffffff",formData)

        axios.patch(edit_user, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);

                // navigate("/oneUser/" + id);
            })
            .catch(error => {
                console.log(error);
                setMsg(error.response.data.message);
                if (error.response.status == 422) {
                    setMsg(error.response.data.message);
                    setOpenAlert(true);

                    // setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
            })

        if (rolesPost.length != 0) {
            const formDataRole = new FormData();
            rolesPost.forEach(item => formDataRole.append('roles[]', item));
            axios.post(edit_role, formDataRole, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then((response) => {
                    console.log("response:", response.data);
                    console.log(response);
                    setMessage(response.data.message);
                    setOpenAlert(true);

                })
                .catch(error => {
                    console.log(error);
                })
        }

        if (permissions.length != 0) {
            const formDataAuth = new FormData();
            permissions.forEach(item => formDataAuth.append('permissions[]', item));
            axios.post(edit_auth, formDataAuth, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then((response) => {
                    console.log("response:", response.data);
                    console.log(response);
                    setMessage(response.data.message);
                    setOpenAlert(true);

                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const detectType = (value) => {
        if (value == "string")
            return "text"
        if (value == "string" || value == "double")
            return "text"
        if (value == "bigInteger" || value == "integer")
            return "number"
    }

    const changeValue = (name, value) => {
        const newState = obj.map(item => {

            if (item.name === name) {
                return { ...item, value: value };
            }
            return item;
        });

        setObj(newState);
    }


    return (
        <>
            {Loading && <LOADING />}


            <Grid container>
                <Grid item md={3} lg={3}>
                    <Container className={classes.modal} style={{ marginTop: "20%" }}>
                        <Grid container>
                            <Grid item md={6} lg={6}>
                                <span style={{ color: "#6c8997", fontWeight: "500", fontSize: "20px" }}> الأدوار </span>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <button className={classes.addButton} onClick={() => submitRoles()}>تسجيل</button>

                            </Grid>


                        </Grid>
                        <div className={classes.line}></div>
                        {roles && roles.map((item) => (
                            <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                                <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word" }}>

                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label={`${item.role}`} onChange={(e) => handleChangeRole(item.roleId, e.target.checked)} style={{ fontSize: "20px", color: "#232730" }} />
                                    </FormGroup>
                                </div>

                            </div>
                        ))}






                    </Container>
                    <Container className={classes.modal} style={{ marginTop: "10%" }}>
                        <Grid container>
                            <Grid item md={6} lg={6}>
                                <span style={{ color: "#6c8997", fontWeight: "500", fontSize: "20px" }}> الصلاحيات </span>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <button className={classes.addButton} onClick={() => submitAuth()}>تسجيل</button>

                            </Grid>


                        </Grid>
                        <div className={classes.line}></div>
                        {authorizations && authorizations.map((item) => (
                            <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                                <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word" }}>

                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox />} label={`${item.name}`} onChange={(e) => handleChangeAuth(item.aId, e.target.checked)} style={{ fontSize: "20px", color: "#232730" }} />
                                    </FormGroup>
                                </div>

                            </div>
                        ))}






                    </Container>
                </Grid>
                <Grid item md={9} lg={9}>
                    <div className="containerAddAccount">
                        <Grid container >
                            <Grid item sm={2} xs={1} md={8} lg={8}  >
                                <>
                                    <Grid container style={{ direction: "rtl", marginRight: "5px" }}>
                                        {data && data.map((item) => (
                                            <>
                                                {item.viewType === "visible" &&
                                                    <Grid item sm={2} xs={1} md={6} lg={6} style={{ direction: "rtl", marginTop: "30px" }}>

                                                        <>
                                                            <span style={{ color: "#333", fontSize: "20px", marginRight: "10px" }}>{item.arabicName}</span><br />

                                                            {item.possibleValues.length == 0 &&
                                                                <>
                                                                    {obj && obj.length != 0 && obj.map((o) => (
                                                                        <>
                                                                            {o.name == item.EnglishName &&
                                                                                <TextField
                                                                                    id={detectType(item)}
                                                                                    key={item.EnglishName}
                                                                                    label=""
                                                                                    type={detectType(item.dataType)}
                                                                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                                                                    value={o.value}
                                                                                    onChange={(e) => changeValue(item.EnglishName, e.target.value)}
                                                                                    InputLabelProps={{
                                                                                        shrink: true,
                                                                                    }}
                                                                                />
                                                                            }
                                                                        </>
                                                                    ))}

                                                                </>
                                                            }
                                                            {/* {item.EnglishName == "imageIdentity" &&
                                                                <>
                                                                    {obj && obj.length != 0 && obj.map((o) => (
                                                                        <>
                                                                            {o.name == item.EnglishName &&
                                                                                <TextField
                                                                                    id="file"
                                                                                    label=""
                                                                                    type="file"
                                                                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                                                                    onChange={(e) => changeValue(item.EnglishName, e.target.files[0])}
                                                                                />
                                                                            }
                                                                        </>
                                                                    ))}

                                                                </>
                                                            } */}
                                                            {item.possibleValues.length != 0 &&
                                                                <>
                                                                    {obj && obj.length != 0 && obj.map((o) => (
                                                                        <>
                                                                            {o.name == item.EnglishName && item.EnglishName != "accountStatus" &&
                                                                                <Select
                                                                                    labelId="demo-select-small"
                                                                                    id="demo-select-small"
                                                                                    value={o.value}
                                                                                    onChange={(e) => changeValue(item.EnglishName, e.target.value)}
                                                                                    label=""
                                                                                    className={classes.select}

                                                                                >
                                                                                    {item.possibleValues.length != 0 && item.possibleValues.map((p) => (

                                                                                        <MenuItem value={p}> {p} </MenuItem>

                                                                                    ))}

                                                                                </Select>
                                                                            }

                                                                            {o.name == item.EnglishName && item.EnglishName == "accountStatus" &&
                                                                                <Select
                                                                                    labelId="demo-select-small"
                                                                                    id="demo-select-small"
                                                                                    value={o.value}
                                                                                    onChange={(e) => checkStatus(item.EnglishName, e.target.value)}
                                                                                    label=""
                                                                                    className={classes.select}

                                                                                >
                                                                                    {item.possibleValues.length != 0 && item.possibleValues.map((p) => (

                                                                                        <MenuItem value={p}> {p} </MenuItem>

                                                                                    ))}

                                                                                </Select>
                                                                            }
                                                                        </>
                                                                    ))}

                                                                </>
                                                            }
                                                        </>
                                                    </Grid>
                                                }

                                            </>
                                        ))}

                                    </Grid>

                                </>
                            </Grid>
                            <Grid item sm={2} xs={1} md={4} lg={4} className="picRight" >
                                <>
                                    <img src={userPic} alt="" className={classes.userImg} />
                                    <div className={classes.line}></div>
                                    <div style={{ position: "absolute", marginLeft: "2%" }}>
                                        <button className={classes.addButton} style={{ backgroundColor: "whitesmoke", color: "#4459a0", marginLeft: "2%" }} onClick={(e) => handleSubmit(e)}>تعديل</button>
                                    </div>

                                </>
                            </Grid>
                        </Grid>


                    </div>
                </Grid >
            </Grid>




            <Modal open={open} >
                <Container className={classes.modal}>
                    {authorizations && authorizations.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word" }}>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label={`${item.name}`} onChange={(e) => handleChangeAuth(item.aId, e.target.checked)} style={{ fontSize: "20px", color: "#232730" }} />
                                </FormGroup>
                            </div>

                        </div>
                    ))}




                    <div className={classes.submit}>
                        <button className={classes.addButton} onClick={() => submitAuth()}>تسجيل</button>


                    </div>

                </Container>
            </Modal>


            <Modal open={openRole} >
                <Container className={classes.modal}>
                    {roles && roles.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word" }}>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label={`${item.role}`} onChange={(e) => handleChangeRole(item.roleId, e.target.checked)} style={{ fontSize: "20px", color: "#232730" }} />
                                </FormGroup>
                            </div>

                        </div>
                    ))}




                    <div className={classes.submit}>
                        <button className={classes.addButton} onClick={() => submitRoles()}>تسجيل</button>


                    </div>

                </Container>
            </Modal>



            <Modal open={openStatus} >
                <Container className={classes.modalStatus}>
                    <form action="" >
                        <div style={{ marginTop: "60px", marginRight: "50px" }}>
                            <div>
                                <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px", marginRight: "60px" }}>السبب  </span></div>

                                <div className="input-field" style={{ width: "200px", marginRight: "50px" }}>
                                    <input type="text" style={{ width: "200px" }} placeholder=""
                                        value={cause} onChange={(e) => setCause(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <div className="label_user_div"> <span className="label_user" style={{ color: "#333", fontSize: "20px", marginRight: "60px" }}>التاريخ</span></div>

                                <div className="input-field" style={{ width: "200px", marginRight: "50px" }}>
                                    <TextField
                                        id="date"

                                        label=""
                                        type="date"
                                        style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                </div>
                            </div>
                        </div>

                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" ,width:"100px",height:"50px" }} onClick={() => setOpenStatus(false)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#646877", marginLeft: "20px" ,width:"100px",height:"50px" }} onClick={() => setOpenStatus(false)}>إلغاء</button>
                        </div>
                    </form>
                </Container>
            </Modal >

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}

export default EditAccount;