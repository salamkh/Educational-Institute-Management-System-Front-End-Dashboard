import React, { useState , useEffect} from 'react';
import { DeleteOutlined, EditRounded, ArrowBackIosRounded } from "@material-ui/icons";
import { Container, Modal, Snackbar, makeStyles, Grid } from "@material-ui/core";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import "./student.scss";
const useStyles = makeStyles((theme) => ({
    Snackbar: {
        button: {
            background: "none"
        }
    }
}))

export default function Student({ setTitle }) {

    useEffect(() => {
      setTitle("معلومات الطالب")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const id = params.id;

    const { data: ListData } = useFetch(API_KEY + '/showStudent/' + id);
    const { data: CourseData } = useFetch(API_KEY + '/showstudentCoursess/' + id);


    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');

    const handleDelete = () => {
        fetch(API_KEY + '/deleteStudent/' + id, {
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
    const handleDeleteStudent = (courseId) => {
        fetch(API_KEY + '/deleteStudentFromCourse/' + courseId + '/' + id, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
        }).then((response) => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }

    return (
        <>
            <div class="courses" style={{ alignContent: 'center', marginLeft: "30%", width: "70%", marginTop: "5%" }}>
                <a href={'/EducationComponents/Students/AddStudentToCourse/' + id} style={{ marginLeft: "-40%", marginBottom: "10px" }}>
                    <button style={{ backgroundColor: "rgba(39,116,218,0.7)" }}>التسجيل على دورة</button></a>
                <Grid Container style={{ direction: "rtl" }}>
                    <Grid item xs={5} md={5} lg={5} style={{ marginRight: "40%" }}>
                        {ListData && <Card sx={{ maxWidth: "80%", marginLeft: "-30%", borderRadius: "25px" }}>
                            <CardHeader
                                style={{ marginLeft: "40%" }}
                                title={ListData.Student.name}
                            />
                            <CardMedia
                                style={{ marginLeft: "20%" }}
                                component="img"
                                height="194"
                                image="/assets/form2.bmp"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" style={{ textAlign: "right", fontSize: "15px" }}>
                                    تاريخ الميلاد : {ListData.Student.birthdate}
                                    <br />
                                    رقم الهاتف : {ListData.Student.phone}
                                    <br />
                                    العنوان : {ListData.Student.address}
                                    <br />
                                    الجنس : {ListData.Student.gender}
                                    <br />
                                    الحالة : {ListData.Student.myStatus}
                                    <br />
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" style={{ background: "none", color: "#555", marginRight: "10%" }}>
                                    <a href={'/EducationComponents/Students/EditStudent/' + id}>
                                        <EditRounded />
                                    </a>
                                </IconButton>
                                <IconButton aria-label="share" style={{ background: "none", color: "red" }}>
                                    < DeleteOutlined onClick={handleDelete} />
                                </IconButton>
                            </CardActions>
                        </Card>}
                    </Grid>
                    <Grid item xs={7} md={7} lg={7} style={{ marginRight: "85%", marginTop: "-50%" }}>
                        {
                            CourseData && <div class="table100"  >
                                <table class="mytable" style={{ boxShadow: "0px 0 20px rgb(39,116,218)", direction: "ltr" }}>
                                    {CourseData && <thead>
                                        <tr class="table100-head">
                                            <th class="column1">العمليات</th>
                                            <th class="column1">السبب</th>
                                            <th class="column1">الأستاذ المقييم</th>
                                            <th class="column1">التقييم الدراسي </th>
                                            <th class="column1">التقييم السلوكي </th>
                                            <th class="column1">الجلسات</th>
                                            <th class="column1">الدورة</th>
                                        </tr>
                                    </thead>}
                                    <tbody>
                                        {CourseData && CourseData.Course.map((item) => {
                                            return <tr key={item.courseId}>
                                                <td> <DeleteOutlined onClick={() => handleDeleteStudent(item.courseId)} /></td>
                                                <td> {item.cause}</td>
                                                <td>{item.teacher}</td>
                                                <td>{item.value}</td>
                                                <td>{item.behavior}</td>
                                                <td><a href={'/EducationComponents/Students/StudentCourseSessions/' + item.courseId + '/' + id}><ArrowBackIosRounded /></a></td>
                                                <td> {item.subject}-{item.type}</td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>

                        }
                    </Grid>
                </Grid>
            </div>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}