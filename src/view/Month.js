import React from 'react';
import Week from './Week';

const Month = ({ data }) => {
    return (
        <div>
            <div className="row no-gutters mb-3 text-xs text-muted text-center">
                <div className="col">ПН</div>
                <div className="col">ВТ</div>
                <div className="col">СР</div>
                <div className="col">ЧТ</div>
                <div className="col">ПТ</div>
                <div className="col">СБ</div>
                <div className="col">ВС</div>
            </div>
            { data[1].days.map((week, i) => (
                <Week key={ i } data={ week }/>
            )) }
        </div>
    );
};

export default Month;
