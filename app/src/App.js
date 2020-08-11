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

import UpdateNews from "./component/dashboard/admin/UpdateNews";
import UpdateNotices from "./component/dashboard/admin/UpdateNotices";
import UpdateSubject from "./component/subject/UpdateSubject";
import UpdateClass from "./component/dashboard/admin/UpdateClass";
import UpdateProfile from "./component/dashboard/admin/UpdateProfile";
import UpdateNewsImage from "./component/dashboard/admin/UpdateNewsImage";
import UpdateNoticeImage from "./component/dashboard/admin/UpdateNoticeImage";
import UpdateProfilePicture from "./component/dashboard/admin/UpdateProfilePicture";
import staffProfileUpdate from "./component/dashboard/staff/UpdateProfile";
import staffProfilePictureUpdate from "./component/dashboard/staff/UpdateProfilePicture";
import studentProfileUpdate from "./component/dashboard/student/UpdateProfile";
import studentProfilePictureUpdate from "./component/dashboard/student/UpdateProfilePicture";

// for import assignment
import AddAssignment from "./component/dashboard/staff/AddAssignment";
import viewAssignment from "./component/dashboard/student/viewAssignment";
import teacherviewAssignment from "./component/dashboard/staff/RetrieveAssignment";
import AddQuestion from "./component/dashboard/staff/AddQuestion";
import RetrieveQuestion from "./component/dashboard/staff/RetrieveQuestion";
// for activities
import addActivities from "./component/dashboard/admin/AddActivities";
import ViewActivities from "./component/dashboard/admin/ViewActivities";
import StidentViewActivities from "./component/dashboard/student/ViewActivities";
// import StaffaddActivities from "./component/dashboard/staff/AddActivities";

import AddExam from "./component/dashboard/staff/AddExam";
import ViewExam from "./component/dashboard/staff/ViewExam";
import ExamUser from "./component/dashboard/staff/ExamUser";

import InvoicePdf from "./component/dashboard/admin/Invoice";
import characterPdf from "./component/dashboard/admin/character";
import addUserPDF from "./component/dashboard/admin/addUser";
import studentDetails from "./component/dashboard/admin/StudentDetails";
import FeeDetails from "./component/dashboard/admin/FeeDetails";
import FeeReport from "./component/dashboard/admin/FeeClearanceReport";
import FeeInvoiceReport from "./component/dashboard/admin/FeeInvoiceReport";
import AddMarks from "./component/dashboard/staff/AddMarks";
import ViewMarks from "./component/dashboard/staff/ViewMarks";
import UpdateExamMarks from "./component/dashboard/staff/UpdateExamMarks";
import AddMark from "./component/dashboard/staff/AddMark";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Registration} />
      <Route exact path="/forget" component={Forget} />

      <Private exact path="/student" component={StudentDashboard} />
      <Private exact path="/student/profile" component={StudentProfile} />

      <PrivateStaff exact path="/staff" component={StaffDashboard} />
      <PrivateStaff exact path="/staff/question" component={AddQuestion} />
      <PrivateStaff exact path="/staff/add/addMarks/:id" component={AddMark} />
      <PrivateStaff exact path="/staff/add/marks" component={AddMarks} />
      <PrivateStaff exact path="/staff/view/marks" component={ViewMarks} />
      <PrivateStaff
        exact
        path="/staff/view/updateMarks/:id"
        component={UpdateExamMarks}
      />
      <PrivateStaff
        exact
        path="/staff/retrieveQuestion"
        component={RetrieveQuestion}
      />

      <PrivateStaff exact path="/staff/add/exam" component={AddExam} />
      <PrivateStaff exact path="/staff/view/exam" component={ViewExam} />
      <PrivateStaff exact path="/exam/user/:id" component={ExamUser} />

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

      <PrivateStaff
        exact
        path="/staff/retrieve"
        component={teacherviewAssignment}
      />

      {/* for activities */}
      <PrivateAdmin exact path="/activities/add" component={addActivities} />
      {/* <PrivateStaff exact path="/staff/addactivities" component={StaffaddActivities} /> */}
      <PrivateAdmin exact path="/activities/view" component={ViewActivities} />
      <Private
        exact
        path="/student/viewActivities"
        component={StidentViewActivities}
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

      <PrivateAdmin exact path="/news/newsUpdate/:id" component={UpdateNews} />
      <PrivateAdmin
        exact
        path="/news/newsImageUpdate/:id"
        component={UpdateNewsImage}
      />
      <PrivateAdmin
        exact
        path="/notice/noticeUpdate/:id"
        component={UpdateNotices}
      />
      <PrivateAdmin
        exact
        path="/notice/noticeImageUpdate/:id"
        component={UpdateNoticeImage}
      />
      <PrivateAdmin exact path="/updateSubject/:id" component={UpdateSubject} />
      <PrivateAdmin exact path="/updateClass/:id" component={UpdateClass} />

      <PrivateAdmin exact path="/profileUpdate/:id" component={UpdateProfile} />
      <PrivateAdmin
        exact
        path="/admin/profilePictureUpdate/:id"
        component={UpdateProfilePicture}
      />

      <PrivateStaff
        exact
        path="/staffProfileUpdate/:id"
        component={staffProfileUpdate}
      />
      <PrivateStaff
        exact
        path="/staff/staffProfilePictureUpdate/:id"
        component={staffProfilePictureUpdate}
      />

      <Private
        exact
        path="/studentProfileUpdate/:id"
        component={studentProfileUpdate}
      />
      <Private
        exact
        path="/student/studentProfilePictureUpdate/:id"
        component={studentProfilePictureUpdate}
      />

      <PrivateAdmin exact path="/report/invoice/:id" component={InvoicePdf} />
      <PrivateAdmin
        exact
        path="/report/character/:id"
        component={characterPdf}
      />
      <PrivateAdmin exact path="/report/details/:id" component={addUserPDF} />

      <PrivateAdmin
        exact
        path="/report/viewStudentsDetails"
        component={studentDetails}
      />
      <PrivateAdmin exact path="/report/feeDetails" component={FeeDetails} />

      <PrivateAdmin
        exact
        path="/report/feeClearanceDetails/:id"
        component={FeeReport}
      />

      <PrivateAdmin
        exact
        path="/report/feeInvoiceReports/:id"
        component={FeeInvoiceReport}
      />
      <br />
      <div className="container-fluid footer">
        <p align="center">
          All Rights Reserved By : <strong> @Greatlee</strong>
        </p>
      </div>
    </BrowserRouter>
  );
}

export default App;
