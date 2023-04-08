<template>
	<view class="box">
		<view class="title">
			请选择下载格式
		</view>
		<view class="item">
			<img src="../../static/image/down1.png" alt="">
			AutoCAD
			<u-radio-group v-model="value">
				<u-radio name="AutoCAD"/>
			</u-radio-group>
		</view>
		<view class="item">
			<img src="../../static/image/down2.png" alt="">
			PDF
			<u-radio-group v-model="value">
				<u-radio name="PDF"/>
			</u-radio-group>
		</view>
		<view class="item">
			<img src="../../static/image/down3.png" alt="">
			JPG
			<u-radio-group v-model="value">
				<u-radio name="JPG"/>
			</u-radio-group>
		</view>
		<view class="xiazai">
			<view class="login">
				确认下载
				<img src="../../static/image/down.png" alt="">
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				value: 'AutoCAD'
			}
		},
		methods: {
			
			add() {
				
			}
		}
	}
</script>

<style scoped lang="less">
	uni-page-body {
		background-color: #F5F6F7 !important;
	}
	.box{
		padding: 20rpx 50rpx;
		
		.title{
			font-weight: bolder;
			font-size: 24rpx;
			padding-top: 20rpx;
			margin-bottom: 30rpx;
		}
		.item{
			border: 1rpx solid #F5F6F7;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #FFF;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
			padding: 20rpx;
			font-size: 26rpx;
			img{
				width: 52rpx;
				height: 52rpx;
				border: 15rpx solid #eee;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}
			.u-radio-group{
				flex-direction: row-reverse;
			}
			.u-radio{
				align-items: flex-end;
			}
		}
		.xiazai{
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.login {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 248rpx;
				height: 100rpx;
				line-height: 100rpx;
				border:4rpx solid #000000;
				text-align: center;
				border-radius: 7rpx;
				background: #FFFFFF;
				font-weight: bolder;
				
				img{
					margin-left: 10rpx;
					width: 36rpx;
					height: 32rpx;
				}
			}
		}
	}
</style>
