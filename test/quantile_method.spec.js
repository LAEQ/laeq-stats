import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat } from '../index.js'

chai.use(chaiExclude);

describe('Statistic: quantile method with integer values', function() {
  describe('quantile with odd number of classe', function() {
    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([1,2,3,4,5])
      const result = new Stat([1,2,3,4,5]).quantile(3)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [{min: 0.99, max: 2}, {min: 2, max: 4}, {min:4, max:5.01}]
      );
    });

    it('Case: 6 values - 2 classes', function() {
      const stat = new Stat([1,2,3,4,5,6])
      const result = stat.quantile(2)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([
         { min: 0.99, max: 3 }, { min: 3, max: 6.01 }
       ])
    });

    it('Case: 11 values - 2 classes', function() {
      const stat = new Stat([1,2,3,4,5,6,7,8,9,10,11])
      const result = stat.quantile(2)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([
        { min: 0.99, max: 6 }, { min: 6, max: 11.01 }
      ])
    });

    it('Case: 16 values - 5 classes', function() {
      const stat = new Stat([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
      const result = stat.quantile(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([
          { min: 0.99, max: 4 },
          { min: 4, max: 7 },
          { min: 7, max: 10},
          { min: 10, max: 13 },
          { min: 13, max: 16.01 } ]
      )
    });
  });
});

describe('Statistic: quantile method with float values', function() {
  describe('quantile with odd number of classe', function() {
    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([0, 3.67,8.89,53.24], 'percent')
      const result = stat.quantile(3)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          { min: 0, max: 3.67},
          { min: 3.67, max: 8.89},
          { min: 8.89, max:53.25}
        ]
      );
    });

    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([2.34, 4.56, 6.78, 23.45, 34.98, 45.11, 67.89, 78.00, 83.45, 93.34, 100], 'percent')
      const result = stat.quantile(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          { min: 2.33, max: 6.78},
          { min: 6.78, max: 34.98},
          { min: 34.98, max: 67.89},
          {min: 67.89, max: 83.45},
          {min: 83.45, max: 100}
        ]
      );
    });
  });
});
