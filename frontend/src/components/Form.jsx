import { useState } from "react";
import { validations } from "../validations/validations";
import { useTheme } from "../contexts/useTheme";
import { useLanguage } from "../contexts/useLanguage";
import { translations } from "../translations/translations";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/**
 * @description Form component dynamically renders form fields based on the formType {"register", "login", "forgotPassword", "resetPassword"}
 * @returns {JSX.Element}
 */
const Form = ({ formType, onSubmit = () => {} }) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  const formFields = {
    register: [
      { name: "fullName", label: t.labels.fullName, type: "text", required: true },
      { name: "username", label: t.labels.username, type: "text", required: true },
      { name: "email", label: t.labels.email, type: "email", required: true },
      { name: "password", label: t.labels.password, type: "password", required: true },
      { name: "confirmPassword", label: t.labels.confirmPassword, type: "password", required: true },
    ],
    login: [
      { name: "email", label: t.labels.email, type: "email", required: true },
      { name: "password", label: t.labels.password, type: "password", required: true },
    ],
    forgotPassword: [
      { name: "email", label: t.labels.email, type: "email", required: true },
    ],
    resetPassword: [
      { name: "password", label: t.labels.newPassword, type: "password", required: true },
      { name: "confirmPassword", label: t.labels.confirmPassword, type: "password", required: true },
    ],
  };

  const fields = formFields[formType] || [];

  const formButton = {
    register: t.buttons.register,
    login: t.buttons.login,
    forgotPassword: t.buttons.forgot,
    resetPassword: t.buttons.reset,
  };
  const button = formButton[formType];

  // Update form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle input type between "text" and "password"
  const togglePasswordVisibility = (name) => {
    setShowPassword((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
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
    <form method="POST" onSubmit={handleSubmit} noValidate className="w-[80%]">
      {fields.map((field) => (
        <div key={field.name} className="flex justify-center items-start gap-2">
          <div className="relative w-full">
            <input
              name={field.name}
              type={
                field.type === "password" && showPassword[field.name]
                  ? "text"
                  : field.type
              }
              placeholder={field.label}
              value={formValues[field.name] || ""}
              onChange={handleChange}
              className={`${theme === "dark" ? "bg-[#2C2C2C] text-white" : "bg-gray-300 text-black"} w-full py-2 px-4 mb-2 rounded outline-none`}
            />
            {field.type === "password" && (
              <button
                type="button"
                onClick={() => togglePasswordVisibility(field.name)}
                className="absolute right-4 top-3 text-xs md:text-base text-gray-500"
              >
                {showPassword[field.name] ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
            )}
          </div>
          {errors[field.name] && (
            <span className="text-red-500 text-xs md:text-base mb-2 py-1">{errors[field.name]}</span>
          )}
        </div>
      ))}
      <button
        type="submit"
        className={`${theme === "dark" ? "bg-[#3B8AD9]" : "bg-[#FF9E4D]"} font-poppins w-full rounded-2xl py-2 px-4 mt-2 shadow`}
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