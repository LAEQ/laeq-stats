import * as chai from 'chai';
import { Stat } from '../index.js'

describe('Statistic: equal amplitude', function() {
  describe('Test equal amplitude discretisation', function() {
    it('Case 1: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete', 0)
      const result = stat.equalAmplitude(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 159},
          {min: 159, max: 316},
          {min: 316, max: 473},
          {min: 473, max: 630},
          {min: 630, max: 789}
        ]
      );
    });

    it('Case 2: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete', 0)
      const result = stat.equalAmplitude(1)
        console.log(result)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 789}
        ]
      );
    });

    it('Case 3: integer values 5 classes', function() {
      const stat = new Stat([2.56,5.23,12.34, 56.78], 'percent', 2)
      const result = stat.equalAmplitude(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.56, max: 13.39},
          {min: 13.4, max: 24.22},
          {min: 24.23, max: 35.05},
          {min: 35.06, max: 45.88},
          {min: 45.89, max: 56.78},
        ]
      );
    });
  });

  describe('Test round up methods for amplitude discretisation', function() {
    it('Case 1: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete', 0)
      const result = stat.equalAmplitude(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 159},
          {min: 159, max: 316},
          {min: 316, max: 473},
          {min: 473, max: 630},
          {min: 630, max: 789}
        ]
      );
    });

    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2.56,5.23,12.34, 56.78], 'percent', 2)
      const result = stat.equalAmplitude(5)
      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.56, max: 13.39},
          {min: 13.4, max: 24.22},
          {min: 24.23, max: 35.05},
          {min: 35.06, max: 45.88},
          {min: 45.89, max: 56.78},
        ]
      );
    });
  });
});
