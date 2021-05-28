import roleResolvers from './role.query';
import userResolvers from './user.query';

export default {
  ...roleResolvers,
  ...userResolvers,
};
