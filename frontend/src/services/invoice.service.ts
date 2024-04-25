// Import the axios library for making HTTP requests
import axios from 'axios';

// Define the base URL for the API endpoints
const API_URL = 'http://localhost:3000/api/workflow';

/**
 * Sends an invoice approval request to the server and returns a structured response.
 * 
 * @param approvalData An object containing invoice amount, department, and manager approval requirement.
 * @returns A promise that resolves to an object containing the server's response message and status code.
 */
export const approveInvoice = async (approvalData: {invoiceAmount: number, department: string, requiresManagerApproval: boolean}): Promise<{ message: string; status: number; }> => {
  // Make a POST request to the server with the approval data
  const response = await axios.post(`${API_URL}/approval-request`, approvalData);

  // Extract the first action message from the server's response and the status code
  return {
    message: await response.data.actionMessages[0], // Assume the relevant message is the first in the actionMessages array
    status: await response.status // Capture the HTTP status code of the response
  };
};
