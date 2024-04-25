import { IAction } from '../index';

/**
 * A factory class for creating instances of IAction.
 * This class provides a centralized method of instantiating action objects based on a given action type.
 */
export class ActionFactory {
  /**
   * Retrieves an action instance based on the specified type. This method dynamically loads
   * action classes from separate files and instantiates them with provided parameters.
   *
   * @param {string} actionType - The type of the action to retrieve, which corresponds
   *                              to the filename and class name of the action.
   * @param {any[]} params - An array of parameters that will be passed to the action's constructor.
   * @returns {IAction} An instance of the requested action type.
   * @throws {Error} Throws an error if the action type is unknown or if there are issues loading
   *                 the action class or creating its instance.
   */
  static getAction(actionType: string, ...params: any[]): IAction {
    // Variable to hold the module name derived from the action type.
    let moduleName: string | null = null;

    // Determine the module name based on the action type. Each action is expected to be in its own file.
    switch (actionType) {
      case 'EmailAction':
        moduleName = 'email.action';
        break;
      case 'SlackAction':
        moduleName = 'slack.action';
        break;
      default:
        // If the action type does not match any known type, throw an error.
        throw new Error(`Unknown action type: ${actionType}`);
    }

    // Ensure that the module name was set.
    if (!moduleName) {
      throw new Error(`No module name resolved for action type: ${actionType}`);
    }

    // Dynamically load the action module using the resolved module name.
    const actionModule = require(`../actions/${moduleName}`);

    // Retrieve the class from the module that matches the action type.
    const actionClass = actionModule[actionType];

    // Check if the class actually exists in the module.
    if (!actionClass) {
      throw new Error(`Action class not found for action type: ${actionType}`);
    }

    // Create a new instance of the action class, passing in any parameters, and return it.
    return new actionClass(...params) as IAction;
  }
}
