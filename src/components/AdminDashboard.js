import React, { useState } from "react";
import SideBar from "./SideBar";
import StudentsDetails from "../pages/students/StudentsDetails";
import "./admindashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isQuestionPaperOpen, setIsQuestionPaperOpen] = useState(false);
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [isFeesOpen, setIsFeesOpen] = useState(false);

  const toggleStudents = () => {
    setIsStudentsOpen(!isStudentsOpen);
  };

  const toggleCourses = () => {
    setIsCoursesOpen(!isCoursesOpen);
  };

  const toggleQuestionPaper = () => {
    setIsQuestionPaperOpen(!isQuestionPaperOpen);
  };

  const toggleSyllabus = () => {
    setIsSyllabusOpen(!setIsSyllabusOpen);
  };

  const toggleFees = () => {
    setIsFeesOpen(!isFeesOpen);
  };

  return (
    <>
      <div className="dashboard">
        <aside className="sidebar">
          <h2 className="sidebar-title">NEET Coaching Admin</h2>
          <ul className="sidebar-menu">
            <li>
              <button onClick={toggleStudents} className="sidebar-button">
                Students
              </button>
              {isStudentsOpen && (
                <ul className="nested-menu">
                  <li>
                    <Link to="/student-registration">Student Registration</Link>
                  </li>
                  <li>
                    <Link to="/students-details_all">Students Details</Link>
                  </li>
                </ul>
              )}
              {/* <a href="#students">Students</a> */}
            </li>
            <li>
              <button onClick={toggleCourses} className="sidebar-button">
                Courses
              </button>
              {isCoursesOpen && (
                <ul className="nested-menu">
                  <li>
                    <Link to="/course-registration">Course Registration</Link>
                  </li>
                  <li>
                    <Link to="/courses-details">Courses Details</Link>
                  </li>
                </ul>
              )}
              {/* <a href="#students">Students</a> */}
            </li>

            <li>
              <button onClick={toggleSyllabus} className="sidebar-button">
                Syllabus
              </button>
              {isSyllabusOpen && (
                <ul className="nested-menu">
                  <li>
                    <Link to="/syllabus-upload">Syllabus Upload</Link>
                  </li>
                  {/* <li>
                    <Link to="/questionpaper-generator">Question Paper Generator</Link>
                  </li> */}
                </ul>
              )}
              
            </li>

            <li>
              <button onClick={toggleQuestionPaper} className="sidebar-button">
                Question Paper
              </button>
              {isQuestionPaperOpen && (
                <ul className="nested-menu">
                  <li>
                    <Link to="/questionpaper-upload">Question Paper Upload</Link>
                  </li>
                  <li>
                    <Link to="/questionpaper-generator">Question Paper Generator</Link>
                  </li>
                </ul>
              )}
              
            </li>


            <li>
              <button onClick={toggleFees} className="sidebar-button">
              Fees
              </button>
              {isFeesOpen && (
                <ul className="nested-menu">
                  <li>
                    <Link to="/fees-students-details">StudentsDetails</Link>
                  </li>
                  <li>
                    <Link to="/fees_add">Add Fees</Link>
                  </li>
                  <li>
                    {/* <Link to="/questionpaper-generator">Question Paper Generator</Link> */}
                  </li>
                </ul>
              )}
              
            </li>
            
            
            <li>
              <a href="#settings">Settings</a>
            </li>
          </ul>
        </aside>
        <main className="content">
          <header className="content-header">
            <h1>Dashboard</h1>
          </header>
          <div className="content-body">
            <StudentsDetails />
           
          </div>
        </main>
      </div>
     
    </>
  );
}

export default AdminDashboard;
