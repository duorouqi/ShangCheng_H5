<template>
	<view class="box">
		<view style="text-align: center;font-weight: 600;background: rgb(255,255,255)" class="bzhxcpo">
			<span>{{details.hxbh}}标准户型详细信息</span></view>
		<view class="top">
			<view style="with:100%;height: 580rpx;;background: rgb(255,255,255);border-radius: 0px 0px 38px 38px;">


				<view class="collection" @click.stop="changeCollectionState">
					<u-icon name="star" class='active' size="14" color="#fff" v-if="isCollection"></u-icon>
					<u-icon name="star" class='active2' size="14" color="#000" v-if="!isCollection"></u-icon>
				</view>
				<view class="imager-box">
					<u-image :showLoading="true" :src="details.cftpurl" width="100%" class='imager'
						@click="hxkShow(details.cftpurl)"></u-image>
				</view>
			</view>
			<view class="huxytr">

			</view>

			<!-- <view class="collection">
				<u-icon name="star" color='#fff' size="18"></u-icon>
			</view> -->
			<!-- <img :src="details.cftpurl" alt=""> -->
			<!-- <view class="addBox">
				<view class="reduce" @click="reduce">-</view>
				<view class="u-number-box">
					{{number}}
				</view>
				<view class="add" @click="add">+</view>
			</view> -->
			<view class="info">
				<view class="title" style="margin-bottom: 54rpx;">
					<view>
						户型基本信息
					</view>
					<view @click="detailsOpen">
						<u-icon name="list"></u-icon>
					</view>
				</view>
				<view class="details">
					<view>定位：{{details.dw}}</view>
					<view style="display: flex;justify-content: space-between;"><span>层数：{{details.cs}}</span>

						<span style="display: flex;justify-content: space-between;">
							<u-icon name="star-fill" size="14" color="#393F9D"></u-icon><span
								style="color: #000;">(<span
									style="font-weight: 800;color: #000;">{{pageCount}}</span>)</span>
						</span>
					</view>
					<view>标准面积层(㎡)：<text>{{details.bzcmj}}</text></view>
					<view>得房率：<text>{{details.dfl}}</text></view>
					<view style="width: 100%;">面积段：{{details.mjd}}</view>
					<view style="display: flex;width: 100%;">
						套型：{{details.tx}}
					</view>
					



					<view class="detailsShow" v-if="!detailsShow">
						<view>类型：<text>{{details.lx}}</text></view>
						<view>是否可拼接：<text>{{details.kfpj}}</text></view>
						<view>标准层套数：{{details.bzcts}}</view>
						<view>总面宽(m)：{{details.zmkm}}</view>
						<view>是否独梯入户：{{details.sfdtrh}}</view>
						<view>所在项目：{{details.szxm}}</view>
						<view>项目状态：{{details.xmzt}}</view>
						<view>所在项目楼号：{{details.szxmlh}}</view>
						<view style="width: 100%;">建筑方案设计院：{{details.jzfasjy}}</view>
						<view style="width: 100%;">户型特点:{{details.hxtd}}</view>
						<!-- <view style="width: 100%;">缺点:</view> -->

					</view>

					<!-- <view>套内面积：</view>
					<view>阳台面积：</view>
					<view>公摊面积：</view>
					<view>标准层面积：{{details.bzcmj}}</view>
					<view>建筑面积：</view>
					<view>户型结构：</view>
					<view>得房率：</view>
					<view>可否拼接：</view> -->





					<!-- <view style="width: 100%;margin: 30rpx 0;">该户型所在项目</view>
					<view>建筑设计：</view>
					<view>室内设计：</view> -->
				</view>
				<!-- <view class="title" style="margin-top: 47rpx;margin-bottom: 20rpx;">
					户型特点
				</view> -->

				<view class="title" style="margin-top: 47rpx;margin-bottom: 20rpx;">
					户型相关图片
				</view>
				<view class="imgArry">
					<u-image :showLoading="true" v-for="item in imgArry" :src="item.src" class='img'
						@click="previewShow(item)"></u-image>
				</view>

			</view>
		</view>
		<view class="operation">
			
			<view class="login" @click="downloadHttps(details.fjid,details.dwgwjxz)">点击下载文件</view>
			<!-- <view class="register">查看相似户型</view> -->
		</view>

		<!-- <u-popup :show="show" mode="center" @close="closeShow">
			<image mode="widthFix"   :src="srcs" @click="saveImg(src)"></image>
		</u-popup> -->
		<view>
				<u-action-sheet :actions="list" :show="show" @select="selectClick" :closeOnClickOverlay="true" :closeOnClickAction="true"></u-action-sheet>
			</view>
	</view>


</template>

<script>
	import {
		getCollectionList,
		addCollectionList,
		delCollectionList,
		selectCollection
	} from '../../api/publice.js'
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				list: [
								
								{
									name: '预览图片',
								
								},
								{
									name: '下载图片', //开启后文字不显示
									
								}
							],
				number: 0,
				details: {},
				imgArry: [],
				show: false,
				srcs: '',
				detailsShow: true,
				isCollection: false,
				pageCount: 0
			}
		},
		async created() {
			if (sessionStorage.getItem('details')) {
				this.details = JSON.parse(sessionStorage.getItem('details')).mainTable
				let imgArry = []
				for(let i = 0; i<this.details.hxturl.split(",").length; i++){
					let data ={};
					data.src = "https://oa.siud.com"+this.details.hxturl.split(',')[i]
					data.name = this.details.hxxgtp.split(',')[i]
					imgArry.push(data)
				}
				this.imgArry = imgArry
				// this.details.hxturl.split(',').forEach(item => {
				// 	console.log(this.details.hxxgtp.split(',')[0])
				// 	imgArry.push(`https://oa.siud.com${item}`)
				// })
				// this.details.hxxgtp.split(',').forEach(item => {
				// 	imgArry.push(`https://oa.siud.com${item}`)
				// })
				// this.imgArry = imgArry
			}


			this.getCollectionListData()
			let that = this
			try {
				let res = await selectCollection(JSON.stringify({
					"operationinfo": {
						"operator": JSON.parse(sessionStorage.getItem("user")).userid,
					},
					"mainTable": {
						"hxbh": that.details.hxbh,
					},
					"header": {
						"systemid": "selectCollection",
						"currentDateTime": that.setTime(),
						"Md5": md5("selectCollection" + 123 + that.setTime())
					}
				}))
				if (JSON.parse(res.result).pageCount) {
					this.pageCount = JSON.parse(res.result).pageCount
				}

			} catch (e) {
				//TODO handle the exception
			}
		},
		methods: {
			selectClick(index){
						if(index==0){
							
						}else{
							this.show=false
						}
					},
			// see(e) {
			// 	console.log(e) 
			// 	let indx = e.currentTarget.dataset.index // 找到点击图片的索引位置    
			// 	wx.previewImage({      current: this.data.pic[indx], // 当前显示图片的http链接，将点击图片的索引数指定好     
			// 	urls: this.data.pic ,// 需要预览的图片http链接列表
			// 	})},

				saveImg(src) {
						// let url = src.split("&")[0];
						let urlSrc = src + "&download=1"
						var oA = document.createElement("a");
						oA.download = ''; // 设置下载的文件名，默认是'下载'
						oA.href = urlSrc;
						oA.type = 'application/octet-stream;charset=utf-8';
						document.body.appendChild(oA);
						oA.click();
						oA.remove(); // 下载之后把创建的元素删除
					},
					downloadImg(src,name) {
							// let url = src.split("&")[0];
							let urlSrc = src + "&download=1&response-content-type=application/jpg&response-content-disposition=attachment%3Bfilename="+name
							console.log(urlSrc)
							var oA = document.createElement("a");
							oA.download = ''; // 设置下载的文件名，默认是'下载'
							oA.href = urlSrc;
							oA.type = 'application/octet-stream;charset=utf-8';
							document.body.appendChild(oA);
							oA.click();
							oA.remove(); // 下载之后把创建的元素删除
						},
					downloadHttps(id,name) {

							// let url = src.split("&")[0];
							let urlSrc = "https://oa.siud.com/weaver/weaver.file.FileDownload?fileid="+id+"&download=1&response-content-type=application/dwg&response-content-disposition=attachment%3Bfilename="+name
							console.log(urlSrc);
							var oA = document.createElement("a");
							oA.download = ''; // 设置下载的文件名，默认是'下载'
							oA.href = urlSrc;
							oA.type = 'application/octet-stream;charset=utf-8';
							document.body.appendChild(oA);
							oA.click();
							oA.remove(); // 下载之后把创建的元素删除
						},
					setTime() {
						const time = new Date();
						const Y = time.getFullYear()
						const M = (time.getMonth() + 1).toString().padStart(2, '0')
						const D = time.getDate().toString().padStart(2, '0')
						const h = time.getHours().toString().padStart(2, '0')
						const m = time.getMinutes().toString().padStart(2, '0')
						const s = time.getSeconds().toString().padStart(2, '0')
						return `${Y}${M}${D}${h}${m}${s}`
					},
					async getCollectionListData() {
							let that = this
							let res = await getCollectionList(JSON.stringify({
								"operationinfo": {
									"operator": JSON.parse(sessionStorage.getItem("user")).userid,
								},
								"mainTable": {
									"scr": JSON.parse(sessionStorage.getItem("user")).userid,
									"hxbh": that.details.hxbh,
									"hxlx": 0
								},
								"pageInfo": {
									"pageNo": "1",
									"pageSize": "10"
								},
								"header": {
									"systemid": "hxsc",
									"currentDateTime": that.setTime(),
									"Md5": md5("hxsc" + 123 + that.setTime())
								}
							}));
							if (JSON.parse(res.result) && JSON.parse(res.result).length > 0) {
								this.isCollection = true
							} else {
								this.isCollection = false
							}
						},
						async changeCollectionState() {
								this.isCollection = !this.isCollection
								let that = this;
								if (this.isCollection) {
									let res = await addCollectionList(JSON.stringify({
										"data": [{
											"operationinfo": {
												"operationDate": "",
												"operator": JSON.parse(sessionStorage.getItem("user"))
													.userid,
												"operationTime": ""
											},
											"mainTable": {
												"scr": JSON.parse(sessionStorage.getItem("user"))
													.userid,
												"hxbh": that.details.hxbh,
												"hxlx": 0,
												"tx": that.details.tx,
												"dwbz": that.details.dw,
												"mjd": that.details.mjd,
												"tpurl": that.details.cftpurl
											}
										}],
										"header": {
											"systemid": "addCollection",
											"currentDateTime": that.setTime(),
											"Md5": md5("addCollection" + 123 + that.setTime())
										}
									}));
								} else {
									let res = await delCollectionList(JSON.stringify({
										"operationinfo": {
											"operator": JSON.parse(sessionStorage.getItem("user")).userid,
											// "operator": 1,
										},
										"mainTable": {
											"scr": JSON.parse(sessionStorage.getItem("user")).userid,
											"hxbh": that.details.hxbh,
										},
										"header": {
											"systemid": "deleteCollection",
											"currentDateTime": that.setTime(),
											"Md5": md5("deleteCollection" + 123 + that.setTime())
										}
									}))
								}
							},
							detailsOpen() {
								this.detailsShow = !this.detailsShow
							},
							closeShow() {
								this.show = false
								this.src = ''
							},
							previewShow(data) {
								this.downloadImg(data.src,data.name)
							},
							hxkShow(url){
								this.saveImg(url)
							},
							toUrl(url) {
								uni.navigateTo({
									url: url
								})
							},
							reduce() {
								this.number--;
								if (this.number <= 0) {
									this.number = 0
								}
							},
							add() {
								this.number++;
							}
			}
		}
</script>

<style scoped lang="less">
	uni-page-body {
		background-color: #fff !important;
	}

	.box {
		
		background-color: #393F9D;
	}

	.top {
		// background: #fff;
		box-shadow: 0rpx 8rpx 8rpx rgba(0, 0, 0, 0.3);
		// border-bottom-right-radius: 32rpx;
		// border-bottom-left-radius: 32rpx;
		text-align: center;
		background: rgb(245, 246, 248);
		border-radius: 0px 0px 40px 40px;

		.collection {
			width: 80%;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-bottom: 10rpx;


			.u-icon {

				&.active {
					background: #393F9D;
				}

				&.active2 {
					background: #EEEEEE;
				}

				padding: 10rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.1);
			}
		}

		img {
			width: 496rpx;
			height: 426rpx;
		}

		.addBox {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20rpx;

			.reduce {
				width: 40rpx;
				height: 40rpx;
				background: #DDDDDD;
				font-size: 32rpx;
				line-height: 40rpx;
			}

			.add {
				width: 40rpx;
				height: 40rpx;
				color: #fff;
				// background: #3F51B5;
				font-size: 28rpx;
				line-height: 40rpx;
			}

			.u-number-box {
				width: 50rpx;
				text-align: center;
			}
		}
	}

	.info {
		text-align: left;
		margin: 25rpx 50rpx 0 50rpx;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-weight: 900;
			font-size: 26rpx;
			
		}


		.details {
			font-size: 24rpx;
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			line-height: 2em;
			color: #9E9E9E;
			height: auto;


			.detailsShow {
				width: 100%;
				display: flex;
				align-items: flex-start;
				flex-wrap: wrap;
			}

			&>view {
				width: 50%;

				view {
					width: 50%;
				}

			}
		}

		.imgArry {
			padding-bottom: 30rpx;
			display: flex;
			flex-wrap: wrap;

			/deep/ .u-image {
				width: 100% !important;
				height: 100% !important;
			}

			/deep/ .u-image__error {
				width: 100% !important;
				height: 100% !important;
			}

			.img {
				margin-right: 20rpx;
				width: 146rpx !important;
				height: 142rpx !important;
				margin-top: 20rpx;
			}

			.img:nth-child(4n) {
				margin-right: 0;
			}
		}
	}

	.yulan {

		width: auto !important;
		height: auto !important;
	}

	.operation{
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: #393F9D;

		.login{
			color: #000;
			border: 1px solid #000;
			font-weight: bolder;
			width: 80%;
			text-align: center;
			padding: 20rpx 0;
			border-radius: 10rpx;
		}
		.register{
			color: #000;
			background: #fff;
			font-weight: bolder;
			width: 30%;
			text-align: center;
			padding: 20rpx 0;
			border-radius: 10rpx;
		}
	}
	.imager-box {

		width: 80%;
		height: 426rpx;
		margin-left: 10%;
	}

	.imager {
		// height: 426rpx;
	}

	/deep/ .u-image__image {
		width: 100% !important;
		height: 100% !important;
	}

	.hxmc {
		font-size: 40rpx;
		text-align: left;
		margin-left: 50rpx;
		margin-top: 30rpx;
	}

	.bzhxcpo {
		font-size: 32rpx;
		padding-top: 30rpx;
	}

	.huxytr {
		height: 30rpx;
		width: 1rpx;
	}
</style>
