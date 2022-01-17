
import axios from "axios";

const url = "http://localhost:3000/users/";

export  function getAll () {
    return axios.get(url);
}

export async function create(data) {
    console.log(JSON.stringify(data));
    return await axios.post(url, data);
}

export async function update(id,data) {
    return await axios.put(url + id, data);
}

export async function remove(id){
    return await axios.delete(url+id);
}

