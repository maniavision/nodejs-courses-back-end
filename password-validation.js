const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
  };

  function passwordValidation(password) {
    passwordComplexity().validate(password);
  }

  module.exports = {passwordValidation};