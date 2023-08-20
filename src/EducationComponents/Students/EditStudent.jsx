import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import "./addStudent.scss";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";

export default function EditStudent({ setTitle }) {

    useEffect(() => {
        setTitle("تعديل معلومات طالب")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const id = params.id;
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [myStatus, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [openAlert, setOpenAlert] = useState(false);

    const [msg, setMsg] = useState('');

    useEffect(() => {
        let isMounted = true;
        fetch(API_KEY + '/showStudent/' + id, {
            method: 'GET',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
        })
            .then(response => {
                response.json().then(response => {
                    if (isMounted) {
                        setName(response.Student.name);
                        setBirthdate(response.Student.birthdate);
                        setPhone(response.Student.phone);
                        setAddress(response.Student.address);
                        setGender(response.Student.gender);
                        setStatus(response.Student.status);
                        setPassword(response.Student.password);
                    }
                })
            })
    }, [])

    const handleEdit = (e) => {
        e.preventDefault();
        const myStudent = {
            name, birthdate, phone, address, gender, myStatus, password
        };
        fetch(API_KEY + '/editStudentInfo/' + id, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
            body: JSON.stringify(myStudent)
        }).then((response) => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }

    const handleClose = (event, reason) => {
        navigate(-1);
        setOpenAlert(false);
    }

    return (
        <>
            <div className="test2" style={{ marginTop: "70px" }}>
                <h1 style={{ color: "rgba(39,116,218,0.5)" }}>تعديل طالب</h1>
                <div className="container">
                    <form onSubmit={handleEdit} >

                        <div className={"card"} style={{ width: "300px", marginRight: "30%", paddingRight: "10%" }}>
                            <label>الاسم </label>
                            <input
                                type="text"
                                value={name}
                                style={{
                                    color: "#555",
                                    width: "250px",
                                    height: " 25px",
                                    fontize: "14px",
                                    fontFamily: "cursive",
                                    borderRadius: "10px",
                                    borderColor: "white",
                                    boxShadow: "0px 0 10px rgb(39,116,218)"
                                }}
                                onChange={(e) => setName(e.target.value)}

                            />

                            <label>تاريخ الميلاد</label>
                            <input

                                type="date"
                                value={birthdate}
                                style={{
                                    color: "#555",
                                    width: "250px",
                                    height: " 25px",
                                    fontize: "14px",
                                    fontFamily: "cursive",
                                    borderRadius: "10px",
                                    borderColor: "white",
                                    boxShadow: "0px 0 10px rgb(39,116,218)"
                                }}
                                onChange={(e) => setBirthdate(e.target.value)}

                            />
                            <label>رقم الهاتف</label>
                            <input
                                type="number"
                                value={phone}
                                style={{
                                    color: "#555",
                                    width: "250px",
                                    height: " 25px",
                                    fontize: "14px",
                                    fontFamily: "cursive",
                                    borderRadius: "10px",
                                    borderColor: "white",
                                    boxShadow: "0px 0 10px rgb(39,116,218)"
                                }}
                                onChange={(e) => setPhone(e.target.value)}

                            />
                            <label>العنوان</label>
                            <input
                                type="text"
                                value={address}
                                style={{
                                    color: "#555",
                                    width: "250px",
                                    height: " 25px",
                                    fontize: "14px",
                                    fontFamily: "cursive",
                                    borderRadius: "10px",
                                    borderColor: "white",
                                    boxShadow: "0px 0 10px rgb(39,116,218)"
                                }}
                                onChange={(e) => setAddress(e.target.value)}

                            />
                            <label>كلمة السر</label>
                            <input
                                type="password"
                                value={password}
                                style={{
                                    color: "#555",
                                    width: "250px",
                                    height: " 25px",
                                    fontize: "14px",
                                    fontFamily: "cursive",
                                    borderRadius: "10px",
                                    borderColor: "white",
                                    boxShadow: "0px 0 10px rgb(39,116,218)"
                                }}
                                onChange={(e) => setPassword(e.target.value)}

                            />
                            <label>الجنس</label>
                            <Select
                                required
                                label='الجنس'
                                value={gender}
                                type="select"
                                onChange={(e) => setGender(e.target.value)}
                                style={{ maxWidth: "250px" }}
                            >
                                <MenuItem value={'ذكر'} >ذكر</MenuItem>
                                <MenuItem value={'أنثى'} >أنثى</MenuItem>
                            </Select>
                            <label>الحالة</label>
                            <Select
                                required
                                label='الحالة'
                                value={myStatus}
                                type="select"
                                onChange={(e) => setStatus(e.target.value)}
                                style={{ maxWidth: "250px" }}
                            >
                                <MenuItem value={'حر'} >حر</MenuItem>
                                <MenuItem value={'نظامي'} >نظامي</MenuItem>
                                <MenuItem value={'-'} >غير ذلك</MenuItem>
                            </Select>
                            <br />

                            <button type="submit" style={{ marginTop: "5px", marginRight: "50%", backgroundColor: "rgb(39,116,218)" }}>
                                تعديل
                            </button>
                            <button style={{ marginTop: "-30px", marginRight: "15%", backgroundColor: "rgba(39,116,218,0.5)" }}>
                                إلغاء
                            </button>
                        </div>

                    </form>
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