import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function StudentEdit() {
    const { id } = useParams();
  

  const [student, setStudent] = useState({
    registerNumber: "",
    firstName: "",
    lastName: "",
    gender: "",
    fatherName: "",
    occupation: "",
    dob: "",
    // image: "",
    city: "",
    aadharNumber: "",
    school: "",
    pincode: "",
    email: "",
    mobileNumber: "",
    address: "",
    medium: "",
    mainCourse: "",
    subCourse: "",
    paymentAmount: "",
    instalmentDate: "",
    status: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setStudent({
      ...student,
      image: e.target.files[0],
    });
  };

  let getData = async () => {
    try {
      let res = await axios.get(`http://localhost:8000/student-edit/${id}`);
      console.log(res);

      if(res.status===200){
        let studentData=res.data
        if(studentData.dob){
            studentData.dob=new Date(studentData.dob).toISOString().split("T")[0]
           console.log("formatted dob",studentData.dob)
           }
           if(studentData.instalmentDate){
            studentData.instalmentDate=new Date(studentData.instalmentDate).toISOString().split("T")[0]
            console.log("Formatted instalmentDate:", studentData.instalmentDate);
        }
        setStudent(studentData);

      }
   } catch (error) {
      console.log(error);
    }
  };
const{registerNumber,firstName,lastName,gender,fatherName,occupation,dob,city,aadharNumber, school,pincode,email,mobileNumber,address,medium
    ,mainCourse,subCourse,paymentAmount,balanceAmount,feeAmount,paymentCompleteDue,instalmentDate,status
    }=student
  useEffect(() => {
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // const formData = new FormData();
    // Object.keys(student).forEach((key) => {
    // //   if (key !== "registerNumber") {
    //     formData.append(key, student[key]);
    // //   }
    // });
    // console.log("formData", formData);

    

    try {
      let res = await axios.put(
        `http://localhost:8000/student-edit/${id}`,student,
        // formData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      console.log(res);
      if (res.status === 201) {
        alert("Student edited successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error registering student", error);
    }
  };

  const [courses, setCourses] = useState([]);
  const [subCourses, setSubCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/courses");
        console.log("response", response);
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

  const handleMediumChange = (e) => {
    setStudent({
      ...student,
      medium: e.target.value,
      mainCourse: "", // Reset mainCourse when medium changes
      subCourse: "", // Reset subCourse when medium changes
    });
    setSubCourses([]);
  };

  const handleMainCourseChange = (e) => {
    const selectedMainCourse = e.target.value;
    const selectedCourse = courses.find(
      (course) =>
        course.medium === student.medium &&
        course.mainCourse === selectedMainCourse
    );
    setSubCourses(selectedCourse ? selectedCourse.subCourses : []);
    setStudent({
      ...student,
      mainCourse: selectedMainCourse,
      subCourse: "", // Reset subCourse when mainCourse changes
    });
  };

  const handleSubCourseChange = (e) => {
    setStudent({
      ...student,
      subCourse: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h2>Student Registration</h2>
      <div className="form-group">
        <label>Student Register Number:</label>
        <input
          type="text"
          name="registerNumber"
          value={student.registerNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={student.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={student.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Gender:</label>
        <select
          name="gender"
          value={student.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <label>Father Name:</label>
        <input
          type="text"
          name="fatherName"
          value={student.fatherName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Occupation:</label>
        <input
          type="text"
          name="occupation"
          value={student.occupation}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={student.dob}
          onChange={handleChange}
          required
        />
      </div>
      {/* <div className="form-group">
        <label>Image:</label>
        <input type="file" name="image" onChange={handleImageChange} />
      </div> */}
      <div className="form-group">
        <label>City:</label>
        <input
          type="text"
          name="city"
          value={student.city}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Aadhar Number:</label>
        <input
          type="text"
          name="aadharNumber"
          value={student.aadharNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>School:</label>
        <input
          type="text"
          name="school"
          value={student.school}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={student.pincode}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={student.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mobile Number:</label>
        <input
          type="text"
          name="mobileNumber"
          value={student.mobileNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={student.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Medium</label>
        <select
          name="medium"
          value={student.medium}
          onChange={handleMediumChange}
          required
        >
          <option value="">Select Medium</option>
          {[...new Set(courses.map((course) => course.medium))].map(
            (medium) => (
              <option key={medium} value={medium}>
                {medium}
              </option>
            )
          )}
        </select>
      </div>
      <div className="form-group">
        <label>Main Course</label>
        <select
          name="mainCourse"
          value={student.mainCourse}
          onChange={handleMainCourseChange}
          disabled={!student.medium}
          required
        >
          <option value="">Select Main Course</option>
          {courses
            .filter((course) => course.medium === student.medium)
            .map((course) => (
              <option key={course.mainCourse} value={course.mainCourse}>
                {course.mainCourse}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>Sub Course</label>
        <select
          name="subCourse"
          value={student.subCourse}
          onChange={handleSubCourseChange}
          disabled={!student.mainCourse}
          required
        >
          <option value="">Select Sub Course</option>
          {subCourses.map((subCourse) => (
            <option key={subCourse} value={subCourse}>
              {subCourse}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Payment Amount:</label>
        <input
          type="number"
          name="paymentAmount"
          value={student.paymentAmount}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Instalment Date:</label>
        <input
          type="date"
          name="instalmentDate"
          value={student.instalmentDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Status:</label>
        <select
          name="status"
          value={student.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        Register Student
      </button>
    </form>
  );
}

export default StudentEdit;
