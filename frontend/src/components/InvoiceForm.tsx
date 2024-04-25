import React, { useState } from 'react';
import '../styles/InvoiceForm.css';
import { DEPARTMENTS } from '../constants';
import { approveInvoice } from '../services';

// Functional component for handling invoice submissions
function InvoiceForm() {
  // State hooks to store form data and response
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [managerApprovalRequired, setManagerApprovalRequired] = useState(false);
  const [department, setDepartment] = useState('');

  // State for storing the response message and status
  const [responseMessage, setResponseMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(200);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    const formData = {
      invoiceAmount: Number(invoiceAmount), // Convert input string to number
      managerApprovalRequired,
      department
    };
    
    // Send the form data to the server via the approveInvoice service function
    approveInvoice({
      invoiceAmount: formData.invoiceAmount,
      department: formData.department,
      requiresManagerApproval: formData.managerApprovalRequired
    })
    .then((data) => {
      const emoji = data.status === 200 ? '✅' : '❌'; // Determine the emoji based on response status
      setResponseMessage(emoji + ' ' + data.message); // Update response message state with emoji and message
      setResponseStatus(data.status); // Update response status state
    })
    .catch((error) => {
      // Handle errors if the promise is rejected
      setResponseMessage('❌ ' + (error.message || "An error occurred")); // Default error message if none provided
      setResponseStatus(error.status || 500); // Default to status 500 if none provided
    });
  };

  return (
    <>
      {/* Display response message */}
      <p style={{ color: responseStatus === 200 ? 'green' : 'red' }}>{responseMessage}</p>
      {/* Form element with onSubmit event handler */}
      <form onSubmit={handleSubmit}>
        <div>
          {/* Input for invoice amount */}
          <label htmlFor="invoiceAmount">Invoice Amount in USD:</label>
          <input
            type="number"
            id="invoiceAmount"
            value={invoiceAmount}
            onChange={e => setInvoiceAmount(e.target.value)} // Update state on change
            required
          />
        </div>
        <div>
          {/* Checkbox for manager approval requirement */}
          <label htmlFor="managerApprovalRequired">Manager Approval Required:</label>
          <input
            type="checkbox"
            id="managerApprovalRequired"
            checked={managerApprovalRequired}
            onChange={e => setManagerApprovalRequired(e.target.checked)} // Update state on change
          />
        </div>
        <div>
          {/* Dropdown for selecting department */}
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={department}
            onChange={e => setDepartment(e.target.value)} // Update state on change
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option> // Map DEPARTMENTS to option elements
            ))}
          </select>
        </div>
        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default InvoiceForm;
