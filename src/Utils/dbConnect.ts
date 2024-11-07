import mongoose from "mongoose";

let attempts = 1;

export const MongoDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://zmackaroo:Sep09051997!!@urbanvogue.erin2.mongodb.net/fad-blog"
    )
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
