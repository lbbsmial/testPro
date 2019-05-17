import {baseUrl} from "./env";
import axios from 'axios';

export default function $http(type, url, data = {}) {
  if (type.toUpperCase() === 'POST') {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + url,
        method: 'post',
        ache: false, //防止get请求有缓存
        // data: this.$qs.stringify(data)
        data:data
      }).then((result) => {
        resolve(result.data);
      }).catch(err => {
        reject(err);
      });
    })
  } else if (type.toUpperCase() === 'GET') {
    return new Promise((resolve, reject) => {
      axios({
        url: baseUrl + url,
        method: 'get',
        ache: false, //防止get请求有缓存
        // data: this.$qs.stringify(data)
        data:data
      }).then((result) => {
        resolve(result.data);
      }).catch(err => {
        reject(err);
      });
    })
  }else if(type.toLowerCase() == "file"){
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: baseUrl + url,
        data: {},
        responseType:'blob',
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err);
      });
    })
  }
}

