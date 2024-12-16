export const validations = (formValues, fields) => {
  const fullNameRegex = /^[a-zA-Z ]{3,50}$/;
  const usernameRegex = /^[a-zA-Z0-9]{3,30}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  const errors = {};

  fields.forEach((field) => {
    if (field.required && !formValues[field.name]) {
      errors[field.name] = `${field.label} is required`;
    }

    if (field.name === "fullName" &&
      formValues[field.name] &&
      !fullNameRegex.test(formValues[field.name])) {
      errors["fullName"] = "Invalid full name format";
    }

    if (field.name === "username" &&
      formValues[field.name] &&
      !usernameRegex.test(formValues[field.name])) {
      errors["username"] = "Invalid username format";
    }

    if (
      field.name === "email" &&
      formValues[field.name] &&
      !emailRegex.test(formValues[field.name])
    ) {
      errors["email"] = "Invalid email format";
    }

    if (
      field.name === "password" &&
      formValues[field.name] &&
      !passwordRegex.test(formValues[field.name])
    ) {
      errors["password"] = "Invalid password format";
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