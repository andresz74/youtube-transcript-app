const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  apiBaseUrl: isDevelopment
    ? 'https://192.168.1.181/api'  // In development, point to your Nginx server
    : '/api',  // In production, the same /api as Nginx will serve it
};

export default config;
