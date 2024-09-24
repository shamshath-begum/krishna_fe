import React, { useEffect, useState } from "react";
import axios from "axios";
import "./student.css"
import {useNavigate } from "react-router-dom";

function StudentsDetails() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

let navigate=useNavigate()

const fetchStudents = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/students-details?q=${searchQuery}`
    );

    setStudents(response.data);
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
};


  useEffect(() => {
    
    fetchStudents();
  }, [searchQuery]);

 let handleDeleteStudent=async(id)=>{
try {
  let res=await axios.delete(`http://localhost:8000/student-delete/${id}`)
  if (res.status === 200) {
    console.log(res);
    fetchStudents();
    alert("student Deleted Successfully")
  }
} catch (error) {
  console.log(error)
}
 }

 const handleSearch = (e) => {
  setSearchQuery(e.target.value);
}; 
 
 return (
    <div className="table-container">
      <h2 className="details">Students Details</h2>
       <input
        type="text"
        className="search-input"
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
            <th>Sub Course</th>
            <th>Instalment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student,i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{student.registerNumber}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.mobileNumber}</td>
              <td>{student.medium}</td>
              <td>{student.mainCourse}</td>
              <td>{student.subCourse}</td>
              <td>
              <ol>
                {student.instalmentDates.map((instalment, index) => (
                  <li key={index}>{new Date(instalment).toLocaleDateString()}</li>
                ))}
              </ol>
            </td>
              <td>
                <button className="table-button1"onClick={()=>navigate(`/student-view/${student._id}`)}>View</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="table-button2" onClick={()=>navigate(`/student-edit/${student._id}`)}>Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="table-button3"onClick={()=>handleDeleteStudent(student._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentsDetails;
