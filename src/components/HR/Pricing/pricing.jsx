import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined, Search } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import userPic from "../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './pricing.css'
import '../table.css'
import downloadjs from 'downloadjs';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';

import Alert from "@mui/material/Alert";

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
        width: 600,
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
        overflow: "auto",
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
        backgroundColor: "#3095C3",
        color: "beige",
        cursor: "pointer",
        width: "fit-content",
        padding: "8px",
        margin: "10px",
        // marginTop: 30,
        fontSize: "20px",
        marginLeft: "350px",

        '&:hover': {
            backgroundColor: "#6c8997",
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
        background: "#6c8997",
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

    pdfIcon: {
        backgroundColor: "#3095C3",
        padding: "5px",
        borderRadius: "50%",
        color: "white",
        width: "25px",
        height: "25px",

    },

})
);


const PRICING = ({ setTitle }) => {
    const classes = useStyles();
    // let newDate = new Date();
    // let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    const url_add = "http://127.0.0.1:8000/api/add_pricing_plan";
    const url_delete = "http://127.0.0.1:8000/api/delete_pricing_plan/";
    const url_add_domain = "http://127.0.0.1:8000/api/add_domain_To_pricing_plan/";
    const url_delete_domain = "http://127.0.0.1:8000/api/delete_domain_from_pricing_plan/";
    const url_add_course = "http://127.0.0.1:8000/api/add_course_to_plan";
    const url_delete_course = "http://127.0.0.1:8000/api/delete_course_from_plan";
    const url_all_course = "http://127.0.0.1:8000/api/show_courses_to_add_to_courses";
    const url_open_period = "http://127.0.0.1:8000/api/students_depts_in_type_open_period/";
    const url_range_account = "http://127.0.0.1:8000/api/Financial_Operations_On_Account_In_Range/";
    const url_std_account = "http://127.0.0.1:8000/api/student_Dept_For_Type/";
    const url_by_name = "http://127.0.0.1:8000/api/search_Financial_Accounts_By_name";
    const url_get_plans = "http://127.0.0.1:8000/api/get_pricing_plan";

    const [date, setDate] = useState(null);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [from_account, setFAccount] = useState("");
    const [to_account, setTAccount] = useState("");
    const [from_id, setFId] = useState(null);
    const [to_id, setTId] = useState("");
    const [balance, setBalance] = useState("");
    const [desc, setDesc] = useState("");
    const [types, setTypes] = useState([]);
    const [stds, setStds] = useState([]);
    const [type_op, setType] = useState("");
    const [search_type, setSType] = useState("");
    const [search_std, setSTD] = useState("");
    const [period_type, setPType] = useState("");
    const [account, setAccount] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [sId, setSId] = useState("");
    const [data, setData] = useState([]);
    const [allClass, setClasses] = useState([]);
    const [plan, setPlan] = useState("");
    const [domains, setDomains] = useState([]);
    // const [tId, setTId] = useState("");

    const [open, setOpen] = useState(false);
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const [openType, setOpenType] = useState(false);

    const [openEdit, setOpenEdit] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const [showId, setShowId] = useState("");
    const [part, setPart] = useState(false);
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const navigate = useNavigate();
    const [report, setReport] = useState(false);
    const printRef = useRef();
    const reportRef = useRef();
    const [resp, setResp] = useState(null);
    const [openResp, setOpenResp] = useState(false);
    const [openD, setOpenD] = useState(false);
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [cost, setCost] = useState("");
    const [planId, setPlanId] = useState("");
    const [subject, setSubject] = useState("");
    const [subjects, setSubjects] = useState("");
    const [openSub, setOpenSub] = useState("");
    const [type, setTy] = useState("");
    useEffect(() => {
        let isMounted = true;
        setTitle("حساب مستحقات الأستاذ")

        setLoading((true));
        axios.get(url_get_plans, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                if (isMounted) {
                    console.log("response:", response.data.message);
                    console.log(response);
                    setData(response.data.data);
                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setLoading(false);
                }


            })
            .catch(error => {
                console.log(error);
                setMsg(error.response.data.message);

                if (error.response.status == 422) {

                    setMsg(error.response.data.message);
                    setOpenAlert(true);
                    setOpen(false)
                    // setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
                if (error.name === 'AbortError') {
                    console.log('clean up');
                }
            })

    }, [])

    useEffect(() => {
        let isMounted = true;

        setOpenType(true);
        setLoading((true));
        axios.get(url_all_course, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                if (isMounted) {
                    console.log("response:", response.data.message);
                    console.log(response);
                    setSubjects(response.data.data);
                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setLoading(false);
                }


            })
            .catch(error => {
                console.log(error);
                setMsg(error.response.data.message);

                if (error.response.status == 422) {

                    setMsg(error.response.data.message);
                    setOpenAlert(true);
                    setOpen(false)
                    // setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
            })

    }, [])






    const modalReport = useReactToPrint({
        content: () => reportRef.current,
    })

    const submit = (e) => {
        e.preventDefault();
        console.log("domains", domains)
        const formData = new FormData();

        formData.append('name', plan);
        // if (domains.length != 0) {
        //     domains.forEach(item => formData.append('domains[]', JSON.stringify(item)));
        // }

        for (let i = 0; i < domains.length; i++) {
            formData.append(
                `domains[${i}][min]`,
                domains[i].min
            );
            formData.append(
                `domains[${i}][max]`,
                domains[i].max
            );
            formData.append(
                `domains[${i}][cost]`,
                domains[i].cost
            );
        }

        axios.post(url_add, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                setOpenAlert(true);

             
                // navigate(0);
            })
            .catch(error => {
                setMsg(error.response.data.message);
                // console.log("res.message", response.data)

                console.log(error);
                if (error.response.status == 422) {

                    setMsg(error.response.data.message);
                    setOpenAlert(true);
                    setOpen(false)
                    // setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
            })
    }

    const submitDomain = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('min', min);
        formData.append('max', max);
        formData.append('cost', cost);

        axios.post(url_add_domain + planId, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                setOpenAlert(true);

         
                // navigate(0);
            })
            .catch(error => {
                setMsg(error.response.data.message);
                // console.log("res.message", response.data)

                console.log(error);
                if (error.response.status == 422) {

                    setMsg(error.response.data.message);
                    setOpenAlert(true);
                    setOpen(false)
                    // setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
            })
    }

    const submitCourse = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('planId', planId);
        formData.append('courseId', subject);
      

        axios.post(url_add_course , formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                setOpenAlert(true);

              
                navigate(0);
            })
            .catch(error => {
                setMsg(error.response.data.message);
                // console.log("res.message", response.data)

                console.log(error);
                if (error.response.status == 422) {

                    setMsg(error.response.data.message);
                    setOpenAlert(true);
                    setOpen(false)
                 
                    // setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
            })
    }

    const printReport = () => {
        setReport(true);
    }


    const exportPDF = useReactToPrint({
        content: () => printRef.current,
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const handleDelete = (oId) => {
        axios.delete(url_delete + oId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                navigate(0);
            })
            .catch(error => {
                console.log(error);
                setMsg(error.response.data.message);

                setOpenAlert(true);
            })

    }

    const deleteDomain = (domId) => {
        axios.delete(url_delete_domain + domId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                navigate(0);
            })
            .catch(error => {
                console.log(error);
                setMsg(error.response.data.message);

                setOpenAlert(true);
            })
    }

    const courseDelete = (cId) => {
        const formData = new FormData();

    
        formData.append('courseId', cId);
        axios.post(url_delete_course , formData , { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                navigate(0)
            })
            .catch(error => {
                console.log(error);
                setMsg(error.response.data.message);

                setOpenAlert(true);
            })
    }

    const handleChange = (id, checked) => {
        // console.log(e.target.checked);
        setSId(id);

        setOpenSearch(false)

    }

    const detectDiv = (item) => {
        setShowId(item);
        setShowDetails(true);
    }

    const addPos = () => {
        setDomains([...domains, { min: Number(min), max: Number(max), cost: Number(cost) }]);
        setMin("");
        setMax("");
        setCost("");
    }

    const removePos = (value) => {
        setDomains((item, index) => item.filter((i, n) => value != n))
    }

    return (
        <Container className={classes.container}>
            <div className={classes.header}>
                <div style={{ display: "flex" }}>

                    <div>
                        <button className={classes.addButton} style={{ borderRadius: "8px", marginTop: "15px" }} onClick={() => setOpen(true)}>إضافة خطة تسعير </button>

                    </div>


                </div>

            </div>

            <div className={classes.line}></div>


            <div style={{ direction: "rtl", marginTop: "4%" }}>

                <div style={{ marginTop: "10px" }}>
                    {data && data.length != 0 && data.map((item) => (
                        <div className="containerItemFieldSTD ">
                            <Grid container spacing={2}>
                                <Grid item lg={2}>
                                    <div style={{ marginTop: "20px", marginRight: "10%" }}>
                                        <h3 style={{ fontSize: "20px", fontWeight: "550", color: "#365669" }}> {item.plan.planName}  </h3>
                                    </div>

                                </Grid>

                                <Grid item lg={10}>
                                    <div style={{ display: "flex" }}>
                                        <div>   <button className="buttonPrice" onClick={() => { detectDiv(item.plan.planId); setPart(false); setShowDetails(true); }} >المجالات</button></div>
                                        <div >   <button className="buttonPrice" onClick={() => { detectDiv(item.plan.planId); setPart(true); setShowDetails(true); }} >الدورات</button></div>
                                        <div>
                                            <IconButton className={classes.Icons} >
                                                {((!showDetails) || (showDetails && showId != item.plan.planId)) &&
                                                    < KeyboardArrowDownOutlined className="downBottom" onClick={() => detectDiv(item.plan.planId)} style={{ color: "#365669" }} />
                                                }
                                                {showDetails && showId == item.plan.planId &&
                                                    < KeyboardArrowUpOutlined className="downBottom" onClick={() => setShowDetails(false)} style={{ color: "#365669" }} />
                                                }
                                            </IconButton>
                                        </div>
                                        <div style={{ marginRight: "60%", marginTop: "15px" }}>
                                            <button className={classes.addButton} style={{ borderRadius: "8px", width: "120px", backgroundColor: "#8a3b4e" }} onClick={() => handleDelete(item.plan.planId)}>حذف الخطة </button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            {showDetails && !part && showId == item.plan.planId &&
                                <Grid container spacing={2}>
                                    <Grid item lg={2}>
                                        <div>
                                            <button className={classes.addButton} style={{ borderRadius: "8px", width: "120px", backgroundColor: "#51677c" }} onClick={() => { setPlanId(item.plan.planId); setOpenTo(true) }} >إضافة مجال</button>
                                        </div>
                                    </Grid>

                                    <Grid item lg={10}>

                                        <div className="domainContainer">
                                            <Grid container spacing={2} >
                                                <Grid item lg={4}><h3 style={{ color: "#3d3042" }}>العدد الأصغري للطلاب</h3></Grid>
                                                <Grid item lg={4}><h3 style={{ color: "#3d3042" }}>العدد الأعظمي للطلاب</h3></Grid>
                                                <Grid item lg={3}><h3 style={{ color: "#3d3042" }}> التسعيرة </h3></Grid>
                                                <Grid item lg={1}><h3 style={{ color: "#3d3042" }}> حذف </h3></Grid>
                                            </Grid>

                                            {item.domains && item.domains.length != 0 && item.domains.map((i) => (
                                                <>
                                                    <div className="lineDomain"></div>
                                                    <Grid container spacing={2} >
                                                        <Grid item lg={4}><h3 >{i.min}  </h3></Grid>
                                                        <Grid item lg={4}><h3 >{i.max}  </h3></Grid>
                                                        <Grid item lg={3}><h3 > {i.cost} </h3></Grid>
                                                        <Grid item lg={1}>
                                                            <IconButton className={classes.Icons} >
                                                                <DeleteOutlined className={classes.deleteIcon} onClick={() => deleteDomain(i.planCostId)} />
                                                            </IconButton>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            ))}


                                        </div>
                                    </Grid>
                                </Grid>
                            }

                            {showDetails && part && showId == item.plan.planId &&
                                <Grid container spacing={2}>
                                    <Grid item lg={2}>
                                        <div>
                                            <button className={classes.addButton} style={{ borderRadius: "8px", width: "120px", backgroundColor: "#51677c" }} onClick={()=>{setPlanId(item.plan.planId);setOpenSub(true)}} >إضافة دورة</button>
                                        </div>
                                    </Grid>

                                    <Grid item lg={10}>

                                        <div className="domainContainer">
                                            <Grid container spacing={2} >
                                                <Grid item lg={5}><h3 style={{ color: "#3d3042" }}>اسم المادة</h3></Grid>
                                                <Grid item lg={5}><h3 style={{ color: "#3d3042" }}>فئة الدورة</h3></Grid>
                                                <Grid item lg={2}><h3 style={{ color: "#3d3042" }}> حذف </h3></Grid>
                                            </Grid>
                                            {item.courses && item.courses.length != 0 && item.courses.map((i) => (
                                                <>
                                                    <div className="lineDomain"></div>
                                                    <Grid container spacing={2} >
                                                        <Grid item lg={5}><h3 >{i.subjectName}</h3></Grid>
                                                        <Grid item lg={5}><h3 >{i.typeName}</h3></Grid>
                                                        <Grid item lg={2}>
                                                            <IconButton className={classes.Icons} >
                                                                <DeleteOutlined className={classes.deleteIcon} onClick={() => courseDelete(i.courseId)} />
                                                            </IconButton>
                                                        </Grid>

                                                    </Grid>
                                                </>
                                            ))}

                                        </div>
                                    </Grid>
                                </Grid>
                            }
                        </div>
                    ))}



                </div>
            </div>


            <Modal open={open} >
                <Container className={classes.modal} style={{ height: "300px", width: "500px" }}>
                    <form action="" >
                        <Grid container style={{ marginTop: "60px", marginRight: "20%" }}>
                            <Grid item md={6} lg={12}>
                                <span style={{ color: "#333", fontSize: "20px" }}>اسم الخطة </span><br />
                                <TextField
                                    label=""
                                    type="text"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={plan}
                                    onChange={(e) => setPlan(e.target.value)}

                                />


                            </Grid>


                        </Grid>

                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px", width: "100px",height:"50px" }} onClick={() => { setOpen(false); setOpenD(true) }}>التالي</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px", width: "100px",height:"50px" }} onClick={() => setOpen(false)}>إلغاء</button>


                        </div>
                    </form>
                </Container>
            </Modal >

            <Modal open={openD} >
                <Container className={classes.modal} style={{ height: "600px", width: "700px" }} >
                    <div style={{ marginRight: "40%", marginTop: "2%" }}> <h3 style={{ fontSize: "20px", fontWeight: 600 }}>مجالات الخطة</h3> </div>

                    <form action="" >
                        <Grid container style={{ marginTop: "60px" }}>
                            <Grid item md={3} lg={4}>
                                <span style={{ color: "#333", fontSize: "20px" }}>عدد الطلاب الأصغري</span><br />
                                <TextField
                                    label=""
                                    type="number"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={min}
                                    onChange={(e) => setMin(e.target.value)}

                                />


                            </Grid>

                            <Grid item md={3} lg={4}>
                                <span style={{ color: "#333", fontSize: "20px" }}>عدد الطلاب الأعظمي</span><br />
                                <TextField
                                    label=""
                                    type="number"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={max}
                                    onChange={(e) => setMax(e.target.value)}

                                />


                            </Grid>
                            <Grid item md={3} lg={3}>
                                <span style={{ color: "#333", fontSize: "20px", marginRight: "1%" }}>التسعيرة  </span><br />
                                <TextField
                                    label=""
                                    type="number"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}

                                />


                            </Grid>
                            <Grid item md={1} lg={1} >
                                <Button onClick={() => addPos()}><Add className={classes.addIcon} /></Button>


                            </Grid>

                        </Grid>
                        <div className={classes.line}></div>
                        <div style={{ direction: "rtl", height: "300px", position: "relative", overflowY: "auto" }}>
                            <Grid container spacing={2} style={{ marginRight: "1%" }}>
                                <Grid item lg={4}><h3 style={{ color: "#3d3042" }}>عدد الطلاب الأصغري</h3></Grid>
                                <Grid item lg={4}><h3 style={{ color: "#3d3042" }}> عدد الطلاب الأعظمي </h3></Grid>
                                <Grid item lg={2}><h3 style={{ color: "#3d3042" }}> التسعيرة </h3></Grid>
                                <Grid item lg={2}><h3 style={{ color: "#3d3042" }}> حذف </h3></Grid>
                            </Grid>
                            {domains && domains.length != 0 && domains.map((item, index) => (
                                <div className="divAddDomain">
                                    <Grid container spacing={2} style={{ marginRight: "1%" }} >
                                        <Grid item lg={4}><h3 >{item.min}  </h3></Grid>
                                        <Grid item lg={4}><h3 >{item.max}  </h3></Grid>
                                        <Grid item lg={2}><h3 > {item.cost} </h3></Grid>
                                        <Grid item lg={2} style={{marginTop:"3%"}}>
                                        
                                                <DeleteOutlined className={classes.deleteIcon} onClick={() => removePos(index)} />
                                           
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        </div>

                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px", width: "100px",height:"40px" }} onClick={(e) => submit(e)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px", width: "100px",height:"40px" }} onClick={() => { setOpenD(false); setOpen(true) }}>السابق</button>


                        </div>
                    </form>
                </Container>
            </Modal >
            <Modal open={openTo} >
                <Container className={classes.modal} style={{ height: "400px" }}>
                    <form action="" >
                        <Grid container style={{ marginTop: "60px" }}>
                            <Grid item md={3} lg={6}>
                                <span style={{ color: "#333", fontSize: "20px" }}>عدد الطلاب الأصغري</span><br />
                                <TextField
                                    label=""
                                    type="number"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={min}
                                    onChange={(e) => setMin(e.target.value)}

                                />


                            </Grid>

                            <Grid item md={3} lg={6}>
                                <span style={{ color: "#333", fontSize: "20px" }}>عدد الطلاب الأعظمي</span><br />
                                <TextField
                                    label=""
                                    type="number"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={max}
                                    onChange={(e) => setMax(e.target.value)}

                                />


                            </Grid>
                            <Grid item md={3} lg={6} style={{ marginTop: "8%" }}>
                                <span style={{ color: "#333", fontSize: "20px", marginRight: "1%" }}>التسعيرة  </span><br />
                                <TextField
                                    label=""
                                    type="number"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={cost}
                                    onChange={(e) => setCost(e.target.value)}

                                />


                            </Grid>


                        </Grid>


                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px",  width: "100px",height:"40px" }} onClick={(e) => submitDomain(e)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px",  width: "100px",height:"40px" }} onClick={() => setOpenTo(false)}>إلغاء</button>
                        </div>
                    </form>


                </Container>
            </Modal>

            <Modal open={openSub} >
                <Container className={classes.modal} style={{ height: "300px", width:"500px" ,marginTop:"10%" }}>
                    <form action="" >
                        <Grid container style={{ marginTop: "60px" ,marginRight:"20%" }}>
                            <Grid item md={12} lg={12}>
                                <span style={{ color: "#333", fontSize: "20px" }}>اسم الدورة :</span><br />
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    label=""
                                    className={classes.select}

                                >
                                    {subjects.length != 0 && subjects.map((item) => (

                                        <MenuItem value={item.courseId} key={item.courseId} >  مادة : {item.subjectName} - فئة : {item.typeName} </MenuItem>

                                    ))}

                                </Select>
                              
                            </Grid>

            
                        </Grid>


                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px", width: "100px" ,height:"50px" }} onClick={(e) => submitCourse(e)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px", width: "100px"  ,height:"50px"}} onClick={() => setOpenSub(false)}>إلغاء</button>
                        </div>
                    </form>


                </Container>
            </Modal>

            <Modal open={openResp} >
                <Container className={classes.modal} style={{ overflow: "auto", borderRadius: "8px" }}>
                    <div className="reportModal" ref={reportRef}>
                        <h3>معهد التفوق</h3>
                        <div className={classes.line}></div>
                        <div className="divMod">
                            <div className="divModHeader"><h5>سند قبض</h5></div>
                            {resp &&
                                <div className="divModBody">
                                    <p>تمّ استلام مبلغ <span>{resp.balance} &nbsp;</span>من الحساب <span>{resp.studentName}&nbsp;</span>
                                        بتاريخ <span>{resp.operationDate}&nbsp;</span> وذلك من أجل <span>{resp.description}&nbsp;</span></p>
                                    <p>اسم المستلم : <span>{resp.userName}</span></p>
                                </div>
                            }
                            <div className={classes.line}></div>

                        </div>
                    </div>
                    <div className={classes.submit}>
                        <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px", width: "80px", borderRadius: "8px" }} onClick={() => modalReport()}>طباعة</button>
                        <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px", width: "80px", borderRadius: "8px" }} onClick={() => setOpenResp(false)}>إغلاق</button>


                    </div>
                </Container>
            </Modal >

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </Container >
    );
}

export default PRICING;