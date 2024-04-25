import { ApprovalRequest, IRule, IAction } from '../index';

/**
 * Represents a single step in a workflow process. This class encapsulates the logic for
 * executing a rule and action, and manages the navigation to subsequent steps based on the
 * outcome of the rule evaluation.
 */
export class WorkflowStep {
  /**
   * Constructs a WorkflowStep instance with associated rule, action, and conditional branches.
   * @param {IRule | null} rule - The rule that needs to be evaluated at this step. If the rule is null,
   *                              the step directly executes the action without any condition.
   * @param {IAction | null} action - The action to be executed if there is no rule or if the rule
   *                                  condition evaluates to false and there is no 'no' branch.
   * @param {WorkflowStep | null} nextYes - The next step to execute if the rule evaluates to true.
   * @param {WorkflowStep | null} nextNo - The next step to execute if the rule evaluates to false.
   */
  constructor(
    public rule: IRule | null,
    public action: IAction | null,
    public nextYes: WorkflowStep | null = null,
    public nextNo: WorkflowStep | null = null
  ) {}

  /**
   * Processes an approval request through this step and potentially through subsequent steps.
   * Evaluates the rule, executes actions, and navigates through the workflow based on rule outcomes.
   * 
   * @param {ApprovalRequest} request - The approval request containing data needed for rule evaluations
   *                                    and actions.
   * @returns {string[]} An array of messages collected from executed actions throughout the workflow.
   */
  process(request: ApprovalRequest): string[] {
    // Initialize an array to collect messages from actions executed in the workflow.
    let messages: string[] = [];

    // Evaluate the rule if it exists and decide the next step based on the outcome.
    if (this.rule?.evaluate(request)) {
      // If the rule evaluates to true, process the 'yes' branch and collect messages.
      messages = messages.concat(this.nextYes?.process(request) || []);
    } else if (this.rule) {
      // If the rule evaluates to false, process the 'no' branch and collect messages.
      messages = messages.concat(this.nextNo?.process(request) || []);
    } else if (this.action) {
      // If there is no rule or the rule doesn't affect the action, execute the action.
      const result = this.action.execute(request);
      // Collect the message from the executed action.
      messages.push(result);
    }
    // Return all collected messages from this and subsequent steps.
    return messages;
  }
}
