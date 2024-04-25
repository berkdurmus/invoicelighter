import { IRule } from '../index';

/**
 * A factory class for creating instances of rules (IRule).
 * This class dynamically loads rule classes based on a given rule type,
 * instantiating them with the appropriate parameters.
 */
export class RuleFactory {
  /**
   * Retrieves a rule instance based on the specified type.
   * This method dynamically loads rule classes from their respective files and
   * instantiates them with provided parameters.
   *
   * @param {string} ruleType - The type of the rule to retrieve, which corresponds
   *                            to both the filename and the class name of the rule.
   * @param {any[]} params - An array of parameters that will be passed to the rule's constructor.
   * @returns {IRule} An instance of the requested rule type.
   * @throws {Error} Throws an error if the rule type is unknown or if there are issues
   *                 loading the rule class or creating its instance.
   */
  static getRule(ruleType: string, ...params: any[]): IRule {
    // Variable to hold the module name derived from the rule type.
    let moduleName: string | null = null;

    // Determine the module name based on the rule type. Each rule is expected to be in its own file.
    switch (ruleType) {
      case 'ManagerApprovalRule':
        moduleName = 'manager.approval.rule';
        break;
      case 'DepartmentRule':
        moduleName = 'department.rule';
        break;
      case 'InvoiceAmountRule':
        moduleName = 'invoice.amount.rule';
        break;
      default:
        // If the rule type does not match any known type, throw an error.
        throw new Error(`Unknown rule type: ${ruleType}`);
    }

    // Ensure that the module name was set.
    if (!moduleName) {
      throw new Error(`No module name resolved for rule type: ${ruleType}`);
    }

    // Dynamically load the rule module using the resolved module name.
    const ruleModule = require(`../rules/${moduleName}`);

    // Retrieve the class from the module that matches the rule type.
    const ruleClass = ruleModule[ruleType];
    
    // Check if the class actually exists in the module.
    if (typeof ruleClass !== 'function') {
      throw new Error(`The rule class '${ruleType}' is not a constructor`);
    }

    // Create a new instance of the rule class, passing in any parameters, and return it.
    return new ruleClass(...params) as IRule;
  }
}
