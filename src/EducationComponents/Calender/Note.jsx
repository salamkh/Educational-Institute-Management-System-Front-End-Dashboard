import { useState , useEffect} from "react";
import './Calender.css';
import { DeleteOutlined, Edit } from "@material-ui/icons";
import { Container, Modal, Snackbar } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../useFetch";

export default function Note({ setTitle }) {

    useEffect(() => {
      setTitle("الملاحظات")
    }, [])

    const local_user = localStorage.getItem("user");
    const user = JSON.parse(local_user);
    const API_KEY = process.env.REACT_APP_API_KEY;

    const params = useParams();
    const date = params.date;

    const { error, isPending, data: dataNote } = useFetch(API_KEY + '/showCalender/' + date);
    const navigate = useNavigate();

    const [note, setNote] = useState(' ');
    const [noteId, setNoteId] = useState(' ');
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [openA, setOpenA] = useState(false);

    const handleDelete = (noteId) => {
        fetch(API_KEY + '/deleteCalender/' + noteId, {
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
        const data = { date, note };
        fetch(API_KEY + '/editeCalender/' + noteId, {
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

    const handleClose = () => {
        navigate(0);
        setOpenAlert(false);
    }

    const handleClick = (note1, noteId1) => {
        setNote(note1);
        setNoteId(noteId1);
        setOpenA(true);
    }

    return (
        <div>
            <Container class="editForm" style={{
                height: "350px", backgroundImage: "url(/assets/info.png)"
                , backgroundSize: "contain", backgroundRepeat: "no-repeat",
                marginTop: "80px",
                marginLeft:"7%"
            }}>
                <h3 style={{
                    width: "500px", height: "300px", top: "0", right: "0", marginRight: "15px",
                    direction: "rtl"
                }}>
                    {error && <div>{error}</div>}
                    {isPending && <div>Loading...</div>}
                    {dataNote &&
                        <div>
                            <p style={{ marginRight: "25%" }}>{dataNote.Calender.date}<br /></p>
                            <p style={{ marginRight: "25%" }}>{dataNote.Calender.note}<br /></p>
                        </div>
                    }
                </h3>
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {dataNote &&
                    <div>
                        <DeleteOutlined
                            onClick={() => handleDelete(dataNote.Calender.calenderId)}
                            style={{
                                borderRadius: "5px", backgroundColor: "rgba(39,116,218,0.5)",
                                color: "white", marginLeft: "20px", marginBottom: "-10px"
                            }}
                        />
                        <Edit
                            onClick={() => handleClick(dataNote.Calender.note, dataNote.Calender.calenderId)}
                            style={{
                                borderRadius: "5px", backgroundColor: "rgba(39,116,218,0.5)",
                                color: "white", marginLeft: "20px", marginBottom: "-10px"
                            }}
                        />
                    </div>
                }
            </Container>
            <Modal open={openA} >
                <Container class="editForm" style={{ marginLeft: "35%" ,height:"200px",width:"230px"}}>
                    <form onSubmit={handleEdit} style={{ margin: "10px" }}>
                        <label style={{
                            fontSize: "18px", marginTop: "5px", marginRight: "30%",
                            boxShadow: "0px 0 10px rgb(39,116,218)"
                        }}>تعديل الملاحظة</label>
                        <input type="text"
                            style={{ marginTop: "40px", marginRight: "15%",
                             boxShadow: "0px 0 10px rgb(39,116,218)", width: "150px" }}
                             id="myInput"
                            required
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                        <div style={{ display: "flex", marginTop: "35px", marginLeft: "-35px" }}>
                            <button type="submit" style={{ marginBottom: "5px", width: "70px", backgroundColor: 'rgb(39,116,218)' }}>تعديل</button>
                            <button onClick={(e) => setOpenA(false)} style={{
                                width: "70px", marginRight: "70px", marginBottom: "5px",
                                backgroundColor: "rgba(39,116,218,0.5)"
                            }}>إلغاء</button>
                        </div>
                    </form>
                </Container>
            </Modal >

            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" style={{ width: '250px' }}  >
                    {msg}
                </Alert>
            </Snackbar>
        </div>
    );
}
