
import * as roundStrategy from './round_strategy.js'
/**
 * Represent a statistic mathematical classe / range
 * @param min
 * @param max
 */
class Classe{
  constructor(min, max){
    this.min = min
    this.max = max
    this.roundStrategy = undefined
  }

  getMin(){
    return this.roundStrategy.min(this.min)
  }

  getMax(){
    return this.roundStrategy.max(this.max)
  }
}

/**
 * Class to calculate statistical values from a list of values.
 * - median, min, max, quartiles, list of classes, ...
 */
class Stat {
  constructor(values, type = 'discrete'){
    // console.log(values)
    if(values.length === 0){
      throw "Stat: you must pass a non empty array of values"
    }
    this.type = type
    this.values = values.sort((a,b) => {return a - b})
  }

  isEven(){
    return this.values.length % 2 === 0
  }

  median(){
    const middle = this.values.length / 2
    if(middle === 0){
      return 0
    } else if (middle < 1){
      return this.values[0]
    }

    if (Math.floor(middle)!== middle) {
      return this.values[Math.floor(middle)]
    }

    return (this.values[middle - 1] + this.values[middle]) / 2
  }
  firstQuartile(){
    return new Stat(this.values.slice(0, Math.floor(this.values.length / 2))).median()
  }

  mean(){
    if(this.size() === 0){
      return 0
    }

    return this.total() / this.size()
  }

  total(){
    const total =  this.values.reduce((acc, curr) => {
      return acc + curr
    })

    return total
  }

  thirdQuartile(){
    if(this.isEven()){
      return new Stat(this.values.slice(this.values.length / 2, this.values.length)).median()
    }

    return new Stat(this.values.slice(Math.ceil(this.values.length / 2), this.values.length)).median()
  }

  min(){
    return Math.min(...this.values)
  }

  max(){
    return Math.max(...this.values)
  }

  getNbrPerQuartile(nbrClasse, total){
    const x = total / nbrClasse
    // const decimals = x - Math.floor(x)
    //
    // if(x === Math.floor(x)){
    //   return x
    // } else if (total % Math.ceil(x) === 0){
    //   return Math.floor(x)
    // }

    return Math.ceil(x)
  }

  minValue(value){
    if(this.type === 'discrete' || this.type === 'percent'){
      return Math.max(0, value)
    }

    return value
  }

  maxValue(value){
    if(this.type === 'percent'){
      return Math.min(100, value)
    }

    return value
  }

  /**
   * Round a float value with a precision
   *
   * IMPORTANT: this is not 100% accurate method
   * Read more one a binary floating-point representation
   *
   * @param  {[type]} floatValue    [description]
   * @param  {Number} [precision=2] [description]
   * @return {[type]}               [description]
   */
  toFixed(floatValue, precision = 2){
    return Number(floatValue.toFixed(precision))
  }

  /**
   * Get the size of the sample
   * @return {Integer}
   */
  size(){
    return this.values.length
  }

  /**
   * Return the variance for the population (not the sample one)
   * @return {[type]}  (x - mean)2
   */
  variance(){
    const mean = this.mean()
    return  this.values.reduce((acc, curr) => {
      return acc + Math.pow(curr - mean, 2)
    }, 0) / this.size()
  }

  /**
   * Return the standard deviation
   * @return {[Number]} the square root of the variance
   */
  std_dev(){
    return this.toFixed(Math.sqrt(this.variance()), 4)
  }

  /**
   * Standard deviation distribution
   *
   * Generate classes with their max - min = std_dev
   *
   * @return {[Classe]} array of classes
   */
  standardDeviation(){
    let result = []
    const mean = this.mean()
    const std_dev = this.std_dev()
    let index = 1

    //Case: Values < median
    let max = mean
    let min = Math.max(this.min(), mean - (index * std_dev))

    while(min > this.min()){
      result.push(new Classe(min, max))
      max = min
      min = Math.max(this.min(), mean - (++index * std_dev))
    }

    result.push(new Classe(this.minValue(min - 0.01), max))

    //Case: Values >  median
    index = 1
    min = mean
    max = Math.min(this.max(), mean + (index * std_dev))

    while(max < this.max()){
      result.push(new Classe(min, max))
      min = max
      max = Math.min(this.max(), mean + (++index * std_dev))
    }

    result.push(new Classe(min, max))

    this.setStrategies(result)

    return result.sort((a, b) => a.min - b.min)
  }

  // standardDeviation_tmp(nb_classe = 5){
  //   //Note: nb_classe >= 5 && nb_classe <= 6
  //   nb_classe = Math.max(nb_classe, 5)
  //   nb_classe = Math.min(nb_classe, 6)
  //
  //   let result = []
  //
  //   const mean = this.mean()
  //   const std_dev = this.std_dev()
  //
  //   if(nb_classe === 5){
  //       let indexes = [-1.5, -0.5, 0.5, 1.5]
  //       let cls_prev = new Classe(this.min(), mean + (indexes[0] * std_dev)),
  //         cls_next
  //
  //         result.push(cls_prev)
  //
  //       for(let i = 1; i < indexes.length; i++){
  //             cls_next = new Classe(cls_prev.max, mean + (indexes[i] * std_dev))
  //             result.push(cls_next)
  //             cls_prev = cls_next
  //       }
  //
  //       result.push(new Classe(cls_prev.max, this.maxValue(this.max() + 0.01)))
  //     } else {
  //       let indexes = [-2, -1, 0, 1, 2]
  //       let cls_prev = new Classe(this.min(), mean + (indexes[0] * std_dev)),
  //         cls_next
  //
  //         result.push(cls_prev)
  //
  //       for(let i = 1; i < indexes.length; i++){
  //             cls_next = new Classe(cls_prev.max, mean + (indexes[i] * std_dev))
  //             result.push(cls_next)
  //             cls_prev = cls_next
  //       }
  //
  //       result.push(new Classe(cls_prev.max, this.maxValue(this.max() + 0.01)))
  //     }
  //
  //     //Remove classes with outside bounds
  //     result = result.filter( c => { return c.min >= this.min() && c.max <= this.max()}).sort((a,b) => {return a.min - b.min})
  //
  //
  //     this.setStrategies(result)
  //
  //     return result
  // }

  jenks(nb_classe){
    if(nb_classe < 1){
      return
    }

    let result = []
    var mat1 = []
		for ( var x = 0, xl = this.values.length + 1; x < xl; x++) {
			var temp = []
			for ( var j = 0, jl = nb_classe + 1; j < jl; j++) {
				temp.push(0)
			}
			mat1.push(temp)
		}

    var mat2 = []
		for ( var i = 0, il = this.values.length + 1; i < il; i++) {
			var temp2 = []
			for ( var c = 0, cl = nb_classe + 1; c < cl; c++) {
				temp2.push(0)
			}
			mat2.push(temp2)
		}

    for ( var y = 1, yl = nb_classe + 1; y < yl; y++) {
			mat1[0][y] = 1
			mat2[0][y] = 0
			for ( var t = 1, tl = this.values.length + 1; t < tl; t++) {
				mat2[t][y] = Infinity
			}
			var v = 0.0
		}

    for ( var l = 2, ll = this.size() + 1; l < ll; l++) {
			var s1 = 0.0
			var s2 = 0.0
			var w = 0.0
			for ( var m = 1, ml = l + 1; m < ml; m++) {
				var i3 = l - m + 1
				var val = parseFloat(this.values[i3 - 1])
				s2 += val * val
				s1 += val
				w += 1
				v = s2 - (s1 * s1) / w
				var i4 = i3 - 1
				if (i4 != 0) {
					for ( var p = 2, pl = nb_classe + 1; p < pl; p++) {
						if (mat2[l][p] >= (v + mat2[i4][p - 1])) {
							mat1[l][p] = i3
							mat2[l][p] = v + mat2[i4][p - 1]
						}
					}
				}
			}
			mat1[l][1] = 1
			mat2[l][1] = v
		}

		var k = this.size()
		var kclass = []

		for (i = 0; i <= nb_classe; i++) {
			kclass.push(0);
		}

		kclass[nb_classe] = parseFloat(this.max())

		kclass[0] = this.min()
		var countNum = nb_classe
		while (countNum >= 2) {
			var id = parseInt((mat1[k][countNum]) - 2)
			kclass[countNum - 1] = this.values[id]
			k = parseInt((mat1[k][countNum] - 1))

			countNum -= 1
		}

		if (kclass[0] == kclass[1]) {
			kclass[0] = 0
		}

    return this.generateClasses(kclass)
  }

  geometric(nb_classe){
    const result = []
    const min = this.min()
    const max = this.max()

    const amplitude = this.toFixed((max - min) / nb_classe)

    if(min <= 0 ){
      throw "Geometric discretisation cannot be done with null or negative values"
    }

    const logMin = Math.log(min)/Math.log(10)
    const logMax = Math.log(max)/Math.log(10)
    const logReason = (logMax - logMin) / nb_classe
    const reason = Math.pow(10, logReason)

    const maxValue = this.toFixed(min * reason)
    let cls_prev = new Classe(min, maxValue)
    let cls_next

    result.push(cls_prev)

    for(let i = 1; i < nb_classe; i++){
      const max = this.toFixed(cls_prev.max * reason)
      cls_next = new Classe(cls_prev.max, max)
      result.push(cls_next)

      cls_prev = cls_next
    }

    cls_prev.max = this.maxValue(this.max() + 0.01)

    this.setStrategies(result)

    return result
  }

  /**
   * Geometric distribution
   * https://en.wikipedia.org/wiki/Geometric_distribution
   * @param  {[type]} nb_classe [description]
   * @return {[type]}           [description]
   */
  equalAmplitude(nb_classe){
    const result = []
    const min = this.min()
    const max = this.max()

    const amplitude = this.toFixed((max - min) / nb_classe)

    let cls_prev = new Classe(this.minValue(min), this.toFixed(min + amplitude))
    let cls_next

    result.push(cls_prev)

    for(let i = 1; i < nb_classe; i++){
      cls_next = new Classe(cls_prev.max, this.toFixed(cls_prev.max + amplitude))
      result.push(cls_next)

      cls_prev = cls_next
    }

    //The max value for the upper classe is higher to the max value
    cls_prev.max = this.maxValue(this.max() + 0.01)

    this.setStrategies(result)

    return result
  }

  getQuantiles(nbClass) {
    let quantiles = []
		var step = this.size() / nbClass;
		for (var i = 1; i < nbClass; i++) {
			var qidx = Math.round(i*step+0.49);
			quantiles.push(this.values[qidx-1]); // zero-based
		}

		return quantiles;
	};

  /**
   * Distribute values equally between a number of classes
   * Note: the last classe might contains more values if Math.floor(this.size() / nb_classe) !== this.size() / nb_classe
   *
   * @param  {integer} nb_classe number of classes
   * @return {[classe]} list of bounded classes
   */
  quantile(nb_classe){
    let result = []
    let quantiles = this.getQuantiles(nb_classe)

    quantiles.unshift(this.min());

		if (quantiles[quantiles.length - 1] !== this.max()){
			quantiles.push(this.max());
    }

    return this.generateClasses(quantiles)
  }
  /**
   * Generate the classes from an array of bounds
   * @param  {[Numbers]} bounds array of numbers
   * @return {[Classes]}  array of classes
   */
  generateClasses(bounds){
    let result = []

    if(bounds.length === 0){
      return
    } else if(bounds.lenght < 2){
      throw "Stat Cannot generate classes. Must have at least 2 values."
    }

    let cls_prev = new Classe(
      this.minValue(this.min() - 0.01),
      bounds[1]
    )

    result.push(cls_prev)

    let cls_next

    for(let i = 2; i < bounds.length; i++){
      cls_next = new Classe(cls_prev.max, bounds[i])
      result.push(cls_next)
      cls_prev = cls_next
    }

    cls_prev.max = this.maxValue(this.max() + 0.01)

    this.setStrategies(result)

    return result
  }

  setStrategies(result){
    let strategies = {
      'lower': roundStrategy.strategyFirstPercent(),
      'middle': roundStrategy.strategyPercent(),
      'upper': roundStrategy.strategyLastPercent(),
      'single': roundStrategy.strategyFirstPercent()
    }

    switch(this.type){
      case 'rate':
        strategies.lower = roundStrategy.strategyFirstRate(),
        strategies.middle = roundStrategy.strategyRate(),
        strategies.upper = roundStrategy.strategyLastRate(),
        strategies.single = roundStrategy.strategyFirstRate()
      break;
      case 'discrete':
        strategies.lower = roundStrategy.strategyFirstDiscrete(),
        strategies.middle = roundStrategy.strategyDiscrete(),
        strategies.upper = roundStrategy.strategyLastDiscrete(),
        strategies.single = roundStrategy.strategyFirstDiscrete()
      break;
    }

    //Set a default strategy
    for(let i = 0; i < result.length; i++){
      result[i].roundStrategy = strategies.middle
    }

    //Case upper classe
    if(result[result.length - 1] !== undefined){
      result[result.length - 1].roundStrategy = strategies.upper
    }

    //Case lower classe and single classe
    if(result[0] !== undefined){
      result[0].roundStrategy = strategies.lower
    }
  }
}

export { Stat, Classe }
