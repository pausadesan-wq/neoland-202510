export class ValidationError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export class ExistenceError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export class DuplicityError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export class CredentialError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export class OwnershipError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export class AuthError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export class SystemError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
    }
}

export const errorMap = {
    ValidationError,
    ExistenceError,
    DuplicityError,
    CredentialError,
    OwnershipError,
    AuthError,
    SystemError
}