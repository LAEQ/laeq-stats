/**
 * Statistical classe
 * @param min
 * @param max
 */
class Classe {
    /**
     * [constructor description]
     * @param {Number}
     * @param {Number}
     */
    constructor(min, max) {
        this.min = min
        this.max = max
    }

    /**
     * Get the minimum
     * @return {Number}
     */
    getMin() {
        return this.min
    }

    /**
     * Get the maximum
     * @return {Number}
     */
    getMax() {
        return this.max
    }
}

/**
 * Class to calculate statistical values from a list of values.
 * - median, min, max, quartiles, discretisation classes, ...
 */
class Stat {
    /**
     * @param {[Number]} values            [description]
     * @param {String} [type='discrete']
     * discrete: integer positive or null
     * percent: float [0;100]
     * rate: float ]-Infinity, Infinity[
     */
    constructor(values, precision = 0) {
        if (values.length === 0) {
            throw "Stat: you must pass a non empty array of values"
        }

        this.isInt = values.reduce((previous, current) => {
            return Number.isInteger(current) && previous
        }, true)

        if (Number.isInteger(precision)) {
            this.precision = Math.pow(10, precision)
        }

        this.values = values.sort((a, b) => {
            return a - b
        })

        if (this.precision > 1) {
            this.valuesPrec = this.values.map(v => Math.floor(v * this.precision))
            this.values = this.valuesPrec.map(v => v / this.precision)
        } else {
            this.valuesPrec = this.values
        }

    }

    /**
     * True if list of values is even
     * @return {Boolean}
     */
    isEven() {
        return this.values.length % 2 === 0
    }

    /**
     * Get the median value
     * @return {number} [description]
     */
    median() {
        const middle = this.values.length / 2
        if (middle === 0) {
            return 0
        } else if (middle < 1) {
            return this.values[0]
        }

        if (Math.floor(middle) !== middle) {
            return this.values[Math.floor(middle)]
        }

        return (this.values[middle - 1] + this.values[middle]) / 2
    }

    /**
     * Get first quartile value
     * @return {Number} [description]
     */
    firstQuartile() {
        return new Stat(this.values.slice(0, Math.floor(this.values.length / 2)), this.type, this.precision).median()
    }

    /**
     * Get the mean value
     * @return {Number} [description]
     */
    mean() {
        if (this.size() === 0) {
            return 0
        }

        return this.total() / this.size()
    }

    /**
     * Sum the values
     * @return {Number}
     */
    total() {
        const total = this.values.reduce((acc, curr) => {
            return acc + curr
        })

        return total
    }

    /**
     * Get the third quartile
     * @return {Number}
     */
    thirdQuartile() {
        if (this.isEven()) {
            return new Stat(this.values.slice(this.values.length / 2, this.values.length), this.type, this.precision).median()
        }

        return new Stat(this.values.slice(Math.ceil(this.values.length / 2), this.values.length), this.type, this.precision).median()
    }

    /**
     * Get the min value
     * @return {Number}
     */
    min() {
        return Math.min(...this.values)
    }

    /**
     * Get the max value
     * @return {Number}
     */
    max() {
        return Math.max(...this.values)
    }

    /**
     * Deprecated
     * @param  {Number} nbrClasse     number of classes
     * @param  {Number} total         total of values
     * @return {Number}               average number of values per quartile
     */
    getNbrPerQuartile(nbrClasse, total) {
        const x = total / nbrClasse

        return Math.ceil(x)
    }

    /**
     * Return a floor value with a roundPrecision
     * @return {Number}       [description]
     */
    minValue() {
        return this.min()
    }

    /**
     * Return ceil value with a roundPrecision
     * @return {Number}       [description]
     */
    maxValue(value) {
        if (this.max() % this.roundPrecision === 0) {
            return this.max()
        }

        let roundedUp = Math.ceil(this.max() * this.roundPrecision) / this.roundPrecision

        return roundedUp
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
    toFixed(floatValue) {
        const precision = this.type === 'discrete' ? 0 : -Math.log10(this.precision)
        return Number(floatValue.toFixed(precision))
    }

    /**
     * Get the size of the sample
     * @return {Integer}
     */
    size() {
        return this.values.length
    }

    /**
     * Return the variance for the population (not the sample one)
     * @return {Number}  (x - mean)2
     */
    variance() {
        const mean = this.mean()
        return this.values.reduce((acc, curr) => {
            return acc + Math.pow(curr - mean, 2)
        }, 0) / this.size()
    }

    /**
     * Return the standard deviation
     * @return {Number} the square root of the variance
     */
    std_dev() {
        const std = Math.sqrt(this.variance())
        return Number(std.toFixed(4))
    }

    /**
     * Standard deviation distribution
     * Generate classes with their max - min = std_dev
     * @return {[Classe]} array of classes
     */
    standardDeviation() {
        let result = []
        const mean = this.mean()
        const std_dev = this.std_dev()
        let index = 1

        //Case: Values < median
        let max = mean
        let min = Math.max(this.min(), mean - (index * std_dev))

        while (min > this.min()) {
            result.push(new Classe(min, max))
            max = min
            min = Math.max(this.min(), mean - (++index * std_dev))
        }

        result.push(new Classe(this.minValue(min - 0.01), max))

        //Case: Values >  median
        index = 1
        min = mean
        max = Math.min(this.max(), mean + (index * std_dev))

        while (max < this.max()) {
            result.push(new Classe(min, max))
            min = max
            max = Math.min(this.max(), mean + (++index * std_dev))
        }

        result.push(new Classe(min, max))
        result = result.sort((a, b) => a.min - b.min)
        result.forEach(c => {
            c.min = Math.round(c.min * this.precision)
            c.max = Math.round(c.max * this.precision)
        })

        for(let i = 1; i < result.length; i++){
            const max = result[i - 1].max
            result[i].min = max + 1
        }

        result.forEach(c => {
            c.min = c.min / this.precision
            c.max = c.max / this.precision
        })

        result[0].min = Math.floor(this.min() * this.precision) / this.precision
        result[result.length - 1].max = Math.ceil(this.max() * this.precision) / this.precision

        return result
    }

    /**
     * Return the natural breaks
     * https://en.wikipedia.org/wiki/Jenks_natural_breaks_optimization
     *
     * @param  {Number} nb_classe
     * @return {[Classe]}           [description]
     */
    jenks(nb_classe) {
        if (nb_classe < 1) {
            return
        }

        let result = []
        var mat1 = []
        for (var x = 0, xl = this.valuesPrec.length + 1; x < xl; x++) {
            var temp = []
            for (var j = 0, jl = nb_classe + 1; j < jl; j++) {
                temp.push(0)
            }
            mat1.push(temp)
        }

        var mat2 = []
        for (var i = 0, il = this.valuesPrec.length + 1; i < il; i++) {
            var temp2 = []
            for (var c = 0, cl = nb_classe + 1; c < cl; c++) {
                temp2.push(0)
            }
            mat2.push(temp2)
        }

        for (var y = 1, yl = nb_classe + 1; y < yl; y++) {
            mat1[0][y] = 1
            mat2[0][y] = 0
            for (var t = 1, tl = this.valuesPrec.length + 1; t < tl; t++) {
                mat2[t][y] = Infinity
            }
            var v = 0.0
        }

        for (var l = 2, ll = this.size() + 1; l < ll; l++) {
            var s1 = 0.0
            var s2 = 0.0
            var w = 0.0
            for (var m = 1, ml = l + 1; m < ml; m++) {
                var i3 = l - m + 1
                var val = parseFloat(this.valuesPrec[i3 - 1])
                s2 += val * val
                s1 += val
                w += 1
                v = s2 - (s1 * s1) / w
                var i4 = i3 - 1
                if (i4 != 0) {
                    for (var p = 2, pl = nb_classe + 1; p < pl; p++) {
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

        kclass[nb_classe] = Math.max(...this.valuesPrec)

        kclass[0] = this.min()
        var countNum = nb_classe
        while (countNum >= 2) {
            var id = parseInt((mat1[k][countNum]) - 2)
            kclass[countNum - 1] = this.valuesPrec[id]
            k = parseInt((mat1[k][countNum] - 1))

            countNum -= 1
        }

        if (kclass[0] == kclass[1]) {
            kclass[0] = 0
        }

        return this.generateClasses(kclass)
    }

    /**
     * Geometric distribution
     * @param  {Number} nb_classe
     * @return {[Classe]}
     */
    geometric(nb_classe) {
        const result = []
        const min = Math.min(...this.valuesPrec)
        const max = Math.max(...this.valuesPrec)

        if (min <= 0) {
            throw "Geometric discretisation cannot be done with null or negative values"
        }

        const logMin = Math.log(min) / Math.log(10)
        const logMax = Math.log(max) / Math.log(10)
        const logReason = (logMax - logMin) / nb_classe
        const reason = Math.pow(10, logReason)

        let minValue = min
        let maxValue = Math.round(min * reason)

        let cls_prev = new Classe(minValue, maxValue)
        let cls_next

        result.push(cls_prev)

        for (let i = 1; i < nb_classe; i++) {
            minValue = cls_prev.max + 1
            maxValue = Math.round((minValue - 1) * reason)
            cls_next = new Classe(minValue, maxValue)
            result.push(cls_next)

            cls_prev = cls_next
        }

        cls_prev.max = max

        if (this.precision !== 0) {
            result.forEach(c => {
                c.min = c.min / this.precision
                c.max = c.max / this.precision
            })
        }

        return result
    }

    /**
     * Equal amplitude distribution
     * @param  {Number} nb_classe
     * @return {[Classe]}
     */
    equalAmplitude(nb_classe) {
        const result = []
        const min = Math.min(...this.valuesPrec)
        const max = Math.max(...this.valuesPrec)

        const amplitude = Math.round((max - min) / nb_classe)

        let minValue
        let maxValue = this.getMaxPrecision(min + amplitude)

        let cls_prev = new Classe(min, maxValue)
        let cls_next

        result.push(cls_prev)

        for (let i = 1; i < nb_classe; i++) {
            minValue = cls_prev.max + 1
            maxValue = minValue + amplitude
            cls_next = new Classe(minValue, maxValue)
            result.push(cls_next)

            cls_prev = cls_next
        }

        cls_prev.max = max

        if (this.precision !== 0) {
            result.forEach(c => {
                c.min = c.min / this.precision
                c.max = c.max / this.precision
            })
        }

        return result
    }

    getQuantiles(nbClass) {
        let quantiles = []
        var step = this.size() / nbClass;
        for (var i = 1; i < nbClass; i++) {
            var qidx = Math.round(i * step + 0.49);
            quantiles.push(this.valuesPrec[qidx - 1]); // zero-based
        }

        return quantiles;
    }
    ;

    /**
     * Distribute values equally between a number of classes
     *
     * @param  {integer} nb_classe number of classes
     * @return {[classe]} list of bounded classes
     */
    quantile(nb_classe) {
        let quantiles = this.getQuantiles(nb_classe)
        quantiles.unshift(this.min());

        if (quantiles[quantiles.length - 1] !== this.max()) {
            quantiles.push(this.max());
        }

        return this.generateClasses(quantiles)
    }

    /**
     * Generate the classes from an array of bounds
     * @param  {[Numbers]} bounds array of numbers
     * @return {[Classes]}  array of classes
     */
    generateClasses(bounds) {
        let result = []

        if (bounds.length === 0) {
            return result
        }

        let min = Math.min(...this.valuesPrec)
        let max = Math.max(...this.valuesPrec)

        let cls_prev = new Classe(
            min,
            bounds[1]
        )

        result.push(cls_prev)

        let cls_next

        for (let i = 2; i < bounds.length; i++) {
            cls_next = new Classe(bounds[i - 1] + 1, bounds[i])
            result.push(cls_next)
            cls_prev = cls_next
        }

        cls_prev.max = max

        if (this.precision !== 0) {
            result.forEach(c => {
                c.min = c.min / this.precision
                c.max = c.max / this.precision
            })
        }

        return result
    }

    getMinPrecision(min) {
        return min
    }

    getMaxPrecision(max) {
        return max
    }
}

export {
    Stat
    ,
    Classe
}
