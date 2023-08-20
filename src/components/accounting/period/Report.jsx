import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import userPic from "../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './Report.css'
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



})
);


const REPORT = ({ setTitle }) => {
    const classes = useStyles();
    let newDate = new Date();
    let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    const url_add = "http://127.0.0.1:8000/api/open_financial_period";
    const url_edit = "http://127.0.0.1:8000/api/update_reward/";
    const url_extend = "http://127.0.0.1:8000/api/extend_financial_period/";
    const url_range = "http://127.0.0.1:8000/api/range_rewards";
    const url_periods = "http://127.0.0.1:8000/api/show_financial_period";
    const url_report_period = "http://127.0.0.1:8000/api/show_actually_result";

    const [name, setName] = useState(null);
    const [balance, setBalance] = useState(null);
    const [cause, setCause] = useState(null);
    const [balance_date, setBalanceDate] = useState(null);
    // const [status, setStatus] = useState(null);
    const [from, setFrom] = useState(date);
    const [to, setTo] = useState(date);
    const [description, setDesc] = useState("");
    const [data, setData] = useState("");
    const [open, setOpen] = useState(false);
    const [nameSearch, setNameSearch] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [oneUser, setUser] = useState(null);
    const [status, setStatus] = useState(null);
    const [periods, setPeriods] = useState([]);
    const [extendID, setExId] = useState("");
    const [closeID, setCloseId] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [report, setReport] = useState(false);
    const printRef = useRef();

    useEffect(() => {
        let isMounted = true;
        setTitle("تقرير الدورة المالية")
        // console.log("fetchLeft",user);

        axios.get(url_report_period, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {

                console.log("roleResponse", response.data.data)
                setData(response.data.data);


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

        if (report) {
            exportPDF();
            setReport(false);
        }
    }, [report])


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

    return (
        <Container className={classes.container}>
            <div className={classes.header}>


                <div style={{ display: "flex" }}>


                    <div className={classes.addIconButton} style={{ marginRight: "0px" }}>
                        <button className={classes.addButton} style={{ borderRadius: "8px", marginTop: "15px", width: "fit-content", borderRadius: "8px" }} onClick={() => setShow(false)}>الإيرادات</button>



                    </div>
                    <div style={{ marginRight: "1%" }}>
                        <button className={classes.addButton} style={{ borderRadius: "8px", marginTop: "15px", backgroundColor: "#5d6770", width: "fit-content", borderRadius: "8px" }} onClick={()=> setShow(true)}>المصاريف</button>

                    </div>

                    <div style={{ marginRight: "1%" }}>
                        <button className={classes.addButton} style={{ borderRadius: "8px", marginTop: "15px", backgroundColor: "#6a7f92", width: "fit-content", borderRadius: "8px" }} onClick={()=> printReport()}>طباعة التقرير</button>

                    </div>


                </div>





            </div>
            <div className={classes.line}></div>
            <div  ref={printRef}>
            {data &&
                <div style={{ direction: "rtl" }}>
                    <Grid container spacing={2} >
                        <Grid item lg={4}><h3 style={{ color: "#3d3042" }}>إجمالي الإيرادات</h3></Grid>
                        <Grid item lg={4}><h3 style={{ color: "#3d3042" }}>إجمالي المصاريف</h3></Grid>
                        <Grid item lg={4}><h3 style={{ color: "#3d3042" }}> المبلغ المقدر</h3></Grid>

                    </Grid>


                    <div>
                        {data &&
                            <div className="containerItemFieldSTD">
                                <Grid container spacing={2}>
                                    <Grid item lg={4}><p style={{ fontWeight: "500", color: "#7e2e5c" }}>{data.totalRevenues}  </p></Grid>
                                    <Grid item lg={4}><p style={{ fontWeight: "500", color: "#7e2e5c" }}>{data.totalExpenses} </p></Grid>
                                    <Grid item lg={4}><p style={{ color: "#445e80", fontWeight: "600" }}> {data.result} </p></Grid>
                                </Grid>

                            </div>
                        }
                    </div>
                </div>
            }
            <div style={{  width: "100%", marginTop: "40px" }}>
                <table id="customers">
                    <tr>
                        <th id="first">اسم الحساب</th>

                        <th>الحالة</th>
                        <th>المبلغ </th>
                        <th>التاريخ </th>

                    </tr>

                    {show && data && data.expenses.length != 0 && data.expenses.map((item) => (
                        <tr>
                            <td>{item.accountName}</td>

                            <td >{item.status}</td>
                            <td>{item.balance}</td>
                            <td>{item.created_at}</td>
                        </tr>
                    ))}

                    {!show && data && data.revenues.length != 0 && data.revenues.map((item) => (
                        <tr>
                            <td>{item.accountName}</td>

                            <td >{item.status}</td>
                            <td>{item.balance}</td>
                            <td>{item.created_at}</td>
                        </tr>
                    ))}


                </table>
            </div>
            </div>


            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </Container >
    );
}

export default REPORT;