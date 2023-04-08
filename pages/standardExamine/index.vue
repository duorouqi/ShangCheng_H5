<template>
	<view class="box">
		<view style="display: flex;align-items: center;" class="dinghuy">
			<view class="stateBox" @click="state=!state">
				<view class="default">{{typeABC}}</view>
				<view class="content" v-if="state">
					<view @click="getData('全部')">全部</view>
					<view @click="getData('审核中')">审核中</view>
					<view @click="getData('通过')">通过</view>
					<view @click="getData('不通过')">不通过</view>
				</view>
			</view>
			<view class="search" style="flex: 1;border-radius: 10rpx;">
				<u--input  placeholder="请输入户型编号" v-model="formData.hxbh"></u--input>
				<u-icon name="search" color="#909399" @click="ss" size="24"></u-icon>
			</view>
		</view>

		<view class="result" v-if="show2">
			<view v-for="item in publicer.result" style="position: relative;" class="cretyuip">
				<view style="position: absolute;top: 0;left: 0;" class="contentt1">
					<view class="contentt1-bottner">
						<view class="iconsert">
						<u-icon name="edit-pen" size="30"></u-icon>	
						</view>
						<view class="iconsert">
						<u-icon name="edit-pen" size="30"></u-icon>	
						</view>
					</view>
					
				</view>
				<!-- <view style="position: absolute;background: #fff;" class="contentt">
					<view class="swipe-action" style="background: #fff;">
						<view class="swipe-action__content u-border-bottom" style="background: #fff;">
							<text class="swipe-action__content__text" style="background: #fff;">
								<view class="contentBox" style="background: #fff;">
									<view class="imgBox">
										<u-image :src="item.mainTable.cftpurl"></u-image>
									</view>
									<view class="detail">
										<view class="title">
											{{item.mainTable.hxbh}}
										</view>
										<view class="describe">
											审核状态:{{item.mainTable.tjsh}}
										</view>
									</view>
								</view>
					
							</text>
						</view>
					</view>
				</view> -->
				<u-swipe-action>
					<u-swipe-action-item :options="options2" @click="(value)=>itemclick(value,item)">
						<view class="swipe-action">
							<view class="swipe-action__content u-border-bottom">
								<text class="swipe-action__content__text">
									<view class="contentBox">
										<view class="imgBox">
											<u-image :src="item.mainTable.cftpurl"></u-image>
										</view>
										<view class="detail">
											<view class="title">
												{{item.mainTable.hxbh}}
											</view>
											<view class="describe">
												审核状态:{{item.mainTable.tjsh}}
											</view>
										</view>
									</view>

								</text>
							</view>
						</view>
					</u-swipe-action-item>
				</u-swipe-action>
			</view>
		</view>


	</view>


</template>

<script>
	import bottomNav from '../public/bottomNav.vue'
	import {
		location,
		screen,
		layers,
		jacketed,
		getbiaozhunku,
		postUpdatebzk
	} from '../../api/publice.js'
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				items: {},
				typeABC: "全部",
				state: false,
				type: "全部",
				options2: [{
					// text: '编辑',
					icon:'edit-pen',
					iconSize:'30px',
					style: {
						backgroundColor: '#3c9cff'
					}
				}, {
					// text: '删除',
					icon:'trash-fill',
					iconSize:'30px',
					style: {
						backgroundColor: '#f56c6c'
					}
				}],
				show2:false,


				publicer: {
					result: []
				},
				formData: {
					hxbh: '',
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
						name: '定位',
						state: false,
						activeItem: [],
						option: location
					},
					{
						name: '层数',
						state: false,
						activeItem: [],
						option: layers
					},
					{
						name: '面积',
						state: false,
						activeItem: [],
						option: screen
					},
					{
						name: '套型',
						state: false,
						activeItem: [],
						option: jacketed
					},
					// {
					// 	name:'筛选',
					// 	state:false,
					// }
				],
				conditionState: false,
				activeIndex: ''
			}
		},
		components: {
			bottomNav
		},
		onShow() {
			this.getData('全部')

			document.onclick = () => {
				this.conditionState = false
				this.classificationArry.forEach(item => {
					item.state = false
				})
			}
		},
		created() {

		},
		onPullDownRefresh() {
			this.formData.page = 1
			this.getbiaozhunkulist()

		},
		methods: {
			itemclick(value, item) {
				if (value.index == 1) {
					this.show2 = false
					this.deldata(item.mainTable.id)
				} else {
					this.ontoUrls(item.mainTable,item.detail1)
					// deldata(id)
				}
			},
			async deldata(id) {
				let data = {
					"data": [{
						"operationinfo": {
							"operationDate": "",
							"operator": JSON.parse(sessionStorage.getItem("user")).userid,
							"operationTime": ""
						},
						"mainTable": {
							"id": id,
							"tjsh": 3
						}
					}],
					"header": {
						"systemid": "Updatebzk",
						"currentDateTime": this.setTime(),
						"Md5": md5("Updatebzk" + 123 + this.setTime())
					}
				}
				let res = await postUpdatebzk(JSON.stringify(data));
				this.show2 = false
				this.getbiaozhunkulist()
			},
			//获取列表数据
			getData(type) {
				this.typeABC = type
				// console.log(type,'type')
				// this.$set(this,'type',type)
				// this.type = type
				this.show2 = false
				this.getbiaozhunkulist()
			},



			watchRouter() {},
			ss() {
				this.getbiaozhunkulist()
			},
			more() {
				this.formData.page = this.formData.page + 1
				this.getbiaozhunkulist()
			},
			oncz() {
				this.classificationArry = [{
						name: '定位',
						state: false,
						activeItem: [],
						option: JSON.parse(JSON.stringify(location))
					},
					{
						name: '层数',
						state: false,
						activeItem: [],
						option: JSON.parse(JSON.stringify(layers))
					},
					{
						name: '面积',
						state: false,
						activeItem: [],
						option: JSON.parse(JSON.stringify(screen))
					},
					{
						name: '套型',
						state: false,
						activeItem: [],
						option: JSON.parse(JSON.stringify(jacketed))
					},
				]
				this.formData.cs = []
				this.formData.dw = []
				this.formData.tx = []
				this.formData.mjd = []
			},
			onprime() {
				let cs = [],
					dw = [],
					tx = [],
					mjd = [];
				this.classificationArry.forEach((itmers, index) => {
					itmers.state = false;
					if (itmers.option) {
						itmers.option.forEach(ia => {
							if (index == 0 && ia.typeCheck) {
								if (ia.id.toString()) {
									dw.push(ia.id)
								}
							}
							if (index == 1 && ia.typeCheck) {
								if (ia.id.toString()) {
									cs.push(ia.id)
								}
							}
							if (index == 2 && ia.typeCheck) {
								if (ia.id.toString()) {
									mjd.push(ia.id)
								}
							}
							if (index == 3 && ia.typeCheck) {
								if (ia.id.toString()) {
									tx.push(ia.id)
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
				this.show2 = true
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

					let tjsh = ""
					if (this.typeABC == "全部") {
						tjsh = ''
					} else if (this.typeABC == "审核中") {
						tjsh = 0
					} else if (this.typeABC == "通过") {
						tjsh = 1
					} else {
						tjsh = 2
					}
					let res = await getbiaozhunku(JSON.stringify({
						"operationinfo": {
							"operator": JSON.parse(sessionStorage.getItem("user")).userid
						},
						"mainTable": {
							"hxbh": this.formData.hxbh,
							"tjsh": tjsh
						},
						"pageInfo": {
							"pageNo": this.formData.page,
							"pageSize": 1000000
						},
						"header": {
							"systemid": "bzk",
							"currentDateTime": this.setTime(),
							"Md5": md5("bzk" + 123 + this.setTime())
						}
					}));

					// if (res.result) {
					// 	this.publicer.result = [...eval("(" + res.result + ")")]
					// }
					if(res.result){
						let data = [];
						let newdata = [];
						data = [...eval("(" + res.result + ")")];
						for(let i=data.length-1;i>=0;i--){
							newdata.push(data[i]);
						}
						this.publicer.result=newdata;
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
			ontoUrls(itmer,detail1) {
				sessionStorage.setItem("detailsjp", JSON.stringify(itmer))
				sessionStorage.setItem("detailslistrjp", JSON.stringify(detail1))
				uni.navigateTo({
					url: '/pages/hoseTypeExamine/standardSuggest?id=' + itmer.id
				})
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
	/**
	 * ----------------------------------------
	 * animation scale-down-hor-left
	 * ----------------------------------------
	 */
	@-webkit-keyframes scale-down-hor-left {
	  0% {
	    -webkit-transform: scaleX(1);
	            transform: scaleX(1);
	    -webkit-transform-origin: 0% 0%;
	            transform-origin: 0% 0%;
	  }
	  100% {
	    -webkit-transform: scaleX(0.3);
	            transform: scaleX(0.3);
	    -webkit-transform-origin: 0% 0%;
	            transform-origin: 0% 0%;
	  }
	}
	@keyframes scale-down-hor-left {
	  0% {
	    -webkit-transform: scaleX(1);
	            transform: scaleX(1);
	    -webkit-transform-origin: 0% 0%;
	            transform-origin: 0% 0%;
	  }
	  100% {
	    -webkit-transform: scaleX(0.8);
	            transform: scaleX(0.8);
	    -webkit-transform-origin: 0% 0%;
	            transform-origin: 0% 0%;
	  }
	}
	.contentt:hover {
	      /* 设置动画是否暂停*/
	     -webkit-animation: scale-down-hor-left 120ms linear both;
	      animation: scale-down-hor-left 120ms linear both;
	    }
	.contentt{
		left: 0;top: 0;
		width: 100%;
		    width: -moz-available;          /* WebKit-based browsers will ignore this. */
		    width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
		    width: fill-available;
		height: 30rpx;
		// background: red;
	}
	.contentt1{
		display: flex;
		flex-direction: row-reverse;
	    width: 100%;
	    width: -moz-available;          /* WebKit-based browsers will ignore this. */
	    width: -webkit-fill-available;  /* Mozilla-based browsers will ignore this. */
	    width: fill-available;	
		// background: #38409C;
		
	}
	.contentt1-bottner{
	}
	.iconsert{
		background: #fff;
	}
	
	.u-border{
		border-color: white;
	}
	
	
	
	
	
	
	.search{
		background: #fff;
	}
	.box{
		height: -webkit-fill-available !important;
		background: #F4F6F8 !important;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	.dinghuy {
		margin-left: 8rpx;
		padding-top: 20rpx;

		.stateBox {
			width: 200rpx;
			height: 70rpx;
			background: #fff;
			box-sizing: border-box;
			padding-left: 30rpx;
			line-height: 68rpx;
			border: 1rpx solid #EEEEEE;
			border-radius: 8rpx;
			position: relative;
			margin-right: 10rpx;

			&::after {
				position: absolute;
				content: "";
				right: 10rpx;
				top: 45%;
				display: inline-block;
				border-top: 10rpx solid #ccc;
				border-right: 10rpx solid transparent;
				border-left: 10rpx solid transparent;
				border-bottom: 10rpx solid transparent;
			}

			.default {
				color: #9E9E9E;
			}

			.content {
				position: absolute;
				left: 0rpx;
				right: 0rpx;
				border-radius: 0rpx 0rpx 8rpx 8rpx;
				background: #fff;
				border: 1rpx solid #000;
				padding-left: 20rpx;
				color: #9E9E9E;
				z-index: 12;
			}
		}
	}

	.result {
		margin-top: 25rpx;
		// &>view{

		// 	box-shadow: 0rpx 0rpx 4rpx rgba(0, 0, 0, 0.3);
		// }
		.swipe-action {
			&__content {
				&__text {
					font-size: 15px;
					color: #000;

					.contentBox {
						padding: 20rpx 0;
						display: flex;
						align-items: flex-start;
						justify-content: flex-start;
						margin-left: 30rpx;

						.imgBox {
							width: 250rpx;
							height: 150rpx;
							margin-right: 20rpx;
							border-radius: 10rpx;

							view {
								width: 250rpx;
								height: 150rpx;
								border-radius: 10rpx;
								overflow: hidden;
							}

							/deep/.u-image {
								width: 100% !important;
								height: 100% !important;
								border-radius: 10rpx;
							}

							/deep/ .u-image__image {
								width: 100% !important;
								height: 100% !important;
								border-radius: 10rpx;
							}
						}

						.detail {
							.title {
								color: #000;
								font-weight: bold;
								font-size: 36rpx;
							}

							.describe {
								color: #ccc;
							}
						}
					}



				}
			}
		}
	}

	.box {
		padding-bottom: 120rpx;
	}

	.search {
		// padding-top: 70rpx;
		// margin: 0 20rpx;
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



	/deep/ .u-border {
		border-width: 1.5px !important;
		border-color: white !important;
		// border-radius: 60rpx;
	}

	.typeCheck {
		color: #000 !important;
		// background: #f9ae3d;
		border: 1px solid #000 !important;
	}

	.imagrf {
		height: 200rpx !important;
	}

	.name {
		margin-top: 25rpx;
	}
	/deep/ .u-swipe-action-item__right{
		flex-direction: inherit !important;
		    justify-content: center !important;
			width: 26% !important;
			
		// display: block !important;
	}
	/deep/ .u-swipe-action-item__right__button{
	flex: 1;
	// background-color: #38409C !important;
	}
	/deep/ .u-swipe-action-item__right__button__wrapper{
		// background-color: #38409C !important;
	}
	/deep/ .swipe-action{
		border-radius: 30rpx !important;
	}
	/deep/ .u-swipe-action-item__content{
		border-radius: 26rpx !important;
	}
	.cretyuip{
		margin-bottom: 20rpx;
		border-radius: 26rpx !important;
		overflow: hidden;
	}
</style>
