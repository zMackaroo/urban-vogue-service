"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPostModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blogPostSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    isSaved: {
        type: Boolean,
        default: false,
    },
});
exports.blogPostModel = mongoose_1.default.model("blogposts", blogPostSchema);
