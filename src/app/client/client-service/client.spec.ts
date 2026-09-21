import { Client } from '../model/client';

describe('Client', () => {
  it('should be created', () => {
    const client = {} as Client;
    expect(client).toBeTruthy();
  });
});
