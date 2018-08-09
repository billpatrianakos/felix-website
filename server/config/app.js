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
    },
    jwt: {
      secret: 'mOMkzwi(+OQ{y!qa%nR!2W|vZM?{C?=xK$;(iK,Q#z_USg{OW[59-i"/mx5enknXW,"f~@Eu?%,$Qm/hW?$EQ[k>qMkA`SOYt~o">FwvuZ~PQjb#/I+-oVoj9EmJ{}'
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
    },
    jwt: {
      secret: process.env.JWT_SECRET // https://www.grc.com/passwords.htm if you don't want to generate this yourself
    }
  }
};
