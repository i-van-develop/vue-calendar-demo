export const getDaysInMonth = (date) => {
    return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate();
};
export const createNextMonthDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1);
};
export const createPrevMonthDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth() - 1);
};
export const getFirstDayInMonth = (date) => {
    return (new Date(date.getFullYear(), date.getMonth())).getDay();
};