import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import userPic from "../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './displayTimeMonitoring.css'
import '../table.css'
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
        border: " 1px  solid #3095C3",

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
        backgroundColor: "#3095C3",
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


const TimeMonitoring = ({ setTitle }) => {
    const classes = useStyles();
    let newDate = new Date();
    let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    const url_role = "http://127.0.0.1:8000/api/allRoles";
    const url_oneDate = "http://127.0.0.1:8000/api/getTimeMonitoring";
    const url_oneDate_oneUser = "http://127.0.0.1:8000/api/get_user_timeMonitoring/";
    const url_delete = "http://127.0.0.1:8000/api/deleteTimeMonitoring/";
    const url_name_range = "http://127.0.0.1:8000/api/getTimeMonitoringForperiodForUser/";
    const url_range = "http://127.0.0.1:8000/api/getTimeMonitoringForperiodForAllUsers";
    const url_export = "http://127.0.0.1:8000/api/export";
    const url_import = "http://127.0.0.1:8000/api/import";
    const url = "http://127.0.0.1:8000/api/get_employees_names";
    const [name, setName] = useState(null);
    const [from, setFrom] = useState(date);
    const [to, setTo] = useState("");
    const [data, setData] = useState("");
    const [open, setOpen] = useState(false);
    const [report, setReport] = useState(false);
    const printRef = useRef();

    const [file, setFile] = useState("");
    const [users, setUsers] = useState([]);
    const tableRef = useRef(null);
    const [exportData, setExportData] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        setTitle("أوقات الدوام")
        // console.log("fetchLeft",user);
        let temp_data = [];
        axios.get(url, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data.userData)
                    setUsers(response.data.data);

                    response.data.data.map((item) => {

                        temp_data.push({ الرقم: item.userId, الاسم: item.userName, الدخول: "", الخروج: "", التاريخ: "" })

                    })
                    setExportData(temp_data);
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

        if (report) {
            exportPDF();

            setReport(false);

        }

    }, [report])


    ///////// fetch today  ////////////
    useEffect(() => {
        let isMounted = true;

        console.log("date", data);

        const formData = new FormData();
        formData.append('date', date);
        axios.post(url_oneDate, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data)
                    setData(response.data.data);
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



    const handleDelete = (monId) => {
        axios.post(url_delete + monId, user.accessToken, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                navigate(0);
            })
            .catch(error => {
                console.log(error);
            })

    }


    // const searchByname = () => {


    //     const formData = new FormData();
    //     formData.append('name', search_name);
    //     axios.post(url_search_name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
    //         .then((response) => {
    //             console.log("response:", response.data.message);
    //             console.log(response);
    //             setUsers(response.data.userData);

    //         })
    //         .catch(error => {
    //             console.log(error);
    //         })
    // }

    const searchMonitor = () => {
        if (!to) {
            if (!name) {
                const formData = new FormData();
                formData.append('date', from);
                axios.post(url_oneDate, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
                    .then((response) => {
                        console.log("response:", response.data.message);
                        console.log(response);
                        setData(response.data.data);

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            if (name) {

                const formData = new FormData();
                formData.append('date', from);
                axios.post(url_oneDate_oneUser + name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
                    .then((response) => {
                        console.log("response:", response.data.message);
                        console.log(response);
                        setData(response.data.data);

                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
        }

        if (to) {
            if (!name) {
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

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            if (name) {

                const formData = new FormData();
                formData.append('startDate', from);
                formData.append('endDate', to);
                axios.post(url_name_range + name, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
                    .then((response) => {
                        console.log("response:", response.data.message);
                        console.log(response);
                        setData(response.data.data);
                        setMsg(response.data.message);
                        console.log("res.message", response.data)
                        setOpenAlert(true);

                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
        }
    }




    const exportFile = () => {

        console.log("excelData", exportData)
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Najma_excel" + fileExtension);
    }

    const importFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('TimeMonitoringFile', file);
        console.log("TimeMonitoringFile", file)
        axios.post(url_import, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response mmmmmm", response.data);
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setOpen(false);
            })
            .catch(error => {
                if (error.response.status == 422) {
                    setOpenAlert(true);
                    setMsg(error.response.data.message);
                    // setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
                console.log(error);
            })


    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const printReport = () => {
        setReport(true);


    }


    const exportPDF = useReactToPrint({
        content: () => printRef.current,
    })


    return (
        <Container className={classes.container}>
            <div className={classes.header}>
                <Grid container spacing={2}>
                    <Grid item xs={11} md={4} lg={4}>
                        <span style={{ color: "#333", fontSize: "20px" }}>اسم الموظف  </span><br />
                        {/* <input type="text" className={classes.searchInput} value={name} onChange={(e) => setName(e.target.value)} /> */}
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label=""
                            className={classes.select}

                        >
                            {users && users.map((item) => (

                                <MenuItem value={item.userId} key={item.userId}> {item.userName}   </MenuItem>

                            ))}

                        </Select>
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
                        <Button onClick={() => searchMonitor()}><Search className={classes.searchIcon} /></Button>
                    </Grid>


                </Grid>
                <div style={{ display: "flex" }}>
                    <div item xs={1} md={4} lg={4} className={classes.addIconButton} style={{ marginRight: "0" }}>

                        <br />


                        <button onClick={() => setOpen(true)} className="newButton" style={{ width: "fit-content" }}><span>Excel </span> استيراد ملف </button>


                        {/* <span style={{ color: "#333", fontSize: "20px" }}><span>Excel</span> استيراد ملف   </span> */}

                    </div>

                    <div item xs={1} md={4} lg={4} className={classes.addIconButton} style={{ marginRight: "1%" }}>

                        <br />

                        <button onClick={() => exportFile()} className="newButton" style={{ width: "fit-content" }}><span>Excel   </span>تصدير ملف </button>

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
            <div className="conTableHR">
                <table className="tableHR" id="customers" ref={printRef}>
                    <tr>
                        <th id="first">الاسم</th>
                        <th>الدخول</th>
                        <th>الخروج</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                        {!report &&
                            <th id="last"></th>
                        }

                    </tr>
                    {data && data.length != 0 && data.map((item) => (
                        <tr>
                            <td>{item.userName}</td>
                            {item.timeMon != null &&
                                <td>{item.timeMon.startTime}</td>
                            }
                            {item.timeMon &&
                                <td>{item.timeMon.exitTime}</td>
                            }
                            {item.timeMon != null &&
                                <td>{item.timeMon.date}</td>
                            }
                            {item.status === "موجود" && <td style={{ color: "rgb(72, 202, 61)" }}>{item.status}</td>}
                            {item.status === "غياب" && <td style={{ color: "rgb(167, 32, 99)" }}>{item.status}</td>}
                            {!report &&
                                <td>
                                    {item.status === "موجود" &&
                                        <IconButton className={classes.Icons} >
                                            <DeleteOutlined className={classes.deleteIcon} onClick={() => handleDelete(item.timeMon.monId)} />
                                        </IconButton>
                                    }
                                </td>
                            }
                        </tr>
                    ))}


                </table>
            </div>

            <Modal open={open} >
                <Container className={classes.modalStatus}>
                    <form action="" >
                        <div style={{ marginTop: "60px", marginLeft: "30%" }}>
                            <div>
                                <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px", marginRight: "60px" }}>اختر الملف  </span></div>

                                <div className="input-field" style={{ width: "200px", marginRight: "50px" }}>
                                    <input type="file" style={{ width: "200px" }} placeholder=""
                                        onChange={(e) => setFile(e.target.files[0])} />
                                </div>
                            </div>


                        </div>

                        <div className={classes.submit}>
                       
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" ,width:"100px",height:"50px" }} onClick={(e) => importFile(e)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#646877", marginLeft: "20px" ,width:"100px",height:"50px" }} onClick={() => setOpen(false)}>إلغاء</button>


                        </div>
                    </form>
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

export default TimeMonitoring;