import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Registration from './component/Registration';

import Login from './component/Login';
import Forget from './component/Forget';


import StudentDashboard from './component/dashboard/student/Studentdashboard';
import Private from './component/private/Private'
import StudentProfile from './component/dashboard/student/Profile'

import StaffDashboard from './component/dashboard/staff/StaffDashboard';
import ViewNoticeStaff from './component/dashboard/staff/ViewNotice'
import PrivateStaff from './component/private/PrivateStaff'
import StaffProfile from './component/dashboard/staff/Profile'

import AminDashboard from './component/dashboard/admin/AdminDashboard';
import ViewNews from './component/dashboard/admin/ViewNews'
import ViewNotice from './component/dashboard/admin/ViewNotice'
import ViewEnroll from './component/dashboard/admin/ViewEnroll'
import ViewClass from './component/dashboard/admin/ViewClass'
import AddNews from './component/dashboard/admin/AddNews'
import AddNotice from './component/dashboard/admin/AddNotice'
import AddClass from './component/dashboard/admin/AddClass'
import EnrollStudent from './component/dashboard/admin/EnrollStudent'
import PrivateAdmin from './component/private/PrivateAdmin'
import AdminProfile from './component/dashboard/admin/Profile'
import AddSubject from './component/subject/AddSubject'
import ViewSubject from './component/subject/ViewSubject'
import AddClassSubject from './component/subject/AddClassSubject'
import ViewClassSubject from './component/subject/ViewClassSubject'
import UserAction from './component/dashboard/admin/UserAction';




function App() {

  
  return (
    
   <BrowserRouter> 
    <Route exact path ="/" component={Login}/> 
    <Route exact path ="/register" component={Registration}/>
    <Route exact path ="/forget" component={Forget}/>

    <Private exact path ="/student" component={StudentDashboard}/>
    <Private exact path ="/student/profile" component={StudentProfile}/>

    <PrivateStaff exact path ="/staff" component={StaffDashboard}/>
    <PrivateStaff exact path ="/notice/view/staff" component={ViewNoticeStaff}/>
    <PrivateStaff exact path="/staff/profile" component={StaffProfile}/>

    <PrivateAdmin exact path ="/admin" component={AminDashboard}/>
    <PrivateAdmin exact path ="/news/add" component={AddNews}/>  
    <PrivateAdmin exact path ="/notice/add" component={AddNotice}/>
    <PrivateAdmin exact path ="/class/add" component={AddClass}/>
    <PrivateAdmin exact path ="/subject/add" component={AddSubject}/>
    <PrivateAdmin exact path ="/addSubject/:id" component={AddClassSubject}/>
    <PrivateAdmin exact path ="/news/view" component={ViewNews}/>
    <PrivateAdmin exact path ="/class/view" component={ViewClass}/>
    <PrivateAdmin exact path ="/notice/view" component={ViewNotice}/>
    <PrivateAdmin exact path ="/show/enroll" component={ViewEnroll}/>
    <PrivateAdmin exact path ="/subject/view" component={ViewSubject}/>
    <PrivateAdmin exact path ="/viewSubject" component={ViewClassSubject}/>
    <PrivateAdmin exact path ="/enroll/:id" component={EnrollStudent}/>
    <PrivateAdmin exact path ="/admin/profile" component={AdminProfile}/>
    <PrivateAdmin exact path ="/userAction/:id" component={UserAction}/>
   
    
   </BrowserRouter> 
  
  );
}

export default App;
