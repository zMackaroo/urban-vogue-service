import mongoose from "mongoose";

let attempts = 1;

export const MongoDB = () => {
  mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      if (attempts <= 3) {
        console.log(
          `${attempts}/3 Failed to connect, attempting to re-connect...`
        );
        MongoDB();
      } else {
        console.log(
          `Failed to establish connection with MongoDB <error>: ${err}`
        );
      }
      attempts = attempts + 1;
    });
};
