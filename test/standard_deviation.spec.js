import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import chaiAlmost from 'chai-almost'
import { Stat, Classe } from '../index.js'

chai.use(chaiExclude)
chai.use(chaiAlmost(0.0001))

describe('Statistic: standard deviation', function() {
  describe('Test std deviation discretisation', function() {
    it('Case: integer values 5 classes', function() {
      const stat = new Stat([400, 452 , 412, 424, 535, 543, 234, 456, 567, 578, 489], 'discrete')
      const result = stat.standardDeviation()

      chai.expect(result).excluding('roundStrategy').to.be.deep.almost(
        [
          {min: 233.99, max: 274.9149},
          {min: 274.9149, max: 368.8210},
          {min: 368.8210, max: 462.7273},
          {min: 462.7273, max: 556.6335},
          {min: 556.6335, max: 578}
        ]
      );
    });

    it('Case: float values 5 classes', function() {
      const stat = new Stat([2.34, 5.56, 3.334, 4.356, 5.789, 3.234, 4.567, 6.123, 7], 'rate')
      const result = stat.standardDeviation()

      chai.expect(result).excluding('roundStrategy').to.be.deep.almost(
        [
          {min: 2.33, max: 3.2488},
          {min: 3.2488, max: 4.7003},
          {min: 4.7003, max: 6.1518},
          {min: 6.1518, max: 7}
        ]
      );
    });
  });
})
