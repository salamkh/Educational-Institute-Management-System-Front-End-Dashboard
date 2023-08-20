import { Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField, makeStyles, FormGroup, Button, Container, IconButton, Snackbar, Modal } from "@material-ui/core";
import "./payments.css";
import ArticleIcon from '@mui/icons-material/Article';
import { useRef, useState } from "react";
import { useEffect } from "react";
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(6),
        direction: "rtl"


    },

    deleteIcon: {

        color: "rgb(161, 37, 37)",
        cursor: "pointer",
    },

    pdfIcon: {
        backgroundColor: "#3095C3",
        padding: "5px",
        borderRadius: "50%",
        color: "white",
        width: "25px",
        height: "25px",

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
        backgroundColor: "#6c8997",
        color: "beige",
        cursor: "pointer",
        width: "80px",
        padding: "8px",
        margin: "10px",

        fontSize: "20px",


        '&:hover': {
            backgroundColor: "#446675",
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
const TEACHPAYMENTS = ({ setTitle }) => {
    const classes = useStyles();
    const [data, setData] = useState(null);
 
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState(null);
    const [from_account, setFAccount] = useState("");
    const [to_account, setTAccount] = useState("");
    const [from_id, setFId] = useState(null);
    const [to_id, setTId] = useState("");
    const [balance, setBalance] = useState("");
    const [desc, setDesc] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const [resp, setResp] = useState(null);
    const [openResp, setOpenResp] = useState(false);

    const params = useParams();
    const id = params.id;
    const fid = params.fid;
    const reportRef = useRef();

    const url = "http://127.0.0.1:8000/api/get_Teacher_Salary/" + id;

    const url_add = "http://127.0.0.1:8000/api/pay_salary";

    const navigate = useNavigate();
    useEffect(() => {

        setTitle("رواتب الأساتذة")

    }, [])




    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };


    const searchDate = () => {
        const formData = new FormData();
        formData.append('startDate', from);
        formData.append('endDate', to);
        axios.post(url, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setData(response.data.data);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);

            })
            .catch(error => {
                setMsg(error.response.data.message);


                console.log(error);
            })
    }


    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('operationDate', date);
        formData.append('balance', balance);
        formData.append('description', desc);
        formData.append('creditorId', Number(from_account));
        formData.append('UFAId', Number(fid));
        axios.post(url_add, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                setOpenAlert(true);
                setOpen(false);
                setResp(response.data.data);
                setOpenResp(true);
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

    const modalReport = useReactToPrint({
        content: () => reportRef.current,
    })
    return (
        <>
            <Container className={classes.container}>
                <div className={classes.header}>
                    <Grid container spacing={2}>



                       
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
                            <Button onClick={() => searchDate()}><Search className={classes.searchIcon} /></Button>
                        </Grid>
                        <Grid item xs={11} md={4} lg={4}>
                            <div >
                                {data &&
                                <>
                                <span style={{ color: "#333", fontSize: "26px", marginTop: "5%" }}> مجموع التسعيرات : <span>{data.total}</span>    </span><br />
                                </>
                                }
                            </div>
                        </Grid>
                    </Grid>


                </div>
                <div className={classes.line}></div>

                <Grid container spacing={2} style={{ marginTop: "5%" }}>
                    <Grid item md={6} lg={6}>



                        <div style={{ height: "400px", overflow: "auto", width: "100%", border: "3px solid #597f90", borderRadius: "8px" }}>
                            <h4 style={{ fontSize: "18px", color: "#555f73", marginRight: "2%" }}>إضافة عملية دفع الراتب</h4>
                            <div className={classes.line} style={{ marginTop: "2px" }}></div>
                            <form action="" >
                                <Grid container style={{ marginRight: "10%", marginTop: "5%" }}>
                                    <Grid item xs={11} md={6} lg={6}>
                                        <Grid container>
                                            <Grid item md={12} lg={12}>
                                                <span style={{ color: "#333", fontSize: "20px" }}>الحساب الدائن</span><br />
                                                <TextField
                                                    label=""
                                                    type="text"
                                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                                    value="الصندوق"

                                                />

                                            </Grid>

                                        </Grid>


                                    </Grid>

                                    <Grid item xs={11} md={6} lg={6} >
                                        <span style={{ color: "#333", fontSize: "20px" }}> الرصيد</span><br />
                                        <TextField


                                            label=""
                                            type="number"
                                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                            value={balance}
                                            onChange={(e) => setBalance(e.target.value)}

                                        />
                                    </Grid>


                                    <Grid item xs={11} md={6} lg={6} style={{ marginTop: "40px" }}>
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

                                    <Grid item xs={11} md={6} lg={6} style={{ marginTop: "40px" }}>
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
                                    <button className={classes.addButton} style={{ fontSize: "18px", width: "80%", borderRadius: "8px", marginRight: "10%", height:"40px" }} onClick={(e) => submit(e)}>تسجيل</button>

                                </div>
                            </form>
                        </div>

                    </Grid>

                    <Grid item md={6} lg={6}>



                        <div style={{ height: "400px", overflow: "auto", width: "100%", boxShadow: "0px 2px  0 0px #124861" }}>

                            <table id="customers">
                                <tr>

                                    <th>الدورة</th>
                                    <th>التاريخ</th>
                                    <th>فئة الدورة</th>
                                    <th>عدد الطلاب </th>
                                    <th>التسعيرة</th>

                                </tr>
                                {data && data.data.length != 0 && data.data.map((item) => (
                                    <tr>

                                        <td>{item.subjectName}</td>
                                        <td>{item.sessionDate}</td>
                                        <td>{item.typeName}</td>
                                        <td>{item.studentNumber}</td>
                                        <td>{item.sessionCost}</td>

                                    </tr>
                                ))}


                            </table>
                        </div>

                    </Grid>



                </Grid>

                <Modal open={openResp} >
                    <Container className={classes.modal} style={{ overflow: "auto", borderRadius: "8px" }}>
                        <div className="reportModal" ref={reportRef}>
                            <h3>معهد التفوق</h3>
                            <div className={classes.line}></div>
                            <div className="divMod">
                                <div className="divModHeader"><h5>سند دفع</h5></div>
                                {resp &&
                                    <div className="divModBody">
                                        <p>تمّ دفع مبلغ <span>{resp.operation.balance} &nbsp;</span>من الحساب <span>{resp.operation.creditorName}&nbsp;</span>
                                            إلى الحساب <span>{resp.operation.debtorName}&nbsp;</span>
                                            بتاريخ <span>{resp.operation.operationDate}&nbsp;</span> وذلك من أجل <span>{resp.operation.description}&nbsp;</span></p>
                                        <p>من قبل   : <span>{resp.userName}</span></p>
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
        </>
    );
}

export default TEACHPAYMENTS;