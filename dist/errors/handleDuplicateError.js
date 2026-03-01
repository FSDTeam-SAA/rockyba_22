"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (error) => {
    const match = error === null || error === void 0 ? void 0 : error.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorSource = [
        {
            path: "",
            message: `${extractedMessage} is already exist`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Duplicate name error",
        errorSource,
    };
};
exports.default = handleDuplicateError;
