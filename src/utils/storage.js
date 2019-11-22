/* 
localStorage工具模块
*/
//设置
export function setItem(key,value) {
    try {//放可能出错代码
         value = JSON.stringify(value);
    } finally {
        //不管成功,失败都会触发
        window.localStorage.setItem(key, value);
   }
}


//获取
export function getItem(key) {
    const value = window.localStorage.getItem(key);
    try {
        //如果value是一个基本类型数据,调用JSDON.parse会报错
        return JSON.parse(value);
    } catch{
        return value;
    }
}


//删除
export function removeItem(key) {
    window.localStorage.removeItem(key);
}
