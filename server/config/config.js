// Server configs for all environments
// ===================================
module.exports = {
  development: {
    session: {
      secret: 'TODO: changeMeChangeMeChangeMe',
      cookie: {
        secure: false,
        maxAge: 86400000
      },
      resave: true,
      saveUninitialized: false,
      rolling: false
    }
  },
  production: {
    session: {
      secret: process.env.SESSION_SECRET,
      cookie: {
        secure: true,
        maxAge: 86400000
      },
      resave: false,
      saveUninitialized: false,
      rolling: false
    }
  }
};
