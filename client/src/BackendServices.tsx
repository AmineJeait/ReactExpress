import axios from "axios";



export default class RestResource {

    static sendRequest(route:string, data:object) {
        return new Promise((resolve, reject) => {
            // Do something here... lets say, a http call using vue-resource
            axios.post("http://localhost:8080/api/"+route,
                {
                    data
                }
                ,{
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    }
                }
            ).then(response => {
                // http success, call the mutator and change something in state
                resolve(response);  // Let the calling function know that http is done. You may send some data back
            }, error => {
                // http failed, let the calling function know that action did not work out
                reject(error);
            })
        })
    }
  
  }