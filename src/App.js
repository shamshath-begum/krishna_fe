import "./App.css";
import AddCourse from "./pages/courses/AddCourse";
import AdminDashboard from "./components/AdminDashboard";
import StudentsDetails from "./pages/students/StudentsDetails";
import Scrolling from "./components/Scrolling";
import StudentRegistrationForm from "./pages/students/StudentRegistrationForm";
import StudentView from "./pages/students/StudentView"
import StudentEdit from "./pages/students/StudentEdit"
import Header from "./components/Header";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseDetails from "./pages/courses/CoureseDetails";
import QuestionPaperUpload from "./pages/questionPaper/QuestionPaperUpload";
import QuestionPaperGenerator from "./pages/questionPaper/QuestionPaperGenerator";

import SyllabusUploadForm from "./pages/syllabus/SyllabusUploadForm";
import SyllabusForm from "./pages/syllabus/Syllabus";
import EditorToolbar from "./components/EditorToolbar";
import TestQues from "./pages/questionPaper/TestQues"
import AddFees from "./pages/fees/AddFees";
import StudentsDetailsAll from "./pages/students/StudentsDetailsAll";
import FeesStudentsDetails from "./pages/fees/FeesStudentsDetails";
import Combine from "./pages/questionPaper/Combine"

export const url = "http://localhost:8000";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Scrolling />
        {/* <Combine/> */}
       {/* <TestQues/> */}
        <div className="main-content">
          {/* <SideBar /> */}
          <div className="content">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              
              <Route path="/course-registration" element={<AddCourse />} />
              <Route path="/courses-details"element={<CourseDetails/>}/>
              <Route
                path="/student-registration"
                element={<StudentRegistrationForm />}
              />
              <Route path="/students-details" element={<StudentsDetails />} />
              <Route path="/students-details_all" element={<StudentsDetailsAll/>} />
              <Route path="/student-view/:id" element={<StudentView />} />
              <Route path="/student-edit/:id" element={<StudentEdit />} />
              <Route path="/syllabus-upload" element={<SyllabusUploadForm />} />
              {/* <Route path="/syllabus-upload" element={<SyllabusForm />} /> */}
              <Route path="/questionpaper-upload"element={<QuestionPaperUpload/>}/>
              <Route path="/questionpaper-generator"element={<QuestionPaperGenerator/>}/>
              <Route path="/fees-students-details"element={<FeesStudentsDetails/>}/>
              <Route path="/add-fees/:id" element={<AddFees />} />
              
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
