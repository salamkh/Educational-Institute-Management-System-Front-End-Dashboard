import { Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField, makeStyles, FormGroup, Button, Container, IconButton, Snackbar } from "@material-ui/core";
import "./showFields.css";
import ArticleIcon from '@mui/icons-material/Article';
import { useState } from "react";
import { useEffect } from "react";
import { Add, DeleteOutlined, Search } from "@material-ui/icons";
import axios from "axios";
import Alert from "@mui/material/Alert";
const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(10),
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
const FIELDS = ({ setTitle }) => {
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
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const url_tables = "http://127.0.0.1:8000/api/get_Dynamic_Tables";
    const url_search = "http://127.0.0.1:8000/api/get_Table_Columns/";
    const url_delete = "http://127.0.0.1:8000/api/delete_Column/";

    useEffect(() => {


        let isMounted = true;
        setTitle("استعراض الواصفات")
        axios.get(url_tables, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then(response => {
                if (isMounted) {
                    console.log("roleResponse", response.data.data)
                    setTables(response.data.data);


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
        if (type == "enum")
            setCheck(true)

    }, [type])



    const search = () => {
        axios.get(url_search + table, { headers: { authorization: "Bearer " + user.accessToken }, })
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const handleDelete = (value) => {
        axios.delete(url_delete + value.tableColId, { headers: { authorization: "Bearer " + user.accessToken }, })
            .then((response) => {
                console.log(response);
                setMsg(response.data.message);
                console.log("res.message", response.data)
                setOpenAlert(true);
                setTable(value.tableId);
                search();
            })
            .catch(error => {
                console.log(error);
                   setMsg(error.response.data.message);
                
                setOpenAlert(true);
            })

    }


    return (
        <>
            <Container className={classes.container}>
                <div className={classes.header}>
                    <Grid container spacing={2}>


                        <Grid item xs={11} md={6} lg={6}>
                            <span style={{ color: "#333", fontSize: "20px" }}> استعراض واصفات ميزة </span><br />
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={table}
                                onChange={(e) => setTable(e.target.value)}
                                label=""
                                className={classes.select}

                            >
                                {tables.length != 0 && tables.map((item) => (

                                    <MenuItem value={item.tableId} key={item.tableId}> {item.lable} </MenuItem>

                                ))}

                            </Select>
                            <Button onClick={() => search()}><Search className={classes.searchIcon} /></Button>
                        </Grid>




                    </Grid>


                </div>
                <div className={classes.line}></div>

                <div style={{ direction: "rtl" }}>
                    <Grid container spacing={2}>
                        <Grid item lg={3}><h3 style={{ color: "#3d3042" }}>اسم الحقل</h3></Grid>
                        <Grid item lg={3}><h3 style={{ color: "#3d3042" }}>الوصف</h3></Grid>
                        <Grid item lg={2}><h3 style={{ color: "#3d3042" }}> النوع</h3></Grid>
                        <Grid item lg={2}><h3 style={{ color: "#3d3042" }}> الصنف</h3></Grid>
                        <Grid item lg={2}><h3 style={{ color: "#3d3042" }}> حذف</h3></Grid>
                    </Grid>
                    <div>
                        {data.length != 0 && data.map((item) => (
                            <div className="containerItemField">
                                <Grid container spacing={2}>
                                    <Grid item lg={3}><p style={{ fontWeight: "500", color: "#7e2e5c" }}>{item.EnglishName}</p></Grid>
                                    <Grid item lg={3}><p style={{ color: "#445e80", fontWeight: "600" }}> {item.arabicName}</p></Grid>
                                    <Grid item lg={2}><p style={{ fontWeight: "500", color: "#7e2e5c" }}>{item.dataType} </p></Grid>
                                    <Grid item lg={2}><p style={{ color: "#445e80", fontWeight: "600" }}> {item.columnType}</p></Grid>
                                    <Grid item lg={2}>
                                        <IconButton className={classes.Icons} >
                                            <DeleteOutlined className={classes.deleteIcon} onClick={()=>handleDelete(item)} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </div>
                        ))

                        }
                    </div>
                </div>

                <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                        {msg}
                    </Alert>
                </Snackbar>

            </Container>
        </>
    );
}

export default FIELDS;