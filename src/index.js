import React from 'react';
import { Calendar } from './Calendar';
import { ContextProvider } from './context';

export default function App({ data, shiftToDate, onDayClick }) {
    return (
        <ContextProvider value={ { onDayClick } }>
            <Calendar data={ data } shiftToDate={ shiftToDate } />
        </ContextProvider>
    );
}