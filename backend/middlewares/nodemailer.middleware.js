import nodemailer from "nodemailer";
import { config } from "dotenv";
config({ path: "./config/.env" });

/**
 * @description Transporter for nodemailer
 * @host {String} process.env.EMAIL_HOST
 * @port {String} process.env.EMAIL_PORT
 * @secure {Boolean} false
 * @user {String} process.env.EMAIL_USER
 * @pass {String} process.env.EMAIL_PASS
 */
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Change to true if you use SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});