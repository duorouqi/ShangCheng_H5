<template>
	<view class="box">
		<view class="search">
			<u--input placeholder="请输入户型编号" v-model="formData.hxbh"></u--input>
			<u-icon name="search" color="#909399" @click="ss" size="24"></u-icon>
		</view>
		<!-- <view class="banner">
			<img src="../../static/image/index.png" alt="">
		</view> -->
		<view class="classification">
			<view v-for="(item,index) in classificationArry" :class="['classificationItem', item.state?'active':'']"
				@click.stop="clickItem(index)">
				{{item.name}}
			</view>
			<view class="condition" v-if="conditionState" @click.stop="clickItem('special')">
				<view class="title">{{classificationArry[activeIndex].name}}</view>
				<view class="detail">
					<view @click="dwclick(item,index)" class="detailItem" :class="{typeCheck:item.typeCheck}"
						v-for="(item,index) in classificationArry[activeIndex].option">
						<view>{{item.name}}</view>
					</view>
				</view>

				<view class="operation">
					<u-button class='reset' @click="oncz">重置</u-button>
					<u-button class='save' @click="onprime">确定</u-button>
				</view>

			</view>
		</view>
		<!-- 遮罩 -->
		<view class="result">
			<view class="resultItem" v-for="(item,index) in publicer.result" :key="index"
				@click="ontoUrls(item.mainTable)">
				<view class="itemBox">
					<view class='imagrf'>
						<u-image :showLoading="true" :src="item.mainTable.tpurl" class='imagrf'></u-image>
					</view>
					<view class="describe">
						<view class="title">{{item.mainTable.hxbh}}</view>
						<view class="subtitle">
							定位:{{item.mainTable.hxlx==='标准户型'?item.mainTable.dwbz:item.mainTable.dwjp}}</view>
						<view class="subtitle">面积段:{{item.mainTable.mjd}}</view>
						<view class="subtitle">套型:{{item.mainTable.tx}}</view>
					</view>
				</view>
				<view class="itemOperation">
					<u-button class='save' @click="deltile(item)">点击查看户型详情</u-button>
					<u-button class='reset' @click="delItem(item.mainTable)">取消收藏</u-button>
				</view>


			</view>
			<!-- <view>
				<u-button class="reset" @click="more">LEARN MORE</u-button>
			</view> -->
		</view>
		<!-- <bottomNav></bottomNav> -->
	</view>


</template>

<script>
	import bottomNav from '../public/bottomNav.vue'
	import {
		getjingpinku,
		location,
		screen,
		layers,
		jacketed,
		getCollectionList,
		delCollectionList,
		updateCollectionCompete,
		updateCollectionStandard,
		getbiaozhunku
	} from '../../api/publice.js'
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				publicer: {
					result: []
				},
				formData: {
					hxbh: '',
					hxlx: '',
					cs: [],
					dw: [],
					tx: [],
					mjd: [],
					Recherche: false, //搜索限制
					addrest: false, //创建限制
					page: 1, //分页
					size: 9, //分页大小
					search: '',
				},
				show: false,
				classificationArry: [{
					name: '户型类型',
					state: false,
					activeItem: [],
					option: [{
							name: '标准户型'
						},
						{
							name: '竞品户型'
						}
					]
				}],
				conditionState: false,
				activeIndex: ''
			}
		},
		components: {
			bottomNav
		},
		created() {

		},
		onShow() {
			this.getbiaozhunkulist()
			document.onclick = () => {
				this.conditionState = false
				this.classificationArry.forEach(item => {
					item.state = false
				})
			}
		},
		onPullDownRefresh() {
			this.formData.page = 1
			this.getbiaozhunkulist()
mainTable.hxbh

		},
		methods: {
			deltile(itmer){
				if(itmer.mainTable.hxlx=="标准户型"){
					this.getbiaozhunkulistaaa(itmer.mainTable.hxbh)
				}else{
					this.getbissswdsadas(itmer.mainTable.hxbh)
				}
			},
			async	getbissswdsadas(hxbh){
					try {
						
						let res = await getjingpinku(JSON.stringify({
							"operationinfo": {
								"operator":  JSON.parse(sessionStorage.getItem("user")).userid,
								
							},
							"mainTable": {
								"hxbh": hxbh,
							},
							"pageInfo": {
								"pageNo": "1",
								"pageSize": "10"
							},
							"header": {
								"systemid": "jpk",
								"currentDateTime": this.setTime(),
								"Md5": md5("jpk"+123+this.setTime())
							}
						})); 
						sessionStorage.setItem("detailsjp",JSON.stringify(eval("(" + res.result + ")")[0].mainTable));
						uni.navigateTo({
						        	url: '/pages/appreciate/details'
						        })
					} catch (e) {
						console.log(e)
						//TODO handle the exception
						
					}
				},
			async	getbiaozhunkulistaaa(hxbh){
					try {
						let res = await getbiaozhunku(JSON.stringify({
							"operationinfo": {
								"operator": JSON.parse(sessionStorage.getItem("user")).userid
								// "operator": 1
							},
							"mainTable": {
								"hxbh": hxbh
							},
							"pageInfo": {
								"pageNo": "1",
								"pageSize": "10"
							},
							"header": {
								"systemid": "bzk",
								"currentDateTime": this.setTime(),
								"Md5": md5("bzk"+123+this.setTime())
							}
						}));
						sessionStorage.setItem("details",JSON.stringify(eval("(" + res.result + ")")[0]));
						this.toUrl('/pages/standard/details')
					} catch (e) {
						console.log(e)
						//TODO handle the exception
					}
				},
			toUrl(url){
				uni.navigateTo({
					url: url
				})
			},
			//取消收藏
			async delItem(data) {
				console.log(data, "data")
				let res = await delCollectionList(JSON.stringify({
					"operationinfo": {
						//"operator": JSON.parse(sessionStorage.getItem("user")).userid,
						"operator": 1,
					},
					"mainTable": {
						"scr": JSON.parse(sessionStorage.getItem("user")).userid,
						"hxbh": data.hxbh,
					},
					"header": {
						"systemid": "deleteCollection",
						"currentDateTime": this.setTime(),
						"Md5": md5("deleteCollection" + 123 + this.setTime())
					}
				}))
				if (res.result) {
					this.formData.page = 1
					this.getbiaozhunkulist()
				}
				return false
				if (data.hxlx === "标准户型") {
					updateCollectionStandard(JSON.stringify({
						"operationinfo": {
							//"operator": JSON.parse(sessionStorage.getItem("user")).userid,
							"operator": 1,
						},
						"mainTable": {
							"sfsc": 1,
							"hxbh": data.hxbh
						},
						"header": {
							"systemid": "updateBzkCollection",
							"currentDateTime": this.setTime(),
							"Md5": md5("updateBzkCollection" + 123 + this.setTime())
						}
					}))
				}
				if (data.hxlx === "竞品户型") {
					updateCollectionCompete(JSON.stringify({
						"operationinfo": {
							//"operator": JSON.parse(sessionStorage.getItem("user")).userid,
							"operator": 1,
						},
						"mainTable": {
							"sfsc": 1,
							"hxbh": data.hxbh
						},
						"header": {
							"systemid": "updateJpkCollection",
							"currentDateTime": this.setTime(),
							"Md5": md5("updateJpkCollection" + 123 + this.setTime())
						}
					}))
				}



			},
			ss() {
				this.getbiaozhunkulist()
			},
			more() {
				this.formData.page = this.formData.page + 1
				this.getbiaozhunkulist()
			},
			oncz() {
				this.classificationArry = [{
					name: '户型类型',
					state: false,
					activeItem: [],
					option: [{
							name: '标准户型'
						},
						{
							name: '竞品户型'
						}
					]
				}]
				this.formData.hxlx = ''
				his.formData.hxbh = ''
				this.formData.cs = []
				this.formData.dw = []
				this.formData.tx = []
				this.formData.mjd = []
			},
			onprime() {
				let cs = [],
					dw = [],
					tx = [],
					mjd = [],
					hxlx = [];
				this.classificationArry.forEach((itmers, index) => {
					itmers.state = false;
					if (itmers.option) {
						itmers.option.forEach(ia => {
							if (index == 0 && ia.typeCheck) {
								if (ia.name === '标准户型') {
									this.formData.hxlx = 0
								}
								if (ia.name === '竞品户型') {
									this.formData.hxlx = 1
								}
							}
						})
					}
				})
				this.formData.cs = cs
				this.formData.dw = dw
				this.formData.tx = tx
				this.formData.mjd = mjd
				this.show = false
				this.getbiaozhunkulist()
				this.conditionState = false
			},
			async getbiaozhunkulist() {
				try {
					let cs = "",
						dw = '',
						tx = '',
						mjd = '';
					if (this.formData.cs) {
						if (this.formData.cs.length == 1) {
							cs = this.formData.cs[0]
						} else {
							this.formData.cs.forEach((ac, index) => {
								if (this.formData.cs.length - 1 === index) {
									cs = cs + ',' + ac
								} else {
									if (index === 0) {
										cs = ac
									} else {
										cs = cs + ',' + ac
									}

								}
							})
						}
					}
					if (this.formData.dw) {
						if (this.formData.dw.length == 1) {
							dw = this.formData.dw[0]
						} else {
							this.formData.dw.forEach((ac, index) => {
								if (this.formData.dw.length - 1 === index) {
									dw = dw + ',' + ac
								} else {
									if (index === 0) {
										dw = ac
									} else {
										dw = dw + ',' + ac
									}

								}
							})
						}
					}
					if (this.formData.tx) {
						if (this.formData.tx.length == 1) {
							tx = this.formData.tx[0]
						} else {
							this.formData.tx.forEach((ac, index) => {
								if (this.formData.tx.length - 1 === index) {
									tx = tx + ',' + ac
								} else {
									if (index === 0) {
										tx = ac
									} else {
										tx = tx + ',' + ac
									}

								}
							})
						}
					}
					if (this.formData.mjd) {
						if (this.formData.tx.length == 1) {
							mjd = this.formData.mjd[0]
						} else {
							this.formData.mjd.forEach((ac, index) => {
								if (this.formData.mjd.length - 1 === index) {
									mjd = mjd + ',' + ac
								} else {
									if (index === 0) {
										mjd = ac
									} else {
										mjd = mjd + ',' + ac
									}

								}
							})
						}
					}
					console.log(this.formData.hxlx, "hxlx")
					let res = await getCollectionList(JSON.stringify({
						"operationinfo": {
							//"operator": JSON.parse(sessionStorage.getItem("user")).userid,
							"operator": 1,
						},
						"mainTable": {
							// "scr":JSON.parse(sessionStorage.getItem("user")).userid,
							"scr": '',
							"hxbh": this.formData.hxbh,
							"hxlx": this.formData.hxlx
						},
						"pageInfo": {
							"pageNo": "1",
							"pageSize": "10"
						},
						"header": {
							"systemid": "hxsc",
							"currentDateTime": this.setTime(),
							"Md5": md5("hxsc" + 123 + this.setTime())
						}
					}));

					if (res.result) {
						console.log(eval("(" + res.result + ")"), 99999)
						this.publicer.result = [...eval("(" + res.result + ")")]
					}
					uni.stopPullDownRefresh()
				} catch (e) {
					console.log(e)
					//TODO handle the exception
					uni.stopPullDownRefresh()
				}
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
			dwclick(obj, index) {
				if (index == 0) {
					this.classificationArry[this.activeIndex].option.forEach((ac, index) => {
						if (index != 0) {
							ac.typeCheck = false;
						}
					})
				} else {
					this.$set(this.classificationArry[this.activeIndex].option[0], "typeCheck", false)
				}
				obj.typeCheck = !obj.typeCheck;
			},
			ontoUrls(itmer) {
				// sessionStorage.setItem("detailsjp", JSON.stringify(itmer))
				// uni.navigateTo({
				// 	url: '/pages/Competitors/index?id=' + itmer.id
				// })
			},
			clickItem(index) {
				if (index !== 'special') {
					let state = this.classificationArry[index].state
					this.classificationArry.forEach(item => {
						item.state = false
					})
					this.classificationArry[index].state = !state
					if (this.classificationArry[index].state) {
						this.conditionState = true
						this.activeIndex = index
						this.show = true
					} else {
						this.conditionState = false
						this.activeIndex = ''
						this.show = false
					}
					this.index = index;
				} else {
					this.classificationArry.forEach(item => {
						item.state = false
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.box {
		padding-bottom: 120rpx;
	}

	.search {
		padding-top: 70rpx;
		margin: 0 20rpx;
		display: flex;
		align-items: center;
		position: relative;

		.u-icon {
			position: absolute;
			right: 10rpx
		}

		.ss {
			font-size: 30rpx !important;
			margin-left: 20rpx;
			color: #3c9cff;
		}
	}

	.banner {
		margin-top: 20rpx;
		text-align: center;

		img {
			width: 100%;
		}
	}

	.classification {
		margin: 0 20rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;

		.classificationItem {
			position: relative;

			&.active {
				color: #393F9D;

				&::after {
					position: absolute;
					content: "";
					left: 120rpx;
					top: 7rpx;
					display: inline-block;
					border-top: 10rpx solid transparent;
					border-right: 10rpx solid transparent;
					border-left: 10rpx solid transparent;
					border-bottom: 10rpx solid #393F9D;
				}
			}

			&::after {
				position: absolute;
				content: "";
				left: 120rpx;
				top: 17rpx;
				display: inline-block;
				border-top: 10rpx solid #000;
				border-right: 10rpx solid transparent;
				border-left: 10rpx solid transparent;
				border-bottom: 10rpx solid transparent;
			}
		}

		.condition {
			z-index: 2;
			position: absolute;
			width: 750rpx;
			left: -20rpx;
			box-sizing: border-box;
			padding: 0 20rpx;
			top: 50rpx;
			background: #fff;
			border-radius: 5rpx;
			padding-bottom: 100rpx;

			.title {
				font-size: 36rpx;
			}

			.detail {
				margin-top: 20rpx;
				margin-bottom: 30rpx;

				.detailItem {
					display: inline-block;
					width: 166rpx;
					text-align: center;
					border: 1px solid #ccc;
					box-sizing: border-box;
					color: #ccc;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
					padding: 10rpx;
				}

				.detailItem:nth-last-child(1) {
					margin-right: 0;
				}
			}

			.operation {
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: absolute;
				width: 93%;
				bottom: 20rpx;

				.reset {
					border: 1rpx solid #000;
					color: #000;
					margin-right: 30rpx;
					width: 250rpx;
				}

				.save {
					background: #000;
					color: #fff;
					flex: 1
				}
			}
		}
	}

	.result {
		margin: 30rpx 15rpx 0rpx 15rpx;

		.resultItem {
			border-radius: 20rpx;
			box-shadow: 0rpx 18rpx 18rpx rgba(0, 0, 0, 0.03);
			background-color: #fff;
			margin-bottom: 70rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 20rpx;
			height: 400rpx;

			/deep/ .u-image {
				width: 100% !important;
				height: 100% !important;
				object-fit: cover;
				overflow: hidden;
			}

			/deep/ .u-fade-enter-active {
				width: 100% !important;
				height: 100% !important;
			}

			/deep/ .u-image__image {
				width: 100% !important;
				height: 200rpx !important;
			}

			/deep/ img {
				object-fit: cover;
			}

			/deep/ .u-image__error {
				width: 100% !important;
				height: 200rpx !important;
			}


			.collection {
				display: flex;
				align-items: center;
				justify-content: flex-end;

				.u-icon {
					padding: 10rpx;
					border-radius: 50%;
					background: #ccc;
				}
			}

			.itemBox {
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
			}

			.itemOperation {
				margin-top: 59rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;

				.u-button {
					font-size: 24rpx;
					width: 40%;
					border-radius: 50rpx;
				}

				.reset {
					color: #fff;
					background-color: #393F9D;
					border: 1rpx solid #393F9D;
				}
			}

			.describe {
				width: 48%;
				margin-top: 10rpx;
				color: #9E9E9E;
				font-size: 20rpx !important;

				.title {
					font-size: 36rpx;
					color: #000;
				}
			}

			// img{
			// 	width: 100%;
			// }
		}

		.reset {
			border: 1rpx solid #000;
			color: #000;
			width: 98%;
		}
	}

	/deep/ .u-border {
		border-width: 1.5px !important;
		border-color: #000 !important;
	}

	.typeCheck {
		color: #000 !important;
		// background: #f9ae3d;
		border: 1px solid #000 !important;
	}

	.imagrf {
		width: 50%;
		height: 200rpx !important;
		overflow: hidden;
	}

	.name {
		margin-top: 25rpx;
	}
</style>
