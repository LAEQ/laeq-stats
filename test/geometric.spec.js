import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat } from '../index.js'

chai.use(chaiExclude);

describe('Statistic: geometric', function() {
  describe('Test geometric discretisation', function() {
    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete', 0)
      const result = stat.geometric(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 7},
          {min: 7, max: 23},
          {min: 23, max: 76},
          {min: 76, max: 251},
          {min: 251, max: 789}
        ]
      );
    });
  });
})

describe('Statistic: geometric', function() {
  describe('Test geometric discretisation', function() {
    it('Case: float values 5 classes', function() {
      const stat = new Stat([2.34, 5.56,12.334,24.356,35.789,123.234,234.567,456.123,567], 'rate', 3)
      const result = stat.geometric(6)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.34, max: 5.842},
          {min: 5.843, max: 14.586},
          {min: 14.587, max: 36.418},
          {min: 36.419, max: 90.929},
          {min: 90.930, max: 227.036},
          {min: 227.037, max: 567}
        ]
      );
    });
  });
})
