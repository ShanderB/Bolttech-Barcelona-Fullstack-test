import { calculateCarPrices, getSeason, parseDatesAndSeason } from '../src/shared/Utils';

describe('Utils', () => {
    describe('calculateCarPrices', () => {
        it('should calculate total prices for cars based on season and rental period', () => {
            const cars = [
                {
                    _id: '1',
                    brand: 'Toyota',
                    model: 'Yaris',
                    stock: 3,
                    prices: { peak: 100, mid: 80, off: 60 },
                },
            ];
            const season = 'peak';
            const start = new Date('2025-06-01');
            const end = new Date('2025-06-05');

            const result = calculateCarPrices(cars, season, start, end);

            expect(result).toEqual([
                {
                    _id: '1',
                    brand: 'Toyota',
                    model: 'Yaris',
                    stock: true,
                    price: 100,
                    totalPrice: 500, // 5 days * 100
                },
            ]);
        });

        it('should return 0 price if season price is not defined', () => {
            const cars = [
                {
                    _id: '1',
                    brand: 'Toyota',
                    model: 'Yaris',
                    stock: 3,
                    prices: {},
                },
            ];
            const season = 'peak';
            const start = new Date('2025-06-01');
            const end = new Date('2025-06-05');

            const result = calculateCarPrices(cars, season, start, end);

            expect(result).toEqual([
                {
                    _id: '1',
                    brand: 'Toyota',
                    model: 'Yaris',
                    stock: true,
                    price: 0,
                    totalPrice: 0,
                },
            ]);
        });
    });

    describe('getSeason', () => {
        it('should return "peak" for dates in the peak season', () => {
            const date = new Date('2025-07-15');
            expect(getSeason(date)).toBe('peak');
        });

        it('should return "mid" for dates in the mid season', () => {
            const date = new Date('2025-09-20');
            expect(getSeason(date)).toBe('mid');
        });

        it('should return "off" for dates in the off season', () => {
            const date = new Date('2025-01-15');
            expect(getSeason(date)).toBe('off');
        });
    });

    describe('parseDatesAndSeason', () => {
        it('should parse dates and return the correct season', () => {
            const startDate = '2025-06-01';
            const endDate = '2025-06-10';

            const result = parseDatesAndSeason(startDate, endDate);

            expect(result).toEqual({
                start: new Date('2025-06-01'),
                end: new Date('2025-06-10'),
                season: 'peak',
            });
        });

        it('should throw an error if start date is greater than end date', () => {
            const startDate = '2025-06-10';
            const endDate = '2025-06-01';

            expect(() => parseDatesAndSeason(startDate, endDate)).toThrow(
                'Start date cannot be greater than end date'
            );
        });
    });
});