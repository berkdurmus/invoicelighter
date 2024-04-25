import { ApprovalRequest } from "../index";

export interface IRule {
  evaluate(request: ApprovalRequest): boolean;
}