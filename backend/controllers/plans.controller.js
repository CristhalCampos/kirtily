import axios from "axios";
import { config } from "dotenv";
config({ path: "./config/.env" });

export const createPlans = async (req, res) => {
  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Obtén el token de acceso de PayPal
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

    // Datos comunes para ambos planes
    const product_id = "PROD-XXXXXX"; // Reemplaza con el ID del producto en PayPal
    const currency = "USD";

    // Define los planes
    const plans = [
      {
        name: "Premium Monthly Plan",
        description: "7-day free trial, then $5/month. Renew manually.",
        billing_cycles: [
          // Período de prueba gratuito
          {
            frequency: {
              interval_unit: "DAY",
              interval_count: 1,
            },
            tenure_type: "TRIAL",
            sequence: 1,
            total_cycles: 7,
            pricing_scheme: {
              fixed_price: {
                value: "0",
                currency_code: currency,
              },
            },
          },
          // Período regular
          {
            frequency: {
              interval_unit: "MONTH",
              interval_count: 1,
            },
            tenure_type: "REGULAR",
            sequence: 2,
            total_cycles: 1,
            pricing_scheme: {
              fixed_price: {
                value: "5",
                currency_code: currency,
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: false,
        },
        product_id,
      },
      {
        name: "Premium Yearly Plan",
        description: "7-day free trial, then $48/year. Renew manually.",
        billing_cycles: [
          // Período de prueba gratuito
          {
            frequency: {
              interval_unit: "DAY",
              interval_count: 1,
            },
            tenure_type: "TRIAL",
            sequence: 1,
            total_cycles: 7,
            pricing_scheme: {
              fixed_price: {
                value: "0",
                currency_code: currency,
              },
            },
          },
          // Período regular
          {
            frequency: {
              interval_unit: "YEAR",
              interval_count: 1,
            },
            tenure_type: "REGULAR",
            sequence: 2,
            total_cycles: 1,
            pricing_scheme: {
              fixed_price: {
                value: "48",
                currency_code: currency,
              },
            },
          },
        ],
        payment_preferences: {
          auto_bill_outstanding: false,
        },
        product_id,
      },
    ];

    // Crear ambos planes en PayPal
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