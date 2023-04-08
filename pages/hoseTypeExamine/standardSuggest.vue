<template>
	<view class="box">
		
		<u--form :model="form" ref="uForm" labelWidth='auto' :rules="rules">
			
			<view style="background-color: white;margin-left: -30rpx;margin-right: -30rpx; height: 620rpx;border-radius: 0rpx 0rpx 60rpx 60rpx;">
				<view class="inputor layout" >
					<u-form-item prop="hxbh" label="" style="width: 500rpx;">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入户型编号" v-model="form.hxbh" clearable>
							</u-input>
						</view>
						<view style="width: 300rpx;text-align: center;font-weight: bold;font-size: 30rpx;">
							标准户型审核
						</view>
					</u-form-item>
				</view>
				<view class="toUrl" @click="toUrl2">
					查看标准户型编号命名规则
				</view>
				<view class="box-information-images-col">
					<view class="images-col-title">点击添加图片</view>
					<view class="images-col-title">（户型平面图:需要有房间开间进深尺寸及总尺寸）</view>
					<u-form-item prop="name" class="img1">
						<u-upload name="1" ref="uUpload" :maxCount="1" :fileList="fileList1" @afterRead="afterRead"
							@delete="deletePic1" width="100%" height="150">
							<view class="images-col">
								<u-icon name="plus-circle" class='plus-circle' size="22" color="#AAAAAA"></u-icon>
							</view>
						</u-upload>
					</u-form-item>
				</view>
			</view>
			
			<view class="fonts">
				户型基本信息
			</view>
			<!-- 			:labelStyle="{fontSize:'13px'}" -->
			<view v-if="false">
				<u-form-item label="推荐类型:">
					<view class="input-hxbh input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.bzhx" disabled>
						</u-input>
					</view>
				</u-form-item>
			</view>
			<view class="inputor">
				<u-form-item label="定位:" prop="dw">
					<view class="input-hxbh input-type">
						<u-checkbox-group v-model="form.dw">
							<u-checkbox class='checkbox' v-for="(item, index) in bzlocation" :key="index"
								:label="item.name" :name="item.id">
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</u-form-item>
			</view>
			<view class="inputor">
				<u-form-item label="层数:" prop="cs">
					<view class="input-hxbh input-type">
						<u-checkbox-group v-model="form.cs">
							<u-checkbox class='checkbox' v-for="(item, index) in layerss" :key="index"
								:label="item.name" :name="item.id">
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</u-form-item>
			</view>
			<view class="inputor">
				<u-form-item label="面积段:" prop="mjd">
					<view class="input-hxbh input-type">
						<u-checkbox-group v-model="form.mjd" style="display: flex;flex-wrap: wrap;margin-left: -28rpx;">
							<u-checkbox class='checkbox' style="margin-bottom: 20rpx;" v-for="(item, index) in screens"
								:key="index" :label="item.name" :name="item.id">
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</u-form-item>
			</view>
			<view class="inputor">
				<u-form-item label="套型:" prop="tx">
					<view class="input-hxbh input-type">
						<u-checkbox-group v-model="form.tx" style="display: flex;flex-wrap: wrap;">
							<u-checkbox style="margin-bottom: 20rpx;" class='checkbox'
								v-for="(item, index) in jacketeds" :key="index" :label="item.name" :name="item.id">
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</u-form-item>
			</view>

			<view class="box-information">
				<view class="box-information-one">
					<view class="bzcmj">
						<u-form-item label="标准层面积:" prop="bzcmj">
							<view class="input-type">
								<u-input fontSize='12px' placeholder="请输入" v-model="form.bzcmj" clearable>
								</u-input>
							</view>
						</u-form-item>
					</view>


					<u-form-item class="lx" label="类型:" borderBottom @click="showlx = true;actions=lxlist" prop="lx">
						<view class="input-type">
							<u--input v-model="form.lx" disabled disabledColor="#ffffff" placeholder="请选择"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</view>
					</u-form-item>
					<u-form-item class="bzcmj" prop="bzcts" label="标准层套数:" borderBottom
						@click="showlx = true;actions=bzctslist">
						<view class="input-type">
							<u--input v-model="form.bzcts" disabled disabledColor="#ffffff" placeholder="请选择">
							</u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</view>
					</u-form-item>
					<u-form-item class="sfdtrh" prop="sfdtrh" label="是否独梯入户:" borderBottom
						@click="showlx = true;actions=sfdtrhlist">
						<view class="input-type">
							<u--input v-model="form.sfdtrh" disabled disabledColor="#ffffff" placeholder="请选择">
							</u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</view>
					</u-form-item>
				</view>
				<view>
					<!-- <view class="input-type-cor">
						<u-form-item prop="name" label="得房率:">
							<view class="input-type ">
								<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change"
									clearable>
								</u-input>
							</view>
						</u-form-item>
					</view> -->

					<view>
						<u-form-item class="dfl" prop="dfl" label="得房率:">
							<view class="input-type">
								<u-input fontSize='12px' placeholder="请输入" v-model="form.dfl" clearable>
								</u-input>
							</view>
						</u-form-item>
					</view>
					<u-form-item class='kfpj' prop="kfpj" label="可否拼接:" borderBottom
						@click="showlx = true;actions=kfpjlist;">
						<view class="input-type">
							<u--input   v-model="form.kfpj" fontSize='12px' disabled disabledColor="#ffffff" placeholder="请选择"></u--input>
						</view>
					</u-form-item>
					<view class="input-type-cor-three">
						<u-form-item class="zmk" prop="zmk" label="总面宽:">
							<view class="input-type">
								<u-input fontSize='12px' placeholder="请输入" v-model="form.zmk" @change="change"
									clearable>
								</u-input>
							</view>
						</u-form-item>
					</view>
					<u-form-item class='kfpj' prop="xmzt" label="项目状态:" borderBottom
						@click="showlx = true;actions=xmztlist;">
						<view class="input-type">
							<u--input v-model="form.xmzt" disabled disabledColor="#ffffff" placeholder="请选择"></u--input>
						</view>
					</u-form-item>

				</view>
			</view>
			<view class="input-type-cor-three">
				<u-form-item prop="szxm" label="所在项目:" class='szxm'>
					<view class="input-type">
						<u-checkbox-group style="display: flex;flex-wrap: wrap;" v-model="form.szxm">
							<u-checkbox style="margin-bottom: 20rpx;" class='checkbox' v-for="(item, index) in szxmlist"
								:key="index" :label="item.name" :name="item.id">
							</u-checkbox>
						</u-checkbox-group>
					</view>
				</u-form-item>
			</view>
			<view>
				<u-form-item prop="szxmlh" label="所在项目楼号:" class="szxmlh">
					<view class="input-hxbh input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.szxmlh" clearable>
						</u-input>
					</view>
				</u-form-item>
			</view>
			<view>
				<u-form-item prop="jzfasjy" label="建筑方案设计院:">
					<view class="input-hxbh input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.jzfasjy" clearable>
						</u-input>
					</view>
				</u-form-item>
			</view>
			<view class="inputor">
				<u-form-item prop="hxtd" label="户型特点:">
					<view class="input-hxbh input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.hxtd" clearable>
						</u-input>
					</view>
				</u-form-item>
			</view>	
			
			<view class="fonts-fu">
				户型明细表
			</view>
			<br>
			<view class="c-column">
				<view class="c-row" style="margin: 5px;">
					<button type="default" @click="addRow" style="height: 60rpx;font-size: 15px;text-align: center;">新增</button>
					<button type="default" @click="removeRow" style="height: 60rpx;font-size: 15px;text-align: center;">删除</button>
				</view>
				<view style="height: 100%;">
					<c-table class="c-filling" ref="table" style="height: auto;" 
					:initTable="initTable" @slotEvents="slotEvents" @initComplete="initComplete" />
				</view>
			
			</view>
			
			<view style="color:RED;margin-top: 10rpx;">请左右滑动填写数据！</view>
			
			
			<view class="fonts-fu">
				户型相关图片
			</view>
			<view class="box-information-images-col box-information-images-col-to">
				<view class="images-col-title">点击添加图片</view>
				<view class="images-col-title">（相关图片需有与本户型相匹配的总图、鸟瞰、</view>
				<view class="images-col-title-2">住宅立面、小区大门立面、景观、室内效果图或实景照片）</view>
				<u-form-item prop="name" class="img2">
					<u-upload name="6" multiple :maxCount="5" @delete="deletePic2" @afterRead="afterRead2"
						:fileList="fileList2">
						<view class="images-col">
							<u-icon name="plus-circle" class='plus-circle' size="22" color="#AAAAAA"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
			</view>
			
			<view class="box-information">
				<view class="box-information-one">
					<view>
						<u-form-item prop="name">
							<view class="fill_dow">
								<uni-file-picker limit="5" file-mediatype="all" v-model="imageValue" @select="select"
									@progress="progress" @success="success" @fail="fail">
									<slot name="default">
										<view>
											<u-button icon="plus-circle" :plain="true" text="点击上传DWG文件"></u-button>
										</view>
									</slot>
								</uni-file-picker>
			
							</view>
						</u-form-item>
					</view>
				</view>
			</view>
			
			
			<!-- <view class="box-information">
				<view class="box-information-one">
					<view>
						<u-form-item prop="name">
							<view class="fill_dow">
								<uni-file-picker limit="5" file-mediatype="all">
									<slot name="default">
										<view>
											<u-button icon="plus-circle" :plain="true" text="点击上传CAD文件"></u-button>
										</view>
									</slot>
								</uni-file-picker>

							</view>
						</u-form-item>
					</view>
				</view>
				<view>
					<view>
						<u-form-item prop="name">
							<view class="fill_dow">
								<uni-file-picker limit="5" file-mediatype="all">
									<slot name="default">
										<view>
											<u-button icon="plus-circle" :plain="true" text="点击上传PDF文件"></u-button>
										</view>
									</slot>
								</uni-file-picker>

							</view>
						</u-form-item>
					</view>

				</view>
			</view>
			<!-- <view class="box-information-images-col">
				<view class="images-col-title">点击添加图片</view>
				<view class="images-col-title">户型平面图</view>
				<u-form-item prop="name">
					<u-upload name="6" multiple :maxCount="3" width="250" height="150">
						<view class="images-col">
							<u-icon name="plus-circle" class='plus-circle' size="22" color="#AAAAAA"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
			</view>
			<view class="box-information-images-col box-information-images-col-to">
				<view class="images-col-title">点击添加图片</view>
				<view class="images-col-title">（建筑立面/室内效果图，最多添加5张）</view>
				<u-form-item prop="name">
					<u-upload name="6" multiple :maxCount="3" width="250" height="150">
						<view class="images-col">
							<u-icon name="plus-circle" class='plus-circle' size="22" color="#AAAAAA"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
			</view> -->
			<view class="fonts-fu">
				推荐信息
			</view>
			<!-- <view>
				<u-form-item prop="name" label="审核人姓名:">
					<view class="input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.xm" @change="change" clearable>
						</u-input>
					</view>
				</u-form-item>
			</view> -->
			<view>
				<view class="inputor">
					<u-form-item prop="tjr" label="推荐人姓名:">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" style="width: 300rpx;margin-left: 50rpx;" v-model="form.tjr" disabled>
							</u-input>
						</view>
					</u-form-item>
				</view>
			</view>
			<view>
				<view class="inputor">
					<u-form-item prop="tjrlxdh" label="推荐人联系方式:">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" style="width: 300rpx;" v-model="form.tjrlxdh" disabled>
							</u-input>
						</view>
					</u-form-item>
				</view>
			</view>
			<view class="textarea">推荐原因:</view>
			<u-form-item prop="tjly">
				<u-textarea v-model="form.tjly" placeholder="请简要阐述推荐原因，不少于20字" disabled></u-textarea>
			</u-form-item>
			<view class="fonts-fu">
				审核信息
			</view>
			<!-- <view>
				<u-form-item prop="name" label="审核人姓名:">
					<view class="input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.xm" @change="change" clearable>
						</u-input>
					</view>
				</u-form-item>
			</view> -->
			<view>
				<u-form-item class="lx" label="审核状态:"  borderBottom @click="showlx = true;actions=examineState"
					prop="lx">
					<view class="input-type">
						<u--input v-model="form.sh" style="margin-left: 90rpx;" disabled disabledColor="#ffffff" placeholder="请选择"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</view>
				</u-form-item>
			</view>
			
			<!-- <view>
				<u-form-item prop="name" label="推荐人联系方式:">
					<view class="input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.lxfs" @change="change" clearable>
						</u-input>
					</view>
				</u-form-item>
			</view> -->
			<view class="textarea">审核说明:</view>
			<u-form-item prop="shyj">
				<u-textarea v-model="form.shyj" placeholder="审核不通过时,必填" count></u-textarea>
			</u-form-item>
		</u--form>
		<u-action-sheet :show="showlx" :actions="actions" title="请选择" @close="showlx = false" @select="lxSelect">
		</u-action-sheet>
		<view class="button-buyt">
			<!-- <u-button  class='submit' color='#000' :plain="true" @click="postAddbzks">保存信息</u-button> -->
			<u-button @click="postAddbzks" class='submit' color='#000' :loading="coftr">保存并提交</u-button>
		</view>

	</view>
</template>

<script>
	import {
		postUpdatebzk,
		bzlocation,
		layerss,
		screens,
		jacketeds,
		lxlist,
		kfpjlist,
		bzctslist,
		sfdtrhlist,
		getProject,
		xmztlist
	} from '../../api/publice.js';
	import md5 from 'js-md5';
	export default {
		watch: {
		  'form.sh': {
		    handler: function(news,neu) {
				this.shzt()
				// if(!news&&!neu){
					
				// }else{
					
				// }
		    }
		  }
		},
		data() {
			return {
				examineState: [
					{
							value: 0,
							type: 'sh',
							name: "审核中"
						},
						{
							value: 1,
							type: 'sh',
							name: "通过"
						},
						{
							value: 2,
							type: 'sh',
							name: "不通过"
						}
				],
				initTable: {
					columns: [{
							type: "checkbox",
							width: 50,
						}, {
							field: "xh",
							title: "序号",
							width: 150,
							editRender: {
								name: "input",
								props: {
									type: "input"
								}
							}
						},
						{
							field: "hxjg",
							title: "户型结构",
							width: 150,
							editRender: {
								name: "$select",
								options: [{
										label: '2F2T1W',
										value: '0'
									}, {
										label: '2F2T2W',
										value: '1'
									},
									{
										label: '3F2T1W',
										value: '2'
									},
									{
										label: '3F2T2W/3',
										value: '3'
									},
									{
										label: '3F2T3W/3',
										value: '4'
									},
									{
										label: '3+1F2T2W',
										value: '5'
									},
									{
										label: '4F2T2W',
										value: '5'
									}
								]
							}
						},
						{
							field: "tnmj",
							title: "套内面积（㎡）",
							width: 100,
							editRender: {
								name: "input",
								props: {
									type: "input"
								}
							},
						}, {
							field: "ytmj",
							title: "阳台面积（㎡）",
							width: 100,
							editRender: {
								name: "input",
								props: {
									type: "input"
								}
							},
						}, {
							field: "gtmj",
							title: "公摊面积（㎡）",
							width: 150,
							editRender: {
								name: "input",
								props: {
									type: "input"
								}
							},
						},
						{
							field: "jzmj",
							title: "建筑面积（㎡）",
							width: 150,
							editRender: {
								name: "input",
								props: {
									type: "input"
								}
							},
						}
					],
					loading: false, //加载遮罩					//注册表格事件列点击事件，行点击事件		
					initEventsList: ["header-cell-click", "cell-click"], //插槽内容		
					initSlotString: `<template #operate="{ row }"><vxe-button @click="slotEvents(row)">获取行对象</vxe-button></template>`
				},
				data: [],
				id: '',
				img: {
					cftpurl: '',
					cftpxz: '',
					hxturl: '',
					hxtxz: '',
					dwgfjname: '',
					dwgfjdownlod: ''
				},
				imgSrc: [],
				loadlink: [],
				imageValue: [],
				hxt: [],
				coftr: false,
				showlx: false,
				actions: [],
				bzlocation: bzlocation,
				layerss: layerss,
				screens: screens,
				jacketeds: jacketeds,
				lxlist: lxlist,
				
				kfpjlist: kfpjlist,
				bzctslist: bzctslist,
				sfdtrhlist: sfdtrhlist,
				xmztlist: xmztlist,
				szxmlist: [],
				fileList1: [],
				fileList2: [],
				fileList1Name: [],
				fileList2Name: [],
				radiolist1: [{
						name: '是',
						disabled: false
					},
					{
						name: '否',
						disabled: false
					}
				],
				Project_data: [{
						name: '天津',
						disabled: false
					},
					{
						name: '烟台',
						disabled: false
					},
					{
						name: '西安',
						disabled: false
					},
					{
						name: '奉贤新城',
						disabled: false
					},
					{
						name: '临港',
						disabled: false
					},
					{
						name: '青浦',
						disabled: false
					}
				],
				password_type: {
					suffixIcon: "eye",
					type: 'password'
				},
				value: '',
				form: {
					bzhx: "标准户型",
					shyj: '',
					hxtd: '',
					szxmlh: '',
					hxbh: '',
					zmk: '',
					lx: '',
					kfpj: '',
					bzcts: '',
					sfdtrh: '',
					szxm: [],
					xmzt: '',
					dw: [],
					cs: [],
					mjd: [],
					tx: [],
					bzcmj: '',
					dfl: '',
					name: '',
					password: '',
					radiovalue1: '',
					Project_valuye: '',
					sh: '',
					tjr:'',
					tjly:'',
					tjrlxdh:''
				},
				rules: {
					hxtd: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					shyj: [{
						required: '',
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					szxm: {
						type: 'array',
						required: true,
						message: '请选择',
						trigger: ['change']
					},
					dfl: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					kfpj: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					zmk: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					xmzt: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					szxmlh: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					bzcmj: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					lx: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					bzcts: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					sfdtrh: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					hxbh: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					dw: {
						type: 'array',
						required: true,
						message: '请选择',
						trigger: ['change']
					},
					tx: {
						type: 'array',
						required: true,
						message: '请选择',
						trigger: ['change']
					},
					mjd: {
						type: 'array',
						required: true,
						message: '请选择',
						trigger: ['change']
					},
					cs: {
						type: 'array',
						required: true,
						message: '请选择',
						trigger: ['change']
					},
					password: [{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}]
				}
			};
		},
		created() {
			this.getProjectlist()

		},

		onLoad(option) {
			this.id = option.id
		},
		methods: {
			toUrl2() {
				uni.navigateTo({
				    url: '/pages/BzPageDetail/index'
				})
			},
			addRow() {
				this.$refs.table.callMethods("insert")
				this.data.unshift({
					"xh": '',
					"ytmj": "",
					"tnmj": "",
					"gtmj": "",
					"hxjg": "",
					"jzmj": ""
				})
			},
			removeRow() {
			    this.$refs.table.callMethods("removeCheckboxRow")
			},
			initComplete() {
				this.$refs.table.setTableProps({
					loading: true,
				})
				//模拟异步加载数据			
				setTimeout(() => {
					this.$refs.table.setTableProps({
						loading: false,
						data: this.data,
						editRules: {
							ytmj: [{
								required: true,
								message: '请填写',
							}],
							jzmj: [{
								required: true,
								message: '请填写',
							}],
							hxjg: [{
								required: true,
								message: '请填写',
							}],
							xh: [{
								required: true,
								message: '请填写',
							}],
							gtmj: [{
								required: true,
								message: '请填写',
							}],
							tnmj: [{
								required: true,
								message: '请填写',
							}],
						},
					})
				}, 1000)
			},
			shzt(){
				if(this.form.sh == "通过" || this.form.sh == "审核中"){
					this.rules.shyj[0].required = false;
				}else if(this.form.sh == "不通过"){
					this.rules.shyj[0].required = true;
				}
			},
			async postAddbzks() {
				this.$refs.uForm.validate().then(async res => {
					
					
					try {
						let lx = '',
							kfpj = '',
							bzcts = "",
							sfdtrh = '',
							xmzt = '',
							tjsh = '';
						this.examineState.forEach(itner => {
							if (this.form.sh == itner.name) {
								tjsh = itner.value;
							}
						})


						lxlist.forEach(ac => {
							if (ac.name == this.form.lx) {
								lx = ac.value
							}
						})
						kfpjlist.forEach(ac => {
							if (ac.name == this.form.kfpj) {
								kfpj = ac.value
							}
						})
						bzctslist.forEach(ac => {
							if (ac.name == this.form.bzcts) {
								bzcts = ac.value
							}
						})
						sfdtrhlist.forEach(ac => {
							if (ac.name == this.form.sfdtrh) {
								sfdtrh = ac.value
							}
						})
						xmztlist.forEach(ac => {
							if (ac.name == this.form.xmzt) {
								xmzt = ac.value
							}
						})
						let cs = "",
							dw = '',
							tx = '',
							mjd = '',
							szxm = '',
							sh = '',
							hxid='';
						if (this.form.cs) {
							if (this.form.cs.length == 1) {
								cs = this.form.cs[0]
							} else {
								this.form.cs.forEach((ac, index) => {
									if (this.form.cs.length - 1 === index) {
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
						if (this.form.dw) {
							if (this.form.dw.length == 1) {
								dw = this.form.dw[0]
							} else {
								this.form.dw.forEach((ac, index) => {
									if (this.form.dw.length - 1 === index) {
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
						if (this.form.tx) {
							if (this.form.tx.length == 1) {
								tx = this.form.tx[0]
							} else {
								this.form.tx.forEach((ac, index) => {
									if (this.form.tx.length - 1 === index) {
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
						if (this.form.mjd) {
							if (this.form.tx.length == 1) {
								mjd = this.form.mjd[0]
							} else {
								this.form.mjd.forEach((ac, index) => {
									if (this.form.mjd.length - 1 === index) {
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
						if (this.form.szxm) {
							if (this.form.tx.length == 1) {
								szxm = this.form.szxm[0]
							} else {
								this.form.szxm.forEach((ac, index) => {
									if (this.form.szxm.length - 1 === index) {
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
						if (this.form.sh) {
							this.examineState.forEach(item => {
								if (item.name == this.form.sh) {
									sh = item.value
								}
							})
						}
						
						function hxjgValue(name){
							if(name == "2F2T1W"){
								return 0;
							}else if(name == "2F2T2W"){
								return 1;
							}else if(name == "3F2T1W"){
								return 2;
							}else if(name == "3F2T2W/3"){
								return 3;
							}else if(name == "3F2T3W/3"){
								return 4;
							}else if(name == "3+1F2T2W"){
								return 5;
							}else if(name == "4F2T2W"){
								return 6;
							}
						}
						
						var url = window.location.href ;
						this.hxid = url.split("=")[1];
						this.coftr = true;
						let darl = []
						let HxjgLen = this.data.length;
						let zhi = 0;
						for(let i = 0; i<HxjgLen;i++){
							zhi = hxjgValue(this.data[i].hxjg)
							this.data[i].hxjg = zhi;
						}
						
						this.data.forEach(itmer => {
							darl.push({
								"operate": {
									"action": "SaveOrUpdate",
									"actionDescribe": ""
								},
								"data": itmer
							})
						})

						try {
							let data = {
								"data": [{
									"operationinfo": {
										"operationDate": "",
										"operator": JSON.parse(sessionStorage.getItem("user")).userid,
										"operationTime": ""
									},
									"mainTable": {
										"id": this.hxid,
										"cftpurl": this.img.cftpurl,
											"cftpxz": this.img.cftpxz,
											"hxturl": this.img.hxturl,
											"hxtxz": this.img.hxtxz,
											"dwgfjname": this.img.dwgfjname,
											"dwgfjdownlod": this.img.dwgfjdownlod,
											"jzfasjy":this.form.jzfasjy,
											"tx": tx,
											// "dwtxt": "",
											"lx": lx,
											"sfdtrh": sfdtrh,
											"dw": dw,
											// "tjrbm": "",
											"shyj": this.form.sh,
											"bzcts": bzcts,
											"xmzt": xmzt,
											// "jzfasjy": "",
											// "tjrdw": "",
											// "imgsrc": "",
											// "cftpurl": "",
											// "tjxxm": "",
											// "tpurl": "",
											// "hxt":this.hxt,
											"mjd": mjd,
											"hxbh": this.form.hxbh,
											"kfpj": kfpj,
											// "tjxsjdw": "",
											// "cstxt": "",
											"szxm": szxm,
											// "dwgwjxz": [{
											// 	"name": "",
											// 	"content": ""
											// }],
											"dfl": this.form.dfl,
											"zmkm": this.form.zmk,
											// "mjdtxt": "",
											"cs": cs,
											// "hxxgtp": [{
											// 	"name": "",
											// 	"content": ""
											// }],
											"hxtd": this.form.hxtd,
											"szxmlh": this.form.szxmlh,
											"tjlx": "标准户型",
											"bzcmj": this.form.bzcmj,
											"tjly": this.form.tjly,
											// "txtxt": "",
											// "jrxxy": "",

										"shyj": this.form.shyj,
										// "txtxt": "",
										// "jrxxy": "",
										// "tjr": "",
										"tjsh": tjsh
									},
									"detail1": darl
								}],
								"header": {
									"systemid": "Updatebzk",
									"currentDateTime": this.setTime(),
									"Md5": md5("Updatebzk" + 123 + this.setTime())
								}
							}
							// console.log(JSON.stringify(data))
							let res = await postUpdatebzk(JSON.stringify(data));

							if (res.status == 1) {
								uni.navigateBack({
									delta: 1
								})
							}
							this.coftr = false;
						} catch (e) {
							console.log(e)
							this.coftr = false;
							//TODO handle the exception
						}
					} catch (e) {
						console.log(e)
						//TODO handle the exception
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			async select(event) {
				let res = await upImg(event.tempFiles[0])
				this.img.dwgfjname = event.tempFiles[0].name;
				this.img.dwgfjdownlod = "https://oa.siud.com" + res.uploadFileRes.data.loadlink;
			},
			fail(e) {
				console.log('上传失败：', e)
			},
			success(e) {
				console.log('上传成功')
			},
			progress(e) {
				console.log('上传进度：', e)
			},
			lxSelect(itmer) {
				if (itmer.type == 'lx') {
					this.form.lx = itmer.name;
				}
				if (itmer.type == 'kfpj') {
					this.form.kfpj = itmer.name;
				}
				if (itmer.type == 'bzcts') {
					this.form.bzcts = itmer.name;
				}

				if (itmer.type == 'sfdtrh') {
					this.form.sfdtrh = itmer.name;
				}
				if (itmer.type == 'xmzt') {
					this.form.xmzt = itmer.name;
				}
				if (itmer.type == 'sh') {
					this.form.sh = itmer.name;
				}

			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				//console.log(e);
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			deletePic1(event) {
				this.fileList1 = []
				this.fileList1Name = ''
			},
			deletePic2(event) {
				let arry = []
				for (let i = 0; i < this.fileList2.length; i++) {
					if (event.file.url !== this.fileList2[i].url) {
						arry.push(this.fileList2[i])
					}
				}
				this.fileList2 = arry
			},
			// 新增图片
			async afterRead(event) {
				this.fileList2.push(event.file[0])
				let res = await upImg(event.file[0])
				this.imgSrc.push("https://oa.siud.com" + res.uploadFileRes.data.imgSrc)
				this.loadlink.push("https://oa.siud.com" + res.uploadFileRes.data.loadlink)
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				// let lists = [].concat(event.file)
				// let fileListLen = this[`fileList${event.name}`].length
				// lists.map((item) => {
				// 	this[`fileList${event.name}`].push({
				// 		...item,
				// 		status: 'uploading',
				// 		message: '上传中'
				// 	})
				// })
				// for (let i = 0; i < lists.length; i++) {
				// 	const result = await this.uploadFilePromise(lists[i].url)
				// 	let item = this[`fileList${event.name}`][fileListLen]
				// 	this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
				// 		status: 'success',
				// 		message: '',
				// 		url: result
				// 	}))
				// 	fileListLen++
				// }
			},
			async afterRead2(event) {
				this.fileList2.push(event.file[0])
				// let imgSrc = [],loadlink=[];
				// for(let i = 0 ; i < this.fileList2.length;i++){
				let res = await upImg(event.file[0])
				this.imgSrc.push(res.uploadFileRes.data.imgSrc)
				this.loadlink.push(res.uploadFileRes.data.loadlink)
				// }
				// this.img.hxturl = this.pjie(imgSrc)
				// this.img.hxtxz = this.pjie(loadlink)
				// console.log(this.img.hxtxz,99999,this.fileList2)
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},

			onsuffix() {
				if (this.password_type.suffixIcon == 'eye') {
					this.password_type.type = 'text'
					this.password_type.suffixIcon = 'eye-off'
				} else {
					this.password_type.suffixIcon = 'eye'
					this.password_type.type = 'password'
				}
			},
			change() {

			},
			async getProjectlist() {

				getProject(JSON.stringify({
					"operationinfo": {
						"operator": "1"
					},
					"mainTable": {},
					"pageInfo": {
						"pageNo": "1",
						"pageSize": "1000"
					},
					"header": {
						"systemid": "getProject",
						"currentDateTime": this.setTime(),
						"Md5": md5("getProject" + 123 + this.setTime())
					}
				})).then(szxm => {
					let list = [];
					eval("(" + szxm.result + ")").forEach((ac, index) => {
						list.push({
							id: ac.mainTable.id,
							name: ac.mainTable.xmmc,
						})
					})
					this.szxmlist = list;
					if (sessionStorage.getItem('detailsjp')) {
						this.details = JSON.parse(sessionStorage.getItem('detailsjp'))
						let detailslistrjp = JSON.parse(sessionStorage.getItem('detailslistrjp'))
						this.data = detailslistrjp;
						this.form.zmk = this.details.zmkm
						
						
						
						
						
						for (let item in this.details) {
							this.form[item] = this.details[item]
							// 定位
							if (item == 'dw') {
								let arry = []
								for (let i = 0; i < this.bzlocation.length; i++) {
									this.details.dw.split(',').forEach(item => {
										if (item.indexOf(this.bzlocation[i].name) !== -1) {
											arry.push(this.bzlocation[i].id)
										}
									})
								}
								this.form.dw = arry
								// this.form.dw =
							}
							//层高
							if (item == 'cs') {
								let arry = []
								for (let i = 0; i < this.layerss.length; i++) {
									this.details.cs.split(',').forEach(item => {
										if (item.indexOf(this.layerss[i].name) !== -1) {
											arry.push(this.layerss[i].id)
										}
									})
								}
								this.form.cs = arry
							}
							//面积段
							if (item == 'mjd') {
								let arry = []
								for (let i = 0; i < this.screens.length; i++) {
									this.details.mjd.split(',').forEach(item => {

										if (item.indexOf(this.screens[i].name) != -1) {
											arry.push(this.screens[i].id)
										}
									})
								}
								this.form.mjd = arry
							}
							
							if (item == 'tx') {
								let arry = [];
								let taoxing = '';
								for (let i = 0; i < this.jacketeds.length; i++) {
									this.details.tx.split(',').forEach(item => {
										switch(item){
												case '二室二厅一卫（2F2T1W）':
													taoxing = '2室2厅1卫'
												break;
												case '二室二厅两卫（2F2T2W）':
													taoxing = '2室2厅2卫'
												break;
												case '三室二厅二卫（3F2T2W/3+1F2T2W）':
													taoxing = '3室2厅2卫'
												break;
												case '四室二厅二卫（4F2T2W）':
													taoxing = '4室2厅2卫'
												break;
												case '四室二厅三卫/四卫（4F2T3W/4w）':
													taoxing = '4室2厅3卫/4卫'
												break;
												case '三室两厅一卫（3F2T1W）':
													taoxing = '3室2厅1卫'
												break;
												case '三室两厅三卫（3F2T1W）':
													taoxing = '3室2厅3卫'
												break;
												case '其他':
													taoxing = '其他'
												break;
											}
										if (taoxing.indexOf(this.jacketeds[i].name) != -1) {
											arry.push(this.jacketeds[i].id)
										}
									})
								}
								this.form.tx = arry
							}
							if (item == 'szxm') {
								let arry = []
								for (let i = 0; i < this.szxmlist.length; i++) {

									this.details.szxm.split(',').forEach(item => {

										// console.log(item,"---",this.szxmlist[i],item.indexOf(this.szxmlist[i].name))
										if (item == this.szxmlist[i].name) {
											arry.push(this.szxmlist[i].id)
										}


									})
								}
								// console.log(arry)
								this.form.szxm = arry
							}
						}
						
						if(this.details.cftpurl){
							this.fileList1.push({url:this.details.cftpurl})
							this.img.cftpurl = this.details.cftpurl;	
						}
						this.details.hxturl.split(',').forEach(ac=>{
							this.imgSrc.push("https://oa.siud.com" + ac)
							this.img.hxturl = this.details.hxturl;
							this.fileList2.push({
								url:"https://oa.siud.com" +ac
							})
						})
						this.img.dwgfjname = this.details.dwgfjname
						this.img.dwgfjdownlod=this.details.dwgfjdownlod
						if(this.details.dwgfjdownlod){
						this.imageValue.push({
							url:this.details.dwgfjdownlod,
							name:this.details.dwgfjname
						})	
						}
					}
				}).catch(AC => {

				});

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
			submit() {
				uni.navigateTo({
					url: '/pages/hoseType/standardSuggestuse'
				})
				// console.log(this.$refs.uForm.validate())
				// this.$refs.uForm.validate().then(res => {
				// 	uni.$u.toast('校验通过')
				// }).catch(errors => {
				// 	uni.$u.toast('校验失败')
				// })
			}
		},
	};
</script>

<style scoped lang="scss">
	.c-column {
		display: flex;
		flex-direction: column;
	}
	
	.c-filling {
		height: 10px;
		flex-grow: 1;
	}
	
	.c-row {
		display: flex;
		flex-direction: row;
	}
	
	
	page {
		background: #F5F6F7;
	}

	.box {
		background: #F5F6F7 !important;
	}

	.input-type {
		white-space: nowrap;

		/deep/ .u-input {
			padding: 6rpx 12px !important;
		}
	}

	.input-type-cor {
		/deep/ .u-form-item__body__left__content {
			padding-right: 60rpx !important;
		}
	}

	.input-type-cor-three {
		background: #F5F6F7;

		/deep/ .u-form-item__body__left__content {
			padding-right: 32rpx !important;
		}
	}

	.input-type-radio {
		/deep/ .u-radio {
			margin-bottom: 0 !important;
			margin-right: 80rpx;
		}
	}

	.layout{
			 display: flex;
			 align-items: center;
			 justify-content:center;
	}

	.input-type-radio-pj {
		/deep/ .u-form-item__body__left__content {
			padding-right: 88rpx !important;
		}

		/deep/ .u-radio {
			margin-bottom: 0 !important;
		}
	}
	
	.toUrl{
		color: #393F9D;
		// text-align: center;
		margin-bottom: 70rpx;
		font-size: 8px;
		margin-left: 149rpx;
		text-decoration:underline;
	}

	.Project_son-three {
		/deep/ .u-form-item__body__left {
			display: block !important;
		}
	}

	.Project_son_radio {
		margin-bottom: 22rpx;
		margin-top: 8rpx;
	}

	.fonts-fu {
		font-size: 29rpx;
		font-weight: 600;
		margin-top: 36rpx;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 900;
	}

	//上传文件
	.fill_dow {

		/deep/ .u-button--info {
			border-style: dashed;
			border-radius: 25rpx;
		}

		/deep/ .u-button__text {
			color: #000;
		}
	}
.img2 {
		/deep/.u-upload__wrap__preview {
			display: inline-block;
			width: 80px
		}

	}
	.images-col {
		border: #AAAAAA;
		border-style: dashed;
		// width: 100%;
		margin: 30rpx;
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.box-information-images-col-to {
		margin-top: 30rpx;
	}

	.box-information-images-col {
		padding-top: 30rpx;

		/deep/ .u-form-item__body__right__content__slot {
			// display: flex;
			/deep/ u-upload {
				// flex: 1;
				// width: 100% !important;
			}
		}

		// padding: 30rpx;
		.images-col-title:nth-child(1) {
			text-align: center;
			color: #000;
			font-size: 24rpx;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 900;
		}

		.images-col-title:nth-child(2) {
			color: #AAA;
			text-align: center;
			width: 100%;
			font-size: 24rpx;
			font-family: 'Roboto';
			font-style: normal;
			// font-weight: 900;
		}
		
		.images-col-title-2 {
			color: #AAA;
			text-align: center;
			width: 100%;
			font-size: 24rpx;
			font-family: 'Roboto';
			font-style: normal;
			// font-weight: 900;
		}

		border-radius: 16rpx;
		text-align: center;
		background: #FFF;
		width: 100%;

		/deep/ .u-upload__wrap {
			display: block;
		}
	}

	/deep/ .u-border {
		// border-width: 3rpx !important;
		// border-color: #000 !important;
	}

	.fonts {
		font-size: 48rpx;
		font-weight: 600;
		margin-top: 56rpx;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 900;
		font-size: 29rpx;
	}

	.box {
		background: #FFF;
		height: 100%;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	/deep/ .u-form-item__body__right__message {
		margin-left: 0 !important;
	}
//上传文件
	.fill_dow {

		/deep/ .u-button--info {
			border-style: dashed;
			border-radius: 25rpx;
		}

		/deep/ .u-button__text {
			color: #000;
		}
	}
	.submit {
		margin-top: 60rpx;
		margin-bottom: 50rpx;
		width: 80%;
	}

	// .submit:nth-child(1) {
	// 	width: 220rpx;
	// 	margin-right: 30rpx;
	// }

	.box-information {
		display: flex;
		background: #F5F6F7;

		.box-information-one {
			background: #F5F6F7;
			padding-right: 30rpx;
		}
	}

	.Project_son {
		margin-right: 20rpx;
	}

	.button-buyt {
		width: 100%;
		padding-bottom: 50rpx;
	}

	.input-hxbh {
		width: 100%;
	}

	.checkbox {
		margin-left: 60rpx;
	}

	.fonts-fu {
		font-size: 29rpx;
		font-weight: 600;
		// margin-top: 36rpx;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 900;
	}

	.textarea {
		margin-top: 15rpx;
	}

	.inputor {
		/deep/ .u-form-item__body__right__message {
			padding-left: 150rpx !important;
		}
	}

	.kfs {
		/deep/ .u-form-item__body__right__message {
			padding-left: 175rpx !important;
		}
	}

	.jj {
		/deep/ .u-form-item__body__right__message {
			padding-left: 95rpx !important;
		}
	}

	.bzcmj {
		/deep/ .u-form-item__body__right__message {
			padding-left: 175rpx !important;
		}
	}

	.lx {
		/deep/ .u-form-item__body__right__message {
			padding-left: 95rpx !important;
		}
	}

	.sfdtrh {
		/deep/ .u-form-item__body__right__message {
			padding-left: 205rpx !important;
		}
	}

	.dfl {
		/deep/ .u-form-item__body__right__message {
			padding-left: 120rpx !important;
		}
	}

	.kfpj {
		/deep/ .u-form-item__body__right__message {
			padding-left: 150rpx !important;
		}
	}

	.zmk {
		/deep/ .u-form-item__body__right__message {
			padding-left: 140rpx !important;
		}
	}

	.szxmlh {
		/deep/ .u-form-item__body__right__message {
			padding-left: 205rpx !important;
		}
	}

	.szxm {
		/deep/ .u-form-item__body__right__message {
			padding-left: 220rpx !important;
		}
	}
/deep/ .body--wrapper {
		height: inherit !important;
	}
	// .vxe-table--body-wrapper{
	// 	height: 100%;
	// }
</style>
