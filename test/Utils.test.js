import { ucfirst, calcParamsMatrix, getTitles, getKeyMonth } from "../src/tools/Utils";

describe('Utils:', () => {
    test('Test ucfirst', () => {
        expect(ucfirst('test')).toBe('Test');
    });

    test('Test calcParamsMatrix', () => {
        // expect(calcParamsMatrix(new Date('2022-01-10'))).toEqual([ 31, 5, 6, new Date('2021-12-26')]);
        // expect(calcParamsMatrix(new Date('2022-01-13'))).toEqual([ 31, 5, 6, new Date('2021-12-26')]);
    });

    test('Test getTitles', () => {
        const test = [
            [ "Январь", {} ],
            [ "Февраль", {} ],
        ];

        expect(getTitles(test)).toEqual([ "Январь", "Февраль" ]);
    });

    test('Test getKeyMonth', () => {
        expect(getKeyMonth(2021, new Date('2021-12-10'))).toBe("Декабрь");
        expect(getKeyMonth(2021, new Date('2022-01-10'))).toBe("Январь'22");
        expect(getKeyMonth(2022, new Date('2021-12-10'))).toBe("Декабрь'21");
        expect(getKeyMonth(2022, new Date('2022-01-10'))).toBe("Январь");
    });
});