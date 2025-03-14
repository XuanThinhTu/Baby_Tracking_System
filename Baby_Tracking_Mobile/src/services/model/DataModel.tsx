interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

interface Child {
    id: string;
    name: string;
    height: string;
    weight: string;
    headCircumference: string;
    measuredAt: string;
    birthDate: string;
    gender: string;
}

interface MembershipPlansResponse {
    id: string,
    name: string,
    description: string,
    price: string,
    duration: string,
    permissions: []
}

interface ServerResponse {
    data: any,
    success: boolean,
    message: string
}

interface loginUser {
    email: string,
    password: string,
}
