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
};

export default AdminController;
