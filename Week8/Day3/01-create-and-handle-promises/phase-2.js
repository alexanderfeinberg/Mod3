function stretch(timeLeft) {
  // refactor your code from phase 1
  // Your code here
  calcTimeLeft(1000, timeLeft, 'stretch')
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve('done stretching'), 1000)
  })

}


function runOnTreadmill(timeLeft) {
  // refactor your code from phase 1
  // Your code here
  calcTimeLeft(500, timeLeft, 'run on treadmill')
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve('done running on treadmill'), 500)
  })
}


function liftWeights(timeLeft) {
  // refactor your code from phase 1
  // Your code here
}


function workout(totalTime) {
  console.log('aaaa')
  actObj = {'stretch':1000, 'run':500, 'lift':2000}
  stretch(totalTime).then(result=>console.log(result)).then(()=> totalTime = totalTime-1000).then(()=>runOnTreadmill(totalTime));

  // .then(result=>console.log(result)).then(()=>console.log(totalTime))



  // refactor your code from phase 1
  // Your code here
}

function calcTimeLeft(timeReq, timeLeft, activity){
  if(timeLeft<timeReq){
    throw Error(`you dont have enough time to ${activity}`)
  }
  return true
}

/* ============================ TEST YOUR CODE ============================

Comment in each invocation of your workout function below and run the file
(node phase-2.js) to see if you get the expected output.
*/


workout(1200);
  // should print out the following:
    // Error:  you dont have enough time to stretch


// workout(1000);
  // should print out the following:
    // done stretching
    // Error:  you dont have enough time to run on treadmill


// workout(2000);
  // should print out the following:
    // done stretching
    // done running on treadmill
    // Error:  you dont have enough time to lift weights


// workout(4000);
  // should print out the following:
  //   done stretching
  //   done running on treadmill
  //   done lifting weights
  //   done working out with 0.5 seconds left
