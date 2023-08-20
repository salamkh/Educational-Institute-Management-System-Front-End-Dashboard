import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import userPic from "../../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import '../../../HR/table.css'
import downloadjs from 'downloadjs';
import { Link, useNavigate, useParams } from "react-router-dom";
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
        width: 650,
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
        width: " fit-content",
        padding: "8px",
        margin: "10px",
        marginTop: 30,
        fontSize: "20px",
        // marginLeft: "350px",

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


const STDETAILS = ({ setTitle }) => {
    const classes = useStyles();

    const url_add = "http://127.0.0.1:8000/api/add_financial_student_operation";
    const url_delete = "http://127.0.0.1:8000/api/delete_Financial_Student_Operation/";
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
    const url_get_details = "http://127.0.0.1:8000/api/show_Student_Operation_For_Type";
    const [date, setDate] = useState("");
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
    const [data, setData] = useState("");
    const [resp, setResp] = useState(null);
    const [openResp, setOpenResp] = useState(false);

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
    const reportRef = useRef();
    const params = useParams();
    const stdId = params.stdId;
    const typeId = params.typeId;

    useEffect(() => {
        let isMounted = true;
        setTitle("تفاصيل الأقساط")
        const formData = new FormData();
        formData.append('studentId', stdId);
        formData.append('typeId', typeId);

        axios.post(url_get_details, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                if (isMounted) {
                    console.log("response:", response.data.message);
                    console.log(response);
                    setMsg(response.data.message);
                    setOpenAlert(true);
                    setOpen(false);
                    setData(response.data.data)
                    // navigate(0);
                }
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
    }, [])

    useEffect(() => {

        if (report) {
            exportPDF();
            setReport(false);
        }
    }, [report])



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



    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('SFAId', stdId);
        formData.append('TFAId', typeId);
        formData.append('accountId', to_id);
        formData.append('balance', balance);
        formData.append('operationType', type_op);
        formData.append('operationDate', date);
        formData.append('description', desc);


        axios.post(url_add, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);

                setOpenAlert(true);
                setOpen(false);
                if (response.data.data.operationType == "دفع") {
                    setResp(response.data.data);
                    setOpenResp(true);
                }
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

    const modalReport = useReactToPrint({
        content: () => reportRef.current,
    })


    const exportPDF = useReactToPrint({
        content: () => printRef.current,
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const handleDelete = (FOId) => {
        axios.delete(url_delete + FOId, { headers: { authorization: "Bearer " + user.accessToken }, })
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



    return (
        <Container className={classes.container}>
            <div className={classes.header}>


                <div style={{ display: "flex" }}>

                    <div>
                        <button className={classes.addButton} style={{ borderRadius: "8px", marginTop: "15px" }} onClick={() => setOpen(true)}>إضافة عملية</button>

                    </div>
                    <div style={{ marginRight: "1%" }}>
                        <button className={classes.addButton} style={{ borderRadius: "8px", marginTop: "15px", backgroundColor: "#5d6770" }} onClick={() => printReport()}>طباعة تقرير </button>

                    </div>


                </div>





            </div>




            <div className={classes.line}></div>
            <div style={{ height: "400px", overflow: "auto", width: "100%", marginTop: "40px" }}>
                <table id="customers" ref={printRef}>
                    <tr>
                        <th id="first">حساب الدائن</th>
                        <th>حساب المدين</th>
                        <th>رصيد العملية</th>
                        <th>نوع العملية</th>
                        <th>التاريخ </th>
                        <th>تفاصيل العملية</th>
                        {!report &&
                            <th id="last">حذف </th>
                        }

                    </tr>
                    {data && data.length != 0 && data.map((item) => (
                        <tr>
                            <td>{item.creditorName}</td>
                            <td>{item.debtorName}</td>
                            <td>{item.balance}</td>
                            <td>{item.operationType}</td>
                            <td>{item.operationDate}</td>
                            <td>{item.description}</td>
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
                        <Grid container style={{ marginTop: "60px" ,marginRight:"15%" }}>
                            <Grid item md={6} lg={6}>
                                <Grid container>
                                    <Grid item md={12} lg={12}>
                                        <span style={{ color: "#333", fontSize: "20px" }}>اسم الحساب </span><br />
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
                                <span style={{ color: "#333", fontSize: "20px" }}> رصيد العملية</span><br />
                                <TextField


                                    label=""
                                    type="number"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={11} md={6} lg={6} style={{ marginTop: "30px" }}>
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
                            <Grid item xs={11} md={6} lg={6} style={{ marginTop: "30px" }}>
                                <span style={{ color: "#333", fontSize: "20px" }}>نوع العملية</span><br />
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={type_op}
                                    onChange={(e) => setType(e.target.value)}
                                    label=""
                                    className={classes.select}

                                >
                                    <MenuItem value="دفع">دفع</MenuItem>
                                    <MenuItem value="إرجاع" >إرجاع</MenuItem>
                                    <MenuItem value="انسحاب">انسحاب</MenuItem>
                                    <MenuItem value="حسم" >حسم</MenuItem>


                                </Select>
                            </Grid>

                            <Grid item xs={11} md={6} lg={6} style={{ marginTop: "30px" }}>
                                <span style={{ color: "#333", fontSize: "20px" }}>وصف العملية </span><br />
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

                        <div className={classes.submit} style={{marginRight:"20%"}}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px", width: "100px", height: "40px" }} onClick={(e) => submit(e)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px", width: "100px", height: "40px" }} onClick={() => setOpen(false)}>إلغاء</button>


                        </div>
                    </form>
                </Container>
            </Modal >

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

export default STDETAILS;