import dotenv from 'dotenv';
dotenv.config();
const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL
};

export default config;