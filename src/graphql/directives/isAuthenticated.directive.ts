import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import { AuthFailureError, BadRequestError } from '../../core/ApiError';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args: any) {
      // extract user from context
      const { payload, keystore, accessToken } = args[2].req;
      if (!accessToken) {
        throw new BadRequestError('No token provided');
      }

      if (!keystore) {
        throw new Error("You don't have active session, please login again!");
      }

      if (!payload) {
        throw new AuthFailureError('Invalid access token');
      }

      return resolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
