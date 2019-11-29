/* 
封装axios
*/
import axios from "axios";
import { message } from "antd";
import store from "../redux/store";
import { removeItem } from "../utils/storage";
import { removeUserSuccess } from "../redux/action-creator/user";
import codeMsg from "../config/code-message";
import history from "../utils/history";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", //基础路径,所有请求的公共路径
  timeout: 10000, //如果请求超过该时间,就中断该请求
  headers: {
    //存放公共的请求参数,这里无法放token,是因为token初始化为空
  }
});

axiosInstance.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.headers["content-type"] = "application/x-www-form-urlencoded";
      config.data = Object.keys(config.data)
        .reduce((prev, key) => {
          let value = config.data[key];

       /*    const type = Object.prototype.toString.call(value).slice(8, -1);
          if (type === "Object" || type === "Array") {
            value = JSON.stringify(value);
          } */

          return prev + `&${key}=${value}`;
        }, "")
        .substring(1);
    }

    const {
      user: { token }
    } = store.getState();
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }

    /*  if (token) {
        config.headers.authorization = "Bearer " + token;
      } */
    return config;
  },

  //将要发送请求是失败的(内部出错了)触发回调函数
  error => {
    return Promise.reject(error);
  }
);

//响应拦截器
axiosInstance.interceptors.response.use(
  ({ data }) => {
    //响应成功触发(status:[200,300])
    //统一处理:功能成功/失败,类似于中间件,在响应成功之后得到数据,包装一下再给用户
    if (data.status === 0) {
      //如果响应成功,返回数据
      return data.data;
    } else {
      message.error(data.msg); //服务端返回的数据
      //如果响应失败,返会Promise.reject,让其身上的then方法自行触发catch
      return Promise.reject("来自200-300状态的错误"); //这里响应的错误是指服务器响应状态码是200-300
    }
  },
  err => {
    //响应失败触发的回调函数(该函数会在各种失败的场景下触发)
    let errMsg = "";
    if (err.response) {
      //如果有值说明服务器有响应
      errMsg = codeMsg[err.response.status] || "未知错误"; //返回对应的响应状态码,没有状态码的返回未知错误

      if (err.response.status === 401) {
        //如果状态码为401,说明token有问题,/
        removeItem(); //清空localStorage
        store.dispatch(removeUserSuccess()); //清空redux
        history.push("./login"); //重定向到login页面
      }
    } else {
      //如果没有值,说明服务器没有响应
      if (err.message.indexOf("Network Error") !== -1) {
        errMsg = "网络未连接";
      } else if (err.message.indexOf("timeout") !== -1) {
        errMsg = "请求超时";
      } else {
        errMsg = "未知错误";
      }
    }
    console.dir(err); //err.response如果有值说明服务器有响应,否则是undefined
    message.error(errMsg);
    return Promise.reject(errMsg);
  }
);

export default axiosInstance;
