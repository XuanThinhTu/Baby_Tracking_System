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
    birthDay: string;
    gender: string;
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
