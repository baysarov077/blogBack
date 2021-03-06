const Router = require("express");
const UserController = require("../controllers/users.controller");
const fileMiddleware = require("../middlewares/file.middleware");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");
const usersController = require("../controllers/users.controller");

router.post(
  "/reg",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 8 }),
  UserController.reg
);
router.patch(
  "/img/:id",
  fileMiddleware.single("avatar"),
  UserController.addImage
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.get("/activate/:link", UserController.activate);
router.get("/user/:id", UserController.getOneUser);
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);
router.patch("/user/:id", authMiddleware, usersController.addSub);
router.delete("/user/:id", authMiddleware, usersController.deleteSub);
router.patch("/editMyProf/:id", usersController.editUser);

module.exports = router;
