import { ApprovalRequest, WorkflowStep } from './index';

/**
 * Represents the entire workflow for processing approval requests.
 * This class orchestrates the execution of workflow steps starting from a specified entry point.
 */
export class Workflow {
  /**
   * The starting point of the workflow.
   * @private
   */
  private entryPoint: WorkflowStep;

  /**
   * Constructs a new Workflow instance.
   * @param {WorkflowStep} entryPoint - The first step of the workflow from which all processing begins.
   */
  constructor(entryPoint: WorkflowStep) {
    this.entryPoint = entryPoint;
  }

  /**
   * Processes an approval request through the workflow.
   * This method starts the processing of an approval request from the workflow's entry point
   * and returns the collection of messages generated by actions performed throughout the workflow.
   *
   * @param {ApprovalRequest} request - The approval request to be processed.
   * @returns {string[]} An array of messages that detail the actions taken during the request processing.
   */
  processRequest(request: ApprovalRequest): string[] {
    // Delegate the processing of the request to the entry point WorkflowStep
    return this.entryPoint.process(request);
  }
}
