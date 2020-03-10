import * as chai from 'chai';
import { Stat, Classe } from '../index.js'

describe('Statistic: test exports', function() {
  describe('Test class exports', function() {
    it('can create a stat object', function() {
      const stat = new Stat([1,2,3,4,5], 'discrete', 0)

      chai.expect(stat).to.be.an('object')
    });

    it('can create a classe obejct', function() {
      const classe = new Classe(10,20)
      chai.expect(classe).to.be.an('object')
    });

  });
});
