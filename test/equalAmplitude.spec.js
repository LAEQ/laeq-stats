import * as chai from 'chai';
import { Stat } from '../index.js'

describe('Statistic: equal amplitude', function() {
  describe('Test equal amplitude discretisation', function() {
    it('Case 1: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 0)
      const result = stat.equalAmplitude(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 159},
          {min: 160, max: 317},
          {min: 318, max: 475},
          {min: 476, max: 633},
          {min: 634, max: 789}
        ]
      );
    });

    it('Case 2: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 0)
      const result = stat.equalAmplitude(1)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 789}
        ]
      );
    });

    it('Case 3: integer values 5 classes', function() {
      const stat = new Stat([2.56,5.23,12.34, 56.78], 2)
      const result = stat.equalAmplitude(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.56, max: 13.4},
          {min: 13.41, max: 24.25},
          {min: 24.26, max: 35.1},
          {min: 35.11, max: 45.95},
          {min: 45.96, max: 56.78},
        ]
      );
    });
  });

  describe('Test round up methods for amplitude discretisation', function() {
    it('Case 1: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789],0)
      const result = stat.equalAmplitude(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 159},
          {min: 160, max: 317},
          {min: 318, max: 475},
          {min: 476, max: 633},
          {min: 634, max: 789}
        ]
      );
    });

    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2.56,5.23,12.34, 56.78],2)
      const result = stat.equalAmplitude(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.56, max: 13.4},
          {min: 13.41, max: 24.25},
          {min: 24.26, max: 35.1},
          {min: 35.11, max: 45.95},
          {min: 45.96, max: 56.78},
        ]
      );
    });
  });
});
