import roleQueries from './role.query';
import userQueries from './user.query';

export default {
  ...roleQueries,
  ...userQueries,
};
