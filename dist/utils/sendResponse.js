"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResonse = (res, data) => {
    res.status(data.statusCode).json({
        success: data.success,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data,
    });
};
exports.default = sendResonse;
