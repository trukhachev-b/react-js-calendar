import React from 'react';
import Day from './Day';

const Week = ({ data }) => {
    return (
        <div className="row row-gutter-8 my-2">
            { data.map((day, i) => (
                <Day key={ i } data={ day }/>
            )) }
        </div>
    );
};

export default Week;
