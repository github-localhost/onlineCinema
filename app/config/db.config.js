module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "editus261717",
  DB: "movies",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
