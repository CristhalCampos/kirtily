import axios from "axios";
import { config } from "dotenv";
config({ path: "./config/.env" });

/**
 * @description Create a product in PayPal
 * @route POST /api/v1/products
 * @access Public
 * @function createProduct
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} - Created product
 */
export const createProduct = async (req, res) => {
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
  const productData = {
    name: "Plan Premium",
    description: "Full access to the social network",
    type: "SERVICE",
    category: "SOFTWARE",
  };

  const { data: product } = await axios.post(
    `${process.env.PAYPAL_API}/v1/catalogs/products`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("Product ID:", product.id);
  res.status(201).json({ message: `Product created: ${product.id}` });
}