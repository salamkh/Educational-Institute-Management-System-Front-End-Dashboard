import { Button, Container, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, makeStyles, MenuItem, Modal, OutlinedInput, Select, Snackbar, TextField } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import "./editTeacher.css";
import userPic from "../../../../img/images.png"
import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser"
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import LOADING from "../../../Loading";

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
        background: "#6c8997",
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
        width: "80px",
        padding: "8px",
        margin: "10px",
        marginTop: 30,
        fontSize: "20px",
        marginLeft: "350px",

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



})
);


const EDITTEACHER = ({ setTitle }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [openRole, setOpenRole] = useState(false);
    const [openSubject, setOpenSubject] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [openCode, setOpenCode] = useState(false);

    const [roles, setRoles] = useState(null);
    const [authorizations, setAuthorizations] = useState(null);
    let role = [];
    let auth = [];
    let subjectArray = [];
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAdress] = useState("");
    const [status, setStatus] = useState("");
    const [cause, setCause] = useState("");
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");
    const [rolesPost, setRolesPost] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [subject, setSubject] = useState([]);
    const [certificate, setCertificate] = useState("");
    const [experience, setExperience] = useState("");
    const [cerDate, setCerDate] = useState("");
    const [exp, setExp] = useState("");
    const [one_user, setUser] = useState(null);
    const [Loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const params = useParams();
    const id = params.id;
    const edit_user = "http://127.0.0.1:8000/api/editUserProfil";
    const edit_role = "http://127.0.0.1:8000/api/updateUserRoles/" + id;
    const edit_auth = "http://127.0.0.1:8000/api/updateUserAuths/" + id;
    const edit_subject = "http://127.0.0.1:8000/api/editTeacherSubjects/" + id;
    const edit_exp = "http://127.0.0.1:8000/api/editTeacherExp/" + id;
    const url_subject = "http://127.0.0.1:8000/api/teacherSubjects/" + id;
    const url_exp = "http://127.0.0.1:8000/api/teacherexperience/" + id;
    const url = "http://127.0.0.1:8000/api/userProfile/" + id;
    const url_role = "http://127.0.0.1:8000/api/allRoles";
    const url_auth = "http://127.0.0.1:8000/api/allAuthorizations";
    const url_subjects = "http://127.0.0.1:8000/api/allSubjects";
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const navigate = useNavigate();


    console.log("user token", user)

    // const [open, setOpen] = useState(false);
    // const [role, setRole] = useState("");


    ///////// fetch roles ////////////
    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);
        setTitle("تعديل حساب  أستاذ")
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

    ///////// fetch subjects ////////////
    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);

        axios.get(url_subjects, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data)
                    setSubjects(response.data.subject);
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
                    setStatus(response.data.data.user.accountStatus);
                    setAdress(response.data.data.user.address);
                    setPhone(response.data.data.user.phoneNumber);

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

    ///////// fetch Subject ////////////
    useEffect(() => {
        let isMounted = true;
        axios.get(url_subject, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("uuuuuu", response.data)
                    setSubject(response.data.subjects);
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

    ///////// fetch Experince ////////////
    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);
        setLoading(true)
        axios.get(url_exp, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("uuuuuu", response.data)
                    setExp(response.data.expereince);
                    setCertificate(response.data.expereince.certificate);
                    setCerDate(response.data.expereince.cerDate);
                    setExperience(response.data.expereince.experience);
                    // setError(null);
                    setLoading(false)
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



    }, [])

    //////////// send Email ////////////////
    // const send = (e) => {
    //     e.preventDefault();

    //     emailjs.sendForm('service_btnh7vm', 'template_md22geb', formRef.current, '7ZpGWLdWXlSnRuUbp')
    //       .then((result) => {
    //         console.log(result.text);
    //         setOpen(false);
    //         setOpenR(true);
    //       }, (error) => {
    //         console.log(error.text);
    //       });
    //   }




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

    ///////////////// change subjects /////////////
    const handleChangeSubject = (id, checked) => {
        // console.log(e.target.checked);
        console.log("subject id", id);
        if (checked === true) {


            subjectArray.push(id);


        }
        else {
            let temp = subjectArray.filter(function (item) {
                return item !== id
            })
            subjectArray = temp
        }

        console.log("subject array", subjectArray);


    }

    const submitAuth = () => {
        setPermissions(auth);
        setOpen(false)
    }

    const submitRoles = () => {
        setRolesPost(role);
        setOpenRole(false)
    }
    const submitSubjects = () => {
        setSubjects(subjectArray);
        setOpenSubject(false)
    }

    const checkStatus = (e) => {
        setStatus(e.target.value)
        if (e.target.value == "مستقيل") {
            setOpenStatus(true);
        }

    }
    const handleSubmit = (e) => {

        e.preventDefault();

        ////////////// Edit User ////////////////
        const formData = new URLSearchParams()
        formData.append('name', name);
        formData.append('userName', userName);
        if (password) {
            formData.append('password', password);
        }

        formData.append('email', email);
        formData.append('phoneNumber', phone);
        formData.append('address', address);
        if (img) {
            formData.append('imageIdentity', img);
        }
        formData.append('accountStatus', status);
        formData.append('id', id);


        if (status == "مستقيل") {
            formData.append('retieredDate', date);
            formData.append('cause', cause);
        }

        axios.patch(edit_user, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);

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

        //////////////////// Edit Experience /////////////////
        const formDataExp = new URLSearchParams()
        formDataExp.append('experience', experience);
        formDataExp.append('certificate', certificate);
        formDataExp.append('cerDate', cerDate);
        axios.patch(edit_exp, formDataExp, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMessage(response.data.message);
                setOpenAlert(true);
                // navigate(0);
            })
            .catch(error => {
                console.log(error);
            })

        if (subjects.length != 0) {
            const formDataSubject = new FormData();
            subjects.forEach(item => formDataSubject.append('subjects[]', item));
            axios.post(edit_subject, formDataSubject, { headers: { authorization: "Bearer " + user.accessToken }, })
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

        navigate('/oneTeacher/' + id)
    }


    return (
        <>
            {Loading && <LOADING />}
            {!Loading &&
                <div className="containerAddTeacher">
                    <Grid container >
                        <Grid item sm={2} xs={1} md={8} lg={8}>
                            <>
                                <Grid container>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" style={{ marginTop: "30px" }}> <span className="label_user-left">الإيميل </span></div>
                                        <div className="input-field-user-left">

                                            <input type="email" className="input-form-user" placeholder=""
                                                value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>




                                    </Grid>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" style={{ marginTop: "30px" }}> <span className="label_user-left"> رقم الهاتف </span></div>
                                        <div className="input-field-user-left">

                                            <input type="text" className="input-form-user" placeholder=""
                                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" style={{ marginLeft: "80px" }} > <span className="label_user-left">صورة الهوية </span> <Publish className={classes.uploadIcon} /></div>
                                        <div className="input-field-user-left" style={{ width: "150px" }}>

                                            <input type="file" className="input-form-user" style={{ width: "100%", height: "20px", left: 0, fontSize: "12px" }} placeholder=""
                                                onChange={(e) => setImg(e.target.files[0])} />
                                        </div>

                                    </Grid>

                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" > <span className="label_user-left"> مكان الإقامة  </span></div>
                                        <div className="input-field-user-left">

                                            <input type="text" className="input-form-user" placeholder=""
                                                value={address} onChange={(e) => setAdress(e.target.value)} />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" style={{ marginLeft: "90px" }}> <span className="label_user-left" >إضافة صلاحيات </span></div>
                                        <div className="input-field-user-left" onClick={() => setOpen(true)}>
                                        </div>


                                    </Grid>

                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" > <span className="label_user-left" >الدور </span></div>
                                        <div className="input-field-user-left" onClick={() => setOpenRole(true)}>
                                        </div>


                                    </Grid>


                                </Grid>
                                <Grid container>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div"  > <span className="label_user-left"> حالة الحساب</span></div>
                                        <div className="input-field-user-left">

                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={status}
                                                onChange={(e) => checkStatus(e)}
                                                label=""
                                                className={classes.select}

                                            >
                                                <MenuItem value="موظف"> موظف   </MenuItem>

                                                <MenuItem value={"مستقيل"}>مستقيل</MenuItem>


                                            </Select>
                                        </div>




                                    </Grid>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>

                                        <div className="label_user_div" style={{ marginLeft: "90px" }}> <span className="label_user-left" >تحديد المواد  </span></div>
                                        <div className="input-field-user-left" onClick={() => setOpenSubject(true)}>
                                        </div>

                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" style={{ marginTop: "30px" }}> <span className="label_user-left">تاريخ الشهادة </span></div>
                                        <TextField
                                            id="date"
                                            label=""
                                            type="date"
                                            style={{ height: "20px", width: "150px", marginLeft: "20px" }}
                                            value={cerDate}
                                            onChange={(e) => setCerDate(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                    </Grid>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" style={{ marginTop: "30px" }}> <span className="label_user-left">الشهادة </span></div>
                                        <div className="input-field-user-left">

                                            <input type="email" className="input-form-user" placeholder=""
                                                value={certificate} onChange={(e) => setCertificate(e.target.value)} />
                                        </div>

                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item sm={2} xs={1} md={66} lg={6}>

                                    </Grid>
                                    <Grid item sm={2} xs={1} md={6} lg={6}>
                                        <div className="label_user_div" style={{ marginLeft: "90px" }}> <span className="label_user-left" >الخبرات السابقة</span></div>

                                        <TextField
                                            id="filled-multiline-flexible"
                                            label=""
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                            multiline
                                            maxRows={4}
                                            variant="filled"
                                            style={{ direction: "rtl" }}
                                        />



                                    </Grid>
                                </Grid>
                            </>
                            <button className={classes.addButton} onClick={(e) => handleSubmit(e)}>تعديل</button>

                        </Grid>
                        <Grid item sm={2} xs={1} md={4} lg={4} className="picRight" >
                            <>
                                <img src={userPic} alt="" className={classes.userImg} />
                                <div className={classes.line}></div>
                                <div className="label_user_div"> <span className="label_user">الاسم الكامل</span></div>
                                <div className="input-field-user">

                                    <input type="text" className="input-form-user" placeholder=""
                                        value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="label_user_div"> <span className="label_user">اسم المستخدم </span></div>
                                <div className="input-field-user">

                                    <input type="text" className="input-form-user" placeholder=""
                                        value={userName} onChange={(e) => setUserName(e.target.value)} />
                                </div>



                                <div className="label_user_div" style={{ marginLeft: "100px" }}><span className="label_user">  إنشاء كلمة السر</span></div>
                                <div className="input-field-user">

                                    <input type="password" className="input-form-user" placeholder=""
                                        value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </>
                        </Grid>
                    </Grid>


                </div>
            }


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

            <Modal open={openSubject} >
                <Container className={classes.modal}>
                    {subjects && subjects.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word" }}>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label={`${item.name}`} onChange={(e) => handleChangeSubject(item.sId, e.target.checked)} style={{ fontSize: "20px", color: "#232730" }} />
                                </FormGroup>
                            </div>

                        </div>
                    ))}
                    <div className={classes.submit}>
                        <button className={classes.addButton} onClick={() => submitSubjects()}>تسجيل</button>


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

            {/* <Modal open={openCode} >
                <Container className={classes.modal}>
                <div className="label_user_div"> <span className="label_user">أدخل الكود   </span></div>
                            <div className="input-field-user">

                                <input type="text" className="input-form-user" placeholder=""
                                />
                            </div>


                    <div className={classes.submit}>
    

                                            <Button variant="outlined" color="secondary" onClick={() => setOpen(false)} >إلغاء </Button>

                    </div>

                </Container>
            </Modal> */}

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}

export default EDITTEACHER;