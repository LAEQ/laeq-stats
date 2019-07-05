import * as chai from 'chai';
import { Stat } from '../index.js'

import chaiAlmost from 'chai-almost'
chai.use(chaiAlmost(0.000001))

describe('Round strategy', function() {
  describe('Discrete values', function() {
    it('Case: 5 values - 3 classes', function() {
      const stat = new Stat([123,225,347,481,5123])
      const result = stat.quantile(3)
      const values = result.map(c => { return {min: c.getMin(), max: c.getMax()}})
      chai.expect(values).to.be.eql([
        {min: 120 , max: 290},
        {min: 290 , max: 2810},
        {min: 2810 , max: 5130},
      ])

    });

    it('Case: 5 values - 2 classes', function() {
      const stat = new Stat([0, 24, 56 ,78 ,123])
      const result = stat.quantile(2)
      const values = result.map(c => { return {min: c.getMin(), max: c.getMax()}})
      chai.expect(values).to.be.eql([
        {min: 0 , max: 70},
        {min: 70 , max: 130}
      ])
    });
  });

  describe('Round strategy', function() {
    describe('percent values', function() {
      it('Case: 5 values - 3 classes', function() {
        const stat = new Stat([0.23, 3.67, 8.89, 53.24, 100], 'percent')
        const result = stat.quantile(3)

        const values = result.map(c => { return {min: c.getMin(), max: c.getMax()}})
        chai.expect(values).to.be.eql([
          {min: 0.2 , max: 6.28},
          {min: 6.28 , max: 76.62},
          {min: 76.62 , max: 100},
        ])
      });
    });
  });

  describe('Round strategy', function() {
    describe('percent values', function() {
      it('Case: 5 values - 3 classes', function() {
        const stat = new Stat([-2.34, -2.01, -0.23, 3.67, 8.89, 53.24, 100.23, 234.89], 'rate')
        const result = stat.quantile(5)

        const values = result.map(c => { return {min: c.getMin(), max: c.getMax()}})
        chai.expect(values).to.be.eql([
          {min: -2.35 , max: -1.12},
          {min: -1.12 , max: 6.28},
          {min: 6.28 , max: 82.49},
          {min: 82.49 , max: 158.69},
          {min: 158.69 , max: 234.9}
        ])
      });
    });
  });
});
