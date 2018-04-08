import axios from 'axios';

export const Qs = () => {
    var sStr = window.location.search,
        params = {};
    if(sStr && sStr.length > 1){
      sStr = sStr.substring(1, sStr.length);
      var arr = sStr.split('&');
      for(var i = 0; i < arr.length; i++){
        var kv = arr[i].split('=');
        params[kv[0]] = kv[1];
      }
    }
    return params;
}
const params = Qs();
const $http = axios.create({
    timeout:60000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'merchantNo':params.merchantNo,
        'sessionid': params.sessionId || params.sessionid,
    },
    responseType: 'json'
});

$http.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

export {$http}

export const toFix = (num) => {
    if(!isNaN(num)){
        return (num/100).toFixed(2);
    }
    return num;
}

const checkNum = (n) => {
    return n < 10 ? ("0" + n) : n;
}

export const DateF = (time, f) => {
    if(time){
        let d = new Date(time);
        let YMd = d.getFullYear() + '-' + checkNum(d.getMonth() + 1) + "-" + checkNum(d.getDate());
        let Hms = checkNum(d.getHours()) + ":" + checkNum(d.getMinutes()) + ":" + checkNum(d.getSeconds());
        if(f === 'date'){
            return YMd;
        }
        return YMd + " " + Hms;
    }
    return time;
}

export const DateFN = (time) => {
    if(time){
        let nY = (new Date()).getFullYear();
        let d = new Date(time);
        if(d.getFullYear() === nY){
            return checkNum(d.getMonth() + 1) + "-" + checkNum(d.getDate()) + " " + checkNum(d.getHours()) + ":" + checkNum(d.getMinutes());
        }else{
            let YMd = d.getFullYear() + '-' + checkNum(d.getMonth() + 1) + "-" + checkNum(d.getDate());
            let Hm = checkNum(d.getHours()) + ":" + checkNum(d.getMinutes());
            return YMd + " " + Hm;
        }
    }
    return time;
}

export const ShareFn = () => {
    if(isiOS){
        return shareMethod
    }else{
        return nativeMethod.shareMethod
    }
}