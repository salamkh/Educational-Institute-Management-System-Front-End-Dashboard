import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import userPic from "../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './period.css'
import '../../HR/table.css'
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
import LOADING from "../../Loading";

const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(8),


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
        // marginTop: 30,
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


const PERIODOP = ({ setTitle }) => {
    const classes = useStyles();
    let newDate = new Date();
    let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();

    const url = "http://127.0.0.1:8000/api/Financial_Operations_Of_Open_Period";
    const url_account = "http://127.0.0.1:8000/api/Financial_Operations_On_Account_In_OpenPeriod/";
    const url_by_name = "http://127.0.0.1:8000/api/search_Financial_Accounts_By_name";
    const [name, setName] = useState(null);
    const [balance, setBalance] = useState(null);
    const [cause, setCause] = useState(null);
    const [balance_date, setBalanceDate] = useState(null);
    // const [status, setStatus] = useState(null);
    const [from, setFrom] = useState(date);
    const [to, setTo] = useState(date);
    const [description, setDesc] = useState("");
    const [data, setData] = useState("");
    const [account, setAccount] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [open, setOpen] = useState(false);
    const [nameSearch, setNameSearch] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [oneUser, setUser] = useState(null);
    const [status, setStatus] = useState(null);
    const [periods, setPeriods] = useState([]);
    const [extendID, setExId] = useState("");
    const [closeID, setCloseId] = useState("");
    const [sId, setSId] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [report, setReport] = useState(false);
    const printRef = useRef();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        let isMounted = true;
        setLoading(true)
        setTitle("عمليات الدورة المالية")
        // console.log("fetchLeft",user);
        let temp_data = [];
        axios.get(url , { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data.data)
                    setData(response.data.data);
                    setLoading(false)
                    setMsg(response.data.message)
                    setOpenAlert(true)

                }
            })
            .catch((err) => {
                setMsg(err.response.data.message)
                  setLoading(false)
                if (err.name === 'AbortError') {
                    console.log('clean up');
                    setLoading(false)
                    setOpenAlert(true)
                }
                else {
                    setLoading(false)
                    // setError(err.message);
                }

            })

    }, [])


    const handleClose = (event, reason) => {
        // navigate(0);
        setOpenAlert(false);
    }

    const searchAccount = () => {
        const formData = new FormData();
        formData.append('accountName', account);
        setOpen(true)
        // console.log("accountName", e.target.key)
        axios.post(url_by_name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setData(response.data.data);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpen(true)
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

    const searchHandle = () => {
        axios.get(url_account + sId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setData(response.data.data);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setAccount("")
                setOpen(false)
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
                   <button className={classes.addButton} style={{ borderRadius: "8px" ,width:"fit-content" , borderRadius:"8px" }} onClick={() => searchAccount()}>بحث</button>

                  
                      

                    </Grid>





                </Grid>




            </div>




            <div className={classes.line}></div>
            {Loading && <LOADING />}

            <div style={{ height: "400px", overflow: "auto", width: "100%", marginTop: "40px"  }}>
                <table id="customers" ref={printRef}>
                    <tr>
                        <th id="first">الوصف</th>
                        <th>تاريخ العملية</th>
                        <th>المبلغ </th>
                        <th> من الحساب </th>
                        <th>إلى الحساب</th>


                    </tr>
                    {data && data.length != 0 && data.map((item) => (
                        <tr>
                            <td>{item.description}</td>
                            <td>{item.operationDate}</td>
                            <td>{item.balance}</td>
                            <td>{item.creditorName}</td>
                            <td>{item.debtorName}</td>
                        </tr>
                    ))}


                </table>
            </div>

            <Modal open={open} >
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

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </Container >
    );
}

export default PERIODOP;