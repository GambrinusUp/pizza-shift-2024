export const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[1-9]\d{10}$/;
    return phoneRegex.test(phone);
};