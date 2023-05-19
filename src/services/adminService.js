import JWT from "jsonwebtoken";
import Administrator from "../models/administartor.js";
import * as bcrypt from "bcrypt";

const AdminService = {
  // registering administrators.
  registerAdmin: async (data) => {
    try {
      //check if the administrator already exists on the database

      const { username } = data;
      const exists = await Administrator.findOne({ username: username });
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
      return {
        message: error.message,
      };
    }
  },

  // logging in admnistrators
  login: async (credentials) => {
    // check if the admin exists on the database
    const { username, email } = credentials;
    let admin = await Administrator.findOne({ username: username });

    // if the admin doesnt exist, we let them know.
    if (!admin) {
      return {
        message: "Admin not found, check your username amd try again",
      };
    }
    // otherwise we check if they have provided the righ credentials.

    const checkedAdmin = await bcrypt.compare(
      credentials.password,
      admin.password
    );
    if (!checkedAdmin) {
      return {
        message: "Wrong password of username is submitted.",
      };
    }
    // otherwise we generate a token for them.

    const token = JWT.sign({ username, email }, process.env.JWT_TOKEN_CONFIG, {
      expiresIn: "24h",
    });
    admin = admin.toJSON();
    // remove the password
    delete admin.password;
    // return the checked admin and their tokens.
    return { ...admin, token: token };
  },

  // deleting administrators
  delete: async (adminId) => {
    try {
      // find the administrator by their Ids amd then delete them.
      await Administrator.findByIdAndDelete(adminId);
      // return a message on a successful delete operation.
      return {
        message: "successfully deleted",
      };
    } catch (error) {
      // incase an error occurs, we display this message.
      return {
        message: "Failed to delete admin",
      };
    }
  },

  //update admin
  updateAdmin: async (adminId, userdata) => {
    try {
      const { username, email, password } = userdata;
      //  find the admin to be updated by their Ids and update them
      let updatedAdmin = await Administrator.findByIdAndUpdate(adminId, {
        username,
        email,
        password,
      });

      // change the updatedAdmin to json
      updatedAdmin = updatedAdmin.toJSON();

      // we can't return the passwords of the admins
      delete updatedAdmin.password;

      // return the updated Admin and a a message.
      return { ...updatedAdmin, message: "successfully updated" };
    } catch (error) {
      return {
        message: "Failed to update admin",
      };
    }
  },
};

export default AdminService;
