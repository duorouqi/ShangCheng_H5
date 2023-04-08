<template>
	<view class="box">
		<u-navbar :autoBack="true" :class="status?'status':''" back-text="返回" title="竞品户型产品"></u-navbar>
		<view class="detail">
			<u-image :showLoading="true"  :src="details.cftpurl" width="100%"></u-image>
			<view class="title">
				{{details.xmdd}}|{{details.hxmingch}}
				<!-- <view class="position">
					<span>
						<img src="../../static/image/location.png" alt="">
						导航
					</span>
					<span>中国上海</span>
				</view> -->
			</view>
			<!-- <view class="article">
				<view class="title">
					相关文章
				</view>
				<view class="content">
					<view>
						无间设计翠湖五集楼王：会呼吸的艺术时光容器
					</view>
					<img src="../../static/image/article.jpg" alt="">
				</view>
			</view> -->
			<view class="info">
				<view class="title">
					户型基本信息
				</view>
				<view class="content">
					<view class="details">
						<view>定位：{{details.dw}}</view>
						<view>层数：{{details.cs}}</view>
						<view>面积段：{{details.mjd}}</view>
						<view style="display: flex;"><view style="white-space: nowrap;">套型：</view><view>{{details.tx}}</view></view>
						<view>标准面积层：<text>{{details.bzcmj}}</text></view>
						<view>得房率：<text>{{details.dfl}}</text></view>
						<view>类型：<text>{{details.lx}}</text></view>
						<view>是否可拼接：<text>{{details.kfpj}}</text></view>
						<view>标准层套数：{{details.bzcts}}</view>
						<view>总面宽(m)：{{details.zmkm}}</view>
						<view>是否独梯入户：{{details.sfdtrh}}</view>
						<view>项目状态：{{details.xmzt}}</view>
						<view>所在项目楼号：{{details.szxmlh}}</view>
					</view>
				<!-- <view>户型编号：{{detailsjp.hxbh}}</view>
					<view>面积段：{{detailsjp.mjd}}</view>
					<view>定位：{{detailsjp.dw}}</view>
					<view>层数：{{detailsjp.cs}}</view>
					<view>建筑面积：</view>	
				</view>
				<view>
					<view>设计时间：</view>
					<view>建成时间：</view>
					<view>建筑设计：</view>
					<view>室内设计：</view>
					<view class="dade"><view class="tx">套型：</view><view>{{detailsjp.taoxing}}</view></view>
				</view> -->
				</view>
			</view>
		</view>
		<!-- <view class="like">
			<view class="title">猜你喜欢</view>
			<view class="contnet">
				<view class="resultItem" v-for="item in 10">
					<view class="collection">
						<u-icon name="star" size="18"></u-icon>
					</view>
					<img src="../../static/image/name.jpg" alt="">
				</view>
			</view>
		</view> -->
		
		<!-- <bottomNav></bottomNav> -->
	</view>
</template>

<script>
	
	import bottomNav from '../public/bottomNav.vue'
	export default {
		data() {
			return {
				status:false,
				details:{}
			}
		},
		components:{
			bottomNav
		},
		created() {
			if(sessionStorage.getItem("detailsjp")){
			this.details = JSON.parse(sessionStorage.getItem("detailsjp"))
			console.log(this.details)
			}
		},
		methods: {
			toUrl(){
				console.log(123)
				uni.navigateBack(-1)
			}
		},
		onPageScroll(e) {
			if(e.scrollTop > 50){
				this.status = true
			}else{
				this.status = false
			}
		},
	}
</script>

<style lang="less">
/deep/.u-navbar__content{
	background: transparent !important;
}
.status{
	/deep/.u-navbar__content{
		background: #fff !important;
	}
}
.box{
	position: relative;
	.banner{
		position: absolute;
		top: -60rpx;
		width: 100%;
		z-index: -1;
	}
	.detail{
		background: #fff;
		margin-top: 50rpx;
		border-top-left-radius:50rpx;
		border-top-right-radius: 50rpx;
		padding: 30rpx 52rpx;
		.title{
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 26rpx;
			color: #000;
			font-weight: bold;
			
			.position{
				span{
					display: block;
					text-align: center;
					font-size: 16rpx;
					font-weight: 100;
					color: rgba(158, 158, 158, 1);
					img{
						width: 30rpx;
						height: 30rpx;
					}
					
					&:nth-of-type(1){
						padding: 5rpx 10rpx;
						border: 1rpx solid #000;
						color: #000;
						border-radius: 30rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
		.article{
			.title{
				color: rgba(158, 158, 158, 1);
				font-size: 24rpx;
				font-weight: 100;
			}
			.content{
				display: flex;
				align-items: flex-start;
				padding: 22rpx;
				
				background: #F5F6F7;
				font-size: 20rpx;
				
				img{
					margin-left: 100rpx;
					width: 140rpx;
					height:114rpx;
				}
			}
		}
		.info{
			margin-top: 50rpx;
			.title{
				color: rgba(158, 158, 158, 1);
				font-size: 24rpx;
				font-weight: 600;
				margin-bottom: 20rpx;
			}
			.content{
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-wrap:wrap;
				view{
					// width: 100%;
					font-size: 18rpx;
					line-height: 1.8em;
				}
			}
		}
	}
	.like{
		padding: 44rpx 60rpx 0rpx 60rpx;
		background:rgba(245, 246, 247, 1);
		.title{
			font-size: 26rpx;
			font-weight: bold;
			margin-bottom: 44rpx;
		}
		.resultItem{
			width: 47%;
			display: inline-block;
			background-color: #fff;
			margin-bottom: 20rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 20rpx;
			&:nth-child(2n+1){
				margin-right: 30rpx;
			}
			.collection{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				
				.u-icon{
					padding: 10rpx;
					border-radius: 50%;
					background: #eee;
				}
			}
			img{
				width: 260rpx;
				height: 200rpx;
			}
			
		}
	}
}
.dade{
	display: flex;
	.tx{
		white-space: nowrap;
	}
	// width: auto !important;
}
.details {
			font-size: 24rpx;
			margin-top: 120rpx;
			display: flex;
			align-items: flex-start;
			flex-wrap: wrap;
			line-height: 2em;
			color: #9E9E9E;

			&>view {
				width: 50%;
			}
		}

</style>
