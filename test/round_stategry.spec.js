import * as chai from 'chai';
import * as round_stategy  from '../round_strategy.js'

import chaiAlmost from 'chai-almost'
chai.use(chaiAlmost(0.000001))

describe('Round strategy', function() {
  describe('Discrete values', function() {
    it('checks the lower strategy', function() {
        const strategy_low = round_stategy.strategyFirstDiscrete()

        chai.expect(strategy_low.max(8)).to.equal(8)
        chai.expect(strategy_low.max(19)).to.equal(10)
        chai.expect(strategy_low.max(30)).to.equal(30)
        chai.expect(strategy_low.max(133)).to.equal(130)
    });

    it('checks the middle strategy', function() {
        const strategy = round_stategy.strategyDiscrete()

        chai.expect(strategy.max(8)).to.equal(8)
        chai.expect(strategy.max(19)).to.equal(10)
        chai.expect(strategy.max(30)).to.equal(30)
        chai.expect(strategy.max(133)).to.equal(130)
    });

    it('checks the upper strategy', function() {
          const strategy = round_stategy.strategyLastDiscrete()
          chai.expect(strategy.max(8)).to.equal(10)
          chai.expect(strategy.max(19)).to.equal(20)
          chai.expect(strategy.max(30)).to.equal(30)
          chai.expect(strategy.max(133)).to.equal(140)
    });

    it('checks the bounds of strategies boo', function() {
          const s1 = round_stategy.strategyFirstDiscrete()
          const s2 = round_stategy.strategyDiscrete()
          const s3 = round_stategy.strategyLastDiscrete()

          chai.expect(s1.max(8)).to.equal(8)
          chai.expect(s2.max(19)).to.equal(10)
          chai.expect(s3.max(20)).to.equal(20)
    });
  });

});

describe('Percent values', function() {
  it('checks the lower strategy', function() {
    const strategy_low = round_stategy.strategyFirstPercent()

    chai.expect(strategy_low.min(0)).to.equal(0)
    chai.expect(strategy_low.min(8.23)).to.equal(8.23)
    chai.expect(strategy_low.min(19.34)).to.equal(19.34)
    chai.expect(strategy_low.min(153.99)).to.equal(153.99)
    chai.expect(strategy_low.min(19.345)).to.equal(19.34)
    chai.expect(strategy_low.min(153.995)).to.equal(153.99)

    chai.expect(strategy_low.max(8.4634)).to.equal(8.45)
    chai.expect(strategy_low.max(19.345)).to.equal(19.33)
    chai.expect(strategy_low.max(30.2399)).to.equal(30.22)
    chai.expect(strategy_low.max(133.345)).to.equal(133.33)
  });

  it('checks the middle strategy', function() {
    const strategy = round_stategy.strategyPercent()

    chai.expect(strategy.min(8.23)).to.equal(8.23)
    chai.expect(strategy.min(19.234)).to.equal(19.23)
    chai.expect(strategy.min(30.988)).to.equal(30.98)
    chai.expect(strategy.min(133.9999)).to.equal(133.99)

    chai.expect(strategy.max(8.23)).to.equal(8.22)
    chai.expect(strategy.max(19.234)).to.equal(19.22)
    chai.expect(strategy.max(30.988)).to.equal(30.97)
    chai.expect(strategy.max(133.9999)).to.equal(133.98)
  });

  it('checks the upper strategy', function() {
    const strategy = round_stategy.strategyLastPercent()
    chai.expect(strategy.min(8.23)).to.equal(8.23)
    chai.expect(strategy.min(19.234)).to.equal(19.23)
    chai.expect(strategy.min(30.988)).to.equal(30.98)
    chai.expect(strategy.min(133.9999)).to.equal(133.99)

    chai.expect(strategy.max(8.23)).to.equal(8.24)
    chai.expect(strategy.max(19.234)).to.equal(19.24)
    chai.expect(strategy.max(30.988)).to.equal(30.99)
    chai.expect(strategy.max(133.9999)).to.equal(134.00)
  });

  it('checks the bounds of strategies boo', function() {
        const s1 = round_stategy.strategyFirstPercent()
        const s2 = round_stategy.strategyPercent()
        const s3 = round_stategy.strategyLastPercent()

        chai.expect(s1.min(1.28)).to.equal(1.28)
        chai.expect(s1.max(1.32)).to.equal(1.31)
        chai.expect(s2.min(1.32)).to.equal(1.32)
        chai.expect(s2.max(1.52)).to.equal(1.51)
        chai.expect(s3.min(1.52)).to.equal(1.52)
        chai.expect(s3.max(1.52)).to.equal(1.53)
  });
});

describe('Rate values', function() {
  it('checks the lower strategy ', function() {
    const strategy = round_stategy.strategyFirstRate()

    chai.expect(strategy.min(-1.23)).to.equal(-1.23)
    chai.expect(strategy.min(-1.234)).to.equal(-1.24)
    chai.expect(strategy.min(0.12)).to.equal(0.12)
    chai.expect(strategy.min(0.123)).to.equal(0.12)
    chai.expect(strategy.min(23.234)).to.equal(23.23)
    chai.expect(strategy.min(123.678)).to.equal(123.67)

    chai.expect(strategy.max(-1.159)).to.equal(-1.17)
    chai.expect(strategy.max(0.12)).to.equal(0.11)
    chai.expect(strategy.max(0.123)).to.equal(0.11)
    chai.expect(strategy.max(23.234)).to.equal(23.22)
    chai.expect(strategy.max(123.678)).to.equal(123.66)
  });

  it('checks the middle strategy', function() {
    const strategy = round_stategy.strategyRate()

    chai.expect(strategy.min(-1.23)).to.equal(-1.23)
    chai.expect(strategy.min(-1.234)).to.equal(-1.24)
    chai.expect(strategy.min(0.12)).to.equal(0.12)
    chai.expect(strategy.min(0.123)).to.equal(0.12)
    chai.expect(strategy.min(23.234)).to.equal(23.23)
    chai.expect(strategy.min(123.678)).to.equal(123.67)

    chai.expect(strategy.max(-1.159)).to.equal(-1.17)
    chai.expect(strategy.max(0.12)).to.equal(0.11)
    chai.expect(strategy.max(0.123)).to.equal(0.11)
    chai.expect(strategy.max(23.234)).to.equal(23.22)
    chai.expect(strategy.max(123.678)).to.equal(123.66)
  });

  it('checks the middle strategy', function() {
    const strategy = round_stategy.strategyRate()

    chai.expect(strategy.min(-1.23)).to.equal(-1.23)
    chai.expect(strategy.min(-1.234)).to.equal(-1.24)
    chai.expect(strategy.min(0.12)).to.equal(0.12)
    chai.expect(strategy.min(0.123)).to.equal(0.12)
    chai.expect(strategy.min(23.234)).to.equal(23.23)
    chai.expect(strategy.min(123.678)).to.equal(123.67)

    chai.expect(strategy.max(-1.159)).to.equal(-1.17)
    chai.expect(strategy.max(0.12)).to.equal(0.11)
    chai.expect(strategy.max(0.123)).to.equal(0.11)
    chai.expect(strategy.max(23.234)).to.equal(23.22)
    chai.expect(strategy.max(123.678)).to.equal(123.66)
  });
});
