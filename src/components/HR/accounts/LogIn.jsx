import { Grid ,Snackbar} from "@material-ui/core";
import { Lock, VerifiedUser } from "@material-ui/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import "./LogIn.css";
import { Link, useNavigate } from "react-router-dom"
import Alert from "@mui/material/Alert";
const LOGIN = ({setSign}) => {
    const [userName,setUserName]=useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [msg, setMsg] = useState('');
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
 


    useEffect(() => {
        localStorage.clear();
        setSign(false)

    }, [])

    const submit = async (e) =>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('password', password);
   axios.post('http://127.0.0.1:8000/api/login', formData)
   .then(res =>{
        console.log("res",res);
    
               
               console.log(res);
               console.log("user");
               console.log(res.data);
              
            //    setId(res.data.id);
            //    console.log("userId");
            //    console.log(res.data.id);
               
             //  console.log("the token",res.data.accessToken);
             //  console.log("t",user.accessToken);
               
            //  localStorage.setItem("user",JSON.stringify(res.data));
            setMsg(res.data.message);
            console.log("res.message",res.data)
            setOpenAlert(true);
            if(res.data.user){
             let obj ={accessToken:res.data.user.accessToken};
             let user_name={userName:res.data.user.userName};
             console.log("obj",obj)
            localStorage.setItem("user",JSON.stringify(obj));
            localStorage.setItem("userName",JSON.stringify(user_name));
            localStorage.setItem("sign","true");
             setSign(true);
           
            //  localStorage.setItem("sign",JSON.stringify('yes'));
             navigate('/hr');
            }
             
    
            }).catch(error=>{
           
                console.log("res.message error",error)
                if(error.response.status == 401)
                {
                    setOpenAlert(true);
                    console.log("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                    setMsg("فشل تسجيل الدخول تحقق من البيانات المدخلة");
                }
                
            })
           
   
    }
    const handleClose = (event, reason) => {
        // navigate(0);
        setOpenAlert(false);
      }

return (<>
        <div className="ContaierLogin">
            <Grid container>

                <Grid item sm={2} xs={1} md={8} lg={7}> <div className="logInImg"></div> </Grid>
                <Grid item sm={2} xs={1} md={4} lg={5}> 
                <form action="" className="signUpForm">
                        <h4 className="titleForm">تسجيل الدخول</h4>
                        <div className="input-field">
                            <VerifiedUser  className='supIcon'/>
                            <input type="text" className="input-form" placeholder="اسم المستخدم"  value={userName} onChange={(e)=>setUserName(e.target.value)} />
                        </div>

                        <div className="input-field">
                            <Lock className='supIcon'/>
                            <input type="password" className="input-form" placeholder="كلمة المرور" value={password} onChange={(e)=>setPassword(e.target.value)}  />
                        </div>

                        <button className="submitIn" onClick={submit} >تسجيل</button>

                    </form>
                 </Grid>
            </Grid>
        </div>
           <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" style={{ width: '250px' }} >
          {msg}
        </Alert>
      </Snackbar>
    </>);
}

export default LOGIN;