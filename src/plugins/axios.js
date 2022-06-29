import axios from "axios"
import axiosConfig from "./axiosConfig"
import { ElMessage } from "element-plus"
//基础url
axios.defaults.baseURL = axiosConfig.baseURL//测试端口
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
//设置超时
axios.defaults.timeout = 10000;
//token拦截器
axios.interceptors.request.use(config => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = "Bearer " + token;
	}
	return config;
}, error => {
	return Promise.reject(error);
})


axios.interceptors.response.use(
	response => {
		if (response.status == 200) {
			if (response.data !== "" && response.data.code != 200) {
				ElMessage({
					message: response.data.msg,
					type: "error"
				})
			}
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	error => {
		ElMessage({
			message: error.message,
			type: "error"
		})
	}
);
const Axios = {
	post({ url, data, params }) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'post',
				url,
				data: data,
				params: params
			})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				});
		})
	},

	get({ url, params }) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'get',
				url,
				params: params,
			})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	put({ url, data, params }) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'put',
				url,
				data: data,
				params: params
			})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	delete({ url, params }) {
		return new Promise((resolve, reject) => {
			axios({
				method: 'delete',
				url,
				params: params,
			})
				.then(res => {
					resolve(res.data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},
};

export default Axios;