<template>
	<view class="bg-image">
		<div class="operation">
			<view class="login" @click="register">登录</view>
			<!-- <view class="register" @click="register">注册</view> -->
		</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList1: []
			}
		},
		methods: {
			oninder() {
				uni.switchTab({
					url: '/pages/tabBar/component/component'
				})
			},
			register() {
				uni.navigateTo({
					url: '/pages/Signin/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.bg-image {
		width: 100%;
		height: 85%;
		background: #FFFFFF;
		// display: block;
		background-image: url(@/static/bg/indexbg.png);
		background-repeat: no-repeat;
		background-size: 100% auto;

		// background-size: 100%;
		.operation {
			width: 100%;
			display: flex;
			position: fixed;
			left: 0;
			bottom: 40rpx;
			line-height: 100rpx;
			justify-content: space-around;
			align-items: center;
			font-size: 32rpx;

			.login {
				display: inline-block;
				width: 426rpx;
				height: 100rpx;
				border: 1rpx solid #000000;
				text-align: center;
				border-radius: 7rpx;
				background: #FFFFFF;
			}

			.register {
				display: inline-block;
				width: 326rpx;
				height: 100rpx;
				border: 1rpx solid #000000;
				text-align: center;
				border-radius: 7rpx;
				color: #FFFFFF;
				background: #000000;
			}
		}

	}

	.images {
		height: 667px;
	}
</style>
