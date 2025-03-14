export type ValidationRules = {
    [key: string]: ("blank" | "number" | "email")[];
};

type ValidationErrors = {
    [key: string]: string;
};

export const validateForm = (formData: { [key: string]: any }, rules: ValidationRules): ValidationErrors => {
    let errors: ValidationErrors = {};

    for (const field in rules) {
        for (const rule of rules[field]) {
            if (rule === "blank" && (!formData[field] || formData[field].trim() === "")) {
                errors[field] = `${field} is required`;
            }
            if (rule === "number" && isNaN(Number(formData[field]))) {
                errors[field] = `${field} must be a number`;
            }
            if (rule === "email" && !/\S+@\S+\.\S+/.test(formData[field])) {
                errors[field] = `${field} is not a valid email`;
            }
        }
    }

    return errors;
};
