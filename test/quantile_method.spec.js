import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import {Stat} from '../index.js'

chai.use(chaiExclude);

describe('Statistic: quantile method with integer values', function () {
    describe('quantile with odd number of classe', function () {
        it('Case: 5 values - 3 classes', function () {
            const stat = new Stat([1, 2, 3, 4, 5], 0)
            const result = stat.quantile(3)
            chai.expect(result).to.deep.equal(
                [{min: 1, max: 2}, {min: 3, max: 4}, {min: 5, max: 5}]
            );
        });

        it('Case: 6 values - 2 classes', function () {
            const stat = new Stat([1, 2, 3, 4, 5, 6], 0)
            const result = stat.quantile(2)
            chai.expect(result).excluding('roundStrategy').to.deep.equal([
                {min: 1, max: 3}, {min: 4, max: 6}
            ])
        });

        it('Case: 11 values - 2 classes', function () {
            const stat = new Stat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 0)
            const result = stat.quantile(2)
            chai.expect(result).excluding('roundStrategy').to.deep.equal([
                {min: 1, max: 6}, {min: 7, max: 11}
            ])
        });

        it('Case: 16 values - 5 classes', function () {
            const stat = new Stat([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], 0)
            const result = stat.quantile(5)
            chai.expect(result).to.deep.equal([
                {min: 1, max: 4},
                {min: 5, max: 7},
                {min: 8, max: 10},
                {min: 11, max: 13},
                {min: 14, max: 16}]
            )
        });
    });
});

describe('Statistic: quantile method with float values', function () {
    describe('quantile with odd number of classe', function () {
        it('Case: 5 values - 3 classes', function () {
            const stat = new Stat([0, 3.67, 8.89, 53.24],  2)
            const result = stat.quantile(3)
            chai.expect(result).to.deep.equal(
                [
                    {min: 0, max: 3.67},
                    {min: 3.68, max: 8.89},
                    {min: 8.90, max: 53.24}
                ]
            );
        });

        it('Case: 5 values - 3 classes', function () {
            const stat = new Stat([2.34, 4.56, 6.78, 23.45, 34.98, 45.11, 67.89, 78.00, 83.45, 93.34, 100], 2)
            const result = stat.quantile(5)
            chai.expect(result).to.deep.equal(
                [
                    {min: 2.34, max: 6.78},
                    {min: 6.79, max: 34.97},
                    {min: 34.98, max: 67.89},
                    {min: 67.9, max: 83.45},
                    {min: 83.46, max: 100}
                ]
            );
        });
        it('Case: 5 values - 3 classes - 1 decimal', function () {
            const stat = new Stat([2.34, 4.56, 6.78, 23.45, 34.98, 45.11, 67.89, 78.00, 83.45, 93.34, 98.34], 1)
            const result = stat.quantile(5)

            chai.expect(result).to.deep.equal(
                [
                    {min: 2.3, max: 6.7},
                    {min: 6.8, max: 34.9},
                    {min: 35, max: 67.8},
                    {min: 67.9, max: 83.4},
                    {min: 83.5, max: 98.3}
                ]
            );
        });

        it('Case: 5 values - 3 classes - 1 decimal', function () {
            const stat = new Stat([2, 4, 6, 7, 9, 11, 15, 17, 23, 56, 78, 45], 1)
            const result = stat.quantile(5)
            chai.expect(result).to.deep.equal(
                [
                    {min: 2, max: 6},
                    {min: 6.1, max: 9},
                    {min: 9.1, max: 17},
                    {min: 17.1, max: 45},
                    {min: 45.1, max: 78}
                ]
            );
        });
    });
});
