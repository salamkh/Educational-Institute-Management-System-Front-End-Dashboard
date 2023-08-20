import React, { useEffect } from 'react';
import useFetch from "../../useFetch";
export default function Works({ setTitle }) {

  useEffect(() => {
    setTitle("برنامج الدوام")
  }, [])
  const local_user = localStorage.getItem("user");
  const user = JSON.parse(local_user);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const { error, isPending, data: ListData } = useFetch(API_KEY + '/showSchedual');

  return (
    <div style={{
      height: "1000px", width: "1000px",
      backgroundImage: "url(/assets/undrawcalendar.png)"
      , backgroundSize: "contain", backgroundRepeat: "no-repeat", marginLeft: "-100px",
    }}>
      <table class="mytable" style={{width:"65%", right: "0", position: "absolute", marginTop: "9%", marginRight: "30%", direction: "rtl", fontSize: "16px" }}>
        <thead>
          <tr style={{background: "white" ,border:"dashed",borderColor:"rgba(39,116,218,0.7)"}}>
            <th style={{ width:"130px"}}>السبت</th>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {ListData && ListData.satarday && ListData.satarday.map((item) => {
              return <a key={item.courseId} style={{ textDecoration: "none" }}>
                <th style={{ width:"130px"}}>
                  {item.subjectId}-{item.typeId}
                  <br />أ.{item.teacher}<br />{item.startTime}
                </th>
              </a>
            })}
          </tr>
          <tr style={{ background: "white" }}>
          <th style={{ width:"130px"}}>الأحد</th>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {ListData && ListData.sanday && ListData.sanday.map((item) => {
              return <a key={item.courseId} style={{ textDecoration: "none" }}>
                <th style={{  width:"130px"}}>
                  {item.subjectId}-{item.typeId}
                  <br />أ.{item.teacher}<br />{item.startTime}
                </th>
              </a>
            })}
          </tr>
          <tr style={{ background: "white" ,border:"dashed",borderColor:"rgba(39,116,218,0.7)" }}>
          <th style={{  width:"130px"}}>الاثنين</th>

            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {ListData && ListData.monday && ListData.monday.map((item) => {
              return <a key={item.courseId} style={{ textDecoration: "none" }}>
                <th style={{ width:"130px"}}>
                  {item.subjectId}-{item.typeId}
                  <br />أ.{item.teacher}<br />{item.startTime}
                </th>
              </a>
            })}
          </tr>
          <tr style={{background: "white" }}>
          <th style={{ width:"130px"}}>الثلاثاء</th>

            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {ListData && ListData.tusday && ListData.tusday.map((item) => {
              return <a key={item.courseId} style={{ textDecoration: "none" }}>
                <th style={{ width:"130px"}}>
                  {item.subjectId}-{item.typeId}
                  <br />أ.{item.teacher}<br />{item.startTime}
                </th>
              </a>
            })}
          </tr>
          <tr style={{ background: "white" ,border:"dashed",borderColor:"rgba(39,116,218,0.7)" }}>
          <th style={{  width:"130px"}}>الأربعاء</th>

            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {ListData && ListData.wednesday && ListData.wednesday.map((item) => {
              return <a key={item.courseId} style={{ textDecoration: "none" }}>
                <th style={{  width:"130px"}}>
                  {item.subjectId}-{item.typeId}
                  <br />أ.{item.teacher}<br />{item.startTime}
                </th>
              </a>
            })}
          </tr>
          <tr style={{ background: "white"  }}>
          <th style={{  width:"130px"}}>الخميس</th>

            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {ListData && ListData.thursday && ListData.thursday.map((item) => {
              return <a key={item.courseId} style={{ textDecoration: "none" }}>
                <th style={{  width:"130px"}}>
                  {item.subjectId}-{item.typeId}
                  <br />أ.{item.teacher}<br />{item.startTime}
                </th>
              </a>
            })}
          </tr>
          {/* <tr style={{background: "white" ,border:"dashed",borderColor:"rgba(39,116,218,0.7)" }}>
          <th style={{  width:"130px"}}>الجمعة</th>

            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {ListData && ListData.friday && ListData.friday.map((item) => {
              return <a key={item.courseId} style={{ textDecoration: "none" }}>
                <th style={{  width:"130px"}}>
                  {item.subjectId}-{item.typeId}
                  <br />{item.teacher}<br />{item.startTime}
                </th>
              </a>
            })}
          </tr> */}
        </thead>

      </table>
    </div>
  );
}
