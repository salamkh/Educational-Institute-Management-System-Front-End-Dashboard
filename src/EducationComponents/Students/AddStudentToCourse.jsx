import React, { useState , useEffect} from 'react';
import { Select, MenuItem, Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import "./addStudent.scss";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";

export default function AddStudentToCourse({ setTitle }) {

    useEffect(() => {
      setTitle("تسجيل طالب في دورة")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const studentId = params.id;
    const { data: ListData, isPending, error } = useFetch(API_KEY + '/showAllEnableCourse');

    const navigate = useNavigate();

    const [courseId, setCourseId] = useState('');

    const [openAlert, setOpenAlert] = useState(false);

    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const myStudent = {
            courseId, studentId
        };
        fetch(API_KEY + '/addStudentToCourse', {
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
                <h1 style={{ fontSize: "25px", marginRight: "25%", marginTop: "25px", color: "rgba(39,116,218,0.5)" }}>تسجيل طالب على دورة</h1>
                <div className="container">
                    <form onSubmit={handleSubmit} >

                        <div className={"card"} style={{ marginRight: "25%", width: "200px", padding: "10px", marginTop: "20%" }}>
                            <label>الدورة</label>
                            <Select
                                required
                                value={courseId}
                                type="select"
                                onChange={(e) => setCourseId(e.target.value)}
                                style={{ maxWidth: "300px" }}
                            >
                                {ListData && ListData.Course.map((item) => (
                                    <MenuItem value={item.courseId} key={item.courseId}>{item.subjectId}-{item.typeId}</MenuItem>
                                ))}
                            </Select>
                            <br />


                            <button type="submit" style={{ marginTop: "5px", marginRight: "25%", backgroundColor: "rgba(39,116,218,0.7)" }}>
                                تسجيل
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