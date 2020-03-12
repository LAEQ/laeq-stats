import * as chai from 'chai';
import { Stat } from '../index.js'
import chaiAlmost from 'chai-almost'

chai.use(chaiAlmost(0.000001))

describe('Statistic: check precision', function() {
  describe('precision default', function() {
    it('should return the values unchanged', function() {
      chai.expect(new Stat([1,2,3,4,5]).values).to.eql([1,2,3,4,5]);
    });

    it('should return the values unchanged reordered', function() {
      chai.expect(new Stat([5,2,3,4,1]).values).to.eql([1,2,3,4,5]);
    });
  });

  describe('precision 1', function() {
    it('should return the values unchanged for integers', function() {
      chai.expect(new Stat([1,2,3,4,5]).values).to.eql([1,2,3,4,5]);
    });

    it('should return the values changed and reordered for floats', function() {
      chai.expect(new Stat([5.345,2.12,3.898564,4.00000002,1.2345], 2).values).to.eql([1.23, 2.12, 3.89, 4.00, 5.34 ]);
      chai.expect(new Stat([5.345,2.12,3.898564,4.00000002,1.2345], 2).valuesPrec).to.eql([123, 212, 389, 400, 534 ]);
    });
  });
});
