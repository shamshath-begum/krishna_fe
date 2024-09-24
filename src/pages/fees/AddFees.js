import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AddFees() {
  const { id } = useParams();
  console.log(id)
  const [student, setStudent] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [receiptUrl, setReceiptUrl] = useState(""); // State to store the receipt URL
  let navigate = useNavigate();

  // Fetch student details
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/student-view/${id}`);
        console.log(response)
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!paymentAmount || paymentAmount <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/add-payment/${id}`,
        { paymentAmount: parseFloat(paymentAmount) }
      );
console.log(response.data)
      setSuccess("Payment added successfully!");
      setReceiptUrl(`http://localhost:8000/receipts/${response.data.receiptPath}`);
      // Redirect to student details page or update the state
    //   navigate("/fees-students-details");
    } catch (error) {
      setError("Error adding payment.");
      console.error("Payment error:", error);
    }
  };
console.log(receiptUrl)
  return (
    <div>
      <h2>Add Payment</h2>
      {student && (
        <div>
          <p><strong>Student Name:</strong> {student.firstName} {student.lastName}</p>
          <p><strong>Total Amount:</strong> {student.totalAmount}</p>
          <p><strong>Remaining Amount:</strong> {student.remainingAmount}</p>
          <p><strong>Installment Date:</strong> {student.instalmentDates[0] ? new Date(student.instalmentDates[0]).toLocaleDateString() : "All installments paid"}</p>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Payment Amount:</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                required
              />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <button type="submit">Submit Payment</button>
          </form>
 {/* Display the receipt link if available */}
    {receiptUrl && (
            <div>
              <h3>Payment Receipt</h3>
              <a href={receiptUrl} target="_blank" rel="noopener noreferrer">View Receipt</a>
              <br />
              <a href={receiptUrl} download>Download Receipt</a>
              {/* Optionally, you could use an iframe to embed the PDF */}
              <iframe src={receiptUrl} style={{ width: '100%', height: '500px' }}></iframe>


              {/* <a href={receiptUrl} target="_blank" rel="noopener noreferrer">Download Receipt</a> */}
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default AddFees;
