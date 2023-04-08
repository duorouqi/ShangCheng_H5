export function getbiaozhunku(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/getModeDataPageList/biaozhunku?datajson=${data}`, //仅为示例，并非真实接口地址。
			method: 'post',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export function postAddbzk(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/saveOrUpdateModeData/Addbzk`, //增加标准户型
			method: 'post',
			 header: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			},
			data:{datajson:data},
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export function postUpdatebzk(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/saveOrUpdateModeData/Updatebzk`, //更新标准户型
			method: 'post',
			 header: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			},
			data:{datajson:data},
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export function postUpdatejpk(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/saveOrUpdateModeData/Updatejpknew`, //更新竞品户型
			method: 'post',
			 header: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			},
			data:{datajson:data},
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}


export function postAddjpk(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/saveOrUpdateModeData/Addjpk`, //增加标准户型
			method: 'post',
			header: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			},
			data:{datajson:data},
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export function updatebzkfj(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/saveOrUpdateModeData/updatebzkfj?datajson=${data}`, //增加标准户型
			method: 'post',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export function getjingpinku(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/getModeDataPageList/jpk?datajson=${data}`, //仅为示例，并非真实接口地址。
			method: 'post',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}
let filesFn = async (myBlob, name, type) => {
	let res = await new window.File([myBlob], name, {
		type: type
	})
	return res
}


export function upImg(data,name) {
	return new Promise(function(resolve, reject) {
		let xhr = new XMLHttpRequest()
		xhr.open('GET', data.url, true)
		xhr.responseType = 'blob'
		xhr.onload = async function(e) {
			if (this.status == 200) {
				let myBlob = this.response
				let files = await filesFn(myBlob, data.name, myBlob.type) // myBlob.type 自定义文件名

				console.log(files, '--')
				
					uni.uploadFile({
						url: '/api/formmode/card/docUpload?detailtype=2&category=,,9541&mainId=&subId=&secId=9541', //仅为示例，并非真实接口地址。
						filePath: data.url,
						name: 'file',
						formData: {
							name: data.name,
						},
						success: (uploadFileRes) => {
							resolve({uploadFileRes:JSON.parse(uploadFileRes.data),files})
						},

					});
			}
		}
		xhr.send()


	});
}


export function checkLogin(loginid, userpassword) {
	return new Promise(function(resolve, reject) {
		// console.log(userpassword.toS)
		//做一些异步操作
		uni.request({
			url: `/api/hrm/login/checkLogin?loginid=${loginid}&userpassword=${userpassword.toString()}`, //仅为示例，并非真实接口地址。
			method: 'post',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}
// 获取项目
export function getProject(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/getModeDataPageList/getProject?datajson=${data}`, //仅为示例，并非真实接口地址。
			method: 'post',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}
// 获取收藏列表
export function getCollectionList(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/getModeDataPageList/hxsc?datajson=${data}`, //仅为示例，并非真实接口地址。
			method: 'POST',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

//新增收藏列表数据
export function addCollectionList(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/saveOrUpdateModeData/addCollection`, //仅为示例，并非真实接口地址。
			method: 'post',
			header: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			},
			data:{datajson:data},
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}
//删除收藏列表数据
export function delCollectionList(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/deleteModeDataByPK/deleteCollection?datajson=${data}`, //仅为示例，并非真实接口地址。
			method: 'POST',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}
//更新标准库收藏
export function updateCollectionStandard(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/saveOrUpdateModeData/updateBzkCollection?datajson=${data}`, //仅为示例，并非真实接口地址。
			method: 'POST',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}
//更新竞品库收藏
export function updateCollectionCompete(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/saveOrUpdateModeData/updateJpkCollection?datajson=${data}`, //仅为示例，并非真实接口地址。
			method: 'POST',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export function selectCollection(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/getModeDataPageCount/selectCollection?datajson=${data}`, //仅为示例，并非真实接口地址。
			method: 'POST',
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export function Rolesaer(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/getModeDataPageList/Roles`, //增加标准户型
			method: 'post',
			 header: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			},
			data:{datajson:data},
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export function selectRoles(data) {
	return new Promise(function(resolve, reject) {
		//做一些异步操作
		uni.request({
			url: `/api/cube/restful/interface/getModeDataPageList/selectRoles`, //获取角色权限
			method: 'post',
			 header: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
			},
			data:{datajson:data},
			success: (res) => {
				resolve(res.data)
			},
			fail: (res) => {
				reject(res)
			}
		});
	});
}

export let layers = [{
	id: '',
	name: '不限',
	typeCheck: true
}, {
	id: 0,
	name: '高层',
	typeCheck: false
}, {
	id: 1,
	name: '小高层',
	typeCheck: false
}, {
	id: 2,
	name: '多层',
	typeCheck: false
}]
export let layerss = [{
	id: 0,
	name: '高层',
	typeCheck: false
}, {
	id: 1,
	name: '小高层',
	typeCheck: false
}, {
	id: 2,
	name: '多层',
	typeCheck: false
}]

export let location = [{
	id: '',
	name: '不限',
	typeCheck: true
}, {
	id: 0,
	name: 'A标',
	typeCheck: false
}, {
	id: 1,
	name: 'B标',
	typeCheck: false
}, {
	id: 2,
	name: 'C标',
	typeCheck: false
}]

export let bzlocation = [{
	id: 0,
	name: 'A标',
	typeCheck: false
}, {
	id: 1,
	name: 'B标',
	typeCheck: false
}, {
	id: 2,
	name: 'C标',
	typeCheck: false
}]

export let jplocation = [{
	id: '',
	name: '不限',
	typeCheck: true
}, {
	id: '北京',
	name: '北京',
	typeCheck: false
}, {
	id: '上海',
	name: '上海',
	typeCheck: false
}, {
	id: '广州',
	name: '广州',
	typeCheck: false
}, {
	id: '天津',
	name: '天津',
	typeCheck: false
}, {
	id: '烟台',
	name: '烟台',
	typeCheck: false
}, {
	id: '西安',
	name: '西安',
	typeCheck: false
}]

export let locations = [{
	id: 0,
	name: '豪华',
	typeCheck: false
}, {
	id: 1,
	name: '改善',
	typeCheck: false
}, {
	id: 2,
	name: '刚需',
	typeCheck: false
}]
export let jacketed = [{
		id: '',
		name: '不限',
		typeCheck: true
	},{
		id: 0,
		name: '2室2厅1卫',
		typeCheck: false
	},
	{
		id: 1,
		name: '2室2厅2卫',
		typeCheck: false
	},
	{
		id: 2,
		name: '3室2厅2卫',
		typeCheck: false
	},
	{
		id: 3,
		name: '3室2厅3卫',
		typeCheck: false
	},
	{
		id: 4,
		name: '4室2厅2卫',
		typeCheck: false
	},
	{
		id: 5,
		name: '4室2厅3卫',
		typeCheck: false
	},
	{
		id: 6,
		name: '4室2厅4卫',
		typeCheck: false
	}
]
export let jacketeds = [{
		id: 0,
		name: '2室2厅1卫'
	},
	{
		id: 1,
		name: '2室2厅2卫'
	},
	{
		id: 2,
		name: '3室2厅2卫'
	},
	{
		id: 3,
		name: '4室2厅2卫'
	},
	{
		id: 4,
		name: '4室2厅3卫/4卫'
	},
	{
		id: 5,
		name: '3室2厅1卫'
	},
	{
		id: 6,
		name: '3室2厅3卫'
	},
	{
		id: 7,
		name: '其他'
	}
]

export let jpjacketeds = [{
		id: 0,
		name: '2室2厅1卫'
	},
	{
		id: 1,
		name: '2室2厅2卫'
	},
	{
		id: 2,
		name: '3室2厅2卫'
	},
	{
		id: 3,
		name: '4室2厅2卫'
	},
	{
		id: 4,
		name: '4室2厅3卫/4卫'
	},
	{
		id: 5,
		name: '其他'
	}
]

export let screen = [{
		id: '',
		name: '不限',
		typeCheck: true
	},
	{
		id: 0,
		name: '90㎡以下',
		typeCheck: false
	},
	{
		id: 1,
		name: '90-100㎡',
		typeCheck: false
	},
	{
		id: 2,
		name: '100-120㎡',
		typeCheck: false
	},
	{
		id: 3,
		name: '120-130㎡',
		typeCheck: false
	},
	{
		id: 4,
		name: '140-150㎡',
		typeCheck: false
	},
	{
		id: 5,
		name: '160㎡左右',
		typeCheck: false
	},
	{
		id: 6,
		name: '190㎡左右',
		typeCheck: false
	},
	{
		id: 7,
		name: '200㎡左右',
		typeCheck: false
	},
	{
		id: 8,
		name: '240㎡左右',
		typeCheck: false
	},
	{
		id: 9,
		name: '260㎡左右',
		typeCheck: false
	},
	{
		id: 10,
		name: '300㎡',
		typeCheck: false
	},
	{
		id: 11,
		name: '500㎡',
		typeCheck: false
	},
	{
		id: 12,
		name: '其他',
		typeCheck: false
	}
]

export let screens = [{
		id: 0,
		name: '90㎡以下',
		typeCheck: false
	},
	{
		id: 1,
		name: '90-100㎡',
		typeCheck: false
	},
	{
		id: 2,
		name: '100-120㎡',
		typeCheck: false
	},
	{
		id: 3,
		name: '120-130㎡',
		typeCheck: false
	},
	{
		id: 4,
		name: '140-150㎡',
		typeCheck: false
	},
	{
		id: 5,
		name: '160㎡左右',
		typeCheck: false
	},
	{
		id: 6,
		name: '190㎡左右',
		typeCheck: false
	},
	{
		id: 7,
		name: '200㎡左右',
		typeCheck: false
	},
	{
		id: 8,
		name: '240㎡左右',
		typeCheck: false
	},
	{
		id: 9,
		name: '260㎡左右',
		typeCheck: false
	},
	{
		id: 10,
		name: '300㎡',
		typeCheck: false
	},
	{
		id: 11,
		name: '500㎡',
		typeCheck: false
	},
	{
		id: 12,
		name: '其他',
		typeCheck: false
	}
]
export let lxlist = [{
		value: 0,
		name: '板式',
		type: 'lx'
	},
	{
		value: 1,
		name: '连廊',
		type: 'lx'
	},
	{
		value: 2,
		name: '其他',
		type: 'lx'
	}
]
export let kfpjlist = [{
		value: 0,
		name: '是',
		type: 'kfpj'
	},
	{
		value: 1,
		name: '否',
		type: 'kfpj'
	}
]
export let bzctslist = [{
	value: '0',
	name: 'T1',
	type: 'bzcts'

}, {
	value: '1',
	name: 'T2',
	type: 'bzcts'
}, {
	value: '2',
	name: 'T3',
	type: 'bzcts'
}, {
	value: '3',
	name: 'T4',
	type: 'bzcts'
}, {
	value: '4',
	name: 'T5',
	type: 'bzcts'
}, {
	value: '5',
	name: 'T6',
	type: 'bzcts'
}, {
	value: '6',
	name: '其他',
	type: 'bzcts'
}]
export let sfdtrhlist = [{
	value: '0',
	name: 'Y',
	type: 'sfdtrh'
}, {
	value: '1',
	name: 'N',
	type: 'sfdtrh'
}, {
	value: '2',
	name: '其他',
	type: 'sfdtrh'
}]
export let xmztlist = [{
	value: '0',
	name: '拿地',
	type: 'xmzt'
}, {
	value: '1',
	name: '报批',
	type: 'xmzt'
}, {
	value: '2',
	name: '装修',
	type: 'xmzt'
}, {
	value: '3',
	name: '竣工',
	type: 'xmzt'
}]
