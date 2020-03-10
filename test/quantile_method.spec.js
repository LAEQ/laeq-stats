import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat } from '../index.js'

chai.use(chaiExclude);

describe('Statistic: quantile method with integer values', function() {
  describe('quantile with odd number of classe', function() {
    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([1,2,3,4,5], 'discrete',0)
      const result = stat.quantile(3)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [{min: 1, max: 2}, {min: 2, max: 4}, {min:4, max:5}]
      );
    });

    it('Case: 6 values - 2 classes', function() {
      const stat = new Stat([1,2,3,4,5,6], 'discrete', 0)
      const result = stat.quantile(2)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([
         { min: 1, max: 3 }, { min: 3, max: 6 }
       ])
    });

    it('Case: 11 values - 2 classes', function() {
      const stat = new Stat([1,2,3,4,5,6,7,8,9,10,11], 'discrete', 0)
      const result = stat.quantile(2)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([
        { min: 1, max: 6 }, { min: 6, max: 11}
      ])
    });

    it('Case: 16 values - 5 classes', function() {
      const stat = new Stat([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], 'discrete', 0)
      const result = stat.quantile(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal([
          { min: 1, max: 4 },
          { min: 4, max: 7 },
          { min: 7, max: 10},
          { min: 10, max: 13 },
          { min: 13, max: 16 } ]
      )
    });
  });
});

describe('Statistic: quantile method with float values', function() {
  describe('quantile with odd number of classe', function() {
    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([0, 3.67,8.89,53.24], 'percent', 2)
      const result = stat.quantile(3)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          { min: 0, max: 3.66},
          { min: 3.67, max: 8.88},
          { min: 8.89, max:53.24}
        ]
      );
    });

    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([2.34, 4.56, 6.78, 23.45, 34.98, 45.11, 67.89, 78.00, 83.45, 93.34, 100], 'percent', 2)
      const result = stat.quantile(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          { min: 2.34, max: 6.77},
          { min: 6.78, max: 34.97},
          { min: 34.98, max: 67.88},
          {min: 67.89, max: 83.44},
          {min: 83.45, max: 100}
        ]
      );
    });
    it('Case: 5 values - 3 classes - 1 decimal', function() {
          const stat = new Stat([2.34, 4.56, 6.78, 23.45, 34.98, 45.11, 67.89, 78.00, 83.45, 93.34, 98.34], 'percent', 1)
          const result = stat.quantile(5)

          chai.expect(result).excluding('roundStrategy').to.deep.equal(
              [
                  { min: 2.3, max: 6.6},
                  { min: 6.7, max: 34.8},
                  { min: 34.9, max: 67.7},
                  {min: 67.8, max: 83.3},
                  {min: 83.4, max: 98.4}
              ]
          );
    });

      it('Case: 5 values - 3 classes - 1 decimal', function() {
          const stat = new Stat([2,4,6,7,9,11,15,17,23,56,78,45], 'percent', 1)
          const result = stat.quantile(5)
        console.log(result)
          chai.expect(result).excluding('roundStrategy').to.deep.equal(
              [
                  { min: 2, max: 5.9},
                  { min: 6, max: 8.9},
                  { min: 9, max: 16.9},
                  {min: 17, max: 44.9},
                  {min: 45, max: 78}
              ]
          );
      });
  });
});
