import React from "react";
import {DAY_STATE_ACTIVE, DAY_STATE_DISABLE, DAY_STATE_NOT_AVAILABLE} from "../tools/constants";

const notAvailableDay = day => {
    const classes = !day.today ? 'btn btn-lg btn-block disabled px-1' : 'btn btn-lg btn-block border-primary disabled px-1'
    return <div className={ classes }>{day.day}</div>;
};

const disableDay = day => {
    const classes = !day.today ? 'btn btn-lg btn-block bg-light disabled px-1' : 'btn btn-lg btn-block bg-light border-primary disabled px-1'
    return <div className={ classes }>{day.day}</div>;
};

const activeDay = (day, dayClick) => {
    const classes = !day.today ? 'btn btn-lg btn-block btn-primary-light px-1' : 'btn btn-lg btn-block btn-primary-light border-primary px-1'
    return (
        <button
            onClick={ dayClick }
            className={ classes }>
            { day.day }
        </button>
    );
};

export const styledDays = () => {
    const days = new Map();
    days.set(DAY_STATE_NOT_AVAILABLE, notAvailableDay);
    days.set(DAY_STATE_DISABLE, disableDay);
    days.set(DAY_STATE_ACTIVE, activeDay);
    return days;
};