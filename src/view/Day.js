import React, { useContext } from 'react';
import { Context } from '../context';
import { DAY_STATE_ACTIVE } from "../tools/constants";
import { styledDays } from "./styledDaysMap";

const Day = ({ data }) => {
    const { onDayClick } = useContext(Context);
    const days = styledDays();

    const dayClick = () => {
        if (data.state === DAY_STATE_ACTIVE && typeof onDayClick === 'function') {
            onDayClick(data.date, data.payload);
        }
    };

    return (
        <div className="col px-1">
            { (days.get(data.state))(data, dayClick) }
        </div>
    );
};

export default Day;