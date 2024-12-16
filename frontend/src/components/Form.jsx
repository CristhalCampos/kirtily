import { useState } from "react";
import { validations } from "../validations/validations";
import { useTheme } from "../contexts/useTheme";
import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../translations/translations";
import propTypes from "prop-types";

const Form = ({ formType, onSubmit = () => {} }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const { theme } = useTheme() || {};
  const { language } = useLanguage() || {};
  const t = translations[language] || {};

  const formFields = {
    register: [
      { name: "fullName", label: "Full Name", type: "text", required: true },
      { name: "username", label: "Username", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "password", label: "Password", type: "password", required: true },
      { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
    ],
    login: [
      { name: "email", label: "Email", type: "email", required: true },
      { name: "password", label: "Password", type: "password", required: true },
    ],
    forgotPassword: [
      { name: "email", label: "Email", type: "email", required: true },
    ],
    resetPassword: [
      { name: "password", label: "password", type: "password", required: true },
      { name: "confirmPassword", label: "Confirm Password", type: "password", required: true },
    ],
  };
  const fields = formFields[formType] || [];

  const formButton = {
    register: t.btnRegister,
    login: t.btnLogin,
    forgotPassword: t.btnForgot,
    resetPassword: t.btnReset,
  };
  const button = formButton[formType];

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Send form
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validations(formValues, fields);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formValues);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit} noValidate>
      {fields.map((field) => (
        <div key={field.name} style={{ marginBottom: "10px" }}>
          <input
            name={field.name}
            type={field.type}
            placeholder={field.label}
            value={formValues[field.name] || ""}
            onChange={handleChange}
            className={`${theme === "dark" ? "bg-[#2C2C2C] text-white" : "bg-gray-300 text-black"}
              w-full py-2 px-4 mb-2 rounded outline-none`}
          />
          {errors[field.name] && (
            <span style={{ color: "red", fontSize: "0.9rem" }}>{errors[field.name]}</span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className={`${theme === "dark" ? "bg-[#3B8AD9]" : "bg-[#FF9E4D]"}
          font-poppins w-full rounded-2xl py-2 px-4 mt-2 shadow`}
      >
        {button}
      </button>
    </form>
  );
};

Form.propTypes = {
  formType: propTypes.oneOf(["register", "login", "forgotPassword", "resetPassword"]).isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default Form;