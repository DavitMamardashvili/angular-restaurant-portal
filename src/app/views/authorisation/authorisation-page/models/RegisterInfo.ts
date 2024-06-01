export class RegisterInfo {
    firstName!: string;
    lastName!: string;
    email!: string;


    constructor(data: any) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
    }
}