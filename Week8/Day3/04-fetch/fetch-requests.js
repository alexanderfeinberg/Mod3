/*
Make fetch requests in the browser for each of the following tasks.
Paste your code for fetch requests here once you finish each task.
*/

/* =============== 1. Print the status code of the response =============== */
function printResult(res){
    console.log(res.status, res.headers.get('Content-Type'), res.text())
}
// Your code here
async function myFunc(){
    const res = await fetch('/products');
    printResult(res)


}

/* ====== 2. Print true if the status of the response was successful ====== */

// Your code here
if(res.status === 200) return true



/* =================== 3. Print the Content-Type Header =================== */

// Your code here
console.log(res.headers.get('Content-Type'))



/* ============== 4. Print the body of the response as text =============== */

// Your code here
console.log(await res.text())
