const { Sequelize } = require('sequelize');;

const sequelize = new Sequelize(
  process.env.DATABASE_AI_HEART_DISEASES,
  process.env.DATABASE_APP_USER,
  process.env.DATABASE_APP_PASSWORD,
  {
    host: "database",
    dialect: "mysql",
    port: 3306,
  }
);

const connectDatabase = async (
  retries = 10,
  delay = 5000
) => {
  for (let i = 1; i <= retries; i++) {
    try {
      await sequelize.authenticate();
      // sequelize.sync({alter: true});
      sequelize.sync();
      console.log("Connection has been established successfully.");
      return;
    } catch (error) {
      console.error(
        `Connect fail lần ${i}/${retries}`
      );

      if (i === retries) {
        console.error("Hết số lần reconnect.");
        console.error(error);
        process.exit(1);
      }

      console.log(`Thử lại sau ${delay / 1000}s...`);

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }
};

module.exports = {
  connectDatabase,
  sequelize
}