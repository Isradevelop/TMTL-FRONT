export const convertMonthNumericToMonth = (numericMonth) => {

    const date = new Date(numericMonth);

    const [  , month, ...rest] = date.toDateString().split(' ');

    return month;
}