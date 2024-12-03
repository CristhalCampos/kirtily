import axios from "axios";
import { config } from "dotenv";
config({ path: "./config/.env" });

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
  description: "Acceso completo a la red social Kirtily.",
  type: "SERVICE", // Tipo de producto
  category: "SOFTWARE", // Categoría
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

console.log("ID del Producto:", product.id);