import React, { useState , useEffect} from 'react';
import { DeleteOutlined, Edit } from "@material-ui/icons";
import { Snackbar, Grid, Select, Tooltip, Container, Modal, MenuItem } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";


export default function CourseStudents({ setTitle }) {

    useEffect(() => {
        setTitle("الطلاب")
      }, [])
      
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const courseId = params.id;

    const [gender, setGender] = useState('');
    const [name, setName] = useState('');

    const { data: StudentData, isPending1, error1 } = useFetch(API_KEY + '/showStudentsInCourseAlphabetically/' + courseId);
    const { data: SearchData } = useFetch(API_KEY + '/searchStudentInCourse/' + courseId + "/" + name);
    const { data: ShowData } = useFetch(API_KEY + '/showStudentsInCourseDependOnGender/' + courseId + '/' + gender);
    const { data: Evalsort } = useFetch(API_KEY + '/sortAllStudentsEvaluationInCourse/' + courseId);
    
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [openA, setOpenA] = useState(false);
    const [msg, setMsg] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [cause, setCause] = useState('');
    const [behavior, setBehavior] = useState('');
    const [isClicked, setIsClicked] = useState(false);


    const handleDeleteStudent = (studentId) => {
        fetch(API_KEY + '/deleteStudentFromCourse/' + courseId + '/' + studentId, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
        }).then((response) => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }

    const handleClose = (event, reason) => {
        navigate(0);
        setOpenAlert(false);
    }

    const handleClickStudent = (studentId1, cause1, behavior1, name1) => {
        setStudentId(studentId1);
        setCause(cause1);
        setBehavior(behavior1)
        setStudentName(name1);
        setOpenA(true);
    }
    const handleEditEvaluation = (e) => {
        e.preventDefault();
        const data = { courseId, studentId, behavior, cause };
        setOpenA(false);
        fetch(API_KEY + '/createEvaluation', {
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
            <div class="courses" style={{ alignContent: 'center', marginTop: "70px", width: "70%" }}>
                <button style={{ backgroundColor: "rgb(39,116,218)"}}>
                    <a href={'/EducationComponents/Students/AddStudent/' + courseId}
                        style={{ color: "white", textDecorationLine: "none" }}>إضافة طالب</a>
                </button>
                <button style={{ marginLeft: "10px", backgroundColor: "rgb(130,202,250)"}}
                    onClick={() => setIsClicked(true)} >
                    ترتيب حسب التقييم
                </button>
                <Grid item xs={6} md={6} lg={6} style={{ width: "100%", marginLeft: "30%" ,marginTop:"-30px"}}>
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

                <Grid item xs={6} md={6} lg={6} style={{ marginLeft: "60%", marginTop: "-7%" }}>
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
                    Evalsort && isClicked &&
                    <div class="table100" >
                        <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", direction: "ltr", position: "relative", marginTop: "3%", marginLeft: "-3%" }}>
                            <thead>
                                <tr class="table100-head">
                                    <th class="column1">العمليات</th>
                                    <th class="column1">السبب</th>
                                    <th class="column1">الأستاذ المقييم</th>
                                    <th class="column1">التقييم الدراسي </th>
                                    <th class="column1">التقييم السلوكي </th>
                                    <th class="column1">الحالة الدراسية</th>
                                    <th class="column1">الجنس</th>
                                    <th class="column1">العنوان</th>
                                    <th class="column1">رقم الهاتف</th>
                                    <th class="column2">تاريخ الميلاد</th>
                                    <th class="column2">اسم الطالب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Evalsort && Evalsort.students && Evalsort.students.map((item) => {
                                    return <tr key={item.studentId}>
                                        <td> <Tooltip title="تعديل التقييم ">
                                            <Edit onClick={() => handleClickStudent(item.studentId, item.cause, item.behavior, item.name)} />
                                        </Tooltip>
                                            <Tooltip title="حذف الطالب من الدورة">
                                                <DeleteOutlined onClick={() => handleDeleteStudent(item.studentId)} />
                                            </Tooltip>
                                        </td>
                                        <td> {item.cause}</td>
                                        <td>{item.teacher}</td>
                                        <td>{item.value}</td>
                                        <td>{item.behavior}</td>
                                        <td> {item.myStatus}</td>
                                        <td> {item.gender}</td>
                                        <td> {item.address}</td>
                                        <td> {item.phone}</td>
                                        <td> {item.birthdate}</td>
                                        <td> <a href={'/EducationComponents/Students/Student/' + item.studentId}>{item.name}</a></td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                {
                    ShowData &&
                    <div class="table100" >
                        <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", direction: "ltr", position: "relative", marginTop: "3%", marginLeft: "-3%" }}>
                            <thead>
                                <tr class="table100-head">
                                    <th class="column1">العمليات</th>
                                    <th class="column1">السبب</th>
                                    <th class="column1">الأستاذ المقييم</th>
                                    <th class="column1">التقييم الدراسي </th>
                                    <th class="column1">التقييم السلوكي </th>
                                    <th class="column1">الحالة الدراسية</th>
                                    <th class="column1">الجنس</th>
                                    <th class="column1">العنوان</th>
                                    <th class="column1">رقم الهاتف</th>
                                    <th class="column2">تاريخ الميلاد</th>
                                    <th class="column2">اسم الطالب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ShowData && ShowData.Students && ShowData.Students.map((item) => {
                                    return <tr key={item.studentId}>
                                        <td> <Tooltip title="تعديل التقييم ">
                                            <Edit onClick={() => handleClickStudent(item.studentId, item.cause, item.behavior, item.name)} />
                                        </Tooltip>
                                            <Tooltip title="حذف الطالب من الدورة">
                                                <DeleteOutlined onClick={() => handleDeleteStudent(item.studentId)} />
                                            </Tooltip>
                                        </td>
                                        <td> {item.cause}</td>
                                        <td>{item.teacher}</td>
                                        <td>{item.value}</td>
                                        <td>{item.behavior}</td>
                                        <td> {item.myStatus}</td>
                                        <td> {item.gender}</td>
                                        <td> {item.address}</td>
                                        <td> {item.phone}</td>
                                        <td> {item.birthdate}</td>
                                        <td> <a href={'/EducationComponents/Students/Student/' + item.studentId}>{item.name}</a></td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                {
                    SearchData &&
                    <div class="table100" >
                        <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", direction: "ltr", position: "relative", marginTop: "3%", marginLeft: "-3%" }}>
                            {SearchData && <thead>
                                <tr class="table100-head">
                                    <th class="column1">العمليات</th>
                                    <th class="column1">السبب</th>
                                    <th class="column1">الأستاذ المقييم</th>
                                    <th class="column1">التقييم الدراسي </th>
                                    <th class="column1">التقييم السلوكي </th>
                                    <th class="column1">الحالة الدراسية</th>
                                    <th class="column1">الجنس</th>
                                    <th class="column1">العنوان</th>
                                    <th class="column1">رقم الهاتف</th>
                                    <th class="column2">تاريخ الميلاد</th>
                                    <th class="column2">اسم الطالب</th>
                                </tr>
                            </thead>}
                            <tbody>
                                {error1 && <div>{error1}</div>}
                                {isPending1 && <div>Loading...</div>}
                                {SearchData && SearchData.Students.map((item) => {
                                    return <tr key={item.studentId}>
                                        <td> <Tooltip title="تعديل التقييم ">
                                            <Edit onClick={() => handleClickStudent(item.studentId, item.cause, item.behavior, item.name)} />
                                        </Tooltip>
                                            <Tooltip title="حذف الطالب من الدورة">
                                                <DeleteOutlined onClick={() => handleDeleteStudent(item.studentId)} />
                                            </Tooltip></td>
                                        <td> {item.cause}</td>
                                        <td>{item.teacher}</td>
                                        <td>{item.value}</td>
                                        <td>{item.behavior}</td>
                                        <td> {item.myStatus}</td>
                                        <td> {item.gender}</td>
                                        <td> {item.address}</td>
                                        <td> {item.phone}</td>
                                        <td> {item.birthdate}</td>
                                        <td> <a href={'/EducationComponents/Students/Student/' + item.studentId}>{item.name}</a></td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                }
                {
                    !ShowData && !SearchData && !isClicked &&
                    <div class="table100" >
                        <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", direction: "ltr", position: "absolute", marginTop: "3%", marginLeft: "-3%" }}>
                            <thead>
                                <tr class="table100-head">
                                    <th class="column1">العمليات</th>
                                    <th class="column1">السبب</th>
                                    <th class="column1">الأستاذ المقييم</th>
                                    <th class="column1">التقييم الدراسي </th>
                                    <th class="column1">التقييم السلوكي </th>
                                    <th class="column1">الحالة الدراسية</th>
                                    <th class="column1">الجنس</th>
                                    <th class="column1">العنوان</th>
                                    <th class="column1">رقم الهاتف</th>
                                    <th class="column2">تاريخ الميلاد</th>
                                    <th class="column2">اسم الطالب</th>
                                </tr>
                            </thead>
                            <tbody>
                                {StudentData && StudentData.Students.map((item) => {
                                    return <tr key={item.studentId}>

                                        <td> <Tooltip title="تعديل التقييم ">
                                            <Edit onClick={() => handleClickStudent(item.studentId, item.cause, item.behavior, item.name)} />
                                        </Tooltip>
                                            <Tooltip title="حذف الطالب من الدورة">
                                                <DeleteOutlined onClick={() => handleDeleteStudent(item.studentId)} />
                                            </Tooltip></td>
                                        <td> {item.cause}</td>
                                        <td>{item.teacher}</td>
                                        <td>{item.value}</td>
                                        <td>{item.behavior}</td>
                                        <td> {item.myStatus}</td>
                                        <td> {item.gender}</td>
                                        <td> {item.address}</td>
                                        <td> {item.phone}</td>
                                        <td> {item.birthdate}</td>
                                        <td> <a href={'/EducationComponents/Students/Student/' + item.studentId}>{item.name}</a></td>

                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>

                }
                <Modal open={openA} >
                    <Container class="editForm" style={{ marginLeft: "35%" ,height:"300px"}}>
                        {
                            <form onSubmit={handleEditEvaluation} style={{ margin: "15px", marginRight: "-5px" }}>
                                <label style={{ marginRight: "30%", boxShadow: "0px 0 10px rgb(39,116,218)" }}>تعديل التقييم</label>
                                <input type="text" placeholder={studentName}   id="myInput"
                                    style={{ marginTop: "20px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                />
                                <input type="text" placeholder="التقييم"
                                    style={{ marginTop: "20px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                    required
                                    value={behavior}
                                    id="myInput"
                                    onChange={(e) => setBehavior(e.target.value)}
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
                                    <button onClick={(e) => setOpenA(false)} style={{
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