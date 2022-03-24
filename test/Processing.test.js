import { CORRECT_RESULT_FOR_CALENDAR } from "./correctResultsForTest";
import { dataProcessing, generateArrMonth } from "../src/tools/Processing";

describe('Calendar:', () => {
    test('Test generate month', () => {
        const test = [
            { date: '2021.12.26' },
            { date: '2022/02/25' }
        ];

        expect(generateArrMonth(test)).toEqual(['2021-12-1','2022-1-1','2022-2-1']);
    });

    test('Test generate array', () => {
        const test = [
            { date: '2022-01-26', workingDay: true, times: [] },
            { date: '2022-02-25', workingDay: true, times: [ 1, 2 ] }
        ];

        const test_ = [
            { date: '2021.12.26' },
            { date: '2022/02/25' }
        ];

        expect(dataProcessing(test)).toEqual(CORRECT_RESULT_FOR_CALENDAR);
        expect(dataProcessing(test_).length).toBe(3);
    });
})
