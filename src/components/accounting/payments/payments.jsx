import { Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField, makeStyles, FormGroup, Button, Container, IconButton, Snackbar } from "@material-ui/core";
import "./payments.css";
import ArticleIcon from '@mui/icons-material/Article';
import { useState } from "react";
import { useEffect } from "react";
import { Add, DeleteOutlined, Search } from "@material-ui/icons";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { Navigate, useNavigate } from "react-router-dom";
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
        borderRadius: "20px",
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



})
);
const PAYMENTS = ({ setTitle }) => {
    const classes = useStyles();
    const [table, setTable] = useState("");
    const [tableId, setTableId] = useState("");
    const [fName, setFName] = useState("");
    const [fLabel, setLabel] = useState("");
    const [type, setType] = useState("");
    const [dValue, setValue] = useState("");
    const [unique, setUnique] = useState(false);
    const [nullAble, setNull] = useState(false);
    const [tables, setTables] = useState([]);
    const [types, setTypes] = useState(["string", "integer", "date", "double", "BigInteger", "enum"]);
    const [pValues, setEnum] = useState([]);
    const [data, setData] = useState([]);
    const [oneValue, setOValue] = useState("");
    const [check, setCheck] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState("");
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const navigate = useNavigate();
    const url_tables = "http://127.0.0.1:8000/api/get_Dynamic_Tables";

    const url_users = "http://127.0.0.1:8000/api/get_Financial_Users_Accounts";
    const url_teachers = "http://127.0.0.1:8000/api/get_Financial_Teachers_Accounts";
    useEffect(() => {

        setTitle("الرواتب")


    }, [])



    const search = () => {
        if (type == "أستاذ") {
            setUrl('/teachPAy/');
            axios.get(url_teachers, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then(response => {

                    console.log("roleResponse", response.data.data)
                    setData(response.data.data);

                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setOpen(false);
                    // setError(null);
                    // setLoad(false);

                })
                .catch((err) => {
                    setMsg(err.response.data.message);

                    setOpenAlert(true);
                    if (err.response.status == 422) {

                        setMsg(err.response.data.message);
                        setOpenAlert(true);
                        setOpen(false)
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
        }
        if (type == "موظف مكتبي") {
            setUrl('/userPAy/');
            axios.get(url_users, { headers: { authorization: "Bearer " + user.accessToken }, })
                .then(response => {

                    console.log("roleResponse", response.data.data)
                    setData(response.data.data);

                    setMsg(response.data.message);
                    console.log("res.message", response.data)
                    setOpenAlert(true);
                    setOpen(false);
                    // setError(null);
                    // setLoad(false);

                })
                .catch((err) => {
                    setMsg(err.response.data.message);

                    setOpenAlert(true);
                    if (err.response.status == 422) {

                        setMsg(err.response.data.message);
                        setOpenAlert(true);
                        setOpen(false)
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
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };


    return (
        <>
            <Container className={classes.container}>
                <div className={classes.header}>
                    <Grid container spacing={2}>


                        <Grid item xs={11} md={6} lg={6}>
                            <span style={{ color: "#333", fontSize: "20px" }}> البحث حسب الدور </span><br />
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                label=""
                                className={classes.select}

                            >
                                <MenuItem value="موظف مكتبي"> موظف مكتبي </MenuItem>

                                <MenuItem value="أستاذ"> أستاذ </MenuItem>
                            </Select>
                            <Button onClick={() => search()}><Search className={classes.searchIcon} /></Button>
                        </Grid>




                    </Grid>


                </div>
                <div className={classes.line}></div>

                <Grid container spacing={2}>
                    {data.length != 0 && data.map((item) => (
                        <Grid item lg={3}>
                            <div className="PayDiv" onClick={() => { navigate(url + item.userId + "/" + item.FAId) }}>
                                <div className="payContent">
                                    <h4>{item.accountName}</h4>
                                </div>
                            </div>
                        </Grid>
                    ))

                    }
                </Grid>



                <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                        {msg}
                    </Alert>
                </Snackbar>

            </Container >
        </>
    );
}

export default PAYMENTS;