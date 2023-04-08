<template>
	<view class="box">
		<view style="position: fixed;z-index: 1;width: 100%;top: 0;background-color: #fff;height: 235rpx;">
		<view class="searchFor">
			<view class="font" @click="toUrl('/pages/collection/index')" style="color: rgb(58, 62, 191);text-decoration: underline;margin-left: 520rpx;margin-bottom: 10rpx;" >点击查看已收藏户型</view>
			<view class="search">
				<u--input placeholder="请输入户型编号" suffixIconStyle="color: #909399" v-model="formData.hxbh"></u--input>
				<u-icon name="search" color="#909399" @click="ss" size="24"></u-icon>
			</view>
			<view class="font" @click="toUrl('/pages/JpPageDetail/index')" style="color: #c0c4cd;text-decoration: underline;padding-left: 40rpx;margin-top: 15rpx;" >查看竞品户型编号命名规则</view>
		</view>
		<!-- <view class="banner">
			<img src="../../static/image/index.png" alt="">
		</view> -->
		<view class="classification">
			<view
				v-for="(item,index) in classificationArry"
				:class="['classificationItem', item.state?'active':'']"
				@click.stop="clickItem(index)"
			>
				{{item.name}}
			</view>
			<view class="condition" v-if="conditionState" @touchmove.prevent @click.stop="clickItem('special')">
				<view class="condition-coier">
				<view class="title">{{classificationArry[activeIndex].name}}</view>
				<view class="detail">
					<view class="search search-input" v-if="index==0">
						<u--input placeholder="请输入城市" v-model="cs" clearable></u--input>
						
					</view>
					<view class="search search-input" v-if="index==4">
						<u--input placeholder="请输入所在项目" v-model="szxm" clearable></u--input>
						
					</view>
					<view 
					v-else
					@click="dwclick(item,index)"
						class="detailItem"
						:class="{typeCheck:item.typeCheck}"
						v-for="(item,index) in classificationArry[activeIndex].option"
					>
						<view>{{item.name}}</view>
					</view>
				</view>
				
				<view class="operation">
					<u-button class='reset' @click="oncz">重置</u-button>
					<u-button class='save' @click="onprime">确定</u-button>
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
					<view class="postrs"></view>
				</view>
				<view class="postr"></view>
			
			</view>
		</view>
		</view>
		<!-- 遮罩 -->
		<view class="result">
			<view
				class="resultItem"
				v-for="(item,index) in publicer.result"
				:key="index"
				@click="ontoUrls(item.mainTable)"
			>
				<view class="collection" >
					<u-icon name="star" class='active' size="14" color="#EEEEEE" v-if="isCollection.indexOf(item.mainTable.hxbh)!=-1"></u-icon>
					<u-icon name="star" class='active2' size="14" color="#000" v-else></u-icon>
				</view>
				<!-- <img src="../../static/image/index.png" alt=""> -->
				<view class='imagrf'>
					<u-image :showLoading="true"  :src="item.mainTable.cftpurl" class='imagrf'></u-image>
				</view>
				
				<!-- <view class="name">
					{{item.mainTable.dw}}
				</view> -->
				<view class="describe">
					<view style="font-weight: 600;color: #000;">{{item.mainTable.hxbh}}</view>
					<view>定位：{{item.mainTable.dw}}</view>
					<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">面积段：{{item.mainTable.mjd}}</view>
					<view>
						<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">套型：{{item.mainTable.taoxing}}</view>
					<!-- 	<view>100万</view> -->
					</view>
					<view>
						<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">所在项目：{{item.mainTable.szxm}}</view>
					<!-- 	<view>100万</view> -->
					</view>
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
	import {getjingpinku,jplocation,screen,layers,jacketed,getCollectionList} from '../../api/publice.js'
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				cs:"",
				szxm:'',
				isCollection:[],
				publicer:{result:[]},
				formData:{
					hxbh:'',
					cs:[],
					dw:[],
					taoxing:[],
					mjd:[],
					Recherche: false, //搜索限制
					addrest: false, //创建限制
					page: 1, //分页
					size: 1000000, //分页大小
					search: '',
				},
				show: false,
				classificationArry:[
					{
						name:'城市',
						state:false,
						activeItem:[],
						option:''
					},
					{
						name:'层数',
						state:false,
						activeItem:[],
						option:layers
					},
					{
						name:'面积',
						state:false,
						activeItem:[],
						option:screen
					},
					{
						name:'套型',
						state:false,
						activeItem:[],
						option:jacketed
					},
					{
						name:'项目',
						state:false,
						activeItem:[],
						option:''
					}
					// {
					// 	name:'筛选',
					// 	state:false,
					// }
				],
				conditionState:false,
				activeIndex:''
			}
		},
		components:{
			bottomNav
		},
		created() {
			this.getbiaozhunkulist()
			document.onclick=()=>{
				this.conditionState = false
				this.classificationArry.forEach(item=>{
					item.state = false
				}) 
			}
		},
		onPullDownRefresh() {
			this.formData.page = 1
			this.getbiaozhunkulist()
			
		},
		methods:{
			async getCollectionListData() {
				let that = this
				let res = await getCollectionList(JSON.stringify({
					"operationinfo": {
						"operator": JSON.parse(sessionStorage.getItem("user")).userid,
					},
					"mainTable": {
						"scr": JSON.parse(sessionStorage.getItem("user")).userid,
						"hxbh": "",
						"hxlx": 1
					},
					"pageInfo": {
						"pageNo": this.formData.page,
						"pageSize": this.formData.size
					},
					"header": {
						"systemid": "hxsc",
						"currentDateTime": that.setTime(),
						"Md5": md5("hxsc" + 123 + that.setTime())
					}
				}));
				if (JSON.parse(res.result) && JSON.parse(res.result).length > 0) {
					JSON.parse(res.result).forEach(ac=>{
						this.isCollection.push(ac.mainTable.hxbh)
					})
				}
			},
			changeCollectionState(data){
				// 收藏状态就调取消接口  delCollectionList
				// 没收藏状态就调新增接口   addCollectionList
			},
			ss(){
				this.getbiaozhunkulist()
			},
			more(){
				this.formData.page = this.formData.page+1
				this.getbiaozhunkulist()
			},
			oncz(){
				this.cs = "";
				this.szxm = "";
				this.classificationArry = [
					{
						name:'城市',
						state:false,
						activeItem:[],
						option:'',
					},
					{
						name:'层数',
						state:false,
						activeItem:[],
						option:JSON.parse(JSON.stringify(layers))
					},
					{
						name:'面积',
						state:false,
						activeItem:[],
						option:JSON.parse(JSON.stringify(screen)) 
					},
					{
						name:'套型',
						state:false,
						activeItem:[],
						option:JSON.parse(JSON.stringify(jacketed))
					},
					{
						name:'项目',
						state:false,
						activeItem:[],
						option:'',
					}
				]
				this.formData.dw = []
				this.formData.taoxing = []
				this.formData.mjd = []
			},
			onprime(){
				let cs=[],dw=[],taoxing=[],mjd=[];
				this.classificationArry.forEach((itmers,index)=>{
					itmers.state =false;
					if(itmers.option){
					itmers.option.forEach(ia=>{
						if(index==0&&ia.typeCheck){
							if(ia.id.toString()){dw.push(ia.id)}
						}
						if(index==1&&ia.typeCheck){
							if(ia.id.toString()){cs.push(ia.id)}
						}
						if(index==2&&ia.typeCheck){
							if(ia.id.toString()){mjd.push(ia.id)}
						}
						if(index==3&&ia.typeCheck){
							if(ia.id.toString()){taoxing.push(ia.id)}
						}
						
					})
					}
				})
				this.formData.cs = cs
				this.formData.dw = dw
				this.formData.taoxing = taoxing
				this.formData.mjd = mjd
				this.show = false
				this.getbiaozhunkulist()
				this.conditionState = false
			},
			async	getbiaozhunkulist(){
					try {
						let cs="",dw='',taoxing='',mjd='',szxm='';
						// if(this.formData.cs){
						// 	if (this.formData.cs.length == 1) {
						// 		cs = this.formData.cs[0]
						// 	} else {
						// 		this.formData.cs.forEach((ac, index) => {
						// 			if (this.formData.cs.length - 1 === index) {
						// 				cs = cs + ',' + ac
						// 			} else {
						// 				if (index === 0) {
						// 					cs = ac
						// 				} else {
						// 					cs = cs + ',' + ac
						// 				}
							
						// 			}
						// 		})
						// 	}
						// }
						cs=this.cs;
						szxm = this.szxm;
						
						if(this.formData.dw){
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
						if(this.formData.taoxing){
							if (this.formData.taoxing.length == 1) {
								taoxing = this.formData.taoxing[0]
							} else {
								this.formData.taoxing.forEach((ac, index) => {
									if (this.formData.taoxing.length - 1 === index) {
										taoxing = taoxing + ',' + ac
									} else {
										if (index === 0) {
											taoxing = ac
										} else {
											taoxing = taoxing + ',' + ac
										}
							
									}
								})
							}
						}
						if(this.formData.mjd){
							if (this.formData.mjd.length == 1) {
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
						let res = await getjingpinku(JSON.stringify({
							"operationinfo": {
								"operator":  JSON.parse(sessionStorage.getItem("user")).userid,
								// "operator":  1
							},
							"mainTable": {
								"hxbh": this.formData.hxbh,
								"xmszcs":cs,
								'szxm':szxm,
								"dw":dw,
								"taoxing":taoxing,
								"mjd":mjd,
							},
							"pageInfo": {
								"pageNo": this.formData.page,
								"pageSize": this.formData.size
							},
							"header": {
								"systemid": "jpk",
								"currentDateTime": this.setTime(),
								"Md5": md5("jpk"+123+this.setTime())
							}
						})); 
						if(res.result){
							let data = [];
							let newdata = [];
							data = [...eval("(" + res.result + ")")];
							for(let i=data.length-1;i>=0;i--){
								newdata.push(data[i]);
							}
							this.publicer.result=newdata;
						}
						this.getCollectionListData()
						uni.stopPullDownRefresh()
					} catch (e) {
						console.log(e)
						//TODO handle the exception
						uni.stopPullDownRefresh()
					}
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
			dwclick(obj,index){
				if(index==0){
					this.classificationArry[this.activeIndex].option.forEach((ac,index)=>{
						if(index!=0){
							ac.typeCheck = false;
						}
					})
				}else{
					this.$set(this.classificationArry[this.activeIndex].option[0],"typeCheck",false)
				}
				obj.typeCheck=!obj.typeCheck;
			},
			ontoUrls(itmer) {
				sessionStorage.setItem("detailsjp",JSON.stringify(itmer))
				uni.navigateTo({
				        	url: '/pages/appreciate/details'
				        })
			},
			toUrl(url){
				uni.navigateTo({
					url: url
				})
			},
			clickItem(index) {
				if(index!=='special'){
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
					this.index = index;
				}else{
					this.classificationArry.forEach(item=>{
						item.state = false
					})
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.box{
		padding-bottom: 220rpx;
	
		background-color: #fff !important;
	}
	.searchFor{
		padding-top: 20rpx;
	}
	.search {
		// padding-top: 70rpx;
		margin: 0 20rpx;
		display: flex;
		align-items: center;
		position: relative;
		  .u-icon{
		   position: absolute;
		   right:10rpx
		  }
		.ss{
			font-size: 30rpx !important;
			margin-left: 20rpx;
			color: #3c9cff;
		}
	}
	
	.search-input{
		padding-top: 10rpx;
		margin-left: 1rpx;
	}
	.banner{
		margin-top: 20rpx;
		text-align: center;
		img{
			width: 100%;
		}
	}
	.font{
		font-size: 12px;
	}
	.classification{
		margin: 0 20rpx;
		margin-top: 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		
		.classificationItem{
			position: relative;
			width: 15%;
			&.active{
				color: #393F9D;
				&::after{
					position: absolute;
					content: "";
					left: 70rpx;
					top: 7rpx;
					display: inline-block;
					border-top: 10rpx solid transparent;
					border-right: 10rpx solid transparent;
					border-left: 10rpx solid transparent;
					border-bottom: 10rpx solid #393F9D;
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
		.condition-coier{
			padding: 0 20rpx;
			z-index: 999;
		}
		.condition{
			z-index: 2;
			position: absolute;
			width: 768rpx;
			left: -20rpx;
			box-sizing: border-box;
			// padding: 0 20rpx;
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
				// margin-left: 1rpx;
				.detailItem{
					display: inline-block;
					width: 166rpx;
					text-align: center;
					border: 1px solid #ccc;
					box-sizing: border-box;
					color: #ccc;
					margin-right: 18rpx;
					margin-bottom: 10rpx;
					padding: 10rpx;
					// margin-left: 10rpx;
				}
				.detailItem:nth-last-child(1){
					margin-right: 0;
				}
			}
			.operation{
				display: flex;
				align-items: center;
				justify-content: space-between;
				// position: absolute;
				width: 98%;
				padding-bottom: 20rpx;
				
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
		position: relative;
		top: 220rpx;
		margin: 30rpx 35rpx 0rpx 35rpx;
		.resultItem{
			width: 47%;
			display: inline-block;
			background-color: #fff;
			margin-bottom: 20rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			// padding: 20rpx;
			// position: relative;
			/deep/	.u-image{
					width: 100% !important;
					height: 100% !important;
					object-fit: cover;
				}
				
				/deep/	.u-fade-enter-active{
						width: 100% !important;
						height: 100% !important;
					}
				/deep/ .u-image__image{
						width: 100% !important;
						height: 200rpx !important;
					}
					/deep/ img{
						object-fit: cover;
					}
				/deep/	.u-image__error{
						width: 100% !important;
						height: 200rpx !important;
					}
					
					
			.collection{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-bottom: 10rpx;
			
				
				.u-icon{
					&.active2 {
						background: #EEEEEE;
					}
					&.active{
						background: #393F9D;
					}
					padding: 10rpx;
					border-radius: 50%;
					background: rgba(0, 0, 0, 0.1);
				}
			}
			
			.describe{
				margin-top: 10rpx;
				color: #9E9E9E;
				font-size: 20rpx !important;
			}
			
			&:nth-child(2n+1){
				margin-right: 30rpx;
			}
			// img{
			// 	width: 100%;
			// }
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
	.typeCheck{
		color: #000 !important;
		// background: #f9ae3d;
		border: 1px solid #000 !important;
	}
	.imagrf{
		height: 200rpx !important;
	}
	.name{
		margin-top: 25rpx;
	}
	.postr{
		position: fixed;
		    width: -webkit-fill-available;
			height: -webkit-fill-available;
			background-color: #000;
			opacity: 0.4;
			z-index: -2;
	}
	.postrs{
		    position: absolute;
			width: -webkit-fill-available;
			height: -webkit-fill-available;
			// background-color: #fff;
			z-index: -1;
	}
</style>
