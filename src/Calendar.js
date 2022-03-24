import React, { Fragment, useMemo, useState } from 'react';
import { dataProcessing } from './tools/Processing';
import { getTitles, getKeyMonth } from "./tools/Utils";
import Title from './view/Title';
import Month from './view/Month';

export const Calendar = ({ data, shiftToDate }) => {
    const calendar = useMemo(() => dataProcessing(data), [ data ]);
    const titles = getTitles(calendar);
    const monthCount = calendar.length;

    let initActiveMonth = 0;
    if (typeof shiftToDate === 'string') {
        try {
            const keyMonthArray = getKeyMonth((new Date()).getFullYear(), (new Date(shiftToDate)));
            initActiveMonth = calendar.findIndex(el => el[0] === keyMonthArray);
        } catch (err) {
            console.warn(err);
        }
    }

    const [ activeMonth, setActiveMonth ] = useState(initActiveMonth);

    return (
        <div id="calendar" className="my-4">
            { !!monthCount &&
                <Fragment>
                    <Title titles={ titles } monthCount={ monthCount } activeMonth={ activeMonth }
                           setActiveMonth={ setActiveMonth }/>
                    <Month data={ calendar[activeMonth] }/>
                </Fragment>
            }
        </div>
    );
};


