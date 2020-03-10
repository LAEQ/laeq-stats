import * as chai from 'chai';
import { Stat } from '../index.js'

describe('Statistic: median, quartiles', function() {
  describe('median', function() {
    it('Case: even numbers', function() {
      chai.expect(new Stat([1,2,3,4,5], 'discrete', 1).median()).to.equal(3);
    });

    it('Case: odd numbers', function() {
      chai.expect(new Stat([1,2,3,4,5,6] ,'discrete', 0).median()).to.equal(3.5);
    });
  });

  describe('first quartile', function() {
    it('Case: even numbers', function() {
      chai.expect(new Stat([1,2,3,4,5], 'discrete', 0).firstQuartile()).to.equal(1.5);
    });

    it('Case: odd numbers', function() {
      chai.expect(new Stat([1,2,3,4,5,6], 'discrete', 0).firstQuartile()).to.equal(2);
    });
  });

  describe('third quartile', function() {
    it('Case: even numbers', function() {
      chai.expect(new Stat([1,2,3,4,5], 'discrete', 0).thirdQuartile()).to.equal(4.5);
    });

    it('Case: odd numbers', function() {
      chai.expect(new Stat([1,2,3,4,5,6], 'discrete', 0).thirdQuartile()).to.equal(5);
    });
  });

});
