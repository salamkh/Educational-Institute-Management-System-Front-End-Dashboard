import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import userPic from "../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './operations.css'
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


const OPERATIONS = ({ setTitle }) => {
    const classes = useStyles();
    // let newDate = new Date();
    // let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    const url_add = "http://127.0.0.1:8000/api/add_Financial_Operation";
    const url_delete = "http://127.0.0.1:8000/api/delete_Financial_Operation/";
    const url_all = "http://127.0.0.1:8000/api/Financial_Operations_Of_Open_Period";
    const url_all_account = "http://127.0.0.1:8000/api/Financial_Operations_On_Account_In_OpenPeriod/";
    const url_range = "http://127.0.0.1:8000/api/Financial_Operations_In_Range";
    const url_range_account = "http://127.0.0.1:8000/api/Financial_Operations_On_Account_In_Range/";
    const url_by_name = "http://127.0.0.1:8000/api/search_Financial_Accounts_By_name";

    const [date, setDate] = useState(null);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [from_account, setFAccount] = useState("");
    const [to_account, setTAccount] = useState("");
    const [from_id, setFId] = useState(null);
    const [to_id, setTId] = useState("");
    const [balance, setBalance] = useState("");
    const [desc, setDesc] = useState("");
    const [account, setAccount] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [sId, setSId] = useState("");
    const [data, setData] = useState("");
    // const [tId, setTId] = useState("");
    const [types, setTypes] = useState(null);
    const [open, setOpen] = useState(false);
    const [openFrom, setOpenFrom] = useState(false);
    const [openTo, setOpenTo] = useState(false);
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
        setTitle("العمليات المالية ")
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





    const searchHandle = () => {
        if (sId == "" && from != "" && to != "") {

            const formData = new FormData();
            formData.append('startDate', from);
            formData.append('endDate', to);
            axios.post(url_range, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then((response) => {
                    console.log("response:", response.data.message);
                    console.log(response);
                    setData(response.data.data);
                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setAccount("")

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

        if (sId != "" && from != "" && to != "") {
            const formData = new FormData();
            formData.append('startDate', from);
            formData.append('endDate', to);

            axios.post(url_range_account + sId, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then((response) => {
                    console.log("response:", response.data.message);
                    console.log(response);
                    setData(response.data.data);
                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setAccount("")
                    setSId("")


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





    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('operationDate', date);
        formData.append('balance', balance);
        formData.append('description', desc);
        formData.append('creditorId', from_id);
        formData.append('debtorId', to_id);


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

    const handleDelete = (oId) => {
        axios.delete(url_delete + oId, { headers: { authorization: "Bearer " + user.accessToken }, })
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


    const searchAccount = () => {
        const formData = new FormData();
        formData.append('accountName', account);
        setOpenSearch(true)
        // console.log("accountName", e.target.key)
        axios.post(url_by_name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);

                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                // setSName("")
                setAccounts(response.data.data)


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

    }

    const searchAccountTo = () => {
        const formData = new FormData();
        formData.append('accountName', to_account);

        // console.log("accountName", e.target.key)
        axios.post(url_by_name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                // setData(response.data.data);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                // setSName("")
                setAccounts(response.data.data)

                setOpenTo(true)


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

    }

    const searchAccountFrom = () => {
        const formData = new FormData();
        formData.append('accountName', from_account);

        // console.log("accountName", e.target.key)
        axios.post(url_by_name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                // setData(response.data.data);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                // setSName("")
                setAccounts(response.data.data)

                setOpenFrom(true)


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

    }

    const handleChange = (id, checked) => {
        // console.log(e.target.checked);
        setSId(id);

        setOpenSearch(false)

    }

    return (
        <Container className={classes.container}>
            <div className={classes.header}>
                <Grid container spacing={2}>


                    <Grid item xs={11} md={4} lg={4}>
                        <span style={{ color: "#333", fontSize: "20px" }}>  اسم الحساب</span><br />
                        <TextField

                            label=""
                            type="text"
                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                            value={account}
                            onChange={(e) => setAccount(e.target.value)}

                        />
                        <Button onClick={() => searchAccount()}><Search className={classes.searchIcon} /></Button>

                    </Grid>

                    <Grid item xs={11} md={4} lg={4}>
                        <span style={{ color: "#333", fontSize: "20px" }}>من تاريخ   </span><br />
                        <TextField
                            id="date"
                            label=""
                            type="date"
                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={11} md={4} lg={4}>
                        <span style={{ color: "#333", fontSize: "20px" }}> إلى تاريخ   </span><br />
                        <TextField
                            id="date"
                            label=""
                            type="date"
                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Button onClick={() => searchHandle()}><Search className={classes.searchIcon} /></Button>
                    </Grid>



                </Grid>

                <div style={{ display: "flex" }}>


                    <div className={classes.addIconButton} style={{ marginRight: "0px" }}>

                        <br />


                        <Tooltip title="إضافة حساب مالي" area-label="add" >

                            <button onClick={() => setOpen(true)} className="newButton" style={{width:"fit-content"}}>إضافة عملية مالي</button>

                        </Tooltip>

                    </div>

                    <div className={classes.addIconButton} style={{ marginRight: "1%" }}>

                        <br />


                        <Tooltip title="طباعة تقرير " area-label="add" >

                            <button onClick={() => printReport()} className="newButton">طباعة تقرير</button>

                        </Tooltip>

                    </div>

                </div>



            </div>
            <div className={classes.line}></div>
            <div style={{ height: "400px",overflow: "auto", width: "100%", marginTop: "40px"  }}>
                <table id="customers" ref={printRef}>
                    <tr>
                        <th id="first">الوصف</th>
                        <th>تاريخ العملية</th>
                        <th>المبلغ </th>
                        <th>من الحساب</th>
                        <th>إلى الحساب</th>
                        {!report &&
                            <th id="last">حذف </th>
                        }

                    </tr>
                    {data && data.length != 0 && data.map((item) => (
                        <tr>
                            <td>{item.description}</td>
                            <td>{item.operationDate}</td>
                            <td>{item.balance}</td>
                            <td>{item.creditorName}</td>
                            <td>{item.debtorName}</td>
                            {!report &&
                                <IconButton className={classes.Icons} >
                                    <DeleteOutlined className={classes.deleteIcon} onClick={() => handleDelete(item.FOId)} />
                                </IconButton>
                            }


                        </tr>
                    ))}


                </table>
            </div>

            <Modal open={open} >
                <Container className={classes.modal} style={{width:"750px"}}>
                    <form action="" >
                        <Grid container style={{ marginTop: "60px" }}>
                            <Grid item xs={11} md={6} lg={6}>
                                <Grid container>
                                    <Grid item md={12} lg={12}>
                                        <span style={{ color: "#333", fontSize: "20px" }}>الحساب الدائن</span><br />
                                        <TextField
                                            label=""
                                            type="text"
                                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                            value={from_account}
                                            onChange={(e) => setFAccount(e.target.value)}

                                        />
                                      <Button onClick={() => searchAccountFrom()}><Search className={classes.searchIcon} /></Button>

                                    </Grid>
                                   
                                </Grid>


                            </Grid>
                            <Grid item xs={11} md={6} lg={6}>
                                <Grid container spacing={2}>
                                    <Grid item md={12} lg={12}>
                                        <span style={{ color: "#333", fontSize: "20px" }}>الحساب المدين</span><br />
                                        <TextField


                                            label=""
                                            type="text"
                                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                            value={to_account}
                                            onChange={(e) => setTAccount(e.target.value)}

                                        />
                                       <Button onClick={() => searchAccountTo()}><Search className={classes.searchIcon} /></Button>

                                    </Grid>
                                  
                                </Grid>



                            </Grid>
                            <Grid item xs={11} md={6} lg={6} style={{ marginTop: "10px" }}>
                                <span style={{ color: "#333", fontSize: "20px" }}> الرصيد</span><br />
                                <TextField


                                    label=""
                                    type="number"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}

                                />
                            </Grid>


                            <Grid item xs={11} md={6} lg={6} style={{ marginTop: "10px" }}>
                                <span style={{ color: "#333", fontSize: "20px" }}>تاريخ العملية</span><br />
                                <TextField


                                    label=""
                                    type="date"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}

                                />
                            </Grid>

                            <Grid item xs={11} md={6} lg={6} style={{ marginTop: "20px" }}>
                                <span style={{ color: "#333", fontSize: "20px" }}>الوصف </span><br />
                                <TextField
                                    id="filled-multiline-flexible"
                                    label=""
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                    multiline
                                    maxRows={4}
                                    variant="filled"
                                    style={{ direction: "rtl" }}
                                />
                            </Grid>




                        </Grid>

                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" ,height:"40px" }} onClick={(e) => submit(e)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px" ,height:"40px"  }} onClick={() => setOpen(false)}>إلغاء</button>


                        </div>
                    </form>
                </Container>
            </Modal >

            <Modal open={openSearch} >
                <Container className={classes.modal}>
                    {accounts.length != 0 && accounts.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word" }}>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label={`${item.accountName}`} onChange={(e) => handleChange(item.FAId, e.target.checked)} style={{ fontSize: "20px", color: "#232730" }} />
                                </FormGroup>
                            </div>

                        </div>
                    ))}
                    <div className={classes.submit}>
                        <button className={classes.addButton} onClick={() => searchHandle()}>بحث</button>
                    </div>

                </Container>
            </Modal>

            <Modal open={openFrom} >
                <Container className={classes.modal}>
                    {accounts.length != 0 && accounts.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word" }}>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label={`${item.accountName}`} onChange={(e) => { setFId(item.FAId); setOpenFrom(false); setFAccount(item.accountName) }} style={{ fontSize: "20px", color: "#232730" }} />
                                </FormGroup>
                            </div>

                        </div>
                    ))}


                </Container>
            </Modal>

            <Modal open={openTo} >
                <Container className={classes.modal}>
                    {accounts.length != 0 && accounts.map((item) => (
                        <div className={classes.sameItemCon} style={{ width: "100%", margin: "auto", marginBottom: "20px", overflow: "wrap", padding: "1px" }}>

                            <div className="infoFeed" style={{ direction: "rtl", flexDirection: "column", overflowWrap: "break-word" }}>

                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label={`${item.accountName}`} onChange={(e) => { setTId(item.FAId); setOpenTo(false); setTAccount(item.accountName) }} style={{ fontSize: "20px", color: "#232730" }} />
                                </FormGroup>
                            </div>

                        </div>
                    ))}


                </Container>
            </Modal>


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

export default OPERATIONS;