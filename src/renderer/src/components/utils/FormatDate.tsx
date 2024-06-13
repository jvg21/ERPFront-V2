export const formatDateToISO = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

export function formatDate(date: Date, format: string): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    const normalizedFormat = format.toLowerCase().replace('dd', day).replace('mm', month).replace('yyyy', year);

    return normalizedFormat;
}