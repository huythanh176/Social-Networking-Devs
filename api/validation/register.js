const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = data => {
  let errors = {};

  if (!Validator.isLength(data.name, { min: 2, max: 15 })) {
    errors.name = "Name must be between 2 and 15 character";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
