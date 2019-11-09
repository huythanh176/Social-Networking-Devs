const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateProfileInput = data => {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  // use Validator package

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle need to be between 2 and 40 character";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Handle fields is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "skills field is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "URL is not valid";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "URL is not valid";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "URL is not valid";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "URL is not valid";
    }
  }

  if (!isEmpty(data.linkkedin)) {
    if (!Validator.isURL(data.linkkedin)) {
      errors.linkkedin = "URL is not valid";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "URL is not valid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateProfileInput;
