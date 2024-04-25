import { IAction, ApprovalRequest } from '../index';

/**
 * The EmailAction class implements the IAction interface and provides
 * a method to execute an action that simulates sending an email.
 */
export class EmailAction implements IAction {
  
  /**
   * The constructor takes in a recipient email address.
   * @param {string} recipient - The email address of the recipient.
   */
  constructor(private recipient: string) {}

  /**
   * Executes the action of sending an email. In a real-world scenario, this method
   * would contain logic to actually send an email to the recipient. Currently,
   * it only logs the message to the console and returns it as a string.
   *
   * @param {ApprovalRequest} request - The approval request object containing details of the request.
   * @returns {string} The message indicating the action that would have been taken.
   */
  execute(request: ApprovalRequest): string {
    // Construct the email message with the recipient and invoice amount from the request.
    const message = `Sending email to ${this.recipient} regarding invoice ${request.invoiceAmount}`;
    
    // Log the message to the console as a placeholder for actual email sending logic.
    console.log(message);
    
    // Return the message string for further use or for testing purposes.
    return message;
  }
}