import { Connection } from 'mongoose';

import { getSession } from './get-session';

const mockClient = {
  connect: jest.fn(),
  startSession: jest.fn(() => ({
    session: true,
  })),
  close: jest.fn(),
};

describe('getSession', () => {
  let mockConnection: Connection;

  beforeEach(() => {
    mockConnection = {
      getClient: jest.fn(() => mockClient),
    } as unknown as Connection;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a session and return it with a closeConnection function', async () => {
    const { session, closeConnection } = await getSession(mockConnection);

    expect(mockClient.connect).toHaveBeenCalledTimes(1);
    expect(mockClient.startSession).toHaveBeenCalledTimes(1);

    // Ensure that the returned object contains the session and closeConnection function
    expect(session).toBeDefined();
    expect(closeConnection).toBeDefined();
    expect(typeof closeConnection).toBe('function');
  });

  it('should close the connection when calling closeConnection', async () => {
    const { closeConnection } = await getSession(mockConnection);

    await closeConnection();
    expect(mockClient.close).toHaveBeenCalledTimes(1);
  });
});
