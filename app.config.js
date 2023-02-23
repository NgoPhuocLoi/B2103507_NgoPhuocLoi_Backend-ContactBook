const config = {
  app: {
    PORT: process.env.PORT || 5000,
  },
  db: {
    uri: process.env.MONGODB_URI,
  },
};

module.exports = config;
