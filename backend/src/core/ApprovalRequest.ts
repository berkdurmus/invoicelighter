/**
 * Represents an approval request in the workflow system.
 * This class encapsulates the essential details of an invoice that requires approval,
 * including the amount, the department it relates to, and whether it requires managerial approval.
 */
export class ApprovalRequest {

  /**
   * Constructs an instance of ApprovalRequest.
   *
   * @param {number} invoiceAmount - The total amount of the invoice that requires approval.
   * @param {string} department - The department within the organization to which the invoice is related.
   * @param {boolean} requiresManagerApproval - Indicates whether the approval request
   *                                            needs to be escalated to a manager.
   */
  constructor(
    public invoiceAmount: number,
    public department: string,
    public requiresManagerApproval: boolean
  ) {}
}
