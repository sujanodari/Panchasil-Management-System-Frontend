import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Registration from './component/Registration';

import Login from './component/Login';
import Forget from './component/Forget';
import StudentDashboard from './component/dashboard/student/Studentdashboard';
import StaffDashboard from './component/dashboard/staff/StaffDashboard';
import AminDashboard from './component/dashboard/admin/AdminDashboard';
import Private from './component/private/Private'
import PrivateStaff from './component/private/PrivateStaff'
import PrivateAdmin from './component/private/PrivateAdmin'


function App() {
  return (
    
   <BrowserRouter> 
    <Route exact path ="/" component={Login}/> 
    <Route exact path ="/register" component={Registration}/>
    <Route exact path ="/forget" component={Forget}/>
    <Private exact path ="/student" component={StudentDashboard}/>
    <PrivateStaff exact path ="/staff" component={StaffDashboard}/>
    <PrivateAdmin exact path ="/admin" component={AminDashboard}/>
   
   </BrowserRouter> 
  
  );
}

export default App;
