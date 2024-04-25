import { IRule } from '../index';
import { ApprovalRequest } from '../core/ApprovalRequest';

/**
 * The DepartmentRule class implements the IRule interface and is used to determine
 * if an ApprovalRequest should be processed based on the department associated with the request.
 * This rule compares the department in the request with a specified department.
 */
export class DepartmentRule implements IRule {
  /**
   * Holds the department name against which the request's department is compared.
   * @private
   */
  private readonly department: string;

  /**
   * Constructs a new DepartmentRule with a specific department.
   * @param {string} department - The department name to which the rule will compare the request's department.
   */
  constructor(department: string) {
    // Set the department name for the rule.
    this.department = department;
  }

  /**
   * Evaluates the given ApprovalRequest against the rule's department.
   * Checks if the department from the request matches the rule's department.
   *
   * @param {ApprovalRequest} request - The approval request to evaluate, which should contain a 'department' property.
   * @returns {boolean} True if the request's department matches the rule's department (case-insensitive), otherwise false.
   */
  evaluate(request: ApprovalRequest): boolean {
    // Compare the department from the request with the rule's department, both converted to lower case for case-insensitive comparison.
    return request.department.toLowerCase() === this.department.toLowerCase();
  }
}
