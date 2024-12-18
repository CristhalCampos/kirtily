/**
 * @description Validations for the forms in the application
 * @function validations
 * @param {Object} formValues - Form values
 * @param {Object} fields - Form fields
 * @returns {Object} - Errors
 */
export const validations = (formValues, fields) => {
  const fullNameRegex = /^[a-zA-Z ]{3,50}$/;
  const usernameRegex = /^[a-zA-Z0-9]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  const errors = {};

  fields.forEach((field) => {
    if (field.required && !formValues[field.name]) {
      errors[field.name] = "This field is required";
    }

    if (field.name === "fullName" &&
      formValues[field.name] &&
      !fullNameRegex.test(formValues[field.name])) {
      errors["fullName"] = "The full name must be at least 3 characters, and can only contain letters";
    }

    if (field.name === "username" &&
      formValues[field.name] &&
      !usernameRegex.test(formValues[field.name])) {
      errors["username"] = "The username must be at least 3 characters, and can only contain letters and numbers";
    }

    if (
      field.name === "email" &&
      formValues[field.name] &&
      !emailRegex.test(formValues[field.name])
    ) {
      errors["email"] = "The email format is invalid";
    }

    if (
      field.name === "password" &&
      formValues[field.name] &&
      !passwordRegex.test(formValues[field.name])
    ) {
      errors["password"] = "Password must be at least 8 characters, one uppercase letter, one number, and one special character";
    }

    if (
      field.name === "confirmPassword" &&
      formValues["password"] !== formValues["confirmPassword"]
    ) {
      errors["confirmPassword"] = "Passwords do not match";
    }
  });

  return errors;
};