const Validator = require("validator");
const isEmpty = require("./isempty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Validator work only String type (little hack)
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  } else if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be at least 3 characters";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Please, enter the password";
  } else if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = "Confirm password mismatch";
  } else if (!Validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
