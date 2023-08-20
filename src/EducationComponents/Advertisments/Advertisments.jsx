import React, { useState , useEffect } from "react";
import { Add, DeleteOutlined, Edit, ArrowBackIosRounded, DriveEta } from "@material-ui/icons";
import { Container, Modal, Snackbar, Select, MenuItem, Tooltip } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import useFetch from "../../useFetch";

export default function Advertisments({ setTitle }) {

  useEffect(() => {
    setTitle("الإعلانات")
  }, [])
  const local_user = localStorage.getItem("user");
  const user = JSON.parse(local_user);

  const API_KEY = process.env.REACT_APP_API_KEY;

  const { error, isPending, data: ListData } = useFetch(API_KEY + '/showAllAdvertisment');

  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [openA, setOpenA] = useState(false);
  const [openA1, setOpenA1] = useState(false);
  const [openA2, setOpenA2] = useState(false);
  const [advertismentContent, setAdvertismentContent] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');
  const [adv, setAdv] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { advertismentContent, date, type };
    fetch(API_KEY + '/createAdvertisment', {
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

  const handleDelete = (itemId) => {
    fetch(API_KEY + '/deleteAdvertisment/' + itemId, {
      method: 'POST',
      headers: { authorization: "Bearer " + user.accessToken, "Content-Type": "application/json" },
    }).then((response) => {
      response.json().then(response => {
        setMsg(response.message);
      })
      setOpenAlert(true);
    })
  }

  const handleEdit = (e) => {
    e.preventDefault();
    const data = { date, advertismentContent, type };
    setOpenA(false);
    fetch(API_KEY + '/editeAdvertisment/' + id, {
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

  const handleClick = (advertisementId1, date1, advertismentContent1, type1) => {
    setAdvertismentContent(advertismentContent1);
    setDate(date1);
    setId(advertisementId1);
    setType(type1);
    setOpenA1(true)
  }

  const handleClose = (event, reason) => {
    navigate(0);
    setOpenAlert(false);
  }
  const handleShow = (item) => {
    setAdv(item);
    setOpenA2(true);
  }

  return (
    <>
      <div className={"testimonials"} id="Education">
        <h1 style={{ marginTop: '50px', color: "rgba(39,116,218,0.7)" }}>الإعلانات</h1>
        <Tooltip title="إضافة إعلان">
          <Add
            style={{
              backgroundColor: "rgba(39,116,218,0.7)",
              padding: "5px",
              borderRadius: "5px",
              color: "white",
              marginLeft: "-550px",
              marginTop: "-85px"
            }}
            onClick={() => setOpenA(true)}
          /></Tooltip>
        <div className={"container"} style={{ width: "100%", marginTop: "25px" }}>
          {error && <div>{error}</div>}
          {isPending && <div>Loading...</div>}
          {ListData && ListData.Advertisment && ListData.Advertisment.map((item) => {
            return <a key={item.advertisementId} href="#" className={"card"} style={{ width: "400px", height: "250px", position: "relative" }}>
              <img
                className="user"
                src="/assets/Adv.png"
                alt=""
              />
              <h3 style={{
                maxWidth: "300px", maxHeight: "180px", textAlign: "right", background: "none", border: "rgba(39,116,218,0.7)",
                position: "absolute", top: "0", right: "0", marginRight: "15px", overflowY: "hidden", overflowX: "hidden", direction: "rtl"
              }}>
                النوع   : {item.type}<br />
                التاريخ : {item.date}<br />
                الناشر  : {item.user}<br />
                المحتوى : {item.advertismentContent}<br />
              </h3>

              <div style={{
                position: "absolute",
                bottom: "0",
                marginLeft: "50%",
                marginBottom: "15px"
              }}>
                <Tooltip title="عرض المزيد">
                  <ArrowBackIosRounded
                    style={{
                      background: "none",
                      padding: "2px",
                      color: "gray",
                      marginLeft: "-25%",

                    }}
                    onClick={() => handleShow(item)}
                  /></Tooltip>
                <Tooltip title="تعديل ">
                  <Edit
                    style={{
                      background: "none",
                      padding: "2px",
                      color: "rgba(39,116,218,0.7)",
                      marginLeft: "25px",
                    }}
                    onClick={() => handleClick(item.advertisementId, item.date, item.advertismentContent, item.type)}
                  /></Tooltip>
                <Tooltip title="حذف">
                  <DeleteOutlined
                    style={{
                      background: "none",
                      padding: "2px",
                      color: "red",
                      marginLeft: "25px",
                    }}
                    onClick={() => handleDelete(item.advertisementId)}
                  /></Tooltip>
              </div>
            </a>
          })}


        </div>
      </div>
      <Modal open={openA} >
        <Container class="editForm" style={{ marginLeft: "35%", height: "350px" ,width:"230px"}}>
          {
            <form onSubmit={handleSubmit} style={{ margin: "10px" }}>
              <label style={{ marginTop: "5px", marginRight: "25%", boxShadow: "0px 0 10px rgb(39,116,218)" }}>إضافة إعلان</label>
              <input type="text" placeholder="المحتوى" id="myInput"
                style={{ marginTop: "40px", marginRight: "13%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                required
                value={advertismentContent}
                onChange={(e) => setAdvertismentContent(e.target.value)}
              />
              <input type="date" placeholder="التاريخ" id="myInput"
                style={{ marginTop: "40px", marginRight: "13%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label style={{ fontSize: "14px", marginRight: "25px" }}>النوع</label>
              <Select
                required
                label='النوع'
                value={type}
                type="select"
                onChange={(e) => setType(e.target.value)}
                style={{ width: "150px", marginRight: "25px" }}
              >
                <MenuItem value={'تجاري'} >تجاري</MenuItem>
                <MenuItem value={'إداري'} >إداري</MenuItem>
              </Select>

              <div style={{ display: "flex", marginTop: "35px", marginLeft: "-30px" }}>
                <button type="submit" style={{ marginBottom: "5px", width: "70px", backgroundColor: "rgb(39,116,218)" }}>إضافة</button>
                <button onClick={(e) => setOpenA(false)} style={{
                  width: "70px", marginRight: "50px", marginBottom: "5px",
                  backgroundColor: "rgba(39,116,218,0.5)"
                }}>إلغاء</button>
              </div>
            </form>
          }
        </Container>
      </Modal >
      <Modal open={openA1} >
        <Container class="editForm" style={{ marginLeft: "35%", height: "350px" ,width:"230px"}}>
          {
            <form onSubmit={handleEdit} style={{ margin: "10px" }}>
              <label style={{ marginTop: "5px", marginRight: "25%", boxShadow: "0px 0 10px rgb(39,116,218)" }}>تعديل إعلان</label>
              <input type="text" placeholder="المحتوى" id="myInput"
                style={{ marginTop: "40px", marginRight: "13%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                required
                value={advertismentContent}
                onChange={(e) => setAdvertismentContent(e.target.value)}
              />
              <input type="date" placeholder="التاريخ" id="myInput"
                style={{ marginTop: "40px", marginRight: "13%", boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label style={{ fontSize: "14px", marginRight: "25px" }}>النوع</label>
              <Select
                required
                label='النوع'
                value={type}
                type="select"
                onChange={(e) => setType(e.target.value)}
                style={{ width: "150px", marginRight: "25px" }}
              >
                <MenuItem value={'تجاري'} >تجاري</MenuItem>
                <MenuItem value={'إداري'} >إداري</MenuItem>
              </Select>

              <div style={{ display: "flex", marginTop: "35px", marginLeft: "-30px" }}>
                <button type="submit" style={{ marginBottom: "5px", width: "70px", backgroundColor: "rgb(39,116,218)" }}>تعديل</button>
                <button onClick={(e) => setOpenA1(false)} style={{
                  width: "70px", marginRight: "50px", marginBottom: "5px",
                  backgroundColor: "rgba(39,116,218,0.5)"
                }}>إلغاء</button>
              </div>
            </form>
          }
        </Container>
      </Modal >

      <Modal open={openA2} >
        <Container class="editForm" style={{
          height: "350px", backgroundImage: "url(/assets/info.png)"
          , backgroundSize: "contain", backgroundRepeat: "no-repeat"
        }}>
          <div style={{ margin: "10px", alignItems: "right" }}>
            <h3 style={{
              width: "500px", height: "300px", top: "0", right: "0", marginRight: "15px",
              direction: "rtl", overflowY: "scroll", overflowX: "scroll"
            }}>
              النوع   : {adv.type}<br />
              التاريخ : {adv.date}<br />
              الناشر  : {adv.user}<br />
              المحتوى : {adv.advertismentContent}<br />
            </h3>

            <button onClick={(e) => setOpenA2(false)} style={{
              height: "30px",
              backgroundColor: "rgba(39,116,218,0.5)",
              width: "70px", marginRight: "50px", marginTop: "-25%",
              border: "none",
              borderRadius: "10px",
              fontWeight: "500",
              fontFamily: "cursive",
              cursor: "pointer"
            }}>إغلاق</button>
          </div>
        </Container>
      </Modal >
      <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}
