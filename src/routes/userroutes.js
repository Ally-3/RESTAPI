const { Router } = require("express");
const userRouter = Router();

const { hashPassword, comparePassword, tokenCheck } = require("../middleware/index")
const { register, login, listAllUsers } = require("../controllers/usercontroller")

userRouter.post("/registerUser", hashPassword, register);
userRouter.post("/loginUser", comparePassword, login);

userRouter.get("/listAllUsers", tokenCheck, listAllUsers);

module.exports = userRouter;