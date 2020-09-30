export default {
  jwt: {
    secret: process.env.APP_SECRET,
    expiresIn: '1d',
  },
};

// secret para o autenticacao JWT
