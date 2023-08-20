import { Button, Select, Container, Grid, makeStyles, MenuItem, Tooltip, TextField, Modal, Snackbar } from "@material-ui/core";
import IconButton from '@mui/material/IconButton';
import { Add, DeleteOutlined, Edit, Search } from "@material-ui/icons";
import { useEffect, useState, useRef } from "react";
import userPic from "../../../img/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.jpg"
import './discount.css'
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
        borderRadius: "22px",
        border: "none",
        backgroundColor: "#3095C3",
        color: "beige",
        cursor: "pointer",
        width: "100px",
        height:"50px",
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



})
);


const DISCOUNT = ({ setTitle }) => {
    const classes = useStyles();
    let newDate = new Date();
    let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    const url_add = "http://127.0.0.1:8000/api/add_panchment";
    const url_edit = "http://127.0.0.1:8000/api/update_panchment/";
    const url_oneUser = "http://127.0.0.1:8000/api/user_panchments/";
    const url_range = "http://127.0.0.1:8000/api/range_panchments";
    const url_users = "http://127.0.0.1:8000/api/get_employees_names";

    const [name, setName] = useState(null);
    const [balance, setBalance] = useState(null);
    const [cause, setCause] = useState(null);
    const [balance_date, setBalanceDate] = useState(null);
    const [status, setStatus] = useState(null);
    const [from, setFrom] = useState(date);
    const [to, setTo] = useState(date);
    const [data, setData] = useState("");
    const [open, setOpen] = useState(false);
    const [nameSearch, setNameSearch] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [oneUser, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const navigate = useNavigate();
    const [report, setReport] = useState(false);
    const printRef = useRef();


    useEffect(() => {
        let isMounted = true;
        setTitle("الخصميات")
        // console.log("fetchLeft",user);
        let temp_data = [];
        axios.get(url_users, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data.data)
                    setUsers(response.data.data);
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




    ///////// fetch today  ////////////
    useEffect(() => {
        let isMounted = true;
        const formData = new FormData();
        formData.append('startDate', date);
        formData.append('endDate', date);
        axios.post(url_range, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
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


    useEffect(() => {

        if (report) {
            exportPDF();

            setReport(false);

        }

    }, [report])


    const handleEdit = (item) => {
        setUser(item);
        setName(item.advance.userId)
        setBalance(item.advance.balance);
        setCause(item.advance.cause);
        setBalanceDate(item.advance.panchDate);
        setStatus(item.advance.status);
        setOpenEdit(true);

    }

    const searchDate = () => {
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
                setMsg(error.response.data.message);
                console.log(error);
            })
    }

    const searchName = (e) => {
        e.preventDefault();
        axios.get(url_oneUser + nameSearch, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setData(response.data.data);
                setOpenSearch(false)
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
        formData.append('userId', name);
        formData.append('panchDate', balance_date);
        formData.append('cause', cause);
        formData.append('balance', balance);
        formData.append('status', status);


        axios.post(url_add, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setOpen(false);
                // navigate(0);
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const update = (e) => {
        e.preventDefault();
        const formData = new URLSearchParams()

        if (name) {
            formData.append('userId', name);
        }
        formData.append('panchDate', balance_date);
        formData.append('cause', cause);
        formData.append('balance', balance);


        axios.patch(url_edit + oneUser.advance.panchId, formData, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log("response:", response.data.message);
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setOpenEdit(false);
                // navigate(0);
            })
            .catch(error => {
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


    return (
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
                        <div className={classes.addIconButton} style={{ marginRight: "0" }}>

                            <br />


                            <Button onClick={() => setOpenSearch(true)}><Search className={classes.searchIcon} /></Button>


                            <span style={{ color: "#333", fontSize: "20px" }}>  البحث عن الخصميات الخاصة بمستخدم </span>

                        </div>
                    </Grid>



                </Grid>

                <div style={{ display: "flex" }}>


                    <div className={classes.addIconButton}>

                        <br />


                        <Tooltip title="إضافة خصم" area-label="add" >

                            <button onClick={() => setOpen(true)} className="newButton">إضافة خصم</button>

                        </Tooltip>

                    </div>
                    <div className={classes.addIconButton} style={{ marginRight: "1%" }}>

                        <br />


                        <Tooltip title="طباعة تقرير " area-label="add" >

                            <button onClick={() => printReport()} className="newButton"> طباعة تقرير</button>

                        </Tooltip>


                    </div>


                </div>



            </div>
            <div className={classes.line}></div>
            <div className="conTable">
                <table id="customers" ref={printRef}>
                    <tr>
                        <th id="first">الاسم</th>
                        <th>المبلغ</th>
                        <th>السبب</th>
                        <th>التاريخ</th>
                        <th>الحالة</th>
                        {!report &&
                            <th id="last"></th>
                        }
                    </tr>
                    {data && data.length != 0 && data.map((item) => (
                        <tr>
                            <td>{item.userName}</td>
                            <td>{item.advance.balance}</td>
                            <td>{item.advance.cause}</td>
                            <td>{item.advance.panchDate}</td>
                            <td>{item.advance.status}</td>
                            {!report &&
                                <td>

                                    <IconButton className={classes.Icons} >
                                        <Edit className={classes.editIcon} onClick={() => handleEdit(item)} />
                                    </IconButton>

                                </td>
                            }
                        </tr>
                    ))}


                </table>
            </div>

            <Modal open={open} >
                <Container className={classes.modal}>
                    <form action="" >
                        <Grid container style={{ marginTop: "60px" }}>
                            <Grid item md={6} lg={6}>
                                <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px" }}>اسم الموظف    </span></div>

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
                            <Grid item md={6} lg={6}>
                                <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px" }}>المبلغ     </span></div>


                                <TextField
                                    id="outlined-number"
                                    label=""
                                    type="number"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                            </Grid>
                            <Grid item md={6} lg={6}>
                                <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px" }}>التاريخ</span></div>

                                <TextField
                                    id="date"

                                    label=""
                                    type="date"
                                    style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                    value={balance_date}
                                    onChange={(e) => setBalanceDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item md={6} lg={6}>
                                <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px" }}>الحالة</span></div>

                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    label=""
                                    className={classes.select}

                                >
                                    <MenuItem value={"مطبقة"}> مطبقة</MenuItem>
                                    <MenuItem value={"غير مطبقة"}>غير مطبقة</MenuItem>

                                </Select>
                            </Grid>

                            <Grid item md={6} lg={6}>
                                <div className="label_user_div" style={{ marginTop: "10px" }}> <span style={{ color: "#333", fontSize: "20px" }}>السبب</span></div>

                                <TextField
                                    id="filled-multiline-flexible"
                                    label=""
                                    value={cause}
                                    onChange={(e) => setCause(e.target.value)}
                                    multiline
                                    maxRows={4}
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>

                        <div className={classes.submit}>
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" }} onClick={(e) => submit(e)}>تسجيل</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px" }} onClick={() => setOpen(false)}>إلغاء</button>


                        </div>
                    </form>
                </Container>
            </Modal >


            <Modal open={openEdit} >
                <Container className={classes.modal}>
                    <form action="" >
                        {oneUser &&
                            <>
                                <Grid container style={{ marginTop: "60px" }}>
                                    <Grid item md={6} lg={6}>
                                        <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px" }}>اسم الموظف    </span></div>

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
                                    <Grid item md={4} lg={4}>
                                        <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px", marginRight: "60px" }}>المبلغ     </span></div>


                                        <TextField
                                            id="outlined-number"
                                            label=""
                                            type="number"
                                            value={balance}
                                            onChange={(e) => setBalance(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                    </Grid>
                                    <Grid item md={6} lg={6}>
                                        <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px", marginRight: "60px" }}>التاريخ</span></div>

                                        <TextField
                                            id="date"

                                            label=""
                                            type="date"
                                            style={{ height: "20px", marginRight: "10px", width: "150px" }}
                                            value={balance_date}
                                            onChange={(e) => setBalanceDate(e.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item md={6} lg={6}>
                                        <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px", marginRight: "60px" }}>السبب</span></div>

                                        <TextField
                                            id="filled-multiline-flexible"
                                            label=""
                                            value={cause}
                                            onChange={(e) => setCause(e.target.value)}
                                            multiline
                                            maxRows={4}
                                            variant="filled"
                                        />
                                    </Grid>
                                </Grid>

                                <div className={classes.submit}>

                                    <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" }} onClick={(e) => update(e)}>تعديل</button>
                                    <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px" }} onClick={() => setOpenEdit(false)}>إلغاء</button>
                                </div>
                            </>
                        }
                    </form>
                </Container>
            </Modal >

            <Modal open={openSearch} >
                <Container className={classes.modalStatus}>
                    <form action="" >
                        <div style={{ marginTop: "60px", marginLeft: "20%" }}>
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
                            <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "18px" }} onClick={(e) => searchName(e)}>بحث</button>
                            <button className={classes.addButton} style={{ backgroundColor: "#6c8997", marginLeft: "20px" }} onClick={() => setOpenSearch(false)}>إلغاء</button>

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

export default DISCOUNT;