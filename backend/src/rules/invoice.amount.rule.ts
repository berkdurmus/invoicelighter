import { IRule, ApprovalRequest } from '../index';

/**
 * The InvoiceAmountRule class implements the IRule interface and is designed
 * to evaluate whether the invoice amount in an ApprovalRequest exceeds a specified threshold.
 * This rule is useful for workflows where decisions depend on the financial value of the invoice.
 */
export class InvoiceAmountRule implements IRule {
  /**
   * Initializes a new instance of InvoiceAmountRule with a threshold.
   * @param {number} threshold - The monetary threshold above which the rule evaluates to true.
   */
  constructor(private threshold: number) {}

  /**
   * Evaluates the given ApprovalRequest against the rule's threshold.
   * Checks if the invoice amount from the request exceeds the specified threshold.
   *
   * @param {ApprovalRequest} request - The approval request to evaluate, expected to contain an invoiceAmount.
   * @returns {boolean} Returns true if the invoice amount is greater than the threshold, false otherwise.
   */
  evaluate(request: ApprovalRequest): boolean {
    // Return true if the invoice amount in the request is greater than the set threshold, false otherwise.
    return request.invoiceAmount > this.threshold;
  }
}
