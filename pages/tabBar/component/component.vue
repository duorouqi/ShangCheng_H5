<template>
	<view class="uni-container-s-d">
	<view class="uni-container-s">
		<view style="width: 100%;" class="uni-container-image-one uni-container-image">
			<view class="uni-container-s-font">
				<text>标准户型</text>
				<text style="display: block;">查询</text>
			</view>
			<u-button text="点击进入" class='button' type="primary" @click="onrouter"></u-button>
		</view>
		<view style="width: 100%;" class="uni-container-image-one uni-container-image">
			<!-- <u-button text="NEW" class='button-new' type="primary"></u-button> -->
			<view class="uni-container-s-font-one uni-container-s-font">
				<text>竞品户型</text>
				<text style="display: block;">{{detailsJp}}</text>
			</view>
			<u-button text="点击进入" class='button' type="primary" @click="onrouter2"></u-button>
		</view>
		<view style="width: 100%;" class="uni-container-image-one uni-container-image">
			<view class="uni-container-s-font">
				<text>户型推荐</text><br>
				<text>{{detailsTj}}</text>
			</view>
			<u-button text="点击进入" class='button' type="primary" @click="onrouter3"></u-button>
		</view>
		
	</view>	
	<!-- <bottomNav></bottomNav> -->
	</view>
	
	
</template>
<script>
	import bottomNav from '../../public/bottomNav.vue'
	import md5 from 'js-md5';
	import {
		Rolesaer,
		selectRoles
	} from '../../../api/publice.js'
	// TODO 修复Android v3 加载过慢问题
	// #ifdef APP-PLUS
	var domModule = weex.requireModule('dom');
	domModule.addRule('fontFace', {
		'fontFamily': "uniicons",
		'src': "url('/static/uni.ttf')"
	});
	// #endif
	export default {
		created() {
		  //  
		  var url = window.location.href ; 
		  sessionStorage.setItem("user",JSON.stringify({userid:url.split("=")[1].split(",")[0],username:decodeURI(url.split("=")[1].split(",")[1]),phone:decodeURI(url.split(",")[2])}));  
		  this.getRolesDatas()
		  
		  
		  },
		data() {
			return {
				detailsJp:'查询',
				detailsTj:''
			}
		},
		components: {
			bottomNav
		},
		onShareAppMessage() {
			// return {
			// 	title: '欢迎体验uni-app',
			// 	path: '/pages/tabBar/component/component'
			// }
		},
		onNavigationBarButtonTap(e) {
			// uni.navigateTo({
			// 	url: '/pages/about/about'
			// });
		},
		methods: {
			async getRolesDatas() {
				let that = this
				let res = await selectRoles(JSON.stringify({
					"operationinfo": {
						"operator": JSON.parse(sessionStorage.getItem("user")).userid,
					},
					"mainTable": {
						"ry": JSON.parse(sessionStorage.getItem("user")).userid
					},
					"pageInfo": {
						"pageNo": 1,
						"pageSize": 100
					},
					"header": {
						"systemid": "selectRoles",
						"currentDateTime": that.setTime(),
						"Md5": md5("selectRoles" + 123 + that.setTime())
					}
				}));
				if (JSON.parse(res.result) && JSON.parse(res.result).length > 0) {
					JSON.parse(res.result).forEach(ac=>{
						if(ac.mainTable.hxlx == '竞品户型' && ac.mainTable.qx == "管理员"){
							this.detailsJp="查询"
							this.detailsTj="&审核"
						}
						// this.isCollection.push(ac.mainTable.hxbh)
					})
				}
			},
			onrouter() {
				uni.navigateTo({
					url: '/pages/standard/index'
				});
			},
			onrouter2() {
				uni.navigateTo({
					url: '/pages/appreciate/index'
				});
			},
			onrouter3() {
				uni.navigateTo({
					url: '/pages/hoseType/entrance'
				});
			},
			setTime(){
				const time = new Date();
				const Y = time.getFullYear()
				const M = (time.getMonth() + 1).toString().padStart(2, '0')
				const D = time.getDate().toString().padStart(2, '0')
				const h = time.getHours().toString().padStart(2, '0')
				const m = time.getMinutes().toString().padStart(2, '0')
				const s = time.getSeconds().toString().padStart(2, '0')
				return `${Y}${M}${D}${h}${m}${s}`
			}
		}
	}
</script>

<style scoped lang="less">
	@import '../../../common/uni-nvue.css';
.uni-container-s-d{
	height: 100%;
}
	.uni-container-s{
		// 
		justify-content: space-evenly;
		display: flex;
		flex-direction: column;
	}
	.uni-page-body {
		height: inherit !important;
	}

	.uni-container-s {
		background-color: fff;
		height: 92% !important;
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.uni-container-image {
		height: 360rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.uni-container-image:nth-child(1) {
		// margin-top: 70rpx;
		// margin-bottom: 74rpx;
	}

	.uni-container-image:nth-child(2) {
		// margin-bottom: 74rpx;
	}

	.uni-container-image-one {
		background-image: url(../../../static/dw/Group1.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-clip: inherit;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// padding-left: 66rpx;
		align-items: flex-start;
		position: relative;
	}
	.uni-container-image-one:nth-child(2) {
		background-image: url(../../../static/dw/image2.png);
	}
	.uni-container-image-one:nth-child(3) {
		background-image: url(../../../static/dw/product3.png);
	}

	.uni-container-s-font {
		font-size: 38rpx;
		padding-bottom: 50rpx;
		font-weight: 500;
		color: #fff;
		margin-left: 60rpx;
	}

	.button {
		height: 48rpx;
		width: 154rpx;
		margin-left: 0rpx;
		margin-top: 60rpx;
		border-radius: 15rpx;
		position: absolute;
		left: 60rpx;
		bottom: 45rpx;
		background-color: #393F9D;
		border: 1rpx solid #393F9D;
		
	}

	.button-new {
		height: 48rpx;
		width: 82rpx;
		font-size: 32rpx !important;
		margin-left: 0rpx;
		margin-top: 60rpx;
		border-radius: 15rpx;
		position: absolute;
		left: 60rpx;
		top: -20rpx;
	}

	.uni-container-s-font-one {
		margin-top: 60rpx;
	}

	/deep/.uni-button {}
</style>
