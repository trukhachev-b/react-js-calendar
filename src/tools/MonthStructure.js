import {
    DAY_STATE_NOT_AVAILABLE,
    DAY_STATE_DISABLE,
    DAY_STATE_ACTIVE
} from "./constants";
import { calcParamsMatrix } from './Utils';

function MonthStructure() {
    this.days = [];
    this.daysTemp = [];
}

MonthStructure.prototype.init = function (date) {
    const [ countDays, indexOfFirstDay, heightArray, startDay ] = calcParamsMatrix(date);
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

    for (let i = 0; i < heightArray; i++) {
        this.days.push(Array(7));
    }

    for (let i = 0; i < (7 * heightArray); i++) {
        const nextDay = new Date(startDay);
        nextDay.setDate(startDay.getDate() + i);

        let day = {
            state: DAY_STATE_NOT_AVAILABLE,
            today: Boolean(today.getTime() === nextDay.getTime()),
            date: `${ nextDay.getFullYear() }-${ nextDay.getMonth() + 1 }-${ nextDay.getDate() }`,
            day: nextDay.getDate(),
            payload: null
        };

        if ((i >= indexOfFirstDay) && (i <= (indexOfFirstDay + countDays - 1))) {
            day.state = DAY_STATE_DISABLE;
        }

        this.daysTemp.push(day);
    }
};

MonthStructure.prototype.addDay = function (date, payload = null) {
    const dayNum = date.getDate();
    const i = this.daysTemp.findIndex(el => (el.state === DAY_STATE_DISABLE && el.day === dayNum));
    this.daysTemp[i].state = DAY_STATE_ACTIVE;
    this.daysTemp[i].date = `${ date.getFullYear() }-${ date.getMonth() + 1 }-${ date.getDate() }`;
    this.daysTemp[i].payload = payload;
};

MonthStructure.prototype.processDays = function () {
    let k = 0;
    for (let i = 0; i < this.days.length; i++) {
        for (let j = 0; j < 7; j++) {
            this.days[i][j] = this.daysTemp[k];
            k++;
        }
    }
};

export default MonthStructure;
