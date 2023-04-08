<template>
	<view>
		<!-- <view style="margin-top: 60rpx;background-color: #fff"></view> -->
		<view class="title" v-if="detailsJp||detailsbz||detailstjbz||detailstjjp||detailscxjp||detailscxbz">
			推荐入口
		</view>
		<view class="item" @click="toUrl('/pages/hoseType/standardSuggest')" v-if="detailsbz||detailstjbz||detailstjjp">
			标准户型推荐<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="item" @click="toUrl('/pages/standardExamine/indexWc')" v-if="detailsJp||detailsbz||detailstjbz||detailstjjp||detailscxjp||detailscxbz">
			已推荐标准户型<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="item" @click="toUrl('/pages/hoseType/competitivehousetype')" v-if="detailsJp||detailsbz||detailstjbz||detailstjjp||detailscxjp||detailscxbz">
			竞品户型推荐<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="item" @click="toUrl('/pages/appreciateExamine/indexWc')" v-if="detailsJp||detailsbz||detailstjbz||detailstjjp||detailscxjp||detailscxbz">
			已推荐竞品户型<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="title" v-if="detailsJp||detailsbz||detailscxjp||detailscxbz">
			审核入口
		</view>
		<view class="item" @click="toUrl('/pages/standardExamine/index')" v-if="detailsJp||detailsbz||detailscxjp||detailscxbz">
			标准户型审核<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="item" @click="toUrl('/pages/appreciateExamine/index')" v-if="detailsJp||detailsbz||detailscxjp||detailscxbz">
			竞品户型审核<u-icon name="arrow-right"></u-icon>
		</view>
		<!-- <view class="title">
			收藏入口
		</view>
		<view class="item" @click="toUrl('/pages/collection/index')">
			收藏户型推荐<u-icon name="arrow-right"></u-icon>
		</view> -->
	</view>
</template>

<script>
	import md5 from 'js-md5';
	import {
		Rolesaer,
		selectRoles
	} from '../../api/publice.js'
	export default {
		created() {
		this.getRolesDatas()	
		},
		data() {
			return {
				title:"户型推荐",
				detailsJp:false,
				detailsbz:false,
				detailstjbz:false,
				detailstjjp:false,
				detailscxjp:false,
				detailscxbz:false
			}
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
							this.title="户型推荐&审核";
							this.detailsJp=true;
						}else if(ac.mainTable.hxlx == '标准户型' && ac.mainTable.qx == "管理员"){
							this.title="户型推荐&审核";
							this.detailsbz=true;
						}else if(ac.mainTable.hxlx == '标准户型' && ac.mainTable.qx == "推荐人"){
							this.detailstjbz=true;
						}else if(ac.mainTable.hxlx == '竞品户型' && ac.mainTable.qx == "推荐人"){
							this.detailstjjp=true;
						}else if(ac.mainTable.hxlx == '竞品户型' && ac.mainTable.qx == "查询人"){
							this.detailscxjp=false;
						}else if(ac.mainTable.hxlx == '标准户型' && ac.mainTable.qx == "查询人"){
							this.detailscxbz=false;
						}
						// this.isCollection.push(ac.mainTable.hxbh)
					})
				}
			    uni.setNavigationBarTitle({
					title: this.title,//通过接口获取title
					success: () => {
						console.log('修改标题成功')
					},
					fail: () => {
						console.log('修改标题失败')
					},
					complete: () => {
						console.log('修改标题结束')
					},
				})
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
			},
			toUrl(url){
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #fff !important;
	}
	uni-page-body{
		 background-color: #fff !important;
		 // background-color: red !important;
		 // height: 100%;
	}
	.title{
		font-size: 38rpx;
		text-align: center;
		margin-top: 60rpx;
		margin-bottom: 60rpx;
	}
	.item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 30rpx 48rpx;
		background-color: #FAFAFA;
		border-radius: 20rpx;
		height: 75rpx;
		padding: 20rpx 30rpx;
		color: #000;
	}

</style>
