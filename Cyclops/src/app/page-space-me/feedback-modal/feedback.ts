export class Feedback {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    email: string;
    agree: boolean;
    contactType: string;
    content: string;
}

export const ContactType = ['Phone', 'Email', 'Both'];