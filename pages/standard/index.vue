<template>
	<view class="box">
		<view style="position: fixed;z-index: 1;width: 100%;top: 0;background-color: #fff;height: 235rpx;">
		<view class="searchFor">
			<view @click="toUrl('/pages/collection/index')" class="font" style="color: rgb(58, 62, 191);text-decoration: underline;margin-left: 520rpx;margin-bottom: 10rpx;" >点击查看已收藏户型</view>
			<view class="search">
				<u--input placeholder="请输入户型编号" suffixIconStyle="color: #909399" v-model="formData.hxbh"></u--input>
				<u-icon name="search" color="#909399" @click="ss" size="24"></u-icon>
			</view>
			<view @click="toUrl('/pages/BzPageDetail/index')" class="font" style="color: #c0c4cd;text-decoration: underline;padding-left: 40rpx;margin-top: 15rpx;" >查看标准户型编号命名规则</view>
		</view>
		<view class="classification">
			<view 
				v-for="(item,indexs) in classificationArry"
				:class="['classificationItem', item.state?'active':'']"
				@click.stop="clickItem(indexs)"
			>
				{{item.name}}
			</view>
			<view class="condition" v-if="conditionState" @touchmove.prevent @click.stop="clickItem('special')">
				
				<view class="condition-coier">
				<view class="title">{{classificationArry[activeIndex].name}}</view>
				<view v-if="classificationArry[activeIndex].name === '项目'">
					<!-- <view class="title">所在项目</view> -->
					<view class="detail">
						<view class="detailItem" v-for="(item,index) in szxm" :key="index"
						:class="{typeCheck:item.mainTable.typeCheck}"
						@click="onszxm(index)"
						>
							{{item.mainTable.xmmc}}
						</view>
					</view>
				</view>
				<view class="detail">
					<view 
					@click="dwclick(item,index)"
						class="detailItems"
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
				
				<view v-if="classificationArry[activeIndex].name === '筛选'" style="position: absolute;">
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
				<!-- <view class="postrs"></view> -->
				</view>
				<view class="postr"></view>
				
			</view>
		</view>
		</view>
		<view class="result">
			<view 
				class="resultItem" 
				:class="{middle:index%2==1}"
				v-for="(item,index) in publicer.result"
				:key="index"
				@click="onrouter(item)"
			>
				<view class="collection">
					<u-icon name="star" class='active' size="14" color="#EEEEEE" v-if="isCollection.indexOf(item.mainTable.hxbh)!=-1"></u-icon>
					<u-icon name="star" class='active2' size="14" color="#000" v-else></u-icon>
				</view>
				<u-image :showLoading="true"  :src="item.mainTable.cftpurl"></u-image>
				<view class="describe">
					<view style="font-weight: 600;color: #000;">{{item.mainTable.hxbh}}</view>
					<view>定位：{{item.mainTable.dw}}</view>
					<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">面积段：{{item.mainTable.mjd}}</view>
					<view>
						<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">套型：{{item.mainTable.tx}}</view>
					<!-- 	<view>100万</view> -->
					</view>
					<view>
						<view style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">所在项目：{{item.mainTable.szxm}}</view>
					<!-- 	<view>100万</view> -->
					</view>
				</view>
			</view>
		</view>
	</view>
	

</template>

<script>
	import bottomNav from '../public/bottomNav.vue'
	import {getbiaozhunku,location,screen,layers,jacketed,getProject,getCollectionList} from '../../api/publice.js'
	import md5 from 'js-md5';
	export default {
		data() {
			return {
				isCollection:[],
				publicer:{result:[]},
				index:0,
				szxm:[],
				szxmdata:[],
				formData:{
					hxbh:'',
					cs:[],
					dw:[],
					tx:[],
					mjd:[],
					Recherche: false, //搜索限制
					addrest: false, //创建限制
					page: 1, //分页
					size: 1000000, //分页大小
					area: '',
					screenvalue: '',
					layersvalue: '',
					jacketedvalue: '',
					search: '',
					keywords: '', //节假日名称
					address: '', //地区
					options: [{
						value: 'zhinan',
						label: '指南',
						children: [{
							value: 'shejiyuanze',
							label: '设计原则'
						}]
					}]
				},
				show: false,
				classificationArry:[
					{
						name:'定位',
						state:false,
						activeItem:[],
						option:JSON.parse(JSON.stringify(location))
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
		onPullDownRefresh() {
			this.formData.page = 1
			this.getbiaozhunkulist()
			
		},
		created() {
			this.getbiaozhunkulist()
			this.getProjectlist()
			document.onclick=()=>{
				this.conditionState = false
				this.classificationArry.forEach(item=>{
					item.state = false
				})
			}
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
						"hxlx": 0
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
			oncz(){
				this.classificationArry = [
					{
						name:'定位',
						state:false,
						activeItem:[],
						option:JSON.parse(JSON.stringify(location))
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
				this.szxm.forEach((ac,index)=>{
					if(index==0){
						ac.mainTable.typeCheck=true;
					}else{
						ac.mainTable.typeCheck=false;
					}
				})
				this.szxmdata=[]
				this.formData.cs = []
				this.formData.dw = []
				this.formData.tx = []
				this.formData.mjd = []
			},
			onszxm(index){
				let szxm = []
				if(index==0){
					this.szxm.forEach((ac,index)=>{
						if(index!=0){
							ac.mainTable.typeCheck = false;
						}
					})
				}else{
					this.$set(this.szxm[0].mainTable,"typeCheck",false)
				}

				this.$set(this.szxm[index].mainTable,"typeCheck",!this.szxm[index].mainTable.typeCheck)
				this.szxm.forEach(ac=>{
					if(ac.mainTable.typeCheck){
						if(ac.mainTable.id.toString()){szxm.push(ac.mainTable.id)}
					}
				})
				this.szxmdata = szxm;
			},
			more(){
				this.formData.page = this.formData.page+1
				this.getbiaozhunkulist()
			},
			onrouter(itmer){
				sessionStorage.setItem("details",JSON.stringify(itmer));
				this.toUrl('/pages/standard/details')
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
			onprime(){
				let cs=[],dw=[],tx=[],mjd=[];
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
							if(ia.id.toString()){tx.push(ia.id)}
						}
						
					})	
					}
				})
				this.formData.cs = cs
				this.formData.dw = dw
				this.formData.tx = tx
				this.formData.mjd = mjd
				this.getbiaozhunkulist()
				this.conditionState = false
				// this.conditionState =true
			},
		async	getbiaozhunkulist(){
				try {
					let cs="",dw='',tx='',mjd='',szxm='';
					if(this.szxmdata){
						if (this.szxmdata.length == 1) {
							szxm = this.szxmdata[0]
						} else {
							this.szxmdata.forEach((ac, index) => {
								if (this.szxmdata.length - 1 === index) {
									szxm = szxm + ',' + ac
								} else {
									if (index === 0) {
										szxm = ac
									} else {
										szxm = szxm + ',' + ac
									}

								}
							})
						}
					}
					if(this.formData.cs){
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
					if(this.formData.tx){
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
					if(this.formData.mjd){
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

					let res = await getbiaozhunku(JSON.stringify({
						"operationinfo": {
							"operator": JSON.parse(sessionStorage.getItem("user")).userid
							// "operator": 1
						},
						"mainTable": {
							"hxbh": this.formData.hxbh,
							"cs":cs,
							"dw":dw,
							"tx":tx,
							"mjd":mjd,
							"szxm":szxm
						},
						"pageInfo": {
							"pageNo": this.formData.page,
							"pageSize": this.formData.size
						},
						"header": {
							"systemid": "bzk",
							"currentDateTime": this.setTime(),
							"Md5": md5("bzk"+123+this.setTime())
						}
					}));
					// this.publicer.result = eval("(" + res.result + ")")
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
					this.getCollectionListData()
				} catch (e) {
					console.log(e)
					uni.stopPullDownRefresh()	
					//TODO handle the exception
				}
			},
			ss(){
				this.getbiaozhunkulist()
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
				})
			},
			clickItem(index){
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
				
				
			},
			async	getProjectlist(){
					  let szxm = await getProject(JSON.stringify({
					                "operationinfo":{
					                    "operator":"1"
					                    },
					                    "mainTable":{},
					                    "pageInfo":{
					                        "pageNo":"1",
					                        "pageSize":"1000"
					                    },
					                    "header":{
					                        "systemid":"getProject",
					                        "currentDateTime":this.setTime(),
					                        "Md5":md5("getProject"+123+this.setTime())
					                    }
					            }));
					// console.log(eval("(" + szxm.result + ")"))
					this.szxm =[{
						mainTable:{id: '',xmmc: '不限',typeCheck: true}},
						...eval("(" + szxm.result + ")")]
					this.szxm.forEach((ac,index)=>{
						if(index!=0){
							ac.mainTable.typeCheck=false;
						}
					})
					 // if (res.result) {
					 // 	this.publicer.result.push(...eval("(" + res.result + ")"))
					 // }
				},
		}
	}
</script>

<style scoped lang="less">
	uni-page-body{
		 background-color: #fff !important;
	}
	.box{
		padding-bottom: 220rpx;
			
		background-color: #fff !important;
	}
	.searchFor{
		padding-top: 20rpx;
	}
	.search {
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
	.font{
		font-size: 12px;
	}
	.classification{
		position: sticky;
		margin: 0 20rpx;
		margin-top: 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 1;
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
			position: relative;
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
				.detailItems{
					display: inline-block;
					width: 166rpx;
					text-align: center;
					border: 1px solid #ccc;
					box-sizing: border-box;
					color: #ccc;
					margin-right: 18rpx;
					margin-bottom: 10rpx;
					padding: 10rpx;
					border-radius: 8rpx;
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
		top: 200rpx;
		margin: 30rpx 20rpx 0rpx 20rpx;
		
		.resultItem{
			// width: 47%;
			width: 98%;
			// width: 90%;
			// height: 214rpx;
			height: 350rpx;
			margin-bottom: 15rpx;
			margin-left: 10rpx;
			display: inline-block;
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
				height: 100% !important;
			}
			
			.collection{
				display: flex;
				align-items: center;
				justify-content: flex-end;
				margin-bottom: 10rpx;
				margin-top: 20rpx;
				
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
				font-size: 25rpx !important;
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
	.middle{
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
	.typeCheck{
		color: #000 !important;
		border: 1px solid #000 !important;
	}
	.detailItem{
		display: inline-block;
		// width: 166rpx;
		padding-left: 30rpx !important;
		padding-right: 30rpx !important;
		text-align: center;
		border: 1px solid #ccc;
		box-sizing: border-box;
		color: #ccc;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		padding: 10rpx;
		border-radius: 8rpx;
		white-space:nowrap;
	}
	/deep/  .u-image{
		width: 100% !important;
		height: 100% !important;
	}
	/deep/  .u-image__error{
		width: 100% !important;
		height: 100% !important;
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
			background-color: #fff;
			z-index: -1;
	}
	
</style>
