"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = exports.Create = void 0;
exports.updateBlogPost = updateBlogPost;
exports.deleteBlogPost = deleteBlogPost;
const blogPosts_schema_1 = require("../Schema/blogPosts.schema");
function getAllBlogPost(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const blogPosts = yield blogPosts_schema_1.blogPostModel.find().sort({ date: -1 });
        return response.status(200).send(blogPosts);
    });
}
function getBlogPostById(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = request.params;
        if (id === "" || id === undefined) {
            return response.status(400).send({ message: "Invalid id" });
        }
        const blogPosts = yield blogPosts_schema_1.blogPostModel.findOne({ _id: id });
        return response.status(200).send(blogPosts);
    });
}
function validateBlogPostRequest(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = request;
        // Create logic for validating token
        if ((body === null || body === void 0 ? void 0 : body.title) === "" ||
            (body === null || body === void 0 ? void 0 : body.description) === "" ||
            (body === null || body === void 0 ? void 0 : body.imageLink) === "" ||
            (body === null || body === void 0 ? void 0 : body.date) === "" ||
            (body === null || body === void 0 ? void 0 : body.content) === "") {
            return response
                .status(400)
                .json({ message: "Invalid payload check required fields" });
        }
        const isExisting = yield blogPosts_schema_1.blogPostModel.findOne({ title: body === null || body === void 0 ? void 0 : body.title });
        if (isExisting) {
            const updateExisting = yield blogPosts_schema_1.blogPostModel.updateOne({ _id: isExisting._id }, Object.assign({}, body));
            if (updateExisting) {
                return response.sendStatus(200);
            }
            else {
                return response.sendStatus(400);
            }
        }
        next();
    });
}
function storeBlogPost(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const { body } = request;
        yield blogPosts_schema_1.blogPostModel.create({
            title: body === null || body === void 0 ? void 0 : body.title,
            description: body === null || body === void 0 ? void 0 : body.description,
            imageLink: body === null || body === void 0 ? void 0 : body.imageLink,
            date: body === null || body === void 0 ? void 0 : body.date,
            content: body === null || body === void 0 ? void 0 : body.content,
        });
        return response.sendStatus(200);
    });
}
function updateBlogPost(request, response, next) {
    response.send("Update");
}
function deleteBlogPost(request, response, next) {
    response.send("Delete");
}
exports.Create = {
    validate: validateBlogPostRequest,
    store: storeBlogPost,
};
exports.Get = {
    getAll: getAllBlogPost,
    getById: getBlogPostById,
};
