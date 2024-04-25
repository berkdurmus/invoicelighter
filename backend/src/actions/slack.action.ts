import { IAction, ApprovalRequest } from '../index';

/**
 * The SlackAction class implements the IAction interface and is responsible for
 * sending notification messages via Slack. This class serves as an example of how
 * action-oriented logic can be encapsulated within specialized action handlers.
 */
export class SlackAction implements IAction {
  
  /**
   * Constructor for the SlackAction class.
   * @param {string} recipient - Specifies the Slack user or channel identifier
   *                             to which the message should be sent.
   */
  constructor(private recipient: string) {}

  /**
   * Executes the action of sending a Slack message. This method is intended to be
   * used within a workflow to perform the action based on the conditions and data
   * present in an ApprovalRequest object.
   *
   * Currently, this function simulates the action by logging the intended message
   * to the console, serving as a placeholder for actual Slack API integration.
   *
   * @param {ApprovalRequest} request - Contains details about the approval request,
   *                                    including the invoice amount which is mentioned
   *                                    in the notification message.
   * @returns {string} The message that would typically be sent to Slack, indicating
   *                   both the recipient and the relevant invoice details.
   */
  execute(request: ApprovalRequest): string {
    // Construct the message that describes the action to be taken.
    const message = `Sending Slack message to ${this.recipient} for invoice ${request.invoiceAmount}`;

    // Log the message to the console as a stand-in for actual message transmission.
    console.log(message);
    
    // In a real application, here we would integrate with Slack's API to send the message.
    // For example:
    // SlackService.sendMessage(this.recipient, message);

    // Return the message for potential logging or testing outside of this method.
    return message;
  }
}