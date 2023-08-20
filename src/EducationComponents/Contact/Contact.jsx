import React, { useState, useEffect } from 'react';
import { Message } from "@material-ui/icons";
import { Snackbar, Tooltip, Button, Grid, Select, MenuItem, MenuList } from "@material-ui/core";

import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";
import "./contact.scss";

export default function Contact({ setTitle }) {

  useEffect(() => {
    setTitle("إرسال رسالة")
  }, [])
  const local_user = localStorage.getItem("user");
  const user = JSON.parse(local_user);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const params = useParams();

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [to, setTo] = useState(params.to);
  const [msg, setMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);
  const [ms, setMs] = useState('');

  const [job_name, setjob_name] = useState('marksJob');
  const [user_name, setuser_name] = useState('Altafawok1');
  const [password, setpassword] = useState('tttt@2023');
  const [sender, setsender] = useState('Al-Tafawouk');

  const { data: SearchData } = useFetch(API_KEY + '/searchStudent/' + name);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { job_name, user_name, password, sender, msg, to };


    fetch('https://bms.syriatel.sy/API/SendSMS.aspx?job_name=marksJob&user_name=Altafawok1&password=tttt@2023&sender=Al-Tafawouk&msg='+msg+'&to='+to, {
      method: 'POST',
      mode: 'no-cors',
    })

    fetch(API_KEY + '/sendMessage', {
      method: 'POST',
      headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((response) => {
      response.json().then(response => {
        setMs(response.message);
      })
      setOpenAlert(true);
    })

  }

  const handleClose = (event, reason) => {
    navigate(0);
    setOpenAlert(false);
  }
  const handleChoice = (p, n) => {
    setTo(p);
    setName(n);
  }

  return (
    <>
      <Tooltip title="الرسائل المرسلة">
        <a href="/EducationComponents/Contact/Messages">
          <Message
            style={{
              backgroundColor: "rgba(39,116,218,0.7)",
              padding: "5px",
              borderRadius: "5px",
              color: "white",
              marginTop: "60px",
              marginLeft: "-50px"
            }}
          />
        </a>
      </Tooltip>
      <div className="contact" id="contact">

        <div className="left" style={{ marginTop: "-5%" }}>
          {SearchData &&
            <MenuList
              style={{
                height: "30px",
                width: "20%",
                padding: "5px",
                color: "rgb(37, 37, 37)",
                marginTop: "10%",
                marginLeft: "10%"
              }}
            >
              {SearchData && SearchData.Students.map((item) => (
                <MenuItem
                  style={{
                    border: "dashed",
                  }}
                  value={to}
                  onClick={(e) => handleChoice(item.phone, item.name)}
                  key={item.studentId}
                >
                  {item.name} : {item.phone}</MenuItem>
              ))}
            </MenuList>
          }
          {!SearchData &&
            <img src="/assets/shake.svg" alt="" style={{ width: "400px", height: "400px", marginTop: "10%" }} />
          }
        </div>

        <div className="right" style={{ marginLeft: "-100%" }} >
          <h2 style={{ color: "rgba(39,116,218,0.5)", marginRight: "-20%" }}>إرسال رسالة</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="الاسم" id="myInput" style={{ marginRight: "0px", marginTop: "10px", width: "300px" }}
              value={name}
              onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="الرقم" id="myInput" style={{ marginRight: "0px", marginTop: "10px", width: "300px" }}
              value={to}
              onChange={(e) => setTo(e.target.value)} />
            <textarea placeholder="الرسالة" style={{ marginTop: "10px" }}
              value={msg}
              onChange={(e) => setMsg(e.target.value)}></textarea>
            <button type="submit" style={{ backgroundColor: "rgba(39,116,218,0.7)", marginTop: "5%" }}>إرسال</button>
          </form>
        </div>

      </div>
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
          {ms}
        </Alert>
      </Snackbar>
    </>
  );
}
