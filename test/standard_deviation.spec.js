import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import chaiAlmost from 'chai-almost'
import { Stat } from '../index.js'

chai.use(chaiExclude)
chai.use(chaiAlmost(0.0001))

describe('Statistic: standard deviation', function() {
  describe('Test std deviation discretisation', function() {
    it('Case: integer values 5 classes', function() {
      const stat = new Stat([400, 452 , 412, 424, 535, 543, 234, 456, 567, 578, 489],0)
      const result = stat.standardDeviation()
      chai.expect(result).to.be.deep.almost(
        [
          {min: 234, max: 275},
          {min: 276, max: 369},
          {min: 370, max: 463},
          {min: 464, max: 557},
          {min: 558, max: 578}
        ]
      );
    });

    it('Case: float values 5 classes', function() {
      const stat = new Stat([2.341, 5.56, 3.334, 4.356, 5.789, 3.234, 4.567, 6.123, 7], 3)
      const result = stat.standardDeviation()
      chai.expect(result).to.be.deep.almost(
        [
          {min: 2.341, max: 3.249},
          {min: 3.250, max: 4.7},
          {min: 4.701, max: 6.152},
          {min: 6.153, max: 7}
        ]
      );
    });

    it('Case: float values 5 classes', function() {
      const stat = new Stat([2.341, 5.56, 3.334, 4.356, 5.789, 3.234, 4.567, 6.123, 7], 0)
      const result = stat.standardDeviation()
      chai.expect(result).to.be.deep.almost(
          [
            {min: 2, max: 3},
            {min: 4, max: 5},
            {min: 6, max: 6},
            {min: 7, max: 7}
          ]
      );
    });
  });
})
