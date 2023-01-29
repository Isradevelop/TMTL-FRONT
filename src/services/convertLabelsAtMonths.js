
//esta funcion recibe un array de meses como numeros('01'), y los convierte a meses en palabras ('Jan')
export const convertLabelsAtMonths = (labels = []) => {
    
    let months= [];

    labels.forEach((label) => {
        let date = new Date(label);

        let [ day , month, ...rest] = date.toDateString().split(' ');

        months.push(month);
    })

    return months;


}