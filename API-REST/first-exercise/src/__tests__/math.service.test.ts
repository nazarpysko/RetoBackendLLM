import { increment, lcm, gcd } from "../services/math.services";

describe('Math Services', () => {

    describe('GCD (Greatest Common Divisor)', () => {
        it('should return 1 when numbers are coprime', () => {
            expect(gcd(8, 15)).toBe(1);
            expect(gcd(17, 4)).toBe(1);
        });

        it('should return the correct GCD when numbers share a divisor', () => {
            expect(gcd(12, 8)).toBe(4);
            expect(gcd(18, 24)).toBe(6);
            expect(gcd(0, 5)).toBe(5);  // edge case: GCD with zero
        });

        it('should handle GCD when one number is zero', () => {
            expect(gcd(0, 0)).toBe(0);
            expect(gcd(0, 7)).toBe(7);
        });
    });

    describe('LCM (Least Common Multiple)', () => {
        const testCases = [
            { input: [1, 2], expected: 2 },
            { input: [2, 3], expected: 6 },
            { input: [3, 4], expected: 12 },
            { input: [4, 5], expected: 20 },
            { input: [5, 6], expected: 30 },
            { input: [6, 7], expected: 42 },
            { input: [7, 8], expected: 56 },
            { input: [1, 2, 3], expected: 6 },
            { input: [2, 3, 4], expected: 12 },
            { input: [3, 4, 5], expected: 60 },
            { input: [4, 5, 6], expected: 60 },
            { input: [5, 6, 7], expected: 210 },
            { input: [1, 2, 3, 4], expected: 12 },
            { input: [2, 3, 4, 5], expected: 60 },
            { input: [3, 4, 5, 6], expected: 60 },
            { input: [4, 5, 6, 7], expected: 420 },
            { input: [1, 2, 3, 4, 5], expected: 60 },
            { input: [2, 3, 4, 5, 6], expected: 60 },
            { input: [3, 4, 5, 6, 7], expected: 420 },
            { input: [5, 10, 20], expected: 20 },
            { input: [0, 3, 4], expected: 0 }, // edge case with zero
        ];

        testCases.forEach(({ input, expected }) => {
            it(`should return ${expected} as the LCM of [${input.join(', ')}]`, () => {
                expect(lcm(input)).toBe(expected);
            });
        });

        it('should return 0 as LCM if all numbers are zero', () => {
            expect(lcm([0, 0, 0])).toBe(0);
        });

        it('should return 0 as LCM if the array is empty', () => {
            expect(lcm([])).toBe(0);
        });
    });

    describe('Increment', () => {
        it('should correctly increment positive numbers', () => {
            expect(increment(1)).toBe(2);
            expect(increment(99)).toBe(100);
        });

        it('should correctly increment zero', () => {
            expect(increment(0)).toBe(1);
        });

        it('should correctly increment negative numbers', () => {
            expect(increment(-5)).toBe(-4);
            expect(increment(-1)).toBe(0);
        });
    });
});
