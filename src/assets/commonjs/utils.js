/**
 * 从时间戳到时间
 * @param timestamp
 * @returns {string}
 */

import http from "./http";

export function timestampToTime(timestamp) {
  function paseDateSingular(time) {
    if (time < 10) {
      return "0" + time
    } else {
      return time
    }
  }

  const dates = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const DY = dates.getFullYear() + '-',
    DM = paseDateSingular(dates.getMonth() + 1) + '-',
    DD = paseDateSingular(dates.getDate()) + ' ',
    Dh = paseDateSingular(dates.getHours()) + ':',
    Dm = paseDateSingular(dates.getMinutes());
  return DY + DM + DD + Dh + Dm;
}

/**
 * 下载
 * @param timestamp
 * @returns {string}
 */
export default {
  downloadFile(index) {
    if (index.fileName) {
      http('file', `fromLs/downLoadFile?verId=${index.verId}`, {}).then(data => {
        if ('download' in document.createElement('a')) {
          const elink = document.createElement('a');
          elink.download = index.fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(data.data);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        } else {
          navigator.msSaveBlob(data.data, index.fileName);
        }
      })

    }
  },
}

/**
 * 根据流程状态去显示进度条
 * @param timestamp
 * @returns {string}
 */

export function lcChangejd(type,status) {
  if(type === 20){//设计方案
    switch (status) {
      case 10:
        return '2';
      case 20:
      case 30:
      case 40:
      case 50:
        return '3';
      case 60:
        return '4';
      default:
        return '1'
    }
  }else if(type === 30){//施工许可
    switch (status) {
      case 10:
        return '2';
      case 20:
      case 30:
      case 40:
        return '3';
      case 50:
        return '4';
      default:
        return '1'
    }
  }else if(type === 60){//竣工验收
    switch (status) {
      case 10:
        return '2';
      case 20:
        return '3';
      case 30:
        return '4';
      default:
        return '1'
    }
  }
}


/**
 * 根据子流程状态去转换成（接收、受理、办结）
 * @param timestamp
 * @returns {string}
 */

export function zlcChange(type,val) {
  let status = Number(val);
  let hz = '';
  if(type === 1){ //设计方案
    if(status >= 20105 && status <= 20107){
      hz = '接收';
    }else if(status == 20108 || (status >= 20110 && status <= 20114)){
      hz = '受理';
    }else if(status == 20109 || (status >= 20115 && status <= 20116)){
      hz = '办结';
    }
  }else if(type === 2){ //施工许可
    if(status >= 30107 && status <= 30109){
      hz = '接收';
    }else if(status == 30110 || (status >= 30112 && status <= 30125)){
      hz = '受理';
    }else if(status == 30111 || (status >= 30126 && status <= 30127)){
      hz = '办结';
    }
  }else if(type === 3){ //竣工验收
    if(status >= 60105 && status <= 60107){
      hz = '接收';
    }else if(status == 60108 || (status >= 60110 && status <= 60111)){
      hz = '受理';
    }else if(status == 60109 || (status >= 60112 && status <= 60113)){
      hz = '办结';
    }
  }
  return hz
}

