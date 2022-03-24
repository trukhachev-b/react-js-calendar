import React from "react";

const Title = ({ titles, monthCount, activeMonth, setActiveMonth }) => {
    const turnMonth = direction => {
        if (direction === 'left') {
            if (activeMonth > 0) {
                setActiveMonth(activeMonth - 1);
            }
        } else {
            if (activeMonth < monthCount - 1) {
                setActiveMonth(activeMonth + 1);
            }
        }
    };

    const getClasses = direction => {
        let classes = 'btn btn-secondary px-2'
        if (direction === 'left') {
            if (activeMonth === 0) {
                classes += ' disabled'
            }
        } else {
            if (activeMonth === monthCount - 1) {
                classes += ' disabled'
            }
        }
        return classes
    };

    return (
        <div className="row no-gutters align-items-center mb-4">
            <div className="col-auto">
                <button className={ getClasses('left') } onClick={ () => turnMonth('left') }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                    <span className="sr-only">Предыдущий месяц</span>
                </button>
            </div>
            <div className="col px-3 text-lg text-center font-weight-medium">{ titles[activeMonth] }</div>
            <div className="col-auto">
                <button className={ getClasses('right') } onClick={ () => turnMonth('right') }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                    <span className="sr-only">Следующий месяц</span>
                </button>
            </div>
        </div>
    );
};

export default Title;