import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Registration from './component/Registration';

import Login from './component/Login';
import Forget from './component/Forget';


import StudentDashboard from './component/dashboard/student/Studentdashboard';
import Private from './component/private/Private'
import ViewNoticeStaff from './component/dashboard/staff/ViewNotice'

import StaffDashboard from './component/dashboard/staff/StaffDashboard';
import PrivateStaff from './component/private/PrivateStaff'

import AminDashboard from './component/dashboard/admin/AdminDashboard';
import ViewNews from './component/dashboard/admin/ViewNews'
import ViewNotice from './component/dashboard/admin/ViewNotice'
import AddNews from './component/dashboard/admin/AddNews'
import AddNotice from './component/dashboard/admin/AddNotice'
import PrivateAdmin from './component/private/PrivateAdmin'

import AddSubject from './component/subject/AddSubject'
import ViewSubject from './component/subject/ViewSubject'
import AddClassSubject from './component/subject/AddClassSubject'
import ViewClassSubject from './component/subject/ViewClassSubject'



function App() {
  return (
    
   <BrowserRouter> 
    <Route exact path ="/" component={Login}/> 
    <Route exact path ="/register" component={Registration}/>
    <Route exact path ="/forget" component={Forget}/>

    <Private exact path ="/student" component={StudentDashboard}/>
    {/* <PrivateStaff exact path ="notice/view/student" component={ViewNoticeStudent}/> */}

    <PrivateStaff exact path ="/staff" component={StaffDashboard}/>
    <PrivateStaff exact path ="/notice/view/staff" component={ViewNoticeStaff}/>

    <PrivateAdmin exact path ="/admin" component={AminDashboard}/>
    <PrivateAdmin exact path ="/news/add" component={AddNews}/>  
    <PrivateAdmin exact path ="/news/view" component={ViewNews}/>
    <PrivateAdmin exact path ="/notice/add" component={AddNotice}/>
    <PrivateAdmin exact path ="/notice/view" component={ViewNotice}/>
    <PrivateAdmin exact path ="/subject/add" component={AddSubject}/>
    <PrivateAdmin exact path ="/subject/view" component={ViewSubject}/>
    <PrivateAdmin exact path ="/addSubject/:id" component={AddClassSubject}/>
    <PrivateAdmin exact path ="/viewSubject" component={ViewClassSubject}/>
   
    
   </BrowserRouter> 
  
  );
}

export default App;
