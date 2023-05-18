import Administrator from "../models/administartor.js";
import * as bcrypt from "bcrypt";

const AdminService = {
  registerAdmin: async (data) => {
    try {
      //check if the administrator already exists on the database

      const { username, email } = data;
      const exists = await Administrator.findOne(
        { username: username },
        { email: email }
      );
      // if the admin exists, deny them to be created again
      if (exists) {
        return {
          message: "Administrator already exists.",
        };
      }

      // otherwise a new admin is created.
      // hash the password first.
      const hashedPassword = await bcrypt.hash(data.password, 10);
      // create the user with the hashed password
      let admin = await Administrator.create({
        ...data,
        password: hashedPassword,
      });
      // convert the admin data to json
      admin = admin.toJSON();
      // we should not return the password.
      const { password, ...rest } = admin;
      //return the rest

      return { ...rest, message: "successfully created Admin" };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
      };
    }
  },
};

export default AdminService;
