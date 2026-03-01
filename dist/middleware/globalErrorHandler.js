"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const globalErrorHandler = (error, req, res, next) => {
    // setting default status code and message
    let statusCode = 500;
    let message = "Something went wrong";
    let errorSource = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    // checking it's zod error and mongoose validation error ->
    if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    } //TODO : Mongoose validation error ->
    else if ((error === null || error === void 0 ? void 0 : error.name) === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    } //TODO : when we get any data from database with error handling ->
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    } //TODO : Checking duplicate name error ->
    else if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(error);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorSource = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSource;
    } //TODO : AppError custom error handling ->
    else if (error instanceof AppError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorSource = [
            {
                path: "",
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    } //TODO : unknown error handling ->
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorSource = [
            {
                path: "",
                message: error === null || error === void 0 ? void 0 : error.message,
            },
        ];
    }
    // ultimate return
    res.status(statusCode).json({
        success: false,
        message: message,
        errorSource,
        error,
        stack: config_1.default.nodeEnv === "development" ? error.stack : null,
    });
};
exports.default = globalErrorHandler;
