
/**
 * Strategy to round integer values
 * - min is included
 * - max is excluded
 * @return {[min, max]} return 2 functions
 */
var strategyMin= () => {
  const min_strategy = (value) => {
    return Number(value.toFixed(0))
  }

  const max_strategy = (value) => {
    return Number(value.toFixed(0))
  }

  return {
    min: min_strategy,
    max: max_strategy
  }
}

/**
 * Strategy to round integer values
 *  - min is included
 *  - max is also included
 * @return {[min, max]} return 2 functions
 */
var strategyMinMax = () => {
  const min_strategy = (value) => {
    return Number(value.toFixed(0))
  }

  const max_strategy = (value) => {
    return Math.ceil(value / 10) * 10
  }

  return {
    min: min_strategy,
    max: max_strategy
  }
}

/**
 * Strategy to round float values (2 digits)
 * - min is included (min value:  0)
 * - max is excluded (max value:  100)
 * @return {[min, max]} return 2 functions
 */
  var strategyMinPercent = () => {
    const min_strategy = (value) => {
      return Math.floor(value * 10) / 10
    }

    const max_strategy = (value) => {
      return Math.floor(value * 10) / 10
    }

    return {
      min: min_strategy,
      max: max_strategy
    }
}
/**
 * Strategy to round float values (2 digits)
 * - min is included (min value: 0)
 * - max is also included (max value: 100)
 * @return {{min, max}} return 2 functions
 */
var strategyMinMaxPercent = () => {
    const min_strategy = (value) => {
      return Math.floor(value * 10) / 10
    }

    const max_strategy = (value) => {
      return Math.ceil(value * 10) / 10
    }

    return {
      min: min_strategy,
      max: max_strategy
    }
  }

  /**
   * Strategy to round float values (2 digits)
   * - min is included (min value:  0)
   * - max is excluded (max value:  100)
   * @return {[min, max]} return 2 functions
   */
    var strategyMinRate= () => {
      const min_strategy = (value) => {
        return Math.floor(value * 10) / 10
      }

      const max_strategy = (value) => {
        return Math.floor(value * 10) / 10
      }

      return {
        min: min_strategy,
        max: max_strategy
      }
  }
  /**
   * Strategy to round float values (2 digits)
   * - min is included (min value: 0)
   * - max is also included (max value: 100)
   * @return {{min, max}} return 2 functions
   */
  var strategyMinMaxRate = () => {
      const min_strategy = (value) => {
        return Math.floor(value * 10) / 10
      }

      const max_strategy = (value) => {
        return Math.ceil(value * 10) / 10
      }

      return {
        min: min_strategy,
        max: max_strategy
      }
    }

/**
 * Represent a statistic mathematical classe / range
 * @param min
 * @param max
 */
class Classe{
  constructor(min, max){
    this.min = min
    this.max = max
  }

  /**
   * Method to round the min and max values:
   *  - 2 types of rounding: discrete vs percent
   *  - Round floor or ceil (does the classe exclude or include the min/max values)
   *
   * @param  {function{return {min, max}} strategy method: 2 public method min, max
   */
  roundStrategy(strategy){
    this.roundStrategy = strategy()
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
    const decimals = x - Math.floor(x)

    if(x === Math.floor(x)){
      return x
    } else if (total % Math.ceil(x) === 0){
      return Math.floor(x)
    }

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

  toFixed(floatValue, precision = 2){
    return Number(floatValue.toFixed(precision))
  }

  size(){
    return this.values.length
  }

  variance(){
    const mean = this.mean()
    const variance = this.values.reduce((acc, curr) => {
      return acc + Math.pow(curr - mean, 2)
    }, 0) / this.size()

    return this.toFixed(variance, 4)
  }

  std_dev(){
    return this.toFixed(Math.pow(this.variance(), 0.5), 4)
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

    return this.setStrategies(result)
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

    return this.setStrategies(result)
  }

  /**
   * Distribute values equally between a number of classes
   * @param  {integer} nb_classe number of classes
   * @return {[classe]} list of bounded classes
   */
  quantile(nb_classe){
    const result = []
    const total = this.values.length;
    let nb_per_classe = this.getNbrPerQuartile(nb_classe, total)

    if(nb_classe > total){
      throw "nbrClasse > total. It must be less or equal"
    }

    let index = nb_per_classe

    // Some distributions cannot be resolve within one single loop:
    // Ex: 16 values to distribute in 5 classes -> nb_per_classe = 3 or 4 ??
    //    => [3][3][3][3][3] or [4][4][4][4] (we either miss one classe or miss one value)
    // This loop implementation gives: [3][3][3][3][4]
    while(result.length < nb_classe){
      result.length = 0

      index = nb_per_classe

      const min = this.minValue(this.values[0] - 0.01)
      const max = (this.values[index - 1] + this.values[index]) / 2

      let cls_prev = new Classe(min, max)
      let cls_next

      result.push(cls_prev)

      while(index < total){
        const max = (this.values[index + nb_per_classe - 1] + this.values[index + nb_per_classe]) / 2
        cls_next = new Classe(cls_prev.max, max)

        result.push(cls_next)

        index += nb_per_classe
        cls_prev = cls_next
      }

      --nb_per_classe
    }

    //Remove extra classe (edge case mentionned above)
    if(result.length > nb_classe){
      result.pop()
    }

    //Safe guard: make sur the last classe includes the max value of the set
    result[result.length-1].max = this.maxValue(this.max() + 0.01)

    //Set round strategies
    return this.setStrategies(result)
  }

  setStrategies(result){
    if(this.type === 'discrete'){
      for(let i = 0; i < result.length - 1; i++){
        result[i].roundStrategy(strategyMin)
      }

      result[result.length - 1].roundStrategy(strategyMinMax)
    } else if('percent') {
      for(let i = 0; i < result.length - 1; i++){
        result[i].roundStrategy(strategyMinPercent)
      }

      result[result.length - 1].roundStrategy(strategyMinMaxRate)
    } else {
      for(let i = 0; i < result.length - 1; i++){
        result[i].roundStrategy(strategyMinPercent)
      }

      result[result.length - 1].roundStrategy(strategyMinMaxRate)
    }

    return result
  }
}

export { Stat, Classe }
