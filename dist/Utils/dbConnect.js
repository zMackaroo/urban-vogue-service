"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
let attempts = 1;
const MongoDB = () => {
    mongoose_1.default
        .connect(`${process.env.MONGO_URL}`)
        .then(() => {
        console.log("Connected to MongoDB");
    })
        .catch((err) => {
        if (attempts <= 3) {
            console.log(`${attempts}/3 Failed to connect, attempting to re-connect...`);
            (0, exports.MongoDB)();
        }
        else {
            console.log(`Failed to establish connection with MongoDB <error>: ${err}`);
        }
        attempts = attempts + 1;
    });
};
exports.MongoDB = MongoDB;
