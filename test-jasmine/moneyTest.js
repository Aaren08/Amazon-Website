import { formatCurrency } from '../javascript-amazon-project/javascript-amazon-project-main/Scripts/utils/money.js';

// Test Suite

// We can also use describe inside describe.
describe('Test Suite: formatCurrnecy', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95')        // expect gives us objects
    }) 

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00')
    })

    it('rounds up to the nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })
}) 