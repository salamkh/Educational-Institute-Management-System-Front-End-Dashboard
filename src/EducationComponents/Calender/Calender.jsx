import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import './Calender.css';
import { DeleteOutlined, Edit } from "@material-ui/icons";
import { Container, Modal, Snackbar, Grid, Button } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import useFetch from "../../useFetch";
import { format } from 'date-fns'

export default function Calender({ setTitle }) {

  useEffect(() => {
    setTitle("التقويم")
  }, [])

  const local_user = localStorage.getItem("user");
  const user = JSON.parse(local_user);
  const API_KEY = process.env.REACT_APP_API_KEY;


  const { data: mark } = useFetch(API_KEY + '/showAllCalenders');
  const navigate = useNavigate();

  const [sDate, setSDate] = useState(new Date());
  const [date, setDate] = useState('');
  const [note, setNote] = useState(' ');
  const [openAlert, setOpenAlert] = useState(false);
  const [msg, setMsg] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { date, note };
    fetch(API_KEY + '/createCalender', {
      method: 'POST',
      headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then((response) => {
      response.json().then(response => {
        setMsg(response.message);
      })
      setOpenAlert(true);
    })
  }

  const handleClose = () => {
    navigate(0);
    setOpenAlert(false);
  }

  const handleDateChange = (value) => {
    setSDate(value);
    setDate(format(sDate, 'yyyy-MM-dd'));
    console.log(date);
    if (mark.Calenders.find((x) => x.date === date)) {
      navigate('/EducationComponents/Calender/Note/' + date);
    }
  }

  return (
    <Grid container style={{ width: "900px", marginTop: "10%" }}>
      <Grid item sm={6} md={6} lg={6}>
        <h1 className='text-center' style={{ marginLeft: "32%", color: "rgba(39,116,218,0.5)" }}>التقويم</h1>
        <div className='calendar-container'>
          <Calendar
            onChange={handleDateChange}
            value={sDate}
            style={{
              color: "rgba(39,116,218,0.9)"
            }}

            tileClassName={({ date, view }) => {
              const d = format(date, 'yyyy-MM-dd');
              if (mark != null) {
                if (mark.Calenders.find((x) => x.date === d)) {
                  return 'highlight'
                }
              }
            }}

          />

        </div>
        <p className='text-center' style={{ marginLeft: "27%", color: "rgba(39,116,218,0.9)" }}>
          {' '}
          {sDate.toDateString()}
        </p>

      </Grid>
      <Grid item sm={6} md={6} lg={6} style={{ marginTop: "2%" }}>
        <h2 style={{ marginLeft: "40%", color: "rgba(39,116,218,0.5)" }}>ملاحظة</h2>
        <form>
          <textarea type="text" style={{ boxShadow: "0px 0 10px rgb(39,116,218)", marginRight: "30%", height: "250px", width: "250px", display: "block" }}
            value={note} onChange={(e) => setNote(e.target.value)} placeholder="ملاحظة" />
          <button type="submit" onClick={handleSubmit} style={{
            marginRight: "50%", marginTop: "20px", backgroundColor: "rgba(39,116,218,0.9)"
          }}>حفظ</button>
        </form>
      </Grid>

      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" style={{ width: '250px' }}  >
          {msg}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
