import Role, { RoleModel } from '../model/Role';

export default {
  findByCode: (code: string): Promise<Role | null> => {
    return RoleModel.findOne({ code: code, status: true }).lean<Role>().exec();
  },
};
