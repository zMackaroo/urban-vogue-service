"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogPost_1 = __importDefault(require("./blogPost"));
const auth_1 = __importDefault(require("./auth"));
const router = (0, express_1.Router)();
router.use(blogPost_1.default);
router.use(auth_1.default);
exports.default = router;
