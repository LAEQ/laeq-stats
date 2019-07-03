
/**
 * Strategy to round integer values
 * - min is included
 * - max is excluded
 * @return {[min, max]} return 2 functions
 */
var strategyMin= () => {
  const min_strategy = (value) => {
    return Math.floor(value / 10) * 10
  }

  const max_strategy = (value) => {
    return Math.floor(value / 10) * 10
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
    return Math.floor(value / 10) * 10
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

    // console.log(decimals)

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

  /**
   * Distribute values equally between a number of classes by return a list of classes
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

    const min = this.minValue(this.values[0] - 0.01)
    const max = (this.values[index - 1] + this.values[index]) / 2

    result.push(new Classe(min, max))

    while(index < total){
      const min = (this.values[index - 1] + this.values[index]) / 2
      const max = (this.values[index + nb_per_classe - 1] + this.values[index + nb_per_classe]) / 2
      result.push(new Classe(min,max))

      index += nb_per_classe
    }

    while(result.length < nb_classe){
      result.length = 0
      --nb_per_classe
      index = nb_per_classe

      const min = this.minValue(this.values[0] - 0.01)
      const max = (this.values[index - 1] + this.values[index]) / 2

      result.push(new Classe(min, max))

      while(index < total){
        const min = (this.values[index - 1] + this.values[index]) / 2
        const max = (this.values[index + nb_per_classe - 1] + this.values[index + nb_per_classe]) / 2
        result.push(new Classe(min,max))

        index += nb_per_classe
      }
    }

    //Remove extra classe (edge case)
    if(result.length > nb_classe){
      result.pop()
    }

    //The max value for the upper classe is higher to the max value
    result[result.length-1].max = this.maxValue(this.values[total - 1] + 0.01)

    //Set round strategies
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
