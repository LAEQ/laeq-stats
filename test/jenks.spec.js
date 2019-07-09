import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat, Classe } from '../index.js'

chai.use(chaiExclude);

describe('Statistic: jenks', function() {
  describe('Test jenks discretisation', function() {
    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete')
      const result = stat.jenks(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 1.99, max: 35},
          {min: 35, max: 123},
          {min: 123, max: 234},
          {min: 234, max: 567},
          {min: 567, max: 789.01}
        ]
      );
    });

    it('Case: float values 5 classes', function() {
      const stat = new Stat([2.34, 5.56,12.334,24.356,35.789,123.234,234.567,456.123,567], 'rate')
      const result = stat.jenks(6)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.33, max: 12.334},
          {min: 12.334, max: 35.789},
          {min: 35.789, max: 123.234},
          {min: 123.234, max: 234.567},
          {min: 234.567, max: 456.123},
          {min: 456.123, max: 567.01}
        ]
      );
    });
  });
})
