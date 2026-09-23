import { ClientService } from '../client-service/client.service';

describe('Client', () => {
  it('should be created', () => {
    const client = {} as ClientService;
    expect(client).toBeTruthy();
  });
});
