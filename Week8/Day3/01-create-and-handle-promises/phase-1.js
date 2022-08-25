function stretch() {
  // Your code here
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve("done stretching"), 1000)
  })
}

function runOnTreadmill() {
  // Your code here
  return new Promise((resolve,reject)=>{
    setTimeout(()=>resolve('done running on treadmill'), 500)
  })
}

function liftWeights() {
  // Your code here
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve('done lifting weights'), 2000)
  })
}

function workout() {
  // Your code here
  const superPromise = Promise.all([stretch(), runOnTreadmill(), liftWeights()])
  // stretch().then(result=>{console.log(result)})
  // runOnTreadmill().then(result=>{console.log(result)})
  // liftWeights().then(result=>{console.log(result)})
  superPromise.then(values=>values.forEach(val => console.log(val))).then(()=>console.log('done working out'))
}


/* ============================ TEST YOUR CODE ============================

Run the file (`node phase-1.js`) and check your output against the expected
output.
*/


workout();
  // should print out the following:
    // done stretching
    // done running on treadmill
    // done lifting weights
    // done working out
