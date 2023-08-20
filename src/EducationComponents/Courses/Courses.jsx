import React, { useState , useEffect} from 'react';
import { DeleteOutlined, EditRounded, Details } from "@material-ui/icons";
import { Container, Modal, Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from "../../useFetch";

export default function Courses({ setTitle }) {

    useEffect(() => {
      setTitle("الدورات التعليمية")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const id = params.id;
    const { data: ListData, isPending, error } = useFetch(API_KEY + '/showCoursesInType/' + id);

    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');


    const handleDelete = (itemId) => {
        fetch(API_KEY + '/deleteCourse/' + itemId, {
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
    return (
        <>
            <div class="courses" style={{ marginTop: "50px" }}>
                <a href='/EducationComponents/Courses/AddCourse'><button style={{ backgroundColor: "rgba(39,116,218,0.7)" }}>إضافة دورة</button></a>
                <div >
                    <div class="table100" >
                        <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", position: "absolute", marginTop: "3%", marginLeft: "-5%" }}>
                            <thead>
                                <tr class="table100-head" >
                                    <th class="column2">العمليات</th>
                                    <th class="column2">مدة كل جلسة</th>
                                    <th class="column2">أيام الجلسات</th>
                                    <th class="column2">القاعة</th>
                                    <th class="column2">تاريخ النهاية</th>
                                    <th class="column2">تاريخ البداية</th>
                                    <th class="column2">الحالة</th>
                                    <th class="column2">عدد الجلسات</th>
                                    <th class="column2">القسط</th>
                                    <th class="column2"> الفئة</th>
                                    <th class="column2"> النوع</th>
                                    <th class="column2">المادة</th>
                                </tr>
                            </thead>
                            <tbody>
                                {error && <div>{error}</div>}
                                {isPending && <div>Loading...</div>}
                                {ListData && ListData.Course.map((item) => {
                                    return <tr key={item.courseId}>
                                        <td style={{ maxWidth: '20px' }}><DeleteOutlined onClick={() => handleDelete(item.courseId)} />
                                            <a href={'/EducationComponents/Courses/EditCourse/' + item.courseId}>
                                                <EditRounded />
                                            </a>
                                        </td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.duration}</td>
                                        <td style={{ maxWidth: "20px", overflowX: "hidden" }}>{item.courseDays}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.room}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.endDate}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.startDate}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.courseStatus}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.sessionNumber}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.cost}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.classId}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>{item.typeId}</td>
                                        <td style={{ maxWidth: '20px', overflowX: "hidden" }}>
                                            <a href={'/EducationComponents/Courses/ShowCourse/' + item.courseId}>{item.subjectId}</a></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }}  >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}