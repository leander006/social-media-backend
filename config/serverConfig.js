require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  NODE_ENV: process.env.NODE_ENV,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  SESSION: process.env.SESSION,
  KEY: process.env.KEY,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  BASE_URL: process.env.BASE_URL,
  HOST: process.env.HOST,
  SERVICE: process.env.SERVICE,
  EMAIL_PORT: process.env.EMAIL_PORT,
  SECURE: process.env.SECURE,
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  CLIENT_URL: process.env.CLIENT_URL,
  SERVER_URL: process.env.SERVER_URL,
  URL:process.env.URL
};
