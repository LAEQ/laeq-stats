import * as chai from 'chai';
import chaiExclude from 'chai-exclude';
import { Stat } from '../index.js'

var assert = require('assert');
describe('Statistic: median, quartiles', function() {
  describe('median', function() {
    it('Case: even - should return the median value', function() {
      chai.expect(new Stat([1,2,3,4,5]).median()).to.equal(3);
    });

    it('Case: odd - should return the median value', function() {
      chai.expect(new Stat([1,2,3,4,5,6]).median()).to.equal(3.5);
    });
  });

  describe('first quartile', function() {
    it('Case: even - should return the first quartile value', function() {
      chai.expect(new Stat([1,2,3,4,5]).firstQuartile()).to.equal(1.5);
    });

    it('Case: odd - should return the first quartile value', function() {
      chai.expect(new Stat([1,2,3,4,5,6]).firstQuartile()).to.equal(2);
    });
  });

  describe('third quartile', function() {
    it('Case: even - should return the first quartile value', function() {
      chai.expect(new Stat([1,2,3,4,5]).thirdQuartile()).to.equal(4.5);
    });

    it('Case: odd - should return the first quartile value', function() {
      chai.expect(new Stat([1,2,3,4,5,6]).thirdQuartile()).to.equal(5);
    });
  });

});
