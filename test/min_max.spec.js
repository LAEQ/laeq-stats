import { expect } from "chai"
import { Stat } from '../index.js'

var assert = require('assert');
describe('Statistic: min, max', function() {
  describe('min', function() {
    it('should return the min value', function() {
      expect(new Stat([1,2,3,4,5]).min()).to.equal(1);
    });

    it('should return the min value', function() {
      expect(new Stat([-12,-222,3.45,4.56,53]).min()).to.equal(-222);
    });
  });

  describe('max', function() {
    it('should return the max value', function() {
      expect(new Stat([1,2,3,4,5]).max()).to.equal(5);
    });

    it('should return the max value', function() {
      expect(new Stat([-12,-222,3.45,4.56,53]).max()).to.equal(53);
    });
  });
});
