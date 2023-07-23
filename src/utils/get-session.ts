import { ClientSession, Connection } from 'mongoose';

/**
 * Utility function to create a new Mongoose client session.
 * @param {Connection} connection - The Mongoose connection to use for creating the session.
 * @returns {Promise<{ session: ClientSession; closeConnection: ()  => Promise<void>}>}
 *  A promise that resolves to an object containing the new client session and a function to close the connection.
 */
export const getSession = async (
  connection: Connection,
): Promise<{
  session: ClientSession;
  closeConnection: () => Promise<void>;
}> => {
  const client = connection.getClient();
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
