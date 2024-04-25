import { ApprovalRequest } from "../index";

export interface IAction {
  execute(request: ApprovalRequest): string;
}