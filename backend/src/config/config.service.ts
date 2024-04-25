import { Workflow, WorkflowStep } from '../core';
import { RuleFactory, ActionFactory } from '../factories';

/**
 * Constructs a workflow based on a given configuration.
 * This function builds a linked set of WorkflowSteps according to the specified configuration.
 *
 * @param {any} config - The configuration object that defines the workflow structure.
 * @returns {Workflow} A fully constructed Workflow object ready to process approval requests.
 * @throws {Error} Throws an error if the configuration is invalid or incomplete.
 */
export function buildWorkflowFromConfig(config: any): Workflow {
  // Check for a valid configuration. It must exist, have a 'steps' array, and 'steps' must be an array.
  if (!config || !config.steps || !Array.isArray(config.steps)) {
    throw new Error('Invalid configuration provided');
  }

  // This variable will hold the first step of the workflow after the loop.
  let firstStep: WorkflowStep | null = null;

  /**
   * Recursively builds workflow steps.
   * This function is a helper that constructs a WorkflowStep from a given configuration.
   * It calls itself to build any linked 'yes' or 'no' branches, forming a tree structure.
   *
   * @param {any} stepConfig - A single step's configuration within the workflow.
   * @returns {WorkflowStep | null} - Returns a constructed WorkflowStep or null if the configuration is empty.
   */
  function buildStep(stepConfig: any): WorkflowStep | null {
    if (!stepConfig) return null;

    // Attempt to create a rule for the step if it is defined in the configuration.
    const rule = stepConfig.rule
      ? RuleFactory.getRule(stepConfig.rule.type, ...(stepConfig.rule.params || []))
      : null;

    // Attempt to create an action for the step if it is defined in the configuration.
    const action = stepConfig.action
      ? ActionFactory.getAction(stepConfig.action.type, ...(stepConfig.action.params || []))
      : null;

    // Recursively build the 'yes' and 'no' branches of this step, if they exist.
    const nextYes = buildStep(stepConfig.nextYes);
    const nextNo = buildStep(stepConfig.nextNo);

    // Construct and return the current WorkflowStep.
    return new WorkflowStep(rule, action, nextYes, nextNo);
  }

  // Begin the recursive step building process starting from the first step defined in the configuration.
  firstStep = buildStep(config.steps[0]);

  // Check if a first step was successfully created.
  if (!firstStep) {
    throw new Error('No workflow steps were created from the configuration');
  }

  // Return a new Workflow instance initialized with the first step.
  return new Workflow(firstStep);
}
