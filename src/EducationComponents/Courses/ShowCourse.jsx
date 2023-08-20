import React, { useState , useEffect } from 'react';
import { DeleteOutlined, EditRounded, ArrowBackIosRounded, Add } from "@material-ui/icons";
import { Snackbar, Grid, Container, Modal, Tooltip } from "@material-ui/core";
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


export default function ShowCourse({ setTitle }) {

    useEffect(() => {
      setTitle("عرض معلومات دورة")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const courseId = params.id;

    const { data: ListData } = useFetch(API_KEY + '/showCourse/' + courseId);
    const { data: SessionData } = useFetch(API_KEY + '/showAllSession/' + courseId);

    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [courseStatus, setCourseStatus] = useState('');
    const [openA, setOpenA] = useState(false);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [cost, setCost] = useState('');

    const handleDelete = () => {
        fetch(API_KEY + '/deleteCourse/' + courseId, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
        }).then((response) => {
            response.json().then(response => {
                setMsg(response.message);
            })
            setOpenAlert(true);
        })
    }


    const handleAddSession = (e) => {
        e.preventDefault();
        const data = { date, startTime, courseId ,cost };
        setOpenA(false);
        fetch(API_KEY + '/createSession', {
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
    const handleClose = (event, reason) => {
        navigate(0);
        setOpenAlert(false);
    }

    const handelCloseCourse = () => {

        fetch(API_KEY + '/closeCourse/' + courseId, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
        }).then((response) => {
            response.json().then(response => {
                navigate(0);
            })
        })
    }
    const handelStartCourse = () => {
        fetch(API_KEY + '/startCourse/' + courseId, {
            method: 'POST',
            headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
        }).then((response) => {
            response.json().then(response => {
                navigate(0);
            })
        })
    }

    return (
        <>
            <div class="courses" style={{ alignContent: 'center', marginLeft: "30%", marginTop: "70px", width: "70%" }}>
                <button style={{ marginBottom: "20px", marginLeft: "-5%", backgroundColor: "#E0115F" }}
                    onClick={handelCloseCourse}>إغلاق الدورة</button>
                <button style={{ marginBottom: "20px", marginLeft: "-30%", backgroundColor: "rgb(130,202,250)" }}
                    onClick={handelStartCourse}>بدء الدورة</button>
                <button style={{ marginLeft: "-30%", backgroundColor: "rgb(39,116,218)" }}>
                    <a href={'/EducationComponents/Courses/CourseStudents/' + courseId}
                        style={{ color: "white", textDecorationLine: "none" }}>الطلاب</a>
                </button>
                <Tooltip title="إضافة جلسة">
                    <Add
                        style={{
                            backgroundColor: "rgba(39,116,218,0.7)",
                            padding: "5px",
                            borderRadius: "5px",
                            color: "white",
                            marginLeft: "-20%",
                            marginBottom: "-50px",
                        }}

                        onClick={() => setOpenA(true)}
                    />
                </Tooltip>
                <Grid Container style={{ direction: "rtl" }}>
                    <Grid item xs={6} md={6} lg={6} style={{ marginRight: "40%" }} >
                        {ListData && <Card sx={{ maxWidth: "80%", marginLeft: "-30%", marginTop: "-10%", borderRadius: "25px" }}>
                            <CardHeader
                                title={ListData.Course.subject + "-" + ListData.Course.type}
                                subheader={ListData.Course.class}
                            />
                            <CardMedia
                                style={{ marginLeft: "20%" }}
                                component="img"
                                height="120"
                                image="/assets/form2.bmp"
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary" style={{ textAlign: "right", fontSize: "15px" }}>
                                    <span style={{ fontWeight: "bold" }}> العناوين المعرفية التي تقدمها : </span>
                                    {ListData.Course.headlines}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}> العناصر التي تضاف إلى قييمة الدورة: </span>
                                    {ListData.Course.addElements}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}> الأستاذ :</span>
                                    {ListData.Course.teacher}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}>  مدة كل جلسة :  </span>
                                    {ListData.Course.duration}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}>  أيام الجلسات : </span>
                                    {ListData.Course.courseDays}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}> القاعة : </span>
                                    {ListData.Course.room}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}> تاريخ النهاية : </span>
                                    {ListData.Course.endDate}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}> تاريخ البداية : </span>
                                    {ListData.Course.startDate}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}> الحالة :  </span>
                                    {ListData.Course.courseStatus}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}>    عدد الجلسات :  </span>
                                    {ListData.Course.sessionNumber}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}> القسط: </span>
                                    {ListData.Course.cost}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}> العدد الأقصى المسموح به لعدد الطلاب : </span>
                                    {ListData.Course.maxNStudent}

                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites" style={{ background: "none", color: "#555", marginRight: "10%" }}>
                                    <a href={'/EducationComponents/Courses/EditCourse/' + courseId}>
                                        <EditRounded />
                                    </a>
                                </IconButton>
                                <IconButton aria-label="share" style={{ background: "none", color: "red" }}>
                                    < DeleteOutlined onClick={handleDelete} />
                                </IconButton>
                            </CardActions>
                        </Card>}
                    </Grid>

                    {
                        ListData && <Grid item xs={6} md={6} lg={6} style={{ marginRight: "90%", marginTop: "-80%" }} >
                            <div class="table100" style={{ marginTop: "30%" }}>
                                <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", direction: "ltr" }}>
                                    <thead>
                                        <tr class="table100-head">
                                            <th class="column1" >العمليات</th>
                                            <th class="column1">التاريخ</th>
                                            <th class="column1">رقم الجلسة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {SessionData && SessionData.Sessions && SessionData.Sessions.map((item) => {
                                            return <tr key={item.sessionId}>
                                                <td>
                                                    <a href={'/EducationComponents/Courses/CourseSesssion/' + courseId + "/" + item.sessionId}>
                                                        <ArrowBackIosRounded />
                                                    </a></td>
                                                <td>{item.date}</td>
                                                <td>{item.sessionNumber}</td>
                                            </tr>
                                        })}

                                    </tbody>
                                </table>
                                <br />
                            </div>
                        </Grid>
                    }

                </Grid>

                <Modal open={openA} >
                    <Container class="editForm" style={{ marginLeft: "35%" ,width:"250px", height:"320px"}}>
                        {
                            <form onSubmit={handleAddSession} style={{ margin: "20px" }}>
                                <label style={{ marginTop: "5px", marginRight: "30%", boxShadow: "0px 0 10px rgb(39,116,218)" }}>إضافة جلسة</label>
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
                                 <input type="number" placeholder="مستحقات الأستاذ"
                                    style={{ marginTop: "40px", marginRight: "18%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                                    required
                                    value={cost}
                                    id="myInput"
                                    onChange={(e) => setCost(e.target.value)}
                                />
                                <div style={{ display: "flex", marginTop: "35px", marginLeft: "-40px" }}>
                                    <button type="submit" style={{ marginBottom: "5px", width: "70px", backgroundColor: "rgb(39,116,218)" }}>إضافة</button>
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
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}