import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, Snackbar, Modal, jssPreset ,TextField } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState } from "react";
import userPic from "../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './allUsers.css'
import './teachers/oneTeacher.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LOADING from "../../Loading";
import Alert from "@mui/material/Alert";
import { getDialogActionsUtilityClass } from "@mui/material";
import "../../../App.css"
const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(5),


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
        backgroundColor: "#3095C3",
        padding: "5px",
        borderRadius: "5px",
        color: "white",
    },

    addIcon: {
        backgroundColor: "#3095C3",
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
        borderRadius: "20px",
        border: "none",
        backgroundColor: "#456f85",
        color: "beige",
        cursor: "pointer",
        width: "100px",
        padding: "8px",

        marginTop: "10px",
        fontSize: "18px",

        '&:hover': {
            backgroundColor: "#a9adaf",
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
        marginTop: "10px",
        width: "100%",
        height: "3px",
        margin: "10px auto",
        background: "#3095C3",
        borderRadius: "5px",
        [theme.breakpoints.down("md")]: {
            width: "100px",

        },

    },

    lineExp: {
        width: "100%",
        height: "4px",
        margin: "10px auto",
        marginBottom: "20px",
        background: "#3095C3",
        borderRadius: "5px",
        [theme.breakpoints.down("md")]: {
            width: "100px",

        },

    },



})
);


const ALLUSERS = ({ setTitle }) => {
    const classes = useStyles();
    const url_role = "http://127.0.0.1:8000/api/allRoles";
    const url = "http://127.0.0.1:8000/api/allUsers";
    const url_auth = "http://127.0.0.1:8000/api/userProfile/";
    const url_delete = "http://127.0.0.1:8000/api/deleteUser/";
    const url_search_name = "http://127.0.0.1:8000/api/searchUserByname";
    const url_search_role = "http://127.0.0.1:8000/api/searchUserByRole/";
    const url_users = "http://127.0.0.1:8000/api/get_employees_names";
    const url_retired = "http://127.0.0.1:8000/api/get_user_retired/";
    const url_subjects = "http://127.0.0.1:8000/api/teacherSubjects/";
    const url_exp = "http://127.0.0.1:8000/api/teacherexperience/";
    const [users, setUsers] = useState(null);
    const [one_user, setUser] = useState(null);
    const [s_users, setSUsers] = useState(null);
    const [roles, setRoles] = useState(null);
    const [search_name, setSname] = useState("");
    const [search_role, setSrole] = useState("");
    const [Loading, setLoading] = useState(false);
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [openExp, setOpenExp] = useState(false);
    const [exp, setExp] = useState("");

    const [subjects, setSubjects] = useState([]);
    const [openStatus, setOpenStatus] = useState(false);
    const [show, setShow] = useState(false);
    const [openRole, setOpenRole] = useState(false);
    const [user_rolls, setUserRolls] = useState(null);
    const [retired, setRetired] = useState(null);
    const [rObject, setRObject] = useState([]);
    const navigate = useNavigate();

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

    /////// get users name ////////////
    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);
        let temp_data = [];
        axios.get(url_users, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data.data)
                    // temp_data=[response.data.data];
                    setSUsers(response.data.data);


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

    useEffect(() => {
        let isMounted = true;
        // console.log("fetchLeft",user);
        setTitle("عرض الموظفين")
        setLoading(true)
        axios.get(url, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data.userData)
                    setUsers(response.data.userData);
                    setLoading(false)
                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    // setError(null);
                    // setLoad(false);
                }
            })
            .catch((err) => {
                setMsg(err.response.data.message);
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

    const handleDelete = (userId) => {
        axios.delete(url_delete + userId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                navigate(0);
            })
            .catch(error => {
                setMsg(error.response.data.message);
                setOpenAlert(true);
                console.log(error);
            })

    }

    const searchByname = () => {

        setLoading(true)
        const formData = new FormData();
        formData.append('name', search_name);
        axios.post(url_search_name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setUsers(response.data.userData);
                setLoading(false)
            })
            .catch(error => {
                setMsg(error.response.data.message);
                console.log(error);
                setLoading(false)
            })
    }

    const searchByrole = () => {
        let role_id = 0;
        // roles.map((item) => {
        //     if (item.role === search_role)
        //         role_id = item.roleId;
        // })
        setLoading(true)
        console.log("search_role", search_role)
        axios.get(url_search_role + search_role, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setUsers(response.data.userData);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setLoading(false)

            })
            .catch(error => {
                setMsg(error.response.data.message);
                setOpenAlert(true);

                console.log(error);
                setLoading(false)
            })

    }

    const checkDetails = (item) => {
        if (item.userRoles) {
            let check = false;
            item.userRoles.map((i) => {
                if (i === "أستاذ") {
                    check = true;
                }
            })

            if (check) {
                return (
                    <>
                        <Link to={'/oneTeacher/' + item.userInfo.userId} ><span>التفاصيل</span></Link><br />
                    </>
                )
            }

            if (!check) {
                return (
                    <>
                        <Link to={'/oneUser/' + item.userInfo.userId} ><span>التفاصيل</span></Link><br />
                    </>

                )
            }
        }
    }



    const checkTeacher = (item) => {
        console.log("cccccccc", item)
        if (item.userRoles) {
            let check = false;
            item.userRoles.map((i) => {
                if (i === "أستاذ") {
                    check = true;
                }
            })
            let id = getId(item.userInfo);

            if (check) {
                return (

                    <Link to={'/editTeatcher/' + id}>
                        <Edit className={classes.editIcon} />
                    </Link>

                )
            }

            if (!check) {
                return (

                    <Link to={'/editAccount/' + id}>
                        <Edit className={classes.editIcon} />
                    </Link>

                )
            }
        }
    }

    const showExp = (exp_id) => {
        setOpenExp(true)
        setLoading(true)
        setSubjects(null);
        setExp(null)
        ///////// fetch Subject ////////////


        axios.get(url_subjects + exp_id, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {

                console.log("uuuuuu", response.data)
                setSubjects(response.data.subjects);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setLoading(false)



                // setError(null);
                // setLoad(false);

            })
            .catch((err) => {
                setMsg(err.response.data.message);
                console.log(err);
                if (err.name === 'AbortError') {
                    console.log('clean up');

                }
                else {
                    // setLoading(false);
                    // setError(err.message);
                }

            })



        ///////// fetch Experince ////////////




        axios.get(url_exp + exp_id, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {

                console.log("uuuuuu", response.data)
                setExp(response.data.expereince);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setLoading(false)
                // setError(null);
                // setLoad(false);

            })
            .catch((err) => {
                setMsg(err.response.data.message);
                console.log(err);
                if (err.name === 'AbortError') {
                    console.log('clean up');
                }
                else {
                    // setLoading(false);
                    // setError(err.message);
                }

            })

    }

    const checkExp = (item) => {
        console.log("cccccccc", item)
        if (item.userRoles) {
            let check = false;
            item.userRoles.map((i) => {
                if (i === "أستاذ") {
                    check = true;
                }
            })
            let id = getId(item.userInfo);

            if (check) {
                return (

                    <Grid item md={3} lg={3}> <button className={classes.addButton} onClick={() => showExp(id)}> الخبرات</button></Grid>
                )
            }
        }
    }

    const handleClose = (event, reason) => {
        // navigate(0);
        setOpenAlert(false);
    }

    const showRole = (item) => {

        setOpenRole(true);
        setUserRolls(item.userRoles);
    }

    const getId = (arr) => {
        let temp_arr = arr;
        for (let i = 0; i < temp_arr.length; i++) {
            if (temp_arr[i].label === "رقم المستخدم")
                return temp_arr[i].value;
        }
    }


    const fetchAuth = (item) => {
        let id = getId(item.userInfo);
        setLoading(true)
        setUser(null);
        setOpen(true);
        axios.get(url_auth + id, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {

                console.log("uuuuuu", response.data)
                setUser(response.data.data);
                setLoading(false)
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);

            })
            .catch((err) => {
                setMsg(err.response.data.message);
                setLoading(false)
                if (err.name === 'AbortError') {
                    console.log('clean up');
                }
                else {
                    // setLoading(false);
                    // setError(err.message);
                }

            })
    }


    const fetchRetired = (r_id) => {
        let obj = null;
        console.log("r_id", r_id)
        setOpenStatus(true);
        axios.get(url_retired + r_id, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {


                setRetired(response.data.data);
                // obj = { id: r_id, retieredDate: response.data.data.retieredDate, cause: response.data.data.cause }
                // console.log("uuuuuuooooo", obj)
                // setRObject([...rObject, obj]);

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
    }

    const checkStatus = (item) => {
        let temp_arr = item.userInfo;
        let show_re = false;
        let showId = 0;
        for (let i = 0; i < temp_arr.length; i++) {
            if (temp_arr[i].label === "حالة الحساب" && temp_arr[i].value === "مستقيل") {
                console.log("ggggg", temp_arr[i])
                for (let j = 0; j < temp_arr.length; j++) {
                    if (temp_arr[j].label === "رقم المستخدم") {

                        show_re = true;
                        showId = temp_arr[j].value;
                        // setShow(temp_arr[j].value)
                    }

                }

            }

        }

        if (show_re) {
            // fetchRetired(showId)
            return (
                <>
                    <Grid item md={3} lg={3}> <button className={classes.addButton} style={{ backgroundColor: "#973c57" }} onClick={() => fetchRetired(showId)} > الاستقالة</button></Grid>

                </>
            )
        }


    }

    return (
        <Container className={classes.container}>
            {Loading && <LOADING />}

            <div className={classes.header}>
                <Grid container spacing={2}>
                    <Grid item xs={11} md={3} lg={3}>
                        <span style={{ color: "#333", fontSize: "20px" }}>البحث حسب الاسم</span><br />
                        <TextField
                            id="text"

                            label=""
                            type="text"
                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                            value={search_name}
                            onChange={(e) => setSname(e.target.value)}

                        />

                        {/* <input type="text" className={classes.searchInput} value={search_name} onChange={(e) => setSname(e.target.value)} /> */}
                        <Button onClick={searchByname}><Search className={classes.searchIcon} /></Button>
                    </Grid>

                    <Grid item xs={11} md={3} lg={3}>
                        <span style={{ color: "#333", fontSize: "20px" }}>البحث  حسب الدور</span><br />
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={search_role}
                            onChange={(e) => setSrole(e.target.value)}
                            label=""
                            className={classes.select}

                        >
                            {roles && roles.map((item) => (

                                <MenuItem value={item.roleId} key={item.roleId}> {item.role}   </MenuItem>

                            ))}

                        </Select>
                        <Button onClick={searchByrole}><Search className={classes.searchIcon} /></Button>
                    </Grid>




                    <Grid item xs={1} md={3} lg={3} className={classes.addIconButton}>

                        <br />
                        <Tooltip title="إضافة مستخدم" area-label="add" >
                            <Link to='/addAccount'>
                                <button className="newButton">إضافة مستخدم </button>
                            </Link>
                        </Tooltip>
                        {/* <span style={{ color: "#333", fontSize: "20px" }}> إضافة مستخدم </span> */}

                    </Grid>

                    <Grid item xs={1} md={3} lg={3} className={classes.addIconButton}>

                        <br />
                        <Tooltip title="إضافة أستاذ" area-label="add" >
                            <Link to='/addTeacher'>
                            <button className="newButton">إضافة أستاذ </button>
                            </Link>
                        </Tooltip>
                      

                    </Grid>

                </Grid>

            </div>
            <div className={classes.line}></div>



            {users && users.map((i) => (
                <div className="allcard">
                    <Grid container>
                        <Grid item md={2} lg={2}>


                            <img src={userPic} alt="" className="imTec" />


                            <div className="social" style={{ marginRight: "8px" }}>
                                {/* <IconButton className={classes.Icons} >
                                    <DeleteOutlined className={classes.deleteIcon} />
                                </IconButton> */}
                                <IconButton >
                                    {checkTeacher(i)}
                                </IconButton>
                            </div>
                        </Grid>
                        <Grid item md={10} lg={10}>
                            <div style={{ width: "100%", overflow: "auto" }} >
                                <Grid container>

                                    {i.userInfo && i.userInfo.map((item) => (
                                        <>
                                            {item.viewType === "visible" && item.label !== "صورة الهوية" && item.label !== "حالة الحساب" &&

                                                <Grid item md={3} lg={3}><span style={{ color: "rgb(51, 83, 114)" }}>{item.label}:</span><p style={{ color: "rgb(51, 38, 51)" }}>{item.value}</p></Grid>
                                            }

                                            {item.viewType === "visible" && item.label !== "صورة الهوية" && item.label === "حالة الحساب" &&
                                                <>
                                                    {item.value == "موظف" &&
                                                        <Grid item md={3} lg={3}><span style={{ color: "rgb(51, 83, 114)" }}>{item.label}:</span><p style={{ color: "#32cf2c" }}>{item.value}</p></Grid>

                                                    }

                                                    {item.value == "مستقيل" &&
                                                        <Grid item md={3} lg={3}><span style={{ color: "rgb(51, 83, 114)" }}>{item.label}:</span><p style={{ color: "#8a1f3f" }}>{item.value}</p></Grid>

                                                    }
                                                </>
                                            }



                                        </>
                                    ))}
                                    {/* {i.userInfo && i.userInfo.map((item) => (
                                        <>


                                            {item.viewType === "visible" && item.label === "صورة الهوية" &&
                                                <Grid item md={3} lg={3}> <button className={classes.addButton} style={{ backgroundColor: "whitesmoke", color: "rgb(42, 92, 121)" }}>صورة الهوية</button></Grid>
                                            }
                                        </>
                                    ))} */}

                                    <Grid item md={3} lg={3}> <button className={classes.addButton} onClick={() => showRole(i)}> الأدوار</button></Grid>
                                    <Grid item md={3} lg={3}> <button className={classes.addButton} onClick={() => fetchAuth(i)}> الصلاحيات</button></Grid>
                                    {checkExp(i)}
                                    {checkStatus(i)}


                                </Grid >
                            </div>
                        </Grid>
                    </Grid>
                </div>

            ))}





            <Modal open={openExp} >
                <Container className={classes.modal}>
                    <Button variant="outlined" onClick={() => setOpenExp(false)} style={{ color: "pink", marginBottom: "10px" }}>X </Button>
                    {exp &&
                        <>
                            <br />

                            <div style={{ marginBottom: "10px" }}>
                                <span style={{ color: "#6c8997", fontWeight: "450", fontSize: "20px" }}>الشهادة: <span>{exp.certificate}</span></span><br />
                                <span style={{ color: "#6c8997", fontWeight: "450", fontSize: "20px" }}> تاريخ منح الشهادة:<span>{exp.cerDate}</span> </span><br />

                                <span style={{ color: "#6c8997", fontWeight: "450", fontSize: "20px" }}>الخبرات السابقة </span>
                            </div>


                            <div className="expContainer">
                                <div>
                                    <span style={{ color: "#333", fontWeight: "450", fontSize: "20px" }}>  {exp.experience} </span>
                                </div>
                            </div>
                        </>
                    }
                    <div className={classes.lineExp}></div>




                    <div style={{ marginBottom: "10px" }}>
                        <span style={{ color: "#6c8997", fontWeight: "600", fontSize: "25px" }}>المواد التي يستطيع تدريسها</span>
                    </div>

                    {Loading && <LOADING />}

                    {subjects && subjects.length != 0 && subjects.map((item) => (
                        <div className="box">
                            <div className="content">
                                <div className="text">
                                    <span style={{ fontWeight: "500", fontSize: "20px" }}>{item.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                </Container>
            </Modal >


            <Modal open={open} >
                <Container className={classes.modal}>

                    <Button variant="outlined" onClick={() => setOpen(false)} style={{ color: "pink", marginBottom: "10px" }}>X </Button>

                    <div style={{ marginBottom: "20px" }}>
                        <span style={{ color: "#6c8997", fontWeight: "600", fontSize: "25px" }}>الصلاحيات</span>
                    </div>
                    <div className={classes.lineExp} style={{ marginBottom: "15px" }}></div>
                    {Loading && <LOADING />}
                    {one_user && one_user.permissions.length != 0 && one_user.permissions.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "200px", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                <div style={{ marginRight: "10px", marginTop: "12px" }}>
                                    <span style={{ fontWeight: "500", fontSize: "20px" }}>{item}</span>
                                </div>

                            </div>

                        </div>
                    ))}





                </Container>
            </Modal>

            <Modal open={openRole} >
                <Container className={classes.modal}>
                    <Button variant="outlined" onClick={() => setOpenRole(false)} style={{ color: "pink", marginBottom: "10px" }}>X </Button>
                    <div style={{ marginBottom: "20px" }}>
                        <span style={{ color: "#6c8997", fontWeight: "600", fontSize: "25px" }}>الأدوار</span>
                    </div>
                    <div className={classes.lineExp} style={{ marginBottom: "15px" }}></div>
                    {user_rolls && user_rolls.length != 0 && user_rolls.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "200px", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word", marginRight: "10px", marginTop: "8px" }}>
                                <div style={{ marginRight: "10px", marginTop: "12px" }}>
                                    <span style={{ fontWeight: "500", fontSize: "20px" }}>{item}</span>
                                </div>

                            </div>

                        </div>
                    ))}



                </Container>
            </Modal>

            <Modal open={openStatus} >
                <Container className={classes.modal} style={{ height: "300px" }}>

                    <Button variant="outlined" onClick={() => setOpenStatus(false)} style={{ color: "pink", marginBottom: "10px" }}>X </Button>

                    <div style={{ marginBottom: "20px" }}>
                        <span style={{ color: "#6c8997", fontWeight: "600", fontSize: "25px" }}>معلومات الاستقالة</span>
                    </div>
                    <div className={classes.lineExp} style={{ marginBottom: "15px" }}></div>
                    {Loading && <LOADING />}
                    {retired &&
                        <Grid container>
                            <Grid item md={3} lg={3}><span style={{ color: "rgb(51, 83, 114)" }}>تاريخ الاستقالة:</span><p style={{ color: "#8a1f3f" }}>{retired.retieredDate}</p></Grid>
                            <Grid item md={3} lg={3}><span style={{ color: "rgb(51, 83, 114)" }}>سبب الاستقالة:</span><p style={{ color: "#8a1f3f" }}>{retired.cause}</p></Grid>
                        </Grid>
                    }





                </Container>
            </Modal>


            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </Container >
    );
}

export default ALLUSERS;