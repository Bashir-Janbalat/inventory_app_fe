export class TokenInvalidOrExpiredError extends Error {
    constructor(message = "Token expired") {
        super(message);
        this.name = "TokenInvalidOrExpiredError";
    }
}
