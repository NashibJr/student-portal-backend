import AdminService from "../services/adminService.js";

const AdminController = {
  registerAdmin: async (req, resp, next) => {
    try {
      const data = await AdminService.registerAdmin(req.body);
      return resp.status(200).json({
        admin: data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, resp, next) => {
    try {
      const data = await AdminService.login(req.body);
      return resp.status(200).json({
        admin: data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, resp, next) => {
    const { id } = req.params;
    const data = await AdminService.delete(id);
    return resp.status(201).json({
      admin: data,
    });
  },

  updateAdmin: async (req, resp, next) => {
    const data = await AdminService.updateAdmin(req.params.id, req.body);
    return resp.status(201).json({
      admin: data,
    });
  },
};

export default AdminController;
