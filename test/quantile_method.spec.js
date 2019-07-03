import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat } from '../index.js'

describe('Statistic: quantile method with integer values', function() {
  describe('quantile with odd number of classe', function() {
    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([1,2,3,4,5])
      const result = new Stat([1,2,3,4,5]).quantile(3)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([{min: 0.99, max: 2.5}, {min: 2.5, max: 4.5}, {min:4.5, max:5.01}]);
    });

    it('Case: 6 values - 2 classes', function() {
      const stat = new Stat([1,2,3,4,5,6])
      const result = stat.quantile(2)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([ { min: 0.99, max: 3.5 }, { min: 3.5, max: 6.01 } ])
    });

    it('Case: 11 values - 2 classes ', function() {
      const stat = new Stat([1,2,3,4,5,6,7,8,9,10,11])
      const result = stat.quantile(2)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([ { min: 0.99, max: 6.5 }, { min: 6.5, max: 11.01 } ])
    });

    it('Case: 16 values - 5 classes ', function() {
      const stat = new Stat([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
      const result = stat.quantile(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([
          { min: 0.99, max: 3.5 },
          { min: 3.5, max: 6.5 },
          { min: 6.5, max: 9.5 },
          { min: 9.5, max: 12.5 },
          { min: 12.5, max: 16.01 } ]
      )
    });
  });
});

describe('Statistic: quantile method with float values', function() {
  describe('quantile with odd number of classe', function() {
    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([1.23,3.67,8.89,53.24], 'percent')
      const result = stat.quantile(3)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          { min: 1.22, max: 2.45},
          { min: 2.45, max: 6.28},
          { min:6.28, max:53.25}
        ]
      );
    });

    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([2.34, 4.56, 6.78, 23.45, 34.98, 45.11, 67.89, 78.00, 83.45, 93.34, 100], 'percent')
      const result = stat.quantile(5)
      const minValues = result.map(c => {return c.min.toFixed(2)})
      chai.expect(minValues).to.deep.equal(["2.33", "5.67", "29.21", "56.50", "80.72"])

      const maxValues = result.map(c => {return c.max.toFixed(2)})
      chai.expect(maxValues).to.deep.equal(["5.67", "29.21", "56.50", "80.72", "100.00"])
    });
  });
});
