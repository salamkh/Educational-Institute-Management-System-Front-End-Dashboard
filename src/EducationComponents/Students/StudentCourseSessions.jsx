import React, { useState , useEffect} from 'react';
import { Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";


export default function StudentCourseSessions({ setTitle }) {

    useEffect(() => {
      setTitle("الجلسات")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const courseId = params.id;
    const studentId = params.studentId;

    const { data: Student } = useFetch(API_KEY + '/showStudent/' + studentId);
    const { data: Course } = useFetch(API_KEY + '/showCourse/' + courseId);
    const { data: StudentData, isPending, error } = useFetch(API_KEY + '/showStudentTestsInCourse/' + courseId + "/" + studentId);

    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClose = (event, reason) => {
        navigate(0);
        setOpenAlert(false);
    }


    return (
        <>
            <div class="courses" style={{ alignContent: 'center', marginTop: "50px", width: "70%" }}>
                {Student && Course &&
                    <h3 style={{ marginLeft: "12%", textAlign: "center", color: "rgba(39,116,218,0.5)" }}>
                        {Student.Student.name} <br />
                        {Course.Course.subject + "-" + Course.Course.type}</h3>
                }
                <div class="table100" style={{ marginTop: "15%", marginRight: "45%" }}>
                    <table class="mytable" style={{ boxShadow: "0px 0 20px rgb(39,116,218)", direction: "ltr" }}>
                        <thead>
                            <tr class="table100-head">
                                <th class="column1">السبب</th>
                                <th class="column1">الأستاذ المسمع </th>
                                <th class="column1">التسميع</th>
                                <th class="column2">التفقد</th>
                                <th class="column2">رقم الجلسة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {error && <div>{error}</div>}
                            {isPending && <div>Loading...</div>}
                            {StudentData && StudentData.Tests.map((item) => {
                                return <tr key={item.testId}>
                                    <td> {item.cause}</td>
                                    <td> {item.teacher}</td>
                                    <td> {item.value}</td>
                                    <td> {item.studentStatus}</td>
                                    <td> <a href={'/EducationComponents/Courses/CourseSesssion/' + courseId}>{item.sessionNumber}</a></td>
                                </tr>
                            })}
                        </tbody>
                    </table>
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