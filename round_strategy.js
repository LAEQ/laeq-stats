/**
 * Strategy to round the first classe of integer values
 * @return {function min, function max} return 2 public methods min(), max()
 */
 var strategyFirstDiscrete= () => {
   const min_strategy = (value) => {
     if(value < 10){
       return 0
     }

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
 * Strategy to round the middle classes of integer values
 * @return {function min, function max} return 2 public methods min(), max()
 */
var strategyDiscrete = () => {
  const min_strategy = (value) => {
    return Math.ceil(value / 10) * 10
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
 * Strategy to round the upper classes integer values
 *  - min is included
 *  - max is also included
 * @return {[min, max]}
 */
var strategyLastDiscrete = () => {
  const min_strategy = (value) => {
    return Math.ceil(value / 10) * 10
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
 * Strategy to round the first class of percent values (2 digits)
 * @return {function min, function max} return 2 public methods min(), max()
 */
  var strategyFirstPercent = () => {
    const min_strategy = (value) => {
      return Math.max(Math.floor(value * 10) / 10, 0)
    }

    const max_strategy = (value) => {
      return Math.floor(value * 100) / 100
    }

    return {
      min: min_strategy,
      max: max_strategy
    }
}

/**
 * Strategy to round float values (2 digits)
 * @return {function min, function max} return 2 public methods min(), max()
 */
var strategyPercent = () => {
    const min_strategy = (value) => {
      return Math.floor(value * 100) / 100
    }

    const max_strategy = (value) => {
      return Math.ceil(value * 100) / 100
    }

    return {
      min: min_strategy,
      max: max_strategy
    }
  }

/**
 * Strategy to round float values (2 digits)
 * @return {function min, function max} return 2 public methods min(), max()
 */
var strategyLastPercent = () => {
  const min_strategy = (value) => {
    return Math.floor(value * 100) / 100
  }

  const max_strategy = (value) => {
    return Math.min(Math.ceil(value * 100) / 100, 100)
  }

  return {
    min: min_strategy,
    max: max_strategy
  }
}

/**
 * Strategy to round first classe of rate values (2 digits)
 * @return {function min, function max} return 2 public methods min(), max()
 */
var strategyFirstRate= () => {
  const min_strategy = (value) => {
    return Math.floor(value * 100) / 100
  }

  const max_strategy = (value) => {
    return Math.floor(value * 100) / 100
  }

  return {
    min: min_strategy,
    max: max_strategy
  }
}

/**
 * Strategy to round middles classes of rate values (2 digits)
 * @return {function min, function max} return 2 public methods min(), max()
 */
var strategyRate = () => {
  const min_strategy = (value) => {
    return Math.floor(value * 100) / 100
  }

  const max_strategy = (value) => {
    return Math.floor(value * 100) / 100
  }

  return {
    min: min_strategy,
    max: max_strategy
  }
}

/**
 * Strategy to round upper classe of rate values (2 digits)
 * @return {function min, function max} return 2 public methods min(), max()
 */
var strategyLastRate = () => {
  const min_strategy = (value) => {
    return Math.floor(value * 100) / 100
  }

  const max_strategy = (value) => {
    return Math.ceil(value * 100) / 100
  }

  return {
    min: min_strategy,
    max: max_strategy
  }
}

export {
  strategyFirstRate,
  strategyRate,
  strategyLastRate,
  strategyFirstPercent,
  strategyPercent,
  strategyLastPercent,
  strategyFirstDiscrete,
  strategyDiscrete,
  strategyLastDiscrete
}
