const base_url='http://localhost:5001'
export function getAllDogs() {
    // Your code here
    // const url = base_url+'/dogs'
    return fetch('/dogs')
}

export function getDogNumberTwo() {
    // Your code here
    return fetch('/dogs/2')
}

export function postNewDog() {
    // Your code here
    const options = {method:"POST",headers:{"Content-Type":'application/x-www-form-urlencoded'},body:new URLSearchParams({name:'Alex',age:22})}
  return fetch('/dogs', options)
}

export function postNewDogV2(name, age) {
     // Your code here

     const url = '/dogs'
     const body = new URLSearchParams({name:name, age:age})
     const headers = {"Content-Type":'application/x-www-form-urlencoded'}
    return fetch(url, {method:"POST",headers:headers,body:body})
    }

export function deleteDog(id) {
      // Your code here
      const authKey = 'ckyut5wau0000jyv5bsrud90y'
      const url  = `/dogs/${id}/delete`
      const headers = {"AUTH":authKey}
      return fetch(url, {method:"POST", headers:headers})

}
