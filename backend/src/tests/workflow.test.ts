import request from 'supertest';
import app from '../app';

describe('POST /api/workflow/approval-request', () => {
  it('should process an approval request with invoice amount more than 10000 USD and department Marketing, without manager approval required', async () => {
    const response = await request(app)
      .post('/api/workflow/approval-request')
      .send({
        invoiceAmount: 15000,
        department: 'Marketing',
        requiresManagerApproval: false
      })
      .expect('Content-Type', /json/)
      .expect(200);

      
    expect(response.body.actionMessages[0]).toEqual('Sending email to CMO regarding invoice 15000');
  });

  it('should handle errors gracefully', async () => {
    const response = await request(app)
      .post('/api/workflow/approval-request')
      .send({
        invoiceAmount: null,  // Sending invalid data to test error handling
        department: 'Marketing',
        requiresManagerApproval: false
      })
      .expect(400);

    expect(response.body.message).toEqual('Invoice amount is required.');
  });

  it('should process an approval request with invoice amount less than or equal to 10000 USD and department Marketing, without manager approval required', async () => {
    const response = await request(app)
      .post('/api/workflow/approval-request')
      .send({
        invoiceAmount: 8000,
        department: 'Marketing',
        requiresManagerApproval: false
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.actionMessages[0]).toEqual('Sending Slack message to Finance Team Member for invoice 8000');
  });

  it('should process an approval request with invoice amount less than or equal to 10000 USD and department Marketing, without manager approval required', async () => {
    const response = await request(app)
      .post('/api/workflow/approval-request')
      .send({
        invoiceAmount: 8000,
        department: 'Marketing',
        requiresManagerApproval: true
      })
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.actionMessages[0]).toEqual('Sending email to Finance Manager regarding invoice 8000');
  });

  it('should process an approval request with invoice amount more than 10000 USD and requires manager approval when department is not provided', async () => {
    const response = await request(app)
      .post('/api/workflow/approval-request')
      .send({
        invoiceAmount: 15000,
        requiresManagerApproval: false
      })
      .expect(200);

    expect(response.body.actionMessages[0]).toEqual('Sending Slack message to CFO for invoice 15000');
  });

  it('should process an approval request with invoice amount more than 10000 USD and when no manager approval required and department is provided', async () => {
    const response = await request(app)
      .post('/api/workflow/approval-request')
      .send({
        invoiceAmount: 15000,
        department: 'Marketing',
      })
      .expect(200);

    expect(response.body.actionMessages[0]).toEqual('Sending email to CMO regarding invoice 15000');
  });

});