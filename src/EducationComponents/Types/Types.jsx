import React, { useState, useEffect } from 'react';
import { Add, DeleteOutlined, Edit, ArrowBackIosRounded } from "@material-ui/icons";
import { Container, Modal, Snackbar, Grid, Button } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import "./types.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../useFetch";
export default function Types({ setTitle }) {

    useEffect(() => {
        setTitle("أنواع الدورات")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const { data: ListData, isPending, error } = useFetch(API_KEY + '/showAllTypes');

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [openA, setOpenA] = useState(false);
    const [typeId, setTypeId] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const myType = { name };
        fetch(API_KEY + '/createType', {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
            body: JSON.stringify(myType)
        }).then((response) => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }

    const handleDelete = (itemId) => {
        fetch(API_KEY + '/deleteType/' + itemId, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
        }).then((response) => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const myType = { name };
        setOpenA(false);
        fetch(API_KEY + '/editeTypes/' + typeId, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
            body: JSON.stringify(myType)
        }).then(response => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }

    const handleClick = (itemId, n) => {
        setTypeId(itemId);
        setName(n);
        setOpenA(true);
    }

    const handleClose = (event, reason) => {
        navigate(0);
        setOpenAlert(false);
    }

    return (
        <>
            <div class="limiter" style={{ backgroundImage: "url(/assets/math.png)", backgroundRepeat: "no-repeat", backgroundSize: "contain" }}>
                <div class="containerTable" style={{ width: "85%", marginTop: "10px" }}>
                    <Grid item xs={11} md={4} lg={4} style={{ marginLeft: "60%", width: "500px" }}>
                        <span style={{ color: "#333", fontSize: "20px", marginLeft: "140px" }}>إضافة نوع</span><br />
                        <input type="text" style={{
                            height: "25px",
                            width: "200px",
                            borderRadius: "5px",
                            marginTop: "5px",
                            border: "1px  solid rgb(121, 115, 115)",
                            padding: "5px",
                            backgroundColor: "",
                            color: "rgb(37, 37, 37)",
                            direction: "rtl",
                        }}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                        <Button ><Add
                            style={{
                                backgroundColor: "rgba(39,116,218,0.7)",
                                padding: "5px",
                                borderRadius: "5px",
                                color: "white",
                                marginLeft: "-150px",
                                marginTop: "-57px"
                            }}
                            type="submit"
                            onClick={handleSubmit}
                        /></Button>
                    </Grid>
                    <div class="wrap-table100" >
                        <div class="table100" style={{ marginTop: "15%", marginLeft: "-48%", position: "absolute" }}>
                            <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)" }}>
                                <thead>
                                    <tr class="table100-head">
                                        <th class="column1">العمليات</th>
                                        <th class="column1">المواد</th>
                                        <th class="column2">اسم النوع</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {error && <div>{error}</div>}
                                    {isPending && <div>Loading...</div>}
                                    {ListData && ListData.Types && ListData.Types.map((item) => {
                                        return <tr key={item.typeId}>
                                            <td><DeleteOutlined onClick={() => handleDelete(item.typeId)} />
                                                <Edit onClick={() => handleClick(item.typeId, item.name)} /></td>
                                            <td><a href={'/EducationComponents/Subject/Subject/' + item.typeId}><ArrowBackIosRounded /></a></td>
                                            <td> <a href={'/EducationComponents/Courses/Courses/' + item.typeId}>{item.name}</a></td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal open={openA} >
                        <Container class="editForm" style={{ marginLeft: "35%" ,width:"250px"}}>
                            {
                                <form onSubmit={handleEdit} style={{ margin: "20px"}}>
                                    <label style={{ marginTop: "5px", marginRight: "40%", boxShadow: "0px 0 10px rgb(39,116,218)" }}>تعديل نوع</label>
                                    <input type="text" placeholder="اسم النوع"
                                        style={{ marginTop: "40px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                        id="myInput"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <div style={{ display: "flex", marginTop: "35px", marginLeft: "-40px" }}>
                                        <button type="submit" style={{ marginBottom: "5px", width: "70px", backgroundColor: "rgb(39,116,218)" }}>تعديل</button>
                                        <button onClick={(e) => setOpenA(false)} style={{
                                            width: "70px", marginRight: "70px", marginBottom: "5px",
                                            backgroundColor: "rgba(39,116,218,0.5)"
                                        }}>إلغاء</button>
                                    </div>
                                </form>
                            }
                        </Container>
                    </Modal >

                </div>
            </div>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </>

    );
}