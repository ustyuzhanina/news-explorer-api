require('dotenv').config();

const { NODE_ENV, DB_HIDDEN } = process.env;

const dataBase = NODE_ENV === 'production' ? DB_HIDDEN : 'mongodb://localhost:27017/news-explorer-api-DB';

const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  dataBase,
  dbOptions,
};
