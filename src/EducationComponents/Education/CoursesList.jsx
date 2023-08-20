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
       <a href="/Classes"  className={"card"} style={{ width: "240px", height: "150px" }}>
            <img
                className="user"
                src="/assets/teaching.svg"
                alt=""
              />
              <h3> الفئات</h3>
        </a>
        <a href="/Types"  className={"card"} style={{ width: "240px", height: "150px" }}>
            <img
                className="user"
                src="/assets/studying.svg"
                alt=""
              />
              <h3>الأنواع</h3>
        </a>
      </div>
    </div>
  );
}
