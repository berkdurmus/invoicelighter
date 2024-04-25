import { IRule, ApprovalRequest } from '../index';

/**
 * The ManagerApprovalRule class implements the IRule interface and is designed
 * to evaluate whether manager approval is required for an approval request.
 * This rule is useful for workflows where certain requests need additional managerial oversight.
 */
export class ManagerApprovalRule implements IRule {
  /**
   * Evaluates the given ApprovalRequest to determine if manager approval is required.
   * Checks if the request's 'requiresManagerApproval' property is true.
   *
   * @param {ApprovalRequest} request - The approval request to evaluate, expected to contain a 'requiresManagerApproval' property.
   * @returns {boolean} Returns true if manager approval is required, false otherwise.
   */
  evaluate(request: ApprovalRequest): boolean {
    // Return true if the 'requiresManagerApproval' property in the request is true, indicating manager approval is needed.
    return request.requiresManagerApproval ?? false;
  }
}
