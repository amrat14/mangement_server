import Utils from "../../utils";
import Config from "../../../config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  apiFailureMessage,
  apiSuccessMessage,
  httpConstants,
  role,
  permission,
} from "../../common/constants";
import UserSchema from "../../models/userSchema";
import { ObjectID } from "bson";
import mongoose from "mongoose";
export default class Manger {
  registerUser = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const user = await UserSchema.findOne({ email: req.email });
    if (user && user.is_verified == true) {
      return Utils.error(
        apiFailureMessage.USER_EXIST,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    if (req.password !== req.cpassword) {
      return Utils.error(
        apiFailureMessage.PASSWORD_NOT_MATCH,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const salt = await bcrypt.genSalt(10);
    req.password = await bcrypt.hash(req.password, salt);
    let result = await UserSchema.registerUser(
      {
        email: req.email,
        is_verified: false,
      },
      {
        email: req.email,
        mobile: req.mobile,
        password: req.password,
        role: role.SCHOOL,
        permission_type: permission.ADMIN,
        created_by: req.email,
        updated_by: req.email,
      }
    );
    return result;
  };
  //

  activateUser = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let result = await UserSchema.findOneAndUpdateData(
      {
        _id: mongoose.Types.ObjectId(req.userId),
        auth_key: mongoose.Types.ObjectId(req.auth_key),
        is_verified: false,
      },
      { is_verified: true }
    );
    return result;
  };
  userLogin = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    console.log(req);
    const email = req.email;
    const user = await UserSchema.findOne({ email: email, is_verified: true });
    if (!user) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const checkPassword = await bcrypt.compare(req.password, user.password);
    if (!checkPassword) {
      return Utils.error(
        apiFailureMessage.WRONG_PASSWORD,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const payload = {
      id: user._id,
      role: user.role,
      permission: user.permission_type,
      email: user.email,
    };
    const token = await jwt.sign(payload, Config.JWT_SECRET, {
      expiresIn: 1000 * 60 * 60 * 24 * 7,
    });
    await UserSchema.findOneAndUpdateData(
      { email: user.email },
      { isLogin: true }
    );
    if (!token) {
      return Utils.error(
        apiFailureMessage.INTERNAL_SERVER_ERROR,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    return { token: token, role: user.role[0], _id: user.id, isLogin: true };
  };
  //
  getUser = async (req) => {
    return await UserSchema.findOne({ _id: req }).catch((err) => {
      throw err;
    });
  };
  updateUser = async (req) => {
    if (!req.findQuery || !req.updateQuery) {
      return Utils.error(
        apiFailureMessage.FIND_QUERY_UPDATE_QUERY,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    if (
      req.updateQuery.password &&
      req.updateQuery.password !== req.updateQuery.cpassword
    ) {
      return Utils.error(
        apiFailureMessage.PASSWORD_NOT_MATCH,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    if (
      req.updateQuery.password &&
      req.updateQuery.password === req.updateQuery.cpassword
    ) {
      const salt = await bcrypt.genSalt(10);
      req.updateQuery.password = await bcrypt.hash(
        req.updateQuery.password,
        salt
      );
    }
    const result = UserSchema.findOneAndUpdateData(
      req.findQuery,
      req.updateQuery
    );
    return "updated";
  };
  logoutUser = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.FIND_QUERY_UPDATE_QUERY,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const result = UserSchema.findOneAndUpdateData(
      { email: req.email },
      { isLogin: false }
    );
    return result;
  };
  deleteUser = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const data = UserSchema.findOneAndUpdateData(
      { _id: req._id },
      { status: 1 }
    );
    return data;
  };

  changePassword = async (req) => {
    if (!req) {
      return Utils.error(
        apiFailureMessage.INVALID_PARAMS,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const oldPassword = req.old_password;
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.new_password, salt);
    const user = await UserSchema.findOne({ _id: req.id });
    if (!user) {
      return Utils.error(
        apiFailureMessage.NOT_FOUND,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword) {
      return Utils.error(
        apiFailureMessage.WRONG_PASSWORD,
        httpConstants.RESPONSE_STATUS.FAILURE,
        httpConstants.RESPONSE_CODES.FORBIDDEN
      );
    }
    let result = await UserSchema.findOneAndUpdateData(
      { _id: req.id },
      { password: newPassword }
    );
    return result;
  };
}
