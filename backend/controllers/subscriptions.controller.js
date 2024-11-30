import { Suscription } from "../models/subscriptions.model.js";
import axios from "axios";
import { config } from "dotenv";
config({ path: "./config/.env" });

export const createPlan = async (req, res) => {
  try {
    const plan = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      frequency: req.body.frequency,
      frequency_interval: req.body.frequency_interval,
      cycles: req.body.cycles,
      amount: req.body.amount,
      currency: req.body.currency
    }
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    const { data: {access_token} } = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, params, {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      }
    });
    await axios.post(`${process.env.PAYPAL_API}/v1/billing/plans`, plan, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    res.status(201).json({ message: "Plan created" });
  } catch (error) {
    res.status(500).json({ error: "Error creating plan" });
  }
};
