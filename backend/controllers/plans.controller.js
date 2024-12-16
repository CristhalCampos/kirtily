import axios from "axios";
import { config } from "dotenv";
config({ path: "./config/.env" });
import { plans } from "../conts/paypal.conts.js";

/**
 * @description Create plans in PayPal
 * @route POST /api/v1/plans
 * @access Public
 * @function createPlans
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Created plans
 * @method POST
 * @example http://localhost:3001/api/v1/plans
 */
export const createPlans = async (req, res) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    const { data: { access_token } } = await axios.post(
      `${process.env.PAYPAL_API}/v1/oauth2/token`,
      params,
      {
        auth: {
          username: process.env.PAYPAL_CLIENT,
          password: process.env.PAYPAL_KEY,
        },
      }
    );
    const createdPlans = [];
    for (const plan of plans) {
      const response = await axios.post(
        `${process.env.PAYPAL_API}/v1/billing/plans`,
        plan,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      createdPlans.push(response.data);
    }

    res.status(201).json({ message: "Plans created successfully", plans: createdPlans });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error creating plans" });
  }
};