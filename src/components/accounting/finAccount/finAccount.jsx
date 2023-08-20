import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import userPic from "../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './finAccount.css'
import '../../HR/table.css'
import downloadjs from 'downloadjs';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import download from "downloadjs";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import * as FileSaver from 'file-saver';
import XLSX from 'sheetjs-style'
import { excel } from "react-export-table-to-excel/lib/lib";
import { useReactToPrint } from 'react-to-print';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Alert from "@mui/material/Alert";

const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(6),


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
        height: 300,
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


const FINACCOUNT = ({ setTitle }) => {
    const classes = useStyles();
    let newDate = new Date();
    let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    const url_add = "http://127.0.0.1:8000/api/add_Financial_account";
    const url_delete = "http://127.0.0.1:8000/api/delete_financial_account/";
    const url_all = "http://127.0.0.1:8000/api/get_All_Financial_Accounts";
    const url_by_type = "http://127.0.0.1:8000/api/get_Financial_Accounts_By_Type";
    const url_by_name = "http://127.0.0.1:8000/api/search_Financial_Accounts_By_name";
    const url_allEmployee = "http://127.0.0.1:8000/api/get_All_Employee_Financial_Accounts";
    const url_users = "http://127.0.0.1:8000/api/get_Financial_Users_Accounts";
    const url_teachers = "http://127.0.0.1:8000/api/get_Financial_Teachers_Accounts";
    const url_students = "http://127.0.0.1:8000/api/get_Financial_Students_Accounts";
    const url_typs = "http://127.0.0.1:8000/api/get_Financial_Types_Accounts";
    const url_get_types = "http://127.0.0.1:8000/api/showAllTypes";
    const url_std_type = "http://127.0.0.1:8000/api/get_Financial_Students_Accounts_Belong_Type/";
    const [name, setName] = useState(null);
    const [type, setType] = useState(null);
    const [s_name, setSName] = useState("");
    const [s_type, setSType] = useState("");
    const [search, setSearch] = useState("");
    const [data, setData] = useState("");
    const [tId, setTId] = useState("");
    const [types, setTypes] = useState(null);
    const [open, setOpen] = useState(false);
    const [openType, setOpenType] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const navigate = useNavigate();
    const [report, setReport] = useState(false);
    const printRef = useRef();

    useEffect(() => {
        let isMounted = true;
        setTitle("الحسابات المالية ")
        // console.log("fetchLeft",user);
        let temp_data = [];
        axios.get(url_all, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data.data)
                    setData(response.data.data);
                    setMsg(response.data.message);
                    setOpenAlert(true);
                }
            })
            .catch((err) => {
                setMsg(err.response.data.message);
                setOpenAlert(true);
                if (err.response.status == 422) {

                    setMsg(err.response.data.message);
                    setOpenAlert(true);

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

    useEffect(() => {

        if (report) {
            exportPDF();
            setReport(false);
        }
    }, [report])

    useEffect(() => {

        if (search == "طلاب دورة تعليمية") {
            setOpenType(true);
            setLoading((true));
            axios.get(url_get_types, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then((response) => {
                    console.log("response:", response.data.message);
                    console.log(response);
                    setTypes(response.data.Types);
                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setLoading(false);


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
        }
    }, [search])



    const searchHandle = () => {
        if (s_name != "") {
            const formData = new FormData();
            formData.append('accountName', s_name);

            axios.post(url_by_name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then((response) => {
                    console.log("response:", response.data.message);
                    console.log(response);
                    setData(response.data.data);
                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setSName("")

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
        }

        if (s_type != "") {
            const formData = new FormData();
            formData.append('status', s_type);

            axios.post(url_by_type, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then((response) => {
                    console.log("response:", response.data.message);
                    console.log(response);
                    setData(response.data.data);
                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setSType("")

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
        }

        if (search != "") {
            if (search == "جميع الموظفين") {

                axios.get(url_allEmployee, { headers: { authorization: "Bearer " + user.accessToken }, })
                    .then((response) => {
                        console.log("response:", response.data.message);
                        console.log(response);
                        setData(response.data.data);
                        setMsg(response.data.message);
                        console.log("res.message", response.data)
                        setOpenAlert(true);
                        setSearch("")

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
            }
            if (search == "الموظفين الإداريين") {

                axios.get(url_users, { headers: { authorization: "Bearer " + user.accessToken }, })
                    .then((response) => {
                        console.log("response:", response.data.message);
                        console.log(response);
                        setData(response.data.data);
                        setMsg(response.data.message);
                        console.log("res.message", response.data)
                        setOpenAlert(true);
                        setSearch("")

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
            }
            if (search == "الأساتذة") {

                axios.get(url_teachers, { headers: { authorization: "Bearer " + user.accessToken }, })
                    .then((response) => {
                        console.log("response:", response.data.message);
                        console.log(response);
                        setData(response.data.data);
                        setMsg(response.data.message);
                        console.log("res.message", response.data)
                        setOpenAlert(true);
                        setSearch("")

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
            }
            if (search == "الطلاب") {

                axios.get(url_students, { headers: { authorization: "Bearer " + user.accessToken }, })
                    .then((response) => {
                        console.log("response:", response.data.message);
                        console.log(response);
                        setData(response.data.data);
                        setMsg(response.data.message);
                        console.log("res.message", response.data)
                        setOpenAlert(true);
                        setSearch("")

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
            }

            if (search == "دورات تعليمية") {

                axios.get(url_typs, { headers: { authorization: "Bearer " + user.accessToken }, })
                    .then((response) => {
                        console.log("response:", response.data.message);
                        console.log(response);
                        setData(response.data.data);
                        setMsg(response.data.message);
                        console.log("res.message", response.data)
                        setOpenAlert(true);
                        setSearch("")

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
            }


        }

    }



    const searchType = (e) => {
        e.preventDefault();
        axios.get(url_std_type + tId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setData(response.data.data);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setSearch("")
                //    setOpenType(false)

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


    }

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('accountName', name);
        formData.append('status', type);

        axios.post(url_add, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                setOpenAlert(true);
                setOpen(false);
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

    const handleDelete = (faId) => {
        axios.delete(url_delete + faId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
            })
            .catch(error => {
                console.log(error);
                setMsg(error.response.data.message);

                setOpenAlert(true);
            })

    }



    return (
        <Container className={classes.container}>
            <div className={classes.header}>
                <Grid container spacing={2}>


                    <Grid item xs={11} md={4} lg={4}>
                        <span style={{ color: "#333", fontSize: "20px" }}>البحث حسب اسم الحساب</span><br />
                        <TextField

                            label=""
                            type="text"
                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                            value={s_name}
                            onChange={(e) => setSName(e.target.value)}

                        />
                    </Grid>
                    <Grid item xs={11} md={4} lg={4}>
                        <span style={{ color: "#333", fontSize: "20px" }}>البحث حسب نوع الحساب</span><br />
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={s_type}
                            onChange={(e) => setSType(e.target.value)}
                            label=""
                            className={classes.select}

                        >

                            <MenuItem value="">    </MenuItem>
                            <MenuItem value="أصول"> أصول   </MenuItem>

                            <MenuItem value="خصوم"> خصوم   </MenuItem>
                            <MenuItem value="مصاريف"> مصاريف   </MenuItem>

                            <MenuItem value="إيرادات"> إيرادات   </MenuItem>

                        </Select>
                    </Grid>

                    <Grid item xs={11} md={4} lg={4}>
                        <span style={{ color: "#333", fontSize: "20px" }}>البحث حسب الفئة </span><br />
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            label=""
                            className={classes.select}

                        >

                            <MenuItem value="">    </MenuItem>
                            <MenuItem value="جميع الموظفين">جميع الموظفين</MenuItem>

                            <MenuItem value="الموظفين الإداريين"> الموظفين الإداريين   </MenuItem>
                            <MenuItem value="الأساتذة"> الأساتذة   </MenuItem>

                            <MenuItem value="الطلاب"> الطلاب   </MenuItem>
                            <MenuItem value="دورات تعليمية"> دورات تعليمية   </MenuItem>
                            <MenuItem value="طلاب دورة تعليمية">طلاب دورة تعليمية</MenuItem>

                        </Select>
                        <Button onClick={() => searchHandle()}><Search className={classes.searchIcon} /></Button>
                    </Grid>



                </Grid>

                <div style={{ display: "flex" }}>


                    <div className={classes.addIconButton} style={{ marginRight: "0px" }}>

                        <br />


                        <Tooltip title="إضافة حساب مالي" area-label="add" >

                            <button onClick={() => setOpen(true)} className="newButton" style={{width:"fit-content"}}>إضافة حساب مالي</button>

                        </Tooltip>

                       
                    </div>

                    <div className={classes.addIconButton} style={{ marginRight: "1%" }}>

                        <br />


                        <Tooltip title="طباعة تقرير " area-label="add" >
                        <button onClick={() => printReport()} className="newButton">طباعة تقرير  </button>

                        </Tooltip>

                      
                    </div>

                </div>



            </div>
            <div className={classes.line}></div>
            <div className="conTable">
                <table id="customers" ref={printRef}>
                    <tr>
                        <th id="first">اسم الحساب</th>
                        <th>نوع الحساب </th>
                        {!report &&
                            <th id="last">حذف </th>
                        }

                    </tr>
                    {data && data.length != 0 && data.map((item) => (
                        <tr>
                            <td>{item.accountName}</td>
                            <td>{item.status}</td>
                            {!report &&
                                <IconButton className={classes.Icons} >
                                    <DeleteOutlined className={classes.deleteIcon} onClick={() => handleDelete(item.FAId)} />
                                </IconButton>
                            }


                        </tr>
                    ))}


                </table>
            </div>

            <Modal open={open} >
                <Container className={classes.modal}>
                    <form action="" >
                        <Grid container style={{ marginTop: "60px" }}>
                            <Grid item xs={11} md={6} lg={6}>
                                <span style={{ color: "#333", fontSize: "20px" }}>اسم الحساب </span><br />
                                <TextField


                                    label=""
                                    type="text"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={11} md={6} lg={6}>
                                <span style={{ color: "#333", fontSize: "20px" }}> نوع الحساب </span><br />
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    label=""
                                    className={classes.select}

                                >


                                    <MenuItem value="أصول"> أصول   </MenuItem>

                                    <MenuItem value="خصوم"> خصوم   </MenuItem>
                                    <MenuItem value="مصاريف"> مصاريف   </MenuItem>

                                    <MenuItem value="إيرادات"> إيرادات   </MenuItem>

                                </Select>
                            </Grid>




                        </Grid>

                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" ,height:"40px"}} onClick={(e) => submit(e)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px" ,height:"40px" }} onClick={() => setOpen(false)}>إلغاء</button>


                        </div>
                    </form>
                </Container>
            </Modal >

            <Modal open={openType} >
                <Container className={classes.modal}>
                    <form action="" >
                        {Loading && <h5>جار التحميل ....</h5>}
                        <Grid container style={{ marginTop: "60px", marginRight: "30%" }}>
                            <Grid item xs={11} md={12} lg={12}>
                                <span style={{ color: "#333", fontSize: "20px" }}>اختر فئة الدورة</span><br />

                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={tId}
                                    onChange={(e) => setTId(e.target.value)}
                                    label=""
                                    className={classes.select}

                                >
                                    {types && types.map(i => (

                                        <MenuItem value={i.typeId} key={i.typeId}> {i.name}   </MenuItem>


                                    ))}
                                </Select>

                            </Grid>

                        </Grid>

                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" ,height:"40px" }} onClick={(e) => searchType(e)}>بحث</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px",height:"40px" }} onClick={() => setOpenType(false)}>إلغاء</button>


                        </div>
                    </form>
                </Container>
            </Modal >


            {/* <Modal open={openSearch} >
                <Container className={classes.modalStatus}>
                    <form action="" >
                        <div style={{ marginTop: "60px", marginLeft: "30%" }}>
                            <div>
                                <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px", marginRight: "60px" }}>اسم الموظف    </span></div>

                                <div className="input-field" style={{ width: "200px", marginRight: "50px" }}>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={nameSearch}
                                        onChange={(e) => setNameSearch(e.target.value)}
                                        label=""
                                        className={classes.select}

                                    >
                                        {users && users.map((item) => (

                                            <MenuItem value={item.userId} key={item.userId}> {item.userName}   </MenuItem>

                                        ))}

                                    </Select>
                                </div>
                            </div>


                        </div>

                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px" }} onClick={() => setOpenSearch(false)}>إلغاء</button>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" }} onClick={(e) => searchName(e)}>بحث</button>

                        </div>
                    </form>
                </Container>
            </Modal > */}

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </Container >
    );
}

export default FINACCOUNT;