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

    const [gender, setGender] = useState('');
    const [name, setName] = useState('');

    const { data: StudentData, isPending1, error1 } = useFetch(API_KEY + '/showAllStudentsAlphabetically');
    const { data: SearchData } = useFetch(API_KEY + '/searchStudent/' + name);
    const { data: ShowData } = useFetch(API_KEY + '/showAllStudentsDependOnGender/' + gender);


    return (
        <>
            <div class="courses" style={{ alignContent: 'center', marginTop: "100px", width: "70%" }}>
                
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
                    ShowData &&
                    <div class="table100" >
                        <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", direction: "ltr", position: "relative", marginTop: "3%" ,marginLeft:"25%"}}>
                            <thead>
                                <tr class="table100-head">
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
                        <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", direction: "ltr", position: "relative", marginTop: "3%" ,marginLeft:"25%"}}>
                            {SearchData && <thead>
                                <tr class="table100-head">
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
                    !ShowData && !SearchData &&
                    <div class="table100" >
                        <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", direction: "ltr", position: "absolute", marginTop: "3%" ,marginLeft:"15%" }}>
                        <thead>
                                <tr class="table100-head">
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
        
            </div>
        </>
    );
}