"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = exports.ResponseError = void 0;
class ResponseError extends Error {
    constructor(code, reason) {
        super(reason);
        this.statusCode = code;
    }
}
exports.ResponseError = ResponseError;
class AuthorizationError extends ResponseError {
    constructor(reason = 'Unauthorized') {
        super(401, reason);
    }
    static reject(reason) {
        return Promise.reject(new this(reason));
    }
}
exports.AuthorizationError = AuthorizationError;
//# sourceMappingURL=ResErrors.js.map