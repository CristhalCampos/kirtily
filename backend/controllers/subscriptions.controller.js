import { Subscription } from "../models/subscriptions.model.js";
import { Transaction } from "../models/transactions.model.js";
import axios from "axios";
import { config } from "dotenv";
config({ path: "./config/.env" });

/**
 * @description Create a new subscription
 * @route POST /api/v1/subscriptions
 * @access Public
 * @function createSubscription
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Subscription
 * @method POST
 * @example http://localhost:3001/api/v1/subscriptions
 */
export const createSubscription = async (req, res) => {
  try {
    const { userId, planId } = req.body;

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

    const { data: planDetails } = await axios.get(
      `${process.env.PAYPAL_API}/v1/billing/plans/${planId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { name, billing_cycles } = planDetails;
    const regularCycle = billing_cycles.find(cycle => cycle.tenure_type === "REGULAR");
    const trialCycle = billing_cycles.find(cycle => cycle.tenure_type === "TRIAL");

    const startDate = new Date();
    const endDate = new Date(startDate);
    if (regularCycle.frequency.interval_unit === "MONTH") {
      endDate.setMonth(endDate.getMonth() + regularCycle.frequency.interval_count);
    } else if (regularCycle.frequency.interval_unit === "YEAR") {
      endDate.setFullYear(endDate.getFullYear() + regularCycle.frequency.interval_count);
    }

    const subscription = new Subscription({
      user: userId,
      plan: name.includes("Monthly") ? "monthly" : "yearly",
      price: regularCycle.pricing_scheme.fixed_price.value,
      startDate,
      endDate,
      isActive: true,
    });

    await subscription.save();

    res.status(201).json({ message: "Subscription created successfully", subscription });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error creating subscription" });
  }
};

/**
 * @description Renew a subscription
 * @route POST /api/v1/subscriptions/renew
 * @access Public
 * @function renewSubscription
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Subscription
 * @method POST
 * @example http://localhost:3001/api/v1/subscriptions/renew
 */
export const renewSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    const subscription = await Subscription.findById(subscriptionId).populate("user");
    if (!subscription || !subscription.isActive) {
      return res.status(400).json({ error: "Invalid or inactive subscription" });
    }

    const newEndDate = new Date(subscription.endDate);
    if (subscription.plan === "monthly") {
      newEndDate.setMonth(newEndDate.getMonth() + 1);
    } else if (subscription.plan === "yearly") {
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
    }

    const paymentData = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: subscription.price.toString(),
            currency_code: "USD",
          },
        },
      ],
    };

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

    const { data: paymentResponse } = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (paymentResponse.status === "COMPLETED") {
      subscription.endDate = newEndDate;
      await subscription.save();

      const transaction = new Transaction({
        user: subscription.user._id,
        amount: subscription.price,
        status: "completed",
        createdAt: new Date(),
      });

      await transaction.save();

      res.status(200).json({ message: "Subscription renewed successfully", subscription });
    } else {
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error renewing subscription" });
  }
};

/**
 * @description Cancel a subscription
 * @function cancelSubscription
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Subscription
 * @method POST
 * @example http://localhost:3001/api/v1/subscriptions/cancel
 */
export const cancelSubscription = async (req, res) => {
  try {
    const { userId } = req.body;

    const subscription = await Subscription.findOne({ user: userId });

    if (!subscription || !subscription.isActive) {
      return res.status(404).json({ message: "No active subscription found" });
    }

    subscription.isActive = false;
    subscription.endDate = new Date();
    await subscription.save();

    res.status(200).json({ message: "Subscription canceled", subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error canceling subscription" });
  }
};

/**
 * @description Get subscription status
 * @function getSubscriptionStatus
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Subscription status
 * @method GET
 * @example http://localhost:3001/api/v1/subscriptions/:userId
 */
export const getSubscriptionStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const subscription = await Subscription.findOne({ user: userId });

    if (!subscription) {
      return res.status(404).json({ message: "No subscription found" });
    }

    res.status(200).json({ subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving subscription status" });
  }
};