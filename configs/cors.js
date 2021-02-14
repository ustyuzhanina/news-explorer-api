const CORS_ORIGINS = ['https://ustyuzhanina.github.io', 'https://news4u.xyz', 'http://news4u.xyz', 'http://localhost:8080'];

module.exports.corsOptions = {
  origin: CORS_ORIGINS,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
  ],
  credentials: true,
};
