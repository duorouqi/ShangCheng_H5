<template>
	<view class="box">
		<view class="search">
			<u--input placeholder="请输入关键字" suffixIcon="search" suffixIconStyle="color: #909399"></u--input>
		</view>
		<view class="classification">
			<view 
				v-for="(item,index) in classificationArry"
				:class="['classificationItem', item.state?'active':'']"
				@click="clickItem(index)"
			>
				{{item.name}}
			</view>
			<view class="condition" v-if="conditionState">
				<view class="title">{{classificationArry[activeIndex].name}}</view>
				<view class="detail">
					<view 
						class="detailItem"
						v-for="item in classificationArry[activeIndex].option"
					>
						{{item}}
					</view>
				</view>
				
				<view class="operation">
					<u-button class='reset'>重置</u-button>
					<u-button class='save'>确定</u-button>
				</view>
				<view v-if="classificationArry[activeIndex].name === '筛选'">
					<view v-for="item in classificationArry">
						<view class="title" v-if="item.name!=='筛选'">{{item.name}}</view>
						<view class="detail" v-if="item.name!=='筛选'">
							<view 
								class="detailItem"
								v-for="item2 in item.option"
							>
								{{item2}}
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<!-- 遮罩 -->
		<view class="result">
			<view class="resultItem" v-for="item in 20">
				<img src="../../static/image/index.png" alt="">
			</view>
			<!-- <view>
				<u-button class="reset">LEARN MORE</u-button>
			</view> -->
		</view>
		<!-- <bottomNav></bottomNav> -->
	</view>
	

</template>

<script>
	import bottomNav from '../public/bottomNav.vue'
	export default {
		data() {
			return {
				show: false,
				classificationArry:[
					{
						name:'地区',
						state:false,
						activeItem:[],
						option:['不限','北京','上海','广州','天津','烟台','西安']
					},
					{
						name:'层数',
						state:false,
						activeItem:[],
						option:['不限','高层','小高层','多层']
					},
					{
						name:'面积',
						state:false,
						activeItem:[],
						option:['90²以下','90-100²','100-120²','120-130²','130-140²','140-150²','150-160²','160²以上']
					},
					{
						name:'套型',
						state:false,
						activeItem:[],
						option:['不限','2室2厅1卫','2室2厅2卫','3室2厅2卫','3室2厅3卫','4室2厅2卫','4室2厅3卫','4室2厅4卫']
					},
					{
						name:'筛选',
						state:false,
					}
				],
				conditionState:false,
				activeIndex:''
			}
		},
		components:{
			bottomNav
		},
		methods:{
			clickItem(index){
				let state = this.classificationArry[index].state
				this.classificationArry.forEach(item=>{
					item.state = false
				})
				this.classificationArry[index].state = !state
				if(this.classificationArry[index].state){
					this.conditionState = true
					this.activeIndex = index
					this.show = true
				}else{
					this.conditionState = false
					this.activeIndex = ''
					this.show = false
				}
			}
		}
	}
</script>

<style scoped lang="less">
	uni-page-body{
		 background-color: #fff !important;
	}
	.box{
		padding-bottom: 120rpx;
	}
	.search {
		padding-top: 70rpx;
		margin: 0 20rpx;
	}
	.classification{
		margin: 0 20rpx;
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		
		.classificationItem{
			position: relative;
			width: 15%;
			&.active{
				color: #3c9cff;
				&::after{
					position: absolute;
					content: "";
					left: 70rpx;
					top: 7rpx;
					display: inline-block;
					border-top: 10rpx solid transparent;
					border-right: 10rpx solid transparent;
					border-left: 10rpx solid transparent;
					border-bottom: 10rpx solid #3c9cff;
				}
			}
			
			&::after{
				position: absolute;
				content: "";
				left: 70rpx;
				top: 17rpx;
				display: inline-block;
				border-top: 10rpx solid #000;
				border-right: 10rpx solid transparent;
				border-left: 10rpx solid transparent;
				border-bottom: 10rpx solid transparent;
			}
		}
		.condition{
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
			
			.title{
				font-size: 36rpx;
			}
			.detail{
				margin-top: 20rpx;
				margin-bottom: 30rpx;
				.detailItem{
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
				.detailItem:nth-last-child(1){
					margin-right: 0;
				}
			}
			.operation{
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: absolute;
				width: 93%;
				bottom: 20rpx;
				
				.reset{
					border: 1rpx solid #000;
					color: #000;
					margin-right: 30rpx;
					width: 250rpx;
				}
				.save{
					background: #000;
					color: #fff;
					flex:1
				}
			}
		}
	}
	
	.result{
		margin: 30rpx 15rpx 0rpx 15rpx;
		.resultItem{
			width: 50%;
			display: inline-block;
			img{
				width: 100%;
			}
		}
		.reset{
			border: 1rpx solid #000;
			color: #000;
			width: 98%;
		}
	}
	/deep/ .u-border {
		border-width: 1.5px !important;
		border-color: #000 !important;
	}
</style>
