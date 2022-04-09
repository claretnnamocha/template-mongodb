import mongoose from "mongoose";
import { dbURL } from "./env";

const seed = async (models: any) => {
  console.log("DB cleared");

  await models.User.create({
    email: "devclareo@gmail.com",
    firstname: "Claret",
    lastname: "Nnamocha",
    password: "Password123!",
    roles: "super-admin",
    verifiedemail: true,
  });

  // todo: plant other db seeds 😎

  console.log("Seeded");
};

export const authenticate = ({ clear = false }) => {
  mongoose
    .connect(dbURL)
    .then(async () => {
      console.log("Connection to Database has been established successfully.");
      const models = require("../models");
      for (const schema in models)
        mongoose.model(schema).syncIndexes({ clear });
      if (clear) await seed(models);
      console.log("Migrated");
    })
    .catch((error) =>
      console.error(`Unable to connect to the database: ${error.message}`)
    );
};
