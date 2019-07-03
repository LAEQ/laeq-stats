import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat } from '../index.js'

chai.use(chaiExclude)

describe('Statistic: round strategy', function() {
  describe('Round strategy for discrete values', function() {
    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([123,225,347,481,5123])
      const result = stat.quantile(3)

      chai.expect(result).excluding('roundStrategy').to.deep.equal([
          { min:122.99, max: 286 },
          { min: 286, max: 2802},
          { min: 2802, max: 5123.01 }
        ]
      )

      chai.expect(result[0].getMin()).to.equal(120)
      chai.expect(result[0].getMax()).to.equal(280)
      chai.expect(result[1].getMin()).to.equal(280)
      chai.expect(result[1].getMax()).to.equal(2800)
      chai.expect(result[2].getMin()).to.equal(2800)
      chai.expect(result[2].getMax()).to.equal(5130)
    });

    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([123,789,1234,1345,1456, 2345, 4567,5678,7890,8888,9876,12345])
      const result = stat.quantile(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal([
          { min:122.99, max: 1011.5 },
          { min: 1011.5, max: 1400.5},
          { min: 1400.5, max: 3456},
          { min: 3456, max: 6784},
          { min: 6784, max: 12345.01}
        ]
      )

      let minValues = result.map( c => {return c.getMin()})
      chai.expect(minValues).to.eql([120, 1010, 1400, 3450, 6780])
      let maxValues = result.map(c => {return c.getMax()})
      chai.expect(maxValues).to.eql([1010, 1400, 3450, 6780, 12350])
    });
  });

  describe('Statistic: round strategy with float values', function() {
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

        let minValues = result.map( c => {return c.getMin()})
        chai.expect(minValues).to.eql([1.20, 2.40, 6.20])
        let maxValues = result.map(c => {return c.getMax()})
        chai.expect(maxValues).to.eql([2.40, 6.2, 53.3])

      });
    });
  });
});
