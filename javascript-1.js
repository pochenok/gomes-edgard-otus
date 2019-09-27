function summing(a) {
    var summ = a;
    return function inner(b) {
        if (arguments.length) {
            summ += b;
            return inner
        } else {
            return summ
        }
    }
}

var test_sum = summing(1)(2)(10)()
console.log(test_sum)