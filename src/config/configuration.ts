export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseSQL: {
    type: process.env.DATABASESQL_TYPE || 'postgres',
    host: process.env.DATABASESQL_HOST || 'localhost',
    port: process.env.DATABASESQL_PORT || 5432,
    username: process.env.DATABASESQL_USERNAME || 'myuser',
    password: process.env.DATABASESQL_PASSWORD || 'mypassword',
    database: process.env.DATABASESQL_NAME || 'mydatabase',
  },
  mongoose: {
    uri:
      process.env.MONGOOSE_URI ||
      'mongodb://mongoadmin:mongopassword@localhost:27017/',
  },
});
