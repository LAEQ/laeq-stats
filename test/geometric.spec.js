import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import {Stat} from '../index.js'

chai.use(chaiExclude);

describe('Statistic: geometric', function () {
    describe('Test geometric discretisation', function () {
        it('Case: integer values 5 classes', function () {
            const stat = new Stat([2, 5, 12, 24, 35, 123, 234, 456, 567, 678, 789], 0)
            const result = stat.geometric(5)

            chai.expect(result).to.deep.equal(
                [
                    {min: 2, max: 7},
                    {min: 8, max: 23},
                    {min: 24, max: 76},
                    {min: 77, max: 251},
                    {min: 252, max: 789}
                ]
            );
        });
    });

    describe('Test geometric discretisation', function () {
        xit('Case: float values 5 classes', function () {
            const stat = new Stat([2.34, 5.56, 12.334, 24.356, 35.789, 123.234, 234.567, 456.123, 567], 3)
            const result = stat.geometric(6)

            chai.expect(result).to.deep.equal(
                [
                    {min: 2.34, max: 5.843},
                    {min: 5.844, max: 14.589},
                    {min: 14.59, max: 36.427},
                    {min: 36.428, max: 90.953},
                    {min: 90.954, max: 227.097},
                    {min: 227.098, max: 567}
                ]
            );
        });
    });
})


