import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args: any) {
      // extract user from context
      const { user } = args[2];

      if (!user) {
        throw new Error('You are not authenticated!');
      }

      if (!user.is_admin) {
        throw new Error('This is above your pay grade!');
      }

      return resolve.apply(this, args);
    };
  }
}

export default IsAuthenticatedDirective;
