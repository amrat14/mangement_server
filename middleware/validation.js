import Utils from "../app/utils";

import * as yup from "yup";

module.exports = {
  validateCreateUser: async (req, res, next) => {
    const schema = yup.object().shape({
      fname: yup.string(),
      lname: yup.string(),
      email: yup.string().required(),
      secondarEmail: yup.string(),
      mobile: yup.string().required(),
      secondaryMobile: yup.string(),
      password: yup.string().required(),
      cpassword: yup.string().required(),
      verfied: yup.string(),
      status: yup.number(),
    });
    await validate(schema, req.body, res, next);
  },
};
const validate = async (schema, reqData, res, next) => {
  try {
    await schema.validate(reqData, { abortEarly: false });

    next();
  } catch (e) {
    const errors = e.inner.map(({ path, message, value }) => ({
      path,

      message,

      value,
    }));

    Utils.responseForValidation(res, errors);
  }
};
