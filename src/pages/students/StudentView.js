import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./student.css";

function StudenView() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/student-view/${id}`);
        console.log(response)
        setStudent(response.data);
      } catch (err) {
        console.error('Error fetching student details:', err);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return <>
  <div className="student-detail-container">
      <h2>Student Details</h2>
      <div className="student-info">
        <p><strong>Register Number:</strong> {student.registerNumber}</p>
        <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
        <p><strong>Date of Birth:</strong> {new Date(student.dob).toLocaleDateString()}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Mobile Number:</strong> {student.mobileNumber}</p>
        <p><strong>AadharNumber:</strong> {student.aadharNumber}</p>
        <p><strong>School:</strong> {student.school}</p>
        <p><strong>Course:</strong>{student.medium}-{student.mainCourse} - {student.subCourse}</p>
        <p><strong>Father's Name:</strong> {student.fatherName}</p>
        <p><strong>Occupation:</strong> {student.occupation}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>City:</strong> {student.city}</p>
        <p><strong>Pincode:</strong> {student.pincode}</p>
        <p><strong>PaymentAmount:</strong> {student.paymentAmount}</p>
        <p><strong>InstalmentDate:</strong> {student.instalmentDate}</p>
        <p><strong>Status:</strong> {student.status}</p>
      </div>
    </div>
  </>
}

export default StudenView