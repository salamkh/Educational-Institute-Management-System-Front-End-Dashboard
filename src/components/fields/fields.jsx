import { Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField, makeStyles, FormGroup, Button, Container, IconButton, Snackbar } from "@material-ui/core";
import "./fields.css";
import ArticleIcon from '@mui/icons-material/Article';
import { useState } from "react";
import { useEffect } from "react";
import { Add, DeleteOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles((theme) => ({

    container: {
        paddingTop: theme.spacing(7),
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
const ADDFIELD = ({ setTitle }) => {
    const classes = useStyles();
    const [table, setTable] = useState("");
    const [tableId, setTableId] = useState("");
    const [fName, setFName] = useState("");
    const [fLabel, setLabel] = useState("");
    const [type, setType] = useState("");
    const [dValue, setValue] = useState("");
    const [unique, setUnique] = useState(0);
    const [nullAble, setNull] = useState(false);
    const [tables, setTables] = useState("");
    const [types, setTypes] = useState(["string", "integer", "date", "double", "BigInteger", "enum"]);
    const [pValues, setEnum] = useState([]);
    const [oneValue, setOValue] = useState("");
    const [check, setCheck] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const url_tables = "http://127.0.0.1:8000/api/get_Dynamic_Tables";
    const url_add = "http://127.0.0.1:8000/api/add_Column";

    useEffect(() => {
        let isMounted = true;
        setTitle("إضافة واصفة")

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

    const handleUnique = (value) => {
        console.log("unique", value)
        if (value === true)
            setUnique(1);
        if (value === false)
            setUnique(0)
    }

    const addPos = () => {
        setEnum([...pValues, oneValue]);
        setOValue("");
    }

    const removePos = (value) => {
        setEnum((item) => item.filter((i) => i != value))
    }

    const getId = () => {
        let id = tables;
        console.log("tabbbbb", table);
        console.log("tables", tables);
        for (let i = 0; i < id.length; i++) {
            console.log("item id", id[i])
            if (id[i].name === table) {
                return id[i].tableId;
            }
        }

    }

    const submit = (e) => {
        e.preventDefault();
        let id = getId();
        console.log("id", id);
        const formData = new FormData();
        formData.append('tableId', id);
        formData.append('table', table);
        formData.append('fLabel', fLabel);
        formData.append('fName', fName);
        formData.append('type', type);
        formData.append('unique', unique);
        formData.append('pValues', pValues);
        formData.append('dValue', dValue);
        if (pValues.length != 0) {
            pValues.forEach(item => formData.append('pValues[]', item));
        }

        if (pValues.length == 0) {
            formData.append('pValues[]', pValues);
        }

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

                setOpenAlert(true);
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

    return (
        <>
            <Container className={classes.container}>
                <div className={classes.header}>

                    <div style={{ display: "flex" }}>
                        <div className={classes.addIconButton} style={{ marginRight: "0px" }}>
                            <br />
                            <Link to="/fields" style={{ textDecoration: "none" }}>
                                <Button><ArticleIcon className={classes.addIcon} /></Button></Link>
                            <span style={{ color: "#333", fontSize: "20px" }}>  استعراض الحقول </span>
                        </div>
                    </div>
                </div>
                <div className={classes.line}></div>
                <div style={{ display: "flex", marginTop: "3%" }}>
                    <div className="addField">
                        <div className="divFieldForm">
                            <form action="" >
                                <Grid container style={{ marginTop: "60px" }}>
                                    <div className="divSplit">
                                        <Grid item md={6} lg={6} >
                                            <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px" }}>تحديد الميزة</span></div>

                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={table}
                                                onChange={(e) => setTable(e.target.value)}
                                                label=""
                                                className={classes.select}

                                            >
                                                {tables && tables.map((item) => (

                                                    <MenuItem value={item.name} > {item.lable} </MenuItem>

                                                ))}

                                            </Select>
                                        </Grid>
                                        <Grid item md={6} lg={6}>
                                            <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px" }}>اسم الواصفة باللغة الانجليزية     </span></div>

                                            <TextField
                                                id="outlined-text"
                                                label=""
                                                type="text"
                                                style={{ height: "20px", width: "150px" }}
                                                value={fName}
                                                onChange={(e) => setFName(e.target.value)}

                                            />


                                        </Grid>
                                    </div>

                                    <br />
                                    <div className={classes.line}></div>
                                    <div className="divSplit">
                                        <Grid item md={6} lg={6} >
                                            <div className="label_user_div"> <span style={{ color: "#333", fontSize: "20px" }}>اسم الواصفة باللغة العربية</span></div>

                                            <TextField
                                                id="outlined-text"
                                                label=""
                                                type="text"
                                                style={{ height: "20px", width: "150px" }}
                                                value={fLabel}
                                                onChange={(e) => setLabel(e.target.value)}

                                            />
                                        </Grid>

                                        <Grid item md={6} lg={6}>
                                            <div className="label_user_div" > <span style={{ color: "#333", fontSize: "20px" }}>النوع</span></div>

                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                                label=""
                                                className={classes.select}

                                            >
                                                {types && types.map((item) => (

                                                    <MenuItem value={item} > {item} </MenuItem>

                                                ))}

                                            </Select>
                                        </Grid>
                                    </div>
                                    <br />
                                    <div className={classes.line}></div>
                                    <div className="divSplit">
                                        <Grid item md={6} lg={6} >
                                            <div className="label_user_div" > <span style={{ color: "#333", fontSize: "20px" }}>القيمة الافتراضية</span></div>
                                            <TextField
                                                id="outlined-text"
                                                label=""
                                                type="text"
                                                style={{ height: "20px", width: "150px" }}
                                                value={dValue}
                                                onChange={(e) => setValue(e.target.value)}

                                            />
                                        </Grid>
                                        <Grid item md={6} lg={6} >
                                            {/* <div className="label_user_div"  > <span style={{ color: "#333", fontSize: "20px" }}>شروط الواصفة</span></div> */}
                                            <FormGroup style={{marginRight:"3%"}}>
                                                <FormControlLabel control={<Checkbox />} label="قيم الواصفة مميزة" onChange={(e) => handleUnique(e.target.checked)} style={{ fontSize: "20px", color: "#232730" }} />
                                            </FormGroup>

                                        </Grid>
                                    </div>

                                    <div className={classes.submit}>
                                        <button className={classes.addButton} style={{ mrginRight: "1200px", marginLeft: "200px", fontSize: "20px" ,height:"40px",borderRadius:"8px" }} onClick={(e) => submit(e)} >تسجيل</button>


                                    </div>
                                </Grid>
                            </form>
                        </div>
                    </div>
                    {check &&
                        <div className="possible">
                            <div className={classes.addIconButton} style={{ marginRight: "0px", direction: "rtl" }}>
                                <br />
                                <div style={{ display: "flex" }}>

                                    <div style={{ display: "flex", flexDirection: "column", direction: "rtl", marginRight: "8px" }}>
                                        <div > <span style={{ color: "#333", fontSize: "20px" }}> القيم المحتملة</span></div>
                                        <div>
                                            <TextField
                                                id="outlined-text"
                                                label=""
                                                type="text"
                                                style={{ height: "20px", width: "150px" }}
                                                value={oneValue}
                                                onChange={(e) => setOValue(e.target.value)}

                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Button onClick={() => addPos()}><Add className={classes.addIcon} /></Button>
                                    </div>
                                </div>
                            </div>

                            <div className={classes.line}></div>

                            <div style={{ width: "100%", overflowY: "auto" }}>
                                {pValues && pValues.map((item) => (
                                    <div className="containerItem">
                                        <Grid container spacing={2}>
                                            <Grid item lg={10}><p style={{ fontWeight: "500", color: "#333" }}>{item} </p></Grid>
                                            <Grid item lg={2}>
                                                <IconButton className={classes.Icons} >
                                                    <DeleteOutlined className={classes.deleteIcon} onClick={() => removePos(item)} />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </div>
                                ))}

                            </div>

                        </div>
                    }
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

export default ADDFIELD;