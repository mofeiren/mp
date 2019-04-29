import request from "@/router/axios";

export function fetchData() {
	return request({
		url: '/static/resource/mock/data.json',
		method: 'GET'
	})
}
export function submitMenu(obj){
	obj = JSON.parse(obj)
	return request({
    // url: 'http://127.0.0.1/mp/menu/create',
    url: 'http://localhost:8081/mp/menu/create',
    method: 'post',
    data:{data:obj}
  })
}