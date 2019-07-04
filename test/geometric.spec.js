import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat, Classe } from '../index.js'

chai.use(chaiExclude);

describe('Statistic: geometric', function() {
  describe('Test geometric discretisation', function() {
    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete')
      const result = stat.geometric(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 6.61},
          {min: 6.61, max: 21.85},
          {min: 21.85, max: 72.22},
          {min: 72.22, max: 238.71},
          {min: 238.71, max: 789.01}
        ]
      );
    });
  });
})

describe('Statistic: geometric', function() {
  describe('Test geometric discretisation', function() {
    it('Case: float values 5 classes', function() {
      const stat = new Stat([2.34, 5.56,12.334,24.356,35.789,123.234,234.567,456.123,567], 'rate')
      const result = stat.geometric(6)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.34, max: 5.84},
          {min: 5.84, max: 14.58},
          {min: 14.58, max: 36.4},
          {min: 36.4, max: 90.89},
          {min: 90.89, max: 226.94},
          {min: 226.94, max: 567.01}
        ]
      );
    });
  });
})
