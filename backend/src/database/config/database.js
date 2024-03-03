require("dotenv").config();

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE, POSTGRES_HOST } =
  process.env;

module.exports = {
  dialect: "postgres",
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};
