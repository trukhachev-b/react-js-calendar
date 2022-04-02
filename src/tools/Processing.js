import { getKeyMonth, padZero } from './Utils';
import MonthStructure from './MonthStructure';

export const dataProcessing = (data) => {
    let monthArray = [];
    try {
        const currentYear = (new Date()).getFullYear();

        // заполняем пропущенные месяцы
        const arrForGenerateEmptyMonth = generateArrMonth(data);

        // наполняем месяцы
        const monthMap = new Map();
        for (const item of arrForGenerateEmptyMonth) {
            const date = new Date(item);
            const keyMonth = getKeyMonth(currentYear, date);
            const m = addMonth(date);
            monthMap.set(keyMonth, m);
        }

        // проставляем активные дни
        for (const item of data) {
            const date = new Date(item.date);
            const keyMonth = getKeyMonth(currentYear, date);
            const m = monthMap.get(keyMonth);
            m.addDay(date, item);
        }

        // чистим служебные данные
        monthArray = Array.from(monthMap);
        monthArray.map(el => {
            el[1].processDays();
            delete el[1].daysTemp;
        });
    } catch (err) {
        console.warn(err);
    }

    return monthArray;
};

const addMonth = (date) => {
    const m = new MonthStructure();
    m.init(date);
    return m;
};

export const generateArrMonth = (data) => {
    const month = [];
    const tmp = [];
    data.forEach(el => {
        tmp.push(el.date);
    });

    tmp.sort();
    if (tmp.length > 1) {
        const firstYear = (new Date(tmp[0])).getFullYear();
        const firstMonth = (new Date(tmp[0])).getMonth() + 1;
        const lastYear = (new Date(tmp[tmp.length - 1])).getFullYear();
        const lastMonth = (new Date(tmp[tmp.length - 1])).getMonth() + 1;

        for (let y = firstYear; y <= lastYear; y++) {
            let startM = 1;
            let endM = 12;
            if (y === firstYear) {
                startM = firstMonth;
            }
            if (y === lastYear) {
                endM = lastMonth;
            }
            for (let m = startM; m <= endM; m++) {
                month.push(`${ y }-${ padZero(m) }-01`);
            }
        }
    } else {
        month.push(tmp[0]);
    }

    return month;
};

