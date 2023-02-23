const ApiError = require("../helpers/api-error");
const MongoDB = require("../helpers/mongodb");
const UserService = require("../services/user.service");

const userController = {
  register: async (req, res, next) => {
    try {
      if (!req.body.username || !req.body.password) {
        return next(new ApiError(400, "Missing information to register"));
      }
      const userService = new UserService(MongoDB.client);
      const response = await userService.register(req.body);
      if (response.error) {
        return next(new ApiError(response.status, response.error));
      }
      res.json({ message: "User created" });
    } catch (error) {
      console.log(error);
      next(new ApiError("Error at register user"));
    }
  },
  login: async (req, res, next) => {
    try {
      if (!req.body.username || !req.body.password) {
        return next(new ApiError(400, "Missing information to login"));
      }
      const userService = new UserService(MongoDB.client);
      const response = await userService.login(req.body);
      if (response.error) {
        return next(new ApiError(response.status, response.error));
      }

      res.json({ message: "Login successfully", ...response });
    } catch (error) {
      console.log(error);
      next(new ApiError("Error at login user"));
    }
  },
};

module.exports = userController;
