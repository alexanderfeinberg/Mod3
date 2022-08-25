/*
Make fetch requests in the browser for each of the following tasks.
Paste your code for fetch requests here once you finish each task.
*/

/* =============================== Phase 1 ================================ */
/*
  Make a request with fetch request to GET /posts and print the response
  components to the console.
*/

// Your code here
fetch('/posts').then(result => result.json()).then(res => console.log(res))

/* =============================== Phase 2 ================================ */
/*
  Make a request with fetch request to POST /posts and print the response
  components to the console.
*/

// Your code here

async function myTest(){
  const url ='/posts'
  const body={"message":"newMessage"}
  const bodyObj = JSON.stringify(body)
  // return fetch(url, {method:'POST', headers:{"Content-Type":"application/json"},body:bodyObj})
  const result = await fetch(url, {method:'POST', headers:{"Content-Type":"application/json"},body:bodyObj})
  const jsonResp = await result.json()
  console.log(jsonResp)
}
// myTest().then(resp => resp.json()).then((respBody)=>console.log(respBody))
