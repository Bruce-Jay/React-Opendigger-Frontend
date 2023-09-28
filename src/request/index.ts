import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3006/';

axios.defaults.timeout = 10000;

const get = async(url: any, params: any) => {
    return await axios.get(url, { params })
}

const post = async(url: any, params: any) => {
    return await axios.post(url, params)
}

export {get, post}
