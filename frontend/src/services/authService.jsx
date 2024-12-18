import api from "./api";

/**
 * @description API call to register a new user
 * @route POST ${API_URL}/register
 * @access Public
 * @function register
 * @param {Object} data - User data to be registered
 * @returns {Object} - Response from the server
 */
export const register = async (data) => {
  try {
    const response = await api.post("/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.error || "Something went wrong!";
    } else if (error.request) {
      throw "No response from server. Please try again later.";
    } else {
      throw "An unexpected error occurred. Please try again.";
    }
  }
};

/**
 * @description API call to login a user
 * @route POST ${API_URL}/login
 * @access Public
 * @function login
 * @param {Object} data - User data to be logged in
 * @returns {Object} - Response from the server
 */
export const login = async (data) => {
  try {
    const response = await api.post("/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message || "Login failed. Please try again.";
    } else if (error.request) {
      throw "No response from server. Please try again later.";
    } else {
      throw "An unexpected error occurred during login.";
    }
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.post("/refresh-token", {}, {
      withCredentials: true
    }
    );
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

/**
 * @description API call to forgot password
 * @route POST ${API_URL}/forgot-password
 * @access Public
 * @function forgotPassword
 * @param {Object} data - User data to be send to receive email
 * @returns {Object} - Response from the server
*/
export const forgotPassword = async (data) => {
  try {
    const response = await api.post("/forgot-password", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message || "Password reset failed. Please try again.";
    } else if (error.request) {
      throw "No response from server. Please try again later.";
    } else {
      throw "An unexpected error occurred during password reset.";
    }
  }
};

/**
 * @description API call to reset password
 * @route POST ${API_URL}/reset-password/:resetToken
 * @access Public
 * @function resetPassword
 * @param {Object} data - User data to be send to reset password
 * @param {String} token - Reset token
 * @returns {Object} - Response from the server
 */
export const resetPassword = async (token, data) => {
  try {
    const response = await api.post(
      `/reset-password/${token}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message || "Password reset failed. Please try again.";
    } else if (error.request) {
      throw "No response from server. Please try again later.";
    } else {
      throw "An unexpected error occurred during password reset.";
    }
  }
}


/**
 * @description API call to logout a user
 * @route GET ${API_URL}/logout
 * @access Public
 * @function logout
 * @returns {Object} - Response from the server
 */
export const logout = async () => {
  try {
    const response = await api.get("/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message || "Logout failed. Please try again.";
    } else if (error.request) {
      throw "No response from server. Please try again later.";
    } else {
      throw "An unexpected error occurred during logout.";
    }
  }
};