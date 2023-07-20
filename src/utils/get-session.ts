import { ClientSession, Connection } from 'mongoose';

/**
 * Utility function to create a session
 * @param connection mongoose connection
 * @returns {ClientSession} client session
 */
export const getSession = async (
  connection: Connection,
): Promise<{
  session: ClientSession;
  closeConnection: () => Promise<void>;
}> => {
  const client = connection.getClient();
  await client.connect();
  const session = client.startSession({
    defaultTransactionOptions: {
      readPreference: 'primary',
      readConcern: {
        level: 'majority',
      },
      writeConcern: {
        w: 'majority',
        wtimeout: 5000,
      },
      retryWrites: true,
    },
  });
  const closeConnection = async () => await client.close();
  return { session, closeConnection };
};
