import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let attempts = 1;

export async function MongoDB() {
  await mongoose
    .connect(
      "mongodb+srv://zmackaroo:Sep09051997!!@urbanvogue.erin2.mongodb.net/?retryWrites=true&w=majority&appName=urbanvogue"
    )
    .then((res) => {
      console.log(res.connection.host);
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
}

export async function RunConnection() {
  await mongoose.connect(`${process.env.MONGO_URL}`);
}
