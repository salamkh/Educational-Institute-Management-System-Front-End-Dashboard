import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Snackbar, Grid } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import "./AddCourse.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../useFetch";

export default function AddCourse({ setTitle }) {

    useEffect(() => {
        setTitle("إضافة دورة")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const navigate = useNavigate();
    const [subjectId, setSubjectId] = useState('');
    const [typeId, setTypeId] = useState('');
    const [classId, setMyClassId] = useState('');
    const [teacherId, setTeacherId] = useState('');
    const [headlines, setHeadlines] = useState('');
    const [addElements, setAddElements] = useState('');
    const [cost, setCost] = useState('');
    const [maxNStudent, setMaxNStudent] = useState('');
    const [sessionNumber, setSessionNumber] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState('');
    const [courseDays, setCourseDays] = useState('');
    const [room, setRoom] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const { data: typesData } = useFetch(API_KEY + '/showAllTypes');
    const { data: classesData } = useFetch(API_KEY + '/showAllClass');
    const { data: subjectsData } = useFetch(API_KEY + '/showSubjectsInType/' + typeId);
    const { data: teacherData } = useFetch(API_KEY + '/getSubjectsTeacher/' + subjectId);

    const handleSubmit = (e) => {
        e.preventDefault();
        const myCourse = {
            subjectId, typeId, classId, headlines, addElements, cost, maxNStudent, sessionNumber,
            startDate, endDate, room, duration, courseDays, teacherId, startTime
        };
        fetch(API_KEY + '/createCourse', {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
            body: JSON.stringify(myCourse)
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

    const handleChange = (e) => {
        var options = e.target.options;
        var value = [];
        var j = 0;
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                value[j] = options[i].value;
                j++;
            }
        }
        const reducedArray = value.join();
        console.log(reducedArray);
        setCourseDays(reducedArray);
    }

    return (
        <>
            <div className="test" style={{ marginTop: "70px", marginLeft: "-8%" }}>
                <h4 style={{ color: "rgba(39,116,218,0.5)" }}>إضافة دورة</h4>
                <div className="container" style={{ marginLeft: "-17%", marginTop: "4%", position: "absolute" }}>
                    <form onSubmit={handleSubmit} >
                        <Grid container>
                            <Grid item md={6} lg={6}>
                                <div className={"card"}>
                                    <label>النوع</label>
                                    <Select
                                        required
                                        label='النوع'
                                        value={typeId}
                                        type="select"
                                        onChange={(e) => setTypeId(e.target.value)}
                                        style={{ width: "300px" }}
                                    >
                                        {typesData && typesData.Types.map((item) => (
                                            <MenuItem value={item.typeId} key={item.typeId}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <label>الفئة</label>
                                    <Select
                                        required
                                        value={classId}
                                        type="select"
                                        onChange={(e) => setMyClassId(e.target.value)}
                                        style={{ maxWidth: "300px" }}
                                    >
                                        {classesData && classesData.Class.map((item) => (
                                            <MenuItem value={item.classId} key={item.classId}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                    <label>المادة</label>
                                    {subjectsData && subjectsData.subject &&
                                        <Select
                                            required
                                            value={subjectId}
                                            type="select"
                                            onChange={(e) => setSubjectId(e.target.value)}
                                            style={{ maxWidth: "300px" }}
                                        >
                                            {subjectsData.subject.map((item) => (
                                                <MenuItem value={item.sId} key={item.sId}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    }
                                    <label>الأستاذ</label>
                                    {teacherData &&
                                        <Select
                                            required
                                            value={teacherId}
                                            type="select"
                                            onChange={(e) => setTeacherId(e.target.value)}
                                            style={{ maxWidth: "300px" }}
                                        >
                                            {teacherData.map((item) => (
                                                <MenuItem value={item.tId} key={item.tId}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    }
                                    <br />

                                    <label>العناوين المعرفية التي تقدمها </label>
                                    <input
                                        type="text"
                                        value={headlines}
                                        onChange={(e) => setHeadlines(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}
                                    />
                                    <label>العناصر التي تضاف لقيمة الدورة</label>
                                    <input
                                        type="text"
                                        value={addElements}
                                        onChange={(e) => setAddElements(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}

                                    />
                                    <label>تاريخ البداية</label>
                                    <input

                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}
                                    />
                                    <label>تاريخ النهاية</label>
                                    <input
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}
                                    />

                                </div>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <div className={"card"} >
                                    <label>القسط</label>
                                    <input
                                        required
                                        type="number"
                                        value={cost}
                                        onChange={(e) => setCost(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            maxWidth: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"                    
                                        }}
                                    />

                                    <label>العدد الأقصى المسموح به لعدد الطلاب</label>
                                    <input
                                        type="number"
                                        value={maxNStudent}
                                        onChange={(e) => setMaxNStudent(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}
                                    />
                                    <label>عدد الجلسات</label>
                                    <input
                                        required
                                        type="number"
                                        value={sessionNumber}
                                        onChange={(e) => setSessionNumber(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}
                                    />
                                    <label>ساعة بدءالجلسة</label>
                                    <input
                                        required
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}
                                    />
                                    <label>مدة الجلسة</label>
                                    <input
                                        required
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}
                                    />

                                    <label>أيام الجلسات</label>
                                    <select
                                        multiple="multiple"
                                        // value={courseDays}
                                        onChange={handleChange}
                                        style={{ maxWidth: "300px" }}
                                    >
                                        <option value={'السبت'}>السبت</option>
                                        <option value={'الأحد'}>الأحد</option>
                                        <option value={'الاثنين'}>الاثنين</option>
                                        <option value={'الثلاثاء'}>الثلاثاء</option>
                                        <option value={'الأربعاء'}>الأربعاء</option>
                                        <option value={'الخميس'}>الخميس</option>
                                        <option value={'الجمعة'}>الجمعة</option>
                                    </select>

                                    <label>القاعة</label>
                                    <input
                                        required
                                        type="text"
                                        value={room}
                                        onChange={(e) => setRoom(e.target.value)}
                                        style={{
                                            fontSize: "15px",
                                            fontFamily: "cursive",
                                            color: "#555",
                                            width: "300px",
                                            height: " 25px",
                                            fontize: "14px",
                                            fontFamily: "cursive",
                                            borderRadius: "10px",
                                            borderColor: "white",
                                            boxShadow: "0px 0 10px rgb(39,116,218)"
                                        }}
                                    />
                                    <button type="submit" style={{ marginTop: "5px", marginRight: "30%", backgroundColor: "rgb(39,116,218)" }}>
                                        إضافة
                                    </button>
                                </div>
                            </Grid>
                        </Grid>
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