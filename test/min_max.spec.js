import * as chai from 'chai';
import { Stat } from '../index.js'
import chaiAlmost from 'chai-almost'

chai.use(chaiAlmost(0.000001))

describe('Statistic: min, max, total, mean', function() {
  describe('min', function() {
    it('should return the min value', function() {
      chai.expect(new Stat([1,2,3,4,5]).min()).to.equal(1);
    });

    it('should return the min value', function() {
      chai.expect(new Stat([-12,-222,3.45,4.56,53]).min()).to.equal(-222);
    });
  });

  describe('max', function() {
    it('should return the max value', function() {
      chai.expect(new Stat([1,2,3,4,5]).max()).to.equal(5);
    });

    it('should return the max value', function() {
      chai.expect(new Stat([-12,-222,3.45,4.56,53]).max()).to.equal(53);
    });
  });

  describe('total', function() {
    it('should return the total of integer values', function() {
      chai.expect(new Stat([1,2,3,4,5]).total()).to.equal(15);

    });

    it('should return the total of negative and float values', function() {
      chai.expect(new Stat([-12,-222,3.45,4.56,53]).total()).to.equal(-172.99);
    });
  });

  describe('mean', function() {
    it('should return the mean integer values ', function() {
      chai.expect(new Stat([1,2,3,4,5]).mean()).to.equal(3);
    });

    it('should return the mean of negative and float values', function() {
      chai.expect(new Stat([-12,-222,3.45,4.56,53]).mean()).to.equal(-34.598);
    });
  });

  describe('standard deviation', function() {
    it('should return the std deviation integer values ', function() {
      chai.expect(new Stat([1,2,3,4,5]).std_dev()).to.equal(1.4142);
    });

    it('should return the std deviation of negative and float values', function() {
      chai.expect(new Stat([-12,-222,3.45,4.56,53]).std_dev()).to.equal(96.2129);
    });
  });

  describe('variance', function() {
    it('should return the variance integer values ', function() {
      chai.expect(new Stat([1,2,3,4,5]).variance()).to.equal(2);
    });

    it('should return the variance of negative and float values', function() {
      chai.expect(new Stat([-12,-222,3.45,4.56,53]).variance()).to.almost.equal(9256.9176);
    });
  });
});
