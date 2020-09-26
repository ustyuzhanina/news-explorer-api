const dataBase = 'mongodb://localhost:27017/news-explorer-api-DB';

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
