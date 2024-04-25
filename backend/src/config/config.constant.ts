// Configuration that can be loaded from a JSON file or database
export const config = {
  steps: [
    {
      rule: { type: 'InvoiceAmountRule', params: [10000] }, // Is the invoice amount more than 10000 USD?
      action: null,
      nextYes: {
        rule: { type: 'DepartmentRule', params: ['Marketing'] }, // Is the invoice related to marketing purchases?
        nextYes: {
          action: { type: 'EmailAction', params: ['CMO'] }, // Send approval request to the CMO via email
          nextNo: null,
          nextYes: null
        },
        nextNo: {
          action: { type: 'SlackAction', params: ['CFO'] }, // Send approval request to the CFO via Slack
          nextNo: null,
          nextYes: null
        }
      },
      nextNo: {
        rule: { type: 'InvoiceAmountRule', params: [5000] }, // Is the invoice amount more than 5000 USD?
        nextYes: {
          rule: { type: 'ManagerApprovalRule' }, // Does it require manager approval?
          nextYes: {
            action: { type: 'EmailAction', params: ['Finance Manager'] }, // Send approval request to a Finance manager via Slack
            nextNo: null,
            nextYes: null
          },
          nextNo: {
            action: { type: 'SlackAction', params: ['Finance Team Member'] }, // Send approval request to any Finance team member via Slack
            nextNo: null,
            nextYes: null
          }
        },
        nextNo: {
          action: { type: 'SlackAction', params: ['Finance Team Member'] }, // Send approval request to any Finance team member via Slack
          nextNo: null,
          nextYes: null
        }
      }
    }
  ]
};
