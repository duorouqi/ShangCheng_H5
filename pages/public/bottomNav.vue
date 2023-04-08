<template>
	<view class="navBox">
		<view class="item" @click="home">
			<u-icon name="home" size="24"></u-icon>
		</view>
		<view class="item" @click="toUrl('/pages/compete/index')">
			<u-icon name="search" size="24"></u-icon>
		</view>
		<!-- <view class="special">
			<u-icon name="plus" color="#fff" size="24"></u-icon>
		</view> -->
		<!-- <view class="item">
			<u-icon name="more-circle" size="24"></u-icon>
		</view> -->
		<!-- <view class="item">
			<u-icon name="account" size="24"></u-icon>
		</view> -->
	</view>
</template>

<script>
	export default{
		name:'bottomNav',data() {
			return {

			}
		},
		methods: {
			home(){
				uni.reLaunch({
					url: "/"
				})
			},
			toUrl(url) {
				console.log(url)
				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style scoped lang="less">
	.navBox{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		border-top: 1rpx solid #000;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-around;
		
		.item{
			width: 15%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.special{
			width: 15%;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #000;
			border-radius: 35rpx;
			padding: 15rpx 0;
		}
	}
</style>