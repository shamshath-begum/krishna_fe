import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="sidebar_container">
      <ul>
        <li>
          <div className="dropdown">
            <button
              className="btn custom-dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Courses
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link to="/add-course"className="dropdown-item custom-dropdown-item" >
                  Add Course
                </Link>
              </li>
              <li>
                <Link className="dropdown-item custom-dropdown-item" href="#">
                  View Course
                </Link>
              </li>
              
            </ul>
          </div>
        </li>
        <li>
        <div className="dropdown">
            <button
              className="btn custom-dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Student Profile
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link to="/student-registration"className="dropdown-item custom-dropdown-item" >
                  Add Student Profile
                </Link>
              </li>
              <li>
                <Link to="/student-details"className="dropdown-item custom-dropdown-item" href="#">
                  View Student Profile
                </Link>
              </li>
              
            </ul>
          </div>
        </li>
        <li>
        <div className="dropdown">
            <button
              className="btn custom-dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Fees 
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link to="/add-course"className="dropdown-item custom-dropdown-item" >
                  Add Fees Details
                </Link>
              </li>
              <li>
                <Link className="dropdown-item custom-dropdown-item" href="#">
                  View Fees Details
                </Link>
              </li>
              
            </ul>
          </div>
        </li>
        <li>Marks</li>
        <li>QuestionPaper</li>
      </ul>
    </div>
  );
}

export default SideBar;
