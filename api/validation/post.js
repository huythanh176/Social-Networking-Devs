const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validatePostInput = data => {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  // use Validator package
  if (!Validator.isLength(data.text, { max: 300, min: 10 })) {
    errors.text = "Post much be betwwen 10 and 300 characters ";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validatePostInput;
