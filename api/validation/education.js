const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateExperienceInput = data => {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  // use Validator package
  if (Validator.isEmpty(data.school)) {
    errors.school = "school field is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "degree field is required";
  }

  if (Validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = "Field of study field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "From field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateExperienceInput;
