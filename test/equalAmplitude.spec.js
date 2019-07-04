import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat, Classe } from '../index.js'

describe('Statistic: equal amplitude', function() {
  describe('Test equal amplitude discretisation', function() {
    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete')
      const result = stat.equalAmplitude(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 159.4},
          {min: 159.4, max: 316.8},
          {min: 316.8, max: 474.2},
          {min: 474.2, max: 631.6},
          {min: 631.6, max: 789.01}
        ]
      );
    });

    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete')
      const result = stat.equalAmplitude(1)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 789.01}
        ]
      );
    });

    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2.56,5.23,12.34, 56.78], 'percent')
      const result = stat.equalAmplitude(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.56, max: 13.40},
          {min: 13.40, max: 24.24},
          {min: 24.24, max: 35.08},
          {min: 35.08, max: 45.92},
          {min: 45.92, max: 56.79},
        ]
      );
    });
  });

  describe('Test round up methods for amplitude discretisation', function() {
    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2,5,12,24,35,123,234,456,567,678,789], 'discrete')
      const result = stat.equalAmplitude(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2, max: 159.4},
          {min: 159.4, max: 316.8},
          {min: 316.8, max: 474.2},
          {min: 474.2, max: 631.6},
          {min: 631.6, max: 789.01}
        ]
      );

      let values = result.map( c => { return {min: c.getMin(), max: c.getMax()} })
      chai.expect(values).to.be.eql([
        {min: 0, max: 150},
        {min: 150, max: 310},
        {min: 310, max: 470},
        {min: 470, max: 630},
        {min: 630, max: 790},
      ])
    });

    it('Case: integer values 5 classes', function() {
      const stat = new Stat([2.56,5.23,12.34, 56.78], 'percent')
      const result = stat.equalAmplitude(5)

      chai.expect(result).excluding('roundStrategy').to.deep.equal(
        [
          {min: 2.56, max: 13.40},
          {min: 13.40, max: 24.24},
          {min: 24.24, max: 35.08},
          {min: 35.08, max: 45.92},
          {min: 45.92, max: 56.79},
        ]
      );

      let values = result.map( c => { return {min: c.getMin(), max: c.getMax()} })
      chai.expect(values).to.be.eql([
        {min: 2.50, max: 13.40},
        {min: 13.4, max: 24.2},
        {min: 24.2, max: 35},
        {min: 35, max: 45.9},
        {min: 45.9, max: 56.8},
      ])
    });
  });
});
