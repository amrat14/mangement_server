import userCollection from "../app/modules/auth";
import * as ValidationManger from "../middleware/validation";
import { stringConstants } from "../app/common/constants";
import authenticateToken from "../middleware/auth";
module.exports = (app) => {
  app.get("/", (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));
  app.post(
    "/v0/user/user-signup",
    ValidationManger.validateCreateUser,
    new userCollection().registerUser
  );
  app.get(
    "/v0/user/activate/:userId/:auth_key",
    new userCollection().activateUser
  );
  app.post("/v0/user/login", new userCollection().userLogin);
};
