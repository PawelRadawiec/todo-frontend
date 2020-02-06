
export class SystemUser {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    password: string;

    constructor(props = {}) {
        Object.assign(this, props);
    }
}