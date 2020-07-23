import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./component/Registration";

import Login from "./component/Login";
import Forget from "./component/Forget";

import StudentDashboard from "./component/dashboard/student/Studentdashboard";
import Private from "./component/private/Private";
import StudentProfile from "./component/dashboard/student/Profile";

import StaffDashboard from "./component/dashboard/staff/StaffDashboard";
import ViewNoticeStaff from "./component/dashboard/staff/ViewNotice";
import PrivateStaff from "./component/private/PrivateStaff";
import StaffProfile from "./component/dashboard/staff/Profile";
import StaffAttendence from "./component/dashboard/staff/Attendence";
import AddAttendence from "./component/dashboard/staff/AddAttendence";
import SubAttendence from "./component/dashboard/staff/SubAttendence";

import AminDashboard from "./component/dashboard/admin/AdminDashboard";
import ViewNews from "./component/dashboard/admin/ViewNews";
import ViewNotice from "./component/dashboard/admin/ViewNotice";
import ViewEnroll from "./component/dashboard/admin/ViewEnroll";
import ViewClass from "./component/dashboard/admin/ViewClass";
import AddNews from "./component/dashboard/admin/AddNews";
import AddNotice from "./component/dashboard/admin/AddNotice";
import AddClass from "./component/dashboard/admin/AddClass";
import EnrollStudent from "./component/dashboard/admin/EnrollStudent";
import PrivateAdmin from "./component/private/PrivateAdmin";
import AdminProfile from "./component/dashboard/admin/Profile";
import AddSubject from "./component/subject/AddSubject";
import ViewSubject from "./component/subject/ViewSubject";
import AddClassSubject from "./component/subject/AddClassSubject";
import ViewClassSubject from "./component/subject/ViewClassSubject";
import AddRoutine from "./component/dashboard/admin/AddRoutine";
import UserAction from "./component/dashboard/admin/UserAction";
import Fees from "./component/dashboard/admin/Fees";


import UpdateNews from './component/dashboard/admin/UpdateNews';
import UpdateNotices from './component/dashboard/admin/UpdateNotices';
import UpdateSubject from './component/subject/UpdateSubject';
import UpdateClass from './component/dashboard/admin/UpdateClass';
import UpdateProfile from './component/dashboard/admin/UpdateProfile';
import UpdateNewsImage from './component/dashboard/admin/UpdateNewsImage';
import UpdateNoticeImage from './component/dashboard/admin/UpdateNoticeImage';
import UpdateProfilePicture from './component/dashboard/admin/UpdateProfilePicture';
import staffProfileUpdate from './component/dashboard/staff/UpdateProfile';
import staffProfilePictureUpdate from './component/dashboard/staff/UpdateProfilePicture';
import studentProfileUpdate from './component/dashboard/student/UpdateProfile';
import studentProfilePictureUpdate from './component/dashboard/student/UpdateProfilePicture';



// for import assignment
import AddAssignment from "./component/dashboard/staff/AddAssignment";
import viewAssignment from "./component/dashboard/student/viewAssignment";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Registration} />
      <Route exact path="/forget" component={Forget} />

      <Private exact path="/student" component={StudentDashboard} />
      <Private exact path="/student/profile" component={StudentProfile} />

      <PrivateStaff exact path="/staff" component={StaffDashboard} />
      <PrivateStaff
        exact
        path="/notice/view/staff"
        component={ViewNoticeStaff}
      />
      <PrivateStaff exact path="/staff/profile" component={StaffProfile} />
      <PrivateStaff
        exact
        path="/staff/attendence"
        component={StaffAttendence}
      />
      <PrivateStaff
        exact
        path="/attendence/add/:id"
        component={AddAttendence}
      />
      <PrivateStaff
        exact
        path="/attendence/sub/:id"
        component={SubAttendence}
      />

      <PrivateStaff exact path="/staff/assignment/" component={AddAssignment} />
      <Private
        exact
        path="/student/viewAssignment"
        component={viewAssignment}
      />

      <PrivateAdmin exact path="/admin" component={AminDashboard} />
      <PrivateAdmin exact path="/news/add" component={AddNews} />
      <PrivateAdmin exact path="/notice/add" component={AddNotice} />
      <PrivateAdmin exact path="/class/add" component={AddClass} />
      <PrivateAdmin exact path="/subject/add" component={AddSubject} />
      <PrivateAdmin exact path="/addSubject/:id" component={AddClassSubject} />
      <PrivateAdmin exact path="/news/view" component={ViewNews} />
      <PrivateAdmin exact path="/class/view" component={ViewClass} />
      <PrivateAdmin exact path="/notice/view" component={ViewNotice} />
      <PrivateAdmin exact path="/show/enroll" component={ViewEnroll} />
      <PrivateAdmin exact path="/subject/view" component={ViewSubject} />
      <PrivateAdmin exact path="/viewSubject" component={ViewClassSubject} />
      <PrivateAdmin exact path="/enroll/:id" component={EnrollStudent} />
      <PrivateAdmin exact path="/admin/profile" component={AdminProfile} />
      <PrivateAdmin exact path="/userAction/:id" component={UserAction} />
      <PrivateAdmin exact path="/addRoutine/:id" component={AddRoutine} />
      <PrivateAdmin exact path="/fees/:id" component={Fees} />


      <PrivateAdmin exact path ="/news/newsUpdate/:id" component={UpdateNews}/>
    <PrivateAdmin exact path ="/news/newsImageUpdate/:id" component={UpdateNewsImage}/>
    <PrivateAdmin exact path ="/notice/noticeUpdate/:id" component={UpdateNotices}/>
    <PrivateAdmin exact path ="/notice/noticeImageUpdate/:id" component={UpdateNoticeImage}/>
    <PrivateAdmin exact path ="/updateSubject/:id" component={UpdateSubject}/>
    <PrivateAdmin exact path ="/updateClass/:id" component={UpdateClass}/>
    
    <PrivateAdmin exact path ="/profileUpdate/:id" component={UpdateProfile}/>
    <PrivateAdmin exact path ="/admin/profilePictureUpdate/:id" component={UpdateProfilePicture}/>

    <PrivateStaff exact path="/staffProfileUpdate/:id" component={staffProfileUpdate}/>
    <PrivateStaff exact path ="/staff/staffProfilePictureUpdate/:id" component={staffProfilePictureUpdate}/>


    <Private exact path ="/studentProfileUpdate/:id" component={studentProfileUpdate}/>
    <Private exact path ="/student/studentProfilePictureUpdate/:id" component={studentProfilePictureUpdate}/>
    </BrowserRouter>
  );
}

export default App;
