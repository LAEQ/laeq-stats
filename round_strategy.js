/**
 * Strategy to round the first classe of integer values
 * @return {function min, function max} return 2 public methods min(), max()
 */
 var strategyFirstDiscrete= () => {
   const min_strategy = (value) => {
     return undefined
   }

   const max_strategy = (value) => {
     if(value <= 10){
       return value
     }
     return Math.floor(value / 10) * 10
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
    return undefined
  }

  const max_strategy = (value) => {
    if(value <= 10){
      return value
    }
    return Math.floor(value / 10) * 10

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
    return undefined
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
var strategyUniqueDiscrete = () => {
  const min_strategy = (value) => {
    return undefined
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
  var strategyFirstPercent = (prec = 2) => {
    const precision = prec
    const min_strategy = (value) => {
      return Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision)
    }

    const max_strategy = (value) => {
      return Math.floor(value * Math.pow(10, precision) - 1) / Math.pow(10, precision)
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
var strategyPercent = (prec = 2) => {
  const precision = prec
    const min_strategy = (value) => {
      return (Math.floor(value * Math.pow(10, precision))) / Math.pow(10, 2)
    }

    const max_strategy = (value) => {
      return Math.floor(value * Math.pow(10, precision) - 1) / Math.pow(10, precision)
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
var strategyLastPercent = (prec = 2) => {
  const precision = prec
  const min_strategy = (value) => {
    return (Math.floor(value * Math.pow(10, precision))) / Math.pow(10, precision)
  }

  const max_strategy = (value) => {
    return (Math.floor(value * Math.pow(10, precision)) + 1) / Math.pow(10, precision)
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
var strategyUniquePercent = (prec = 2) => {
    const precision = prec
    const min_strategy = (value) => {
      return Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision)
    }

    const max_strategy = (value) => {
      return (Math.floor(value * Math.pow(10, precision)) + 1) / Math.pow(10, precision)
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
var strategyFirstRate= (prec = 2) => {
  const precision = prec
  const min_strategy = (value) => {
    return Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision)
  }

  const max_strategy = (value) => {
    return (Math.floor(value * Math.pow(10, precision)) -1 )  / Math.pow(10, precision)
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
var strategyRate = (prec = 2) => {
  const precision = prec
  const min_strategy = (value) => {
    return (Math.floor(value * Math.pow(10, precision))) / Math.pow(10, precision)
  }

  const max_strategy = (value) => {
    return (Math.floor(value * Math.pow(10, precision)) - 1) / Math.pow(10, precision)
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
var strategyLastRate = (prec = 2) => {
  const precision = prec
  const min_strategy = (value) => {
    return (Math.floor(value * Math.pow(10, precision))) / Math.pow(10, precision)
  }

  const max_strategy = (value) => {
    return ((Math.floor(value * Math.pow(10, precision))) + 1) / Math.pow(10, precision)
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
var strategyUniqueRate= (prec = 2) => {
  const precision = prec
  const min_strategy = (value) => {
    return Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision)
  }

  const max_strategy = (value) => {
    return ((Math.floor(value * Math.pow(10, precision))) + 1) / Math.pow(10, precision)
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
  strategyLastDiscrete,
  strategyUniqueDiscrete,
  strategyUniquePercent,
  strategyUniqueRate
}
