import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat } from '../index.js'

chai.use(chaiExclude);

describe('Statistic: jenks', function() {
  describe('Test jenks discretisation', function() {
    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 0)
      const result = stat.jenks(5)

      chai.expect(result).to.deep.equal(
        [
          {min: 2, max: 35},
          {min: 36, max: 123},
          {min: 124, max: 234},
          {min: 235, max: 567},
          {min: 568, max: 789}
        ]
      );
    });

    it('Case: float values 5 classes', function() {
      const stat = new Stat([2.34, 5.56,12.334,24.356,35.789,123.234,234.567,456.123,567], 3)
      const result = stat.jenks(6)

      chai.expect(result).to.deep.equal(
        [
          {min: 2.34, max: 12.334},
          {min: 12.335, max: 35.789},
          {min: 35.79, max: 123.234},
          {min: 123.235, max: 234.567},
          {min: 234.568, max: 456.123},
          {min: 456.124, max: 567}
        ]
      );
    });
  });
})
