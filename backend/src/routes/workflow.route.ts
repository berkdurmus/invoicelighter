import { Router } from 'express';
import { ApprovalRequest, buildWorkflowFromConfig, config } from '../index';

// Create a new Router object from Express to manage API routes.
const router = Router();

/**
 * Route handler for POST requests to 'api/workflow/approval-request'.
 * This endpoint processes incoming approval requests using a defined workflow.
 */
router.post('/approval-request', (req, res) => {
  try {
    if (!req.body.invoiceAmount) {
      // If invoiceAmount is missing, send a 400 Bad Request response
      return res.status(400).json({ message: 'Invoice amount is required.' });
    }

    // Extract required data from the request body.
    let { invoiceAmount, department, requiresManagerApproval } = req.body;

    // Set default values for optional parameters if they are not provided.
    if(!department) {
      department = 'No-department';
    }

    // Set default value for requiresManagerApproval if it is not provided.
    if(requiresManagerApproval === undefined) {
      requiresManagerApproval = false;
    }

    // Create a new ApprovalRequest object with the data.
    const request = new ApprovalRequest(invoiceAmount, department, requiresManagerApproval);

    // Build the workflow from the provided configuration, which defines how the approval should be processed.
    const workflow = buildWorkflowFromConfig(config);

    // Process the request using the constructed workflow and collect messages from actions performed during the process.
    const actionMessages = workflow.processRequest(request);

    // Send a successful response back to the client with action messages.
    res.status(200).json({ message: 'Approval request processed successfully.', actionMessages });
  } catch (error) {
    // Error handling: check if the caught error is an instance of Error.
    if (error instanceof Error) {
      console.log('error:', error);
      // Respond with a 500 Internal Server Error and the error message if it is an Error.
      res.status(500).json({
        message: 'An error occurred while processing the approval request.',
        error: error.message,
      });
    } else {
      // If the caught object is not an Error, send a generic error message.
      res.status(500).json({
        message: 'An error occurred while processing the approval request.',
        error: 'Unexpected error'
      });
    }
  }
});

// Export the router to be used in other parts of the application.
export default router;
