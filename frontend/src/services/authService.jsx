import axios from "axios";

export const register = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const login = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/login", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const forgotPassword = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/forgot-password", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/reset-password", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
}