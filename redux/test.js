function add1(str) {
    return '1' + str;
}
function add2(str) {
    return '2' + str;
}
function add3(str) {
    return '3' + str;
}
function compose1(...fns) {
    return function (...args) {
        let last = fns.pop();
        return fns.reduceRight(function (val, fn) {
            return fn(val);
        }, last(...args))
    }
}

function compose3(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

let result = compose3(add3, add2, add1)('zfpx');
console.log(result);