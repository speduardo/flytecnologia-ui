export class FlyNotAuthenticatedError extends Error {
    constructor(message?: string) {
        super(message);

        Object.setPrototypeOf(this, FlyNotAuthenticatedError.prototype);
    }
}
