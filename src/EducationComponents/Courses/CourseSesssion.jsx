import React, { useState, useEffect } from 'react';
import { Snackbar, Grid, Select, Container, Modal, MenuItem, Tooltip } from "@material-ui/core";
import { DeleteOutlined, Edit, Timer } from "@material-ui/icons";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";


export default function CourseSesssion({ setTitle }) {

    useEffect(() => {
        setTitle("الجلسات")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const courseId = params.id;
    const sessionId = params.sessionId;

    const [gender, setGender] = useState('');
    const [name, setName] = useState('');

    const { data: SessionData } = useFetch(API_KEY + '/showSession/' + sessionId);
    const { data: SearchData } = useFetch(API_KEY + '/searchAboutStudent/' + sessionId + "/" + name);
    const { data: ShowData } = useFetch(API_KEY + '/showStudentsInCourseDependOnGenderWithTest/' + sessionId + '/' + gender);
    const { data: StudentsTest, isPending, error } = useFetch(API_KEY + '/showAllTests/' + sessionId);
    const { data: Testsort } = useFetch(API_KEY + '/sortStudentsInCourseByTest/' + sessionId);

    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [openA, setOpenA] = useState(false);
    const [openA1, setOpenA1] = useState(false);
    const [openA2, setOpenA2] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [studentStatus, setStudentStatus] = useState('');
    const [studentId, setStudentId] = useState('');
    const [cause, setCause] = useState('');
    const [value, setValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    const handleClose = (event, reason) => {
        navigate(0);
        setOpenAlert(false);
    }
    const handleDelete = () => {
        fetch(API_KEY + '/deleteSession/' + sessionId, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
        }).then((response) => {
            response.json().then(response => {
                setMsg(response.message);
                navigate(-1);
            })
            setOpenAlert(true);
        })
    }
    const handleClick = (e) => {
        setDate(SessionData.Session.date);
        setStartTime(SessionData.Session.startTime);
        setOpenA(true);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        const data = { date, startTime };
        setOpenA(false);
        fetch(API_KEY + '/editSession/' + sessionId, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }
    const handleClickStudent = (studentId1, cause1, value1, name1) => {
        setStudentId(studentId1);
        setCause(cause1);
        setValue(value1)
        setStudentName(name1);
        setOpenA1(true);
    }
    const handleEditTest = (e) => {
        e.preventDefault();
        const data = { sessionId, courseId, studentId, value, cause };
        setOpenA1(false);
        fetch(API_KEY + '/createTest', {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }
    const handleClickTimeMon = (studentId1, studentStatus1, name1) => {
        setStudentId(studentId1);
        setStudentStatus(studentStatus1);
        setStudentName(name1);
        setOpenA2(true);
    }
    const handleEditMon = (e) => {
        e.preventDefault();
        const data = { sessionId, studentId, studentStatus };
        setOpenA2(false);
        fetch(API_KEY + '/createSessionStudentMonitoring', {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }
    return (
        <>
            <div class="courses" style={{ alignContent: 'center', marginTop: "50px", width: "75%" }}>
                {SessionData && <h2 style={{ marginLeft: "12%", fontSize: "20px", textAlign: "center", color: "rgba(39,116,218,0.5)" }}>
                    رقم الجلسة : {SessionData.Session.sessionNumber}
                    <br />
                    تاريخ الجلسة : {SessionData.Session.date}
                    <br />
                    وقت بداية الجلسة : {SessionData.Session.startTime}
                    <br />

                    <DeleteOutlined onClick={handleDelete} />
                    <Edit onClick={handleClick} />
                </h2>}
                <Grid item xs={6} md={6} lg={6} style={{ width: "100%", marginLeft: "10%", marginTop: "-10%", }}>

                    <button onClick={() => setIsClicked(true)} style={{ marginLeft: "-90px", backgroundColor: "rgb(130,202,250)" }}>
                        ترتيب حسب التسميع
                    </button>
                    <Grid item xs={6} md={6} lg={6} style={{ width: "100%", marginLeft: "10%", marginTop: "-50px" }}>
                        <span style={{ color: "#333", fontSize: "20px", marginLeft: "60px" }}>عرض ذكور-إناث</span><br />
                        <Select
                            type="select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            style={{ width: "200px" }}
                        >
                            <MenuItem value={'أنثى'}>إناث</MenuItem>
                            <MenuItem value={'ذكر'}>ذكور</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

                <Grid item xs={6} md={6} lg={6} style={{ marginLeft: "75%", marginTop: "-65px" }}>
                    <span style={{ color: "#333", fontSize: "20px", marginLeft: "100px" }}>البحث عن طالب</span><br />
                    <input type="text"
                        placeholder="اسم الطالب"
                        style={{
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
                </Grid>
                {
                    Testsort && isClicked &&
                    <div class="table100" style={{ marginTop: "20%", marginRight: "45%" }}>
                        <table class="mytable" style={{ boxShadow: "0px 0 20px rgb(39,116,218)", direction: "ltr" }}>
                            <thead>
                                <tr class="table100-head">
                                    <th class="column1">العمليات</th>
                                    <th class="column1">السبب</th>
                                    <th class="column1">الأستاذ المسمع</th>
                                    <th class="column1">التسميع</th>
                                    <th class="column2">التفقد</th>
                                    <th class="column2">اسم الطالب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Testsort && Testsort.SortTest.map((item) => {
                                    return <tr key={item.studentId}>
                                        <td><Tooltip title="تعديل التسميع ">
                                            <Edit onClick={() => handleClickStudent(item.studentId, item.cause, item.value, item.name)} />
                                        </Tooltip>
                                            <Tooltip title="تعديل التفقد ">
                                                <Timer onClick={() => handleClickTimeMon(item.studentId, item.studentStatus, item.name)} />
                                            </Tooltip></td>
                                        <td>{item.cause}</td>
                                        <td>{item.teacher}</td>
                                        <td>{item.value}</td>
                                        <td>{item.studentStatus}</td>
                                        <td> <a href={'/EducationComponents/Students/Student/' + item.studentId}>{item.name}</a></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                {
                    ShowData &&
                    <div class="table100" style={{ marginTop: "20%", marginRight: "45%" }}>
                        <table class="mytable" style={{ boxShadow: "0px 0 20px rgb(39,116,218)", direction: "ltr" }}>
                            <thead>
                                <tr class="table100-head">
                                    <th class="column1">العمليات</th>
                                    <th class="column1">السبب</th>
                                    <th class="column1">الأستاذ المسمع</th>
                                    <th class="column1">التسميع</th>
                                    <th class="column2">التفقد</th>
                                    <th class="column2">اسم الطالب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ShowData && ShowData.Tests.map((item) => {
                                    return <tr key={item.studentId}>
                                        <td><Tooltip title="تعديل التسميع ">
                                            <Edit onClick={() => handleClickStudent(item.studentId, item.cause, item.value, item.name)} />
                                        </Tooltip>
                                            <Tooltip title="تعديل التفقد ">
                                                <Timer onClick={() => handleClickTimeMon(item.studentId, item.studentStatus, item.name)} />
                                            </Tooltip></td>
                                        <td>{item.cause}</td>
                                        <td>{item.teacher}</td>
                                        <td>{item.value}</td>
                                        <td>{item.studentStatus}</td>
                                        <td> <a href={'/EducationComponents/Students/Student/' + item.studentId}>{item.name}</a></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                {
                    SearchData &&
                    <div class="table100" style={{ marginTop: "20%", marginRight: "45%" }}>
                        <table class="mytable" style={{ boxShadow: "0px 0 20px rgb(39,116,218)", direction: "ltr" }}>
                            <thead>
                                <tr class="table100-head">
                                    <th class="column1">العمليات</th>
                                    <th class="column1">السبب</th>
                                    <th class="column1">الأستاذ المسمع</th>
                                    <th class="column1">التسميع</th>
                                    <th class="column2">التفقد</th>
                                    <th class="column2">اسم الطالب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SearchData && SearchData.Tests.map((item) => {
                                    return <tr key={item.studentId}>
                                        <td><Tooltip title="تعديل التسميع ">
                                            <Edit onClick={() => handleClickStudent(item.studentId, item.cause, item.value, item.name)} />
                                        </Tooltip>
                                            <Tooltip title="تعديل التفقد ">
                                                <Timer onClick={() => handleClickTimeMon(item.studentId, item.studentStatus, item.name)} />
                                            </Tooltip></td>
                                        <td>{item.cause}</td>
                                        <td>{item.teacher}</td>
                                        <td>{item.value}</td>
                                        <td>{item.studentStatus}</td>
                                        <td> <a href={'/EducationComponents/Students/Student/' + item.studentId}>{item.name}</a></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                {
                    !ShowData && !SearchData && !isClicked &&
                    <div class="table100" style={{ marginTop: "20%", marginRight: "45%" }}>
                        <table class="mytable" style={{ boxShadow: "0px 0 20px rgb(39,116,218)", direction: "ltr" }}>
                            <thead>
                                <tr class="table100-head">
                                    <th class="column1">العمليات</th>
                                    <th class="column1">السبب</th>
                                    <th class="column1">الأستاذ المسمع</th>
                                    <th class="column1">التسميع</th>
                                    <th class="column2">التفقد</th>
                                    <th class="column2">اسم الطالب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {error && <div>{error}</div>}
                                {isPending && <div>Loading...</div>}
                                {StudentsTest && StudentsTest.Tests.map((item) => {
                                    return <tr key={item.studentId}>
                                        <td><Tooltip title="تعديل التسميع ">
                                            <Edit onClick={() => handleClickStudent(item.studentId, item.cause, item.value, item.name)} />
                                        </Tooltip>
                                            <Tooltip title="تعديل التفقد ">
                                                <Timer onClick={() => handleClickTimeMon(item.studentId, item.studentStatus, item.name)} />
                                            </Tooltip></td>
                                        <td>{item.cause}</td>
                                        <td>{item.teacher}</td>
                                        <td>{item.value}</td>
                                        <td>{item.studentStatus}</td>
                                        <td> <a href={'/EducationComponents/Students/Student/' + item.studentId}>{item.name}</a></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                <Modal open={openA} >
                    <Container class="editForm" style={{ marginLeft: "35%", width: "250px" }}>
                        {
                            <form onSubmit={handleEdit} style={{ margin: "20px" }}>
                                <label style={{ marginTop: "5px", marginRight: "30%", boxShadow: "0px 0 10px rgb(39,116,218)" }}>تعديل جلسة</label>
                                <input type="date" placeholder="تاريخ الجلسة"
                                    style={{ marginTop: "40px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                    required
                                    value={date}
                                    id="myInput"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <input type="time" placeholder="وقت بدايةالجلسة"
                                    style={{ marginTop: "40px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                    required
                                    value={startTime}
                                    id="myInput"
                                    onChange={(e) => setStartTime(e.target.value)}
                                />
                                <div style={{ display: "flex", marginTop: "35px", marginLeft: "-40px" }}>
                                    <button type="submit" style={{
                                        marginBottom: "5px", width: "70px"
                                        , backgroundColor: "rgb(39,116,218)"
                                    }}>تعديل</button>
                                    <button onClick={(e) => setOpenA(false)} style={{
                                        width: "70px", marginRight: "70px", marginBottom: "5px",
                                        backgroundColor: "rgba(39,116,218,0.5)"
                                    }}>إلغاء</button>
                                </div>
                            </form>
                        }
                    </Container>
                </Modal >
                <Modal open={openA1} >
                    <Container class="editForm" style={{ marginLeft: "35%", width: "250px" }}>
                        {
                            <form onSubmit={handleEditTest} style={{ margin: "15px", marginRight: "-5px" }}>
                                <label style={{ marginRight: "30%", boxShadow: "0px 0 10px rgb(39,116,218)" }}>تعديل تسميع</label>
                                <input type="text" placeholder={studentName}
                                    id="myInput"
                                    style={{ marginTop: "20px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                />
                                <input type="number" placeholder="التسميع"
                                    style={{ marginTop: "20px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                    required
                                    value={value}
                                    id="myInput"
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <input type="text" placeholder="السبب"
                                    style={{ marginTop: "20px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                    value={cause}
                                    id="myInput"
                                    onChange={(e) => setCause(e.target.value)}
                                />
                                <div style={{ display: "flex", marginTop: "35px" }}>
                                    <button type="submit" style={{
                                        marginBottom: "5px", width: "70px", marginRight: "25px"
                                        , backgroundColor: "rgb(39,116,218)"
                                    }}>تعديل</button>
                                    <button onClick={(e) => setOpenA1(false)} style={{
                                        width: "70px", marginRight: "30px", marginBottom: "5px",
                                        backgroundColor: "rgba(39,116,218,0.5)"
                                    }}>إلغاء</button>
                                </div>
                            </form>
                        }
                    </Container>
                </Modal >
                <Modal open={openA2} >
                    <Container class="editForm" style={{ marginLeft: "35%", width: "250px" }}>
                        {
                            <form onSubmit={handleEditMon} style={{ margin: "15px", marginRight: "-5px" }}>
                                <label style={{ marginRight: "30%", boxShadow: "0px 0 10px rgb(39,116,218)" }}>تعديل التفقد</label>
                                <input type="text" placeholder={studentName}
                                    id="myInput"
                                    style={{ marginTop: "20px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                />
                                <input type="text" placeholder="التفقد"
                                    style={{ marginTop: "20px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                    required
                                    value={studentStatus}
                                    id="myInput"
                                    onChange={(e) => setStudentStatus(e.target.value)}
                                />
                                <div style={{ display: "flex", marginTop: "35px" }}>
                                    <button type="submit" style={{
                                        marginBottom: "5px", width: "70px", marginRight: "25px"
                                        , backgroundColor: "rgb(39,116,218)"
                                    }}>تعديل</button>
                                    <button onClick={(e) => setOpenA2(false)} style={{
                                        width: "70px", marginRight: "30px", marginBottom: "5px",
                                        backgroundColor: "rgba(39,116,218,0.5)"
                                    }}>إلغاء</button>
                                </div>
                            </form>
                        }
                    </Container>
                </Modal >
            </div>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}