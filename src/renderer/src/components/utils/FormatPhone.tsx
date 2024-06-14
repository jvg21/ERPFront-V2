export const FormatPhone = (phone: string): string => {
    let cleanedPhone = phone.replace(/\D/g, '');

    if (cleanedPhone.length === 10) {
        return cleanedPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1)$2-$3');
    } else if (cleanedPhone.length === 11) {
        return cleanedPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
    } else {
        return phone;
    }
};