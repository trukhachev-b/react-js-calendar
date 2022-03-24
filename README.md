# react-js-calendar

Install
```
npm i react-js-calendar
```
or
```
yarn add react-js-calendar
```

### Get started
```javascript
import React from "react";
import Calendar from "react-js-calendar";

function App() {
    const INPUT_DATA = [
        {
            workingDay: true,
            date: '2022-01-26',
            times: []
        },
        {
            workingDay: true,
            date: '2022-02-25',
            times: [ 1, 2 ]
        }
    ];

    const dayClick = (day, payload) => {
        console.log(day, payload);
    };

    return <Calendar data={ INPUT_DATA } shiftToDate={ "2022-01" }  onDayClick={ dayClick }/>;
}
```