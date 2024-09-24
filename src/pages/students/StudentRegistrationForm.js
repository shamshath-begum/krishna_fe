import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentRegistrationForm() {
  const [student, setStudent] = useState({
    // registerNumber: "",
    firstName: "",
    lastName: "",
    gender: "",
    fatherName: "",
    occupation: "",
    dob: "",
    image: "",
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
    totalAmount: "",
    remainingAmount:"",
    paidAmounts:"",
    status: "",
  });
  const [instalmentDates, setInstalmentDates] = useState([{ date: "" }]);
  const [payments,setPayments]=useState([])

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

  const handleInstalmentDateChange = (index, e) => {
    const newInstalmentDates = [...instalmentDates];
    newInstalmentDates[index][e.target.name] = e.target.value;
    setInstalmentDates(newInstalmentDates);
  };

  const handleAddInstalmentDate = () => {
    setInstalmentDates([...instalmentDates, { date: "" }]);
  };

  const handleRemoveInstalmentDate = (index) => {
    const newInstalmentDates = instalmentDates.filter((date, i) => i !== index);
    setInstalmentDates(newInstalmentDates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("student", student);

    const formData = new FormData();
    Object.keys(student).forEach((key) => {
      if (key !== "registerNumber") {
        formData.append(key, student[key]);
      }
    });
    instalmentDates.forEach((instalment, index) => {
      formData.append(`instalmentDates[${index}]`, instalment.date);
    });
    console.log("formData", formData);

    try {
      let res = await axios.post(
        "http://localhost:8000/students-register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        alert("Student registered successfully!");
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
    <>
      <form onSubmit={handleSubmit} className="student-form">
        <h2>Student Registration</h2>
        <div className="form-grid">
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
            <label>Father's Name:</label>
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
            <label>Image:</label>
            <input type="file" name="image" onChange={handleImageChange} />
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
            <label>Total Fees:</label>
            <input
              type="number"
              name="totalAmount"
              value={student.totalAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Remaining Amount:</label>
            <input
              type="number"
              name="remainingAmount"
              value={student.remainingAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Instalment Dates:</label>
            {instalmentDates.map((instalment, index) => (
              <div key={index} className="installment-date-group">
                <input
                  type="date"
                  name="date"
                  value={instalment.date}
                  onChange={(e) => handleInstalmentDateChange(index, e)}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleAddInstalmentDate()}
                  className="add-button"
                >
                  +
                </button>
                {instalmentDates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveInstalmentDate(index)}
                    className="remove-button"
                  >
                    -
                  </button>
                )}
              </div>
            ))}
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
        </div>
        <button type="submit" className="submit-button">
          Register Student
        </button>
      </form>
    </>
  );
}

export default StudentRegistrationForm;
