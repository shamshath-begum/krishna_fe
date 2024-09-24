import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./student.css";
import { useNavigate } from "react-router-dom";

function FeesStudentsDetails() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  let navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/students-details?q=${searchQuery}`
      );
console.log(response)
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="table-container">
      <h2 className="details">Students Details</h2>
      <input
        type="text"
        className="search-input-all"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <table className="table table-bordered" id="table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>RegisterNumber</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Medium</th>
            <th>Main Course</th>
           
            <th>TotalAmount</th>
            <th>Remaining Amount</th> 
            <th>Instalment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{student.registerNumber}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.mobileNumber}</td>
              <td>{student.medium}</td>
              <td>{student.mainCourse}</td>
             
              <td>{student.totalAmount}</td>
              <td>{student.remainingAmount}</td>
              <td>
                <ol>
                  {student.instalmentDates.map((instalment, index) => (
                    <li key={index}>{new Date(instalment).toLocaleDateString()}</li>
                  ))}
                </ol>
              </td>
              <td>
                <button
                  className="table-button1"
                  onClick={() => navigate(`/add-fees/${student._id}`)}
                >
                  Add Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeesStudentsDetails;
