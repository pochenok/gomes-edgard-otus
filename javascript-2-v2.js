var fn1 = fn_name => {
  console.log(`${fn_name}: fn1`);
  return Promise.resolve(1);
};

var fn2 = fn_name =>
  new Promise(resolve => {
    console.log(`${fn_name}: fn2`);
    setTimeout(() => resolve(2), 1000);
  });

function promiseReduce(asyncFunctions, reduce, initialValue) {
  const fn_name = arguments.callee.name;
  return asyncFunctions.reduce((promise, asyncFunc) => {
    return promise.then(result => {
      return asyncFunc(fn_name).then(result2 => {
        return Promise.resolve(reduce(result, result2, fn_name));
      });
    });
  }, Promise.resolve(initialValue));
}

function promiseReduceAsync(asyncFunctions, reduce, initialValue) {
  const fn_name = arguments.callee.name;
  return asyncFunctions.reduce(async (promise, asyncFunc) => {
    let result = await promise;
    return asyncFunc(fn_name).then(result2 => {
      return Promise.resolve(reduce(result, result2, fn_name));
    });
  }, Promise.resolve(initialValue));
}

async function promiseReducePureAsync(asyncFunctions, reduce, initialValue) {
  const fn_name = arguments.callee.name;
  let reduced = initialValue;
  for (const func of asyncFunctions) {
    let result = await func(fn_name);
    reduced = reduce(reduced, result, fn_name);
  }
  return reduced;
}

async function runAll() {
  await promiseReduce(
    [fn1, fn2],
    function(memo, value, fn_name) {
      console.log(`${fn_name}: reduce`);
      return memo * value;
    },
    1
  ).then((result) => console.log('promiseReduce:', result));
  await promiseReduceAsync(
    [fn1, fn2],
    function(memo, value, fn_name) {
      console.log(`${fn_name}: reduce`);
      return memo * value;
    },
    1
  ).then((result) => console.log('promiseReduceAsync:', result));
  await promiseReducePureAsync(
    [fn1, fn2],
    function(memo, value, fn_name) {
      console.log(`${fn_name}: reduce`);
      return memo * value;
    },
    1
  ).then((result) => console.log('promiseReducePureAsync:', result));
}

runAll()
