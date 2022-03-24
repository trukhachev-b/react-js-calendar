export function ucfirst(str) {
    return `${ str.charAt(0).toUpperCase() }${ str.slice(1) }`;
}

export function calcParamsMatrix(date) {
    // количество дней в указанном месяце
    const countDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // индекс первого дня в неделе указанного месяца
    const indexOfFirstDay = (new Date(date.getFullYear(), date.getMonth(), 1).getDay()) - 1;
    // высота массива
    const heightArray = Math.floor((countDays + indexOfFirstDay) / 7) + Number(((countDays + indexOfFirstDay) % 7) > 0);
    // количество дней в предыдущем месяце
    const lastDayPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    // день, с которого начинается отсчет
    const startMonth = indexOfFirstDay > 0 ? (new Date(date.setMonth(date.getMonth()-1))) : (new Date(date));
    const startDay = new Date(startMonth.getFullYear(), startMonth.getMonth(), lastDayPrevMonth - indexOfFirstDay + 1);

    return [
        countDays,
        indexOfFirstDay,
        heightArray,
        startDay
    ];
}

export function getTitles(data) {
    return data.reduce((arr, el) => {
        arr.push(el[0]);
        return arr;
    }, []);
}

export function getKeyMonth(currentYear, date) {
    const strMonth = date.toLocaleDateString('ru-RU', { month: 'long' });
    let keyMonth = ucfirst(strMonth);
    if (currentYear !== date.getFullYear()) {
        keyMonth += `'${ date.getFullYear().toString().slice(2, 4) }`;
    }
    return keyMonth;
}
