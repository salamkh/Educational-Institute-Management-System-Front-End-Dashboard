import React, { useEffect } from 'react';
import "./Education.scss";
export default function Education({ setTitle }) {

  useEffect(() => {
    setTitle("قسم الإدارة التعلمية")
  }, [])
  
  return (
    <div className={"testimonials"} id="Education">
      <h1 style={{marginTop:'50px'}}>قسم الإدارة التعلمية</h1>
      <div className={"container"} style={{width: "100%"}}>
       <a href="/EducationComponents/Education/CoursesList"  className={"card"} style={{ width: "240px", height: "150px" }}>
            <img
                className="user"
                src="/assets/teaching.svg"
                alt=""
              />
              <h3> الدورات</h3>
        </a>
        <a href="/EducationComponents/Students/AllStudents"  className={"card"} style={{ width: "240px", height: "150px" }}>
            <img
                className="user"
                src="/assets/studying.svg"
                alt=""
              />
              <h3>الطلاب</h3>
        </a>
        <a href="/Advertisments"  className={ "card"} style={{ width: "240px", height: "150px" }}>
            <img
                className="user"
                src="/assets/notebook.svg"
                alt=""
              />
              <h3> الإعلانات</h3>
        </a>
        <a href="/Contact/0/الاسم"  className={ "card"} style={{ width: "240px", height: "150px" }}>
            <img
                className="user"
                src="/assets/educator.svg"
                alt=""
              />
              <h3>التواصل</h3>
        </a>
        <a href="/Calender" className={ "card"} style={{ width: "240px", height: "150px" }}>
            <img
                className="user"
                src= "/assets/calendar.svg"
                alt=""
              />
              <h3>التقويم</h3>
        </a>
        <a href="/Works"  className={ "card"} style={{ width: "240px", height: "150px" }}>
            <img
                className="user"
                src="/assets/undraw_calendar.png"
                alt=""
              />
              <h3>برنامج الدوام</h3>
        </a>
      </div>
    </div>
  );
}
