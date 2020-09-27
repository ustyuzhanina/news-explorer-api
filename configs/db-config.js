require('dotenv').config();

const { NODE_ENV, DB_HIDDEN } = process.env;

const dataBase = NODE_ENV !== 'production' ? 'mongodb://localhost:27017/news-explorer-api-DB' : DB_HIDDEN;

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
