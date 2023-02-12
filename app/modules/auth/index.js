import Utils from "../../utils";
import {
  apiSuccessMessage,
  apiFailureMessage,
  httpConstants,
} from "../../common/constants";
import BLManager from "./manager";
const sendEmailHelper = require("../../../helper/email");
const mailer = new sendEmailHelper();
export default class Index {
  async registerUser(req, res) {
    const [error, userResponse] = await Utils.parseResponse(
      new BLManager().registerUser(req.body)
    );
    if (error || !userResponse) {
      return Utils.handleError(error, req, res);
    }
    if (userResponse.code && userResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        userResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const activationLink = `http://localhost:6061/v0/user/activate/${userResponse._id}/${userResponse.auth_key}`;
    let result = await mailer.sendEmail(req.body.email, activationLink);
    if (!result.success) {
      return Utils.handleError(error, req, res);
    }
    return Utils.response(
      res,
      activationLink,
      apiSuccessMessage.CREATED_USER,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async userLogin(req, res) {
    const [error, loginUserResponse] = await Utils.parseResponse(
      new BLManager().userLogin(req.body)
    );
    if (error || !loginUserResponse) {
      return Utils.handleError(error, req, res);
    }
    if (loginUserResponse.code && loginUserResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        loginUserResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      loginUserResponse,
      apiSuccessMessage.SIGNED_IN,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async activateUser(req, res) {
    const [error, activateResponse] = await Utils.parseResponse(
      new BLManager().activateUser(req.params)
    );
    if (error || !activateResponse) {
      return Utils.handleError(error, req, res);
    }
    if (activateResponse.code && activateResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        activateResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      "account Activated",
      httpConstants.apiSuccessMessage,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async deleteUser(req, res) {
    const [error, deleltUserResponser] = await Utils.parseResponse(
      new BLManager().deleteUser(req.body)
    );
    if (error || !deleltUserResponser) {
      return Utils.handleError(error, req, res);
    }
    if (deleltUserResponser.code && deleltUserResponser.code !== 200) {
      return Utils.response(
        res,
        {},
        deleltUserResponser.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      deleltUserResponser,
      apiSuccessMessage.DELETE_USER,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async getUser(req, res) {
    const [error, getUserResponse] = await Utils.parseResponse(
      new BLManager().getUser(req.params.id)
    );
    if (error || !getUserResponse) {
      return Utils.handleError(error, req, res);
    }
    if (getUserResponse.code && getUserResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        getUserResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      getUserResponse,
      apiSuccessMessage.FETCH_SUCCESS,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async updateUser(req, res) {
    req.body.findQuery._id = req.user.id;
    const [error, updateUserResponse] = await Utils.parseResponse(
      new BLManager().updateUser(req.body)
    );
    if (!updateUserResponse) {
      return Utils.handleError(error, req, res);
    }
    if (updateUserResponse.code && updateUserResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        updateUserResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      updateUserResponse,
      apiSuccessMessage.UPDATED_USER,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
  async logoutUser(req, res) {
    const [error, logoutUserResponse] = await Utils.parseResponse(
      new BLManager().logoutUser(req.body)
    );
    if (!logoutUserResponse) {
      return Utils.handleError(error, req, res);
    }
    if (logoutUserResponse.code && logoutUserResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        logoutUserResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      logoutUserResponse,
      apiSuccessMessage.UPDATED_USER,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }

  async changePassword(req, res) {
    req.body.id = req.user.id;
    const [error, UserResponse] = await Utils.parseResponse(
      new BLManager().changePassword(req.body)
    );
    if (!UserResponse) {
      return Utils.handleError(error, req, res);
    }
    if (UserResponse.code && UserResponse.code !== 200) {
      return Utils.response(
        res,
        {},
        UserResponse.data,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return Utils.response(
      res,
      {},
      apiSuccessMessage.UPDATED_USER,
      httpConstants.RESPONSE_STATUS.SUCCESS,
      httpConstants.RESPONSE_CODES.OK
    );
  }
}
