import { Grid } from "@material-ui/core";
import NavBar from "./components/Bar";
import HR from "./components/HR/HR";
import SideBar from "./components/SideBar";
import "./App.css"
import LOGIN from "./components/HR/accounts/LogIn";
import ADDAccount from "./components/HR/accounts/addAccount";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
//Education
import Classes from "./EducationComponents/Classes/Classes";
import Works from "./EducationComponents/Works/Works";
import Education from "./EducationComponents/Education/Education";
import CoursesList from "./EducationComponents/Education/CoursesList";
import Contact from "./EducationComponents/Contact/Contact";
import Messages from "./EducationComponents/Contact/Messages";
import Types from "./EducationComponents/Types/Types";
import Subject from "./EducationComponents/Subject/Subject";
import Courses from "./EducationComponents/Courses/Courses";
import AddCourse from "./EducationComponents/Courses/AddCourse";
import EditCourse from "./EducationComponents/Courses/EditCourse";
import ShowCourse from "./EducationComponents/Courses/ShowCourse";
import CourseSesssion from "./EducationComponents/Courses/CourseSesssion";
import CourseStudents from "./EducationComponents/Courses/CourseStudents";

import Student from "./EducationComponents/Students/Student";
import AllStudents from "./EducationComponents/Students/AllStudents";
import AddStudent from "./EducationComponents/Students/AddStudent";
import EditStudent from "./EducationComponents/Students/EditStudent";
import AddStudentToCourse from "./EducationComponents/Students/AddStudentToCourse";
import StudentCourseSessions from "./EducationComponents/Students/StudentCourseSessions";
//Advertisments
import Advertisments from "./EducationComponents/Advertisments/Advertisments";

import Calender from "./EducationComponents/Calender/Calender";
import Note from "./EducationComponents/Calender/Note";
/////////
import ALLUSERS from "./components/HR/accounts/allUsers";
import EditAccount from "./components/HR/accounts/editAccount";
import PROFILE from "./components/HR/accounts/profile";
import OneAccount from "./components/HR/accounts/oneAccount";
import TimeMonitoring from "./components/HR/timeMonitoring/displayTimeMonitoring";
import Advance from "./components/HR/advance/advance";
import Accounts from "./components/HR/accounts/Accounts";
import ALLTeachers from "./components/HR/accounts/teachers/allTeachers";
import ADDTEACHER from "./components/HR/accounts/teachers/addTeacher";
import OneTeacher from "./components/HR/accounts/teachers/oneTeacher";
import EDITTEACHER from "./components/HR/accounts/teachers/editTeacher";
import DISCOUNT from "./components/HR/discounts/discount";
import ProfileAdvance from "./components/HR/accounts/profileAdvance";
import ProfilePanch from "./components/HR/accounts/profilePanch";
import GIFT from "./components/HR/gifts/gift";
import ProfileGift from "./components/HR/accounts/profileGift";
import WORKLEAVE from "./components/HR/workleave/workLeave";
import ProfileWORLEAVE from "./components/HR/accounts/profileWorkLeave";
import ACCOUNTING from "./components/accounting/accounting";
import PERIOD from "./components/accounting/period/period";
import PERIODOP from "./components/accounting/period/periodOperation";
import FINACCOUNT from "./components/accounting/finAccount/finAccount";
import ADDFIELD from "./components/fields/fields";
import FIELDS from "./components/fields/showFields";
import OPERATIONS from "./components/accounting/operations/operations ";
import STDOPERATION from "./components/accounting/operations/stdOperations/stdOperations";
import STDETAILS from "./components/accounting/operations/stdOperations/stdDetails";
import REPORT from "./components/accounting/period/Report";
import PRICING from "./components/HR/Pricing/pricing";
import PAYMENTS from "./components/accounting/payments/payments";
import USERPAYMENTS from "./components/accounting/payments/userPay";
import TEACHPAYMENTS from "./components/accounting/payments/teachPay";


function App() {
  const signin = localStorage.getItem("sign");
  const local_user = localStorage.getItem("user");
  const user = JSON.parse(local_user);
  const [sign, setSign] = useState(false)
  const [title, setTitle] = useState("");
  console.log("sign", user)



  return (
    <>
      <div className="myApp">
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<div className="myLogin"> <LOGIN setSign={setSign} /></div>} />

          </Routes>
          {JSON.parse(localStorage.getItem("user")) &&
            <>
              <NavBar title={title} />
              <Routes>
              <Route path='/hr' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <HR setTitle={setTitle}/> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                {/* ///////////// Employee ///////////////// */}
                <Route path='/accounts' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <Accounts /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /></Grid></Grid>} />
                <Route path='/addAccount' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <ADDAccount setTitle={setTitle}/> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/editAccount/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <EditAccount setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/displayAccounts' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "23%" }}> <ALLUSERS setTitle={setTitle}/> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/profile' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <PROFILE setTitle={setTitle}/> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/oneUser/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <OneAccount setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                {/* /////////////////// Teachers ////////////////// */}
                <Route path='/displayTeschers' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "23%" }}> <ALLTeachers setTitle={setTitle}/> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/addTeacher' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "23%" }}> <ADDTEACHER setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/oneTeacher/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <OneTeacher setTitle={setTitle}/> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/editTeatcher/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <EDITTEACHER setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />

                {/* ///////////// TimeMonitoring ///////////////// */}
                <Route path='/timeMonitoring' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <TimeMonitoring setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />

                {/* ///////////////////////// Advance ///////////////////////////////// */}
                <Route path='/advance' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <Advance setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/profileAdvance/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <ProfileAdvance setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />

                {/* ///////////// Discount ///////////////// */}
                <Route path='/panch' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <DISCOUNT setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/profilePanch/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <ProfilePanch setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />

                {/* ///////////// Rewards ///////////////// */}
                <Route path='/gift' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <GIFT setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/profileGift/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <ProfileGift setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />

                {/* ///////////// workLeave ///////////////// */}
                <Route path='/workLeave' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <WORKLEAVE setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
                <Route path='/profileWorkLeave/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <ProfileWORLEAVE setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />

                {/*------------- EducationComponents --------------*/}
                <Route path='/EducationComponents/Education/Education' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Education setTitle={setTitle} />  </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Education/CoursesList' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <CoursesList setTitle={setTitle} />  </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />

                <Route path='/Calender' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Calender setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Calender/Note/:date' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Note setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/Works' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Works setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/Contact/:to/:name' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Contact setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Contact/Messages' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Messages setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/Classes' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Classes setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/Types' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Types setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Subject/Subject/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Subject setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Courses/Courses/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Courses setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Courses/AddCourse' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <AddCourse setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Courses/EditCourse/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <EditCourse setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Courses/ShowCourse/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <ShowCourse setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Courses/CourseSesssion/:id/:sessionId' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <CourseSesssion setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Courses/CourseStudents/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <CourseStudents setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />

                <Route path='/EducationComponents/Students/Student/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Student setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Students/AllStudents' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <AllStudents setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />

                <Route path='/EducationComponents/Students/AddStudent/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <AddStudent setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Students/EditStudent/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <EditStudent setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Students/AddStudentToCourse/:id' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <AddStudentToCourse setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />
                <Route path='/EducationComponents/Students/StudentCourseSessions/:id/:studentId' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <StudentCourseSessions setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} />  </Grid></Grid>} />

                <Route path='/Advertisments' element={<Grid container style={{ marginLeft: "10%" }}> <Grid item sm={2} xs={1} md={10} lg={10}>
                  <Advertisments setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} />  </Grid></Grid>} />




                  {/* ///////////// Accounting ///////////////// */}
   
   <Route path='/accounting' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10}> <ACCOUNTING setTitle={setTitle}/> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
   {/* ------------------ period -------------------------- */}
   <Route path='/finPeriod' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <PERIOD setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
   <Route path='/periodOp/:id' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <PERIODOP setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />
   <Route path='/periodReport' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <REPORT setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}> <SideBar setSign={setSign} /> </Grid></Grid>} />

  {/* ------------------ finAccount -------------------------- */}
  <Route path='/finAccount' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <FINACCOUNT setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
 
  {/* ------------------ Operations -------------------------- */}
  <Route path='/operations' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <OPERATIONS setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
 
  {/* ------------------ Operations Student -------------------------- */}
  <Route path='/stdOperations' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <STDOPERATION setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
  <Route path='/stdDetails/:stdId/:typeId' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <STDETAILS setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />

  {/* ------------------ Pricing -------------------------- */}
  <Route path='/pricing' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <PRICING setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />

{/* ------------------ Payments -------------------------- */}
<Route path='/payments' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <PAYMENTS setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
<Route path='/userPAy/:id/:fid' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <USERPAYMENTS setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
<Route path='/teachPAy/:id/:fid' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <TEACHPAYMENTS setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />


  {/* ------------------ Fields -------------------------- */}
  <Route path='/addField' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <ADDFIELD setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />
  <Route path='/fields' element={<Grid container> <Grid item sm={2} xs={1} md={10} lg={10} style={{ marginRight: "22%" }}> <FIELDS setTitle={setTitle} /> </Grid> <Grid item sm={2} xs={1} md={2} lg={2}><SideBar setSign={setSign} /> </Grid></Grid>} />

              </Routes>
            </>
          }
        </BrowserRouter>

      </div>
    </>


  );
}

export default App;
