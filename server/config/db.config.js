module.exports = {
  HOST: "metacare.cljz5lgbjwxp.us-east-2.rds.amazonaws.com",
  PASSWORD: "Admin12345.",
  DB: "postgres",
  USER: "postgres",
  port: "5432",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  ssl: true,
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
  }
};