import React, { useState , useEffect } from 'react';
import { DeleteOutlined, Telegram } from "@material-ui/icons";
import { Snackbar, Tooltip } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import useFetch from "../../useFetch";
import "./contact.scss";

export default function Messages({ setTitle }) {

    useEffect(() => {
      setTitle("الرسائل")
    }, [])
    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const { data: ListData, isPending, error } = useFetch(API_KEY + '/showAllMessages');

    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');

    const handleClose = (event, reason) => {
        navigate(0);
        setOpenAlert(false);
    }

    return (
        <>
            <div class="table100" >
                <table class="mytable" style={{ boxShadow: "0px 0 15px rgb(39,116,218)", position: "absolute", marginTop: "5%", marginLeft: "15%" }}>
                    <thead>
                        <tr class="table100-head">
                            <th class="column1">العمليات</th>
                            <th class="column1">الرسالة</th>
                            <th class="column1">رقم الطالب</th>
                            <th class="column2">اسم الطالب</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error && <div>{error}</div>}
                        {isPending && <div>Loading...</div>}
                        {ListData && ListData.studentMessages && ListData.studentMessages.map((item) => {
                            return <tr key={item.messageId}>
                                <td><Tooltip title="إرسال رسالة">
                                        <a href={"/Contact/" +item.to+"/"+item.name}><Telegram /></a>
                                    </Tooltip></td>
                                <td>{item.msg}</td>
                                <td>{item.to}</td>
                                <td>{item.name}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
                    {msg}
                </Alert>
            </Snackbar>
        </>
    );
}
