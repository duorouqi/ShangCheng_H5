<template>
	<view class="box">

		<u--form :model="form" ref="uForm" labelWidth='auto' :rules="rules">
			<view class="inputor layout">
				<u-form-item prop="hxbh" label="" style="width: 500rpx;">
					<view class="input-hxbh input-type">
						<u-input fontSize='12px' placeholder="请输入户型编号" v-model="form.hxbh" clearable>
						</u-input>
					</view>
					<view style="width: 300rpx;text-align: center;font-weight: bold;font-size: 30rpx;">
						竞品户型推荐
					</view>
				</u-form-item>
			</view>
			<view class="toUrl" @click="toUrl">
				查看竞品户型编号命名规则
			</view>
			<view class="box-information-images-col">
				<view class="images-col-title">点击添加图片</view>
				<view class="images-col-title">（户型平面图）</view>
				<u-form-item prop="name" class="img1">
					<u-upload name="1" ref="uUpload" :maxCount="1" :fileList="fileList1" @afterRead="afterRead"
						@delete="deletePic1" width="100%" height="150">
						<view class="images-col">
							<u-icon name="plus-circle" class='plus-circle' size="22" color="#AAAAAA"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
			</view>

			<view style="background-color: rgb(245, 246, 247);margin-left: -30rpx;margin-right: -30rpx;padding-left: 30rpx;padding-right: 30rpx;border-radius:60rpx 60rpx 0rpx 0rpx;">
				<view style="padding-bottom: 10rpx;"></view>
				<view class="fonts" >
					户型基本信息
				</view>
				<view class="input-type-cor-three">
					<u-form-item prop="szxm" label="所在项目:" class="szxm">
						<!-- <view class="input-type">
											<u-checkbox-group style="display: flex;flex-wrap: wrap;" v-model="form.szxm">
												<u-checkbox style="margin-bottom: 20rpx;" class='checkbox' v-for="(item, index) in szxmlist"
													:key="index" :label="item.name" :name="item.id">
												</u-checkbox>
											</u-checkbox-group>
										</view> -->
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.szxm" clearable>
							</u-input>
						</view>
					</u-form-item>
				</view>
				<view class="inputor">
					<u-form-item label="项目所在城市:" prop="xmszcs">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.xmszcs">
							</u-input>
						</view>
					</u-form-item>
				</view>
				<view class="inputor">
					<u-form-item label="项目具体地点:" prop="xmdd">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.xmdd">
							</u-input>
						</view>
					</u-form-item>
				</view>
				<view class="inputor" v-if="false">
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
								<u-checkbox class='checkbox' v-for="(item, index) in locations" :key="index"
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
									v-for="(item, index) in jpjacketeds" :key="index" :label="item.name" :name="item.id">
								</u-checkbox>
							</u-checkbox-group>
						</view>
					</u-form-item>
				</view>
				
				<view class="inputor kfs">
					<u-form-item label="开发商名称:" prop="kfsmingche">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.kfsmingche">
							</u-input>
						</view>
					</u-form-item>
				</view>
				<view class="inputor jj">
					<u-form-item label="均价(元):" prop="jj">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.jj">
							</u-input>
						</view>
					</u-form-item>
				</view>
				<view class="inputor">
					<u-form-item label="装修标准:" prop="zxbz">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.zxbz">
							</u-input>
						</view>
					</u-form-item>
				</view>
				<!-- <view class="box-information">
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
						</u-form-item> -->
						<!-- <u-form-item class="bzcmj" prop="bzcts" label="标准层套数:" borderBottom
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
						</u-form-item> -->
					<!-- </view> -->
					<!-- <view> -->
						<!-- <view class="input-type-cor">
											<u-form-item prop="name" label="得房率:">
												<view class="input-type ">
													<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change"
														clearable>
													</u-input>
												</view>
											</u-form-item>
										</view> -->
				
						<!-- <view>
							<u-form-item class="dfl" prop="dfl" label="得房率:">
								<view class="input-type">
									<u-input fontSize='12px' placeholder="请输入" v-model="form.dfl" clearable>
									</u-input>
								</view>
							</u-form-item>
						</view> -->
						<!-- <u-form-item class='kfpj' prop="kfpj" label="可否拼接:" borderBottom
							@click="showlx = true;actions=kfpjlist;">
							<view class="input-type">
								<u--input v-model="form.kfpj" disabled disabledColor="#ffffff" placeholder="请选择"></u--input>
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
						</u-form-item> -->
				
					<!-- </view> -->
				<!-- </view> -->
				
				<!-- <view>
					<u-form-item prop="szxmlh" label="所在项目楼号:" class='szxmlh'>
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.szxmlh" clearable>
							</u-input>
						</view>
					</u-form-item>
				</view> -->
				<view>
					<u-form-item prop="jzfasjy" label="建筑方案设计院:">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.jzfasjy" clearable>
							</u-input>
						</view>
					</u-form-item>
				</view>
				<!-- <view class="inputor">
					<u-form-item prop="hxtd" label="户型特点:">
						<view class="input-hxbh input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.hxtd" clearable>
							</u-input>
						</view>
					</u-form-item>
				</view> -->
			
			
			<view class="fonts-fu">
				户型明细表
			</view>


			<view class="c-column">
				<view class="c-row" style="margin: 5px;">
					<button type="default" @click="addRow" style="height: 60rpx;font-size: 15px;text-align: center;">新增</button>
					<button type="default" @click="removeRow" style="height: 60rpx;font-size: 15px;text-align: center;">删除</button>
				</view>
				<view style="height: 100%;">
					<c-table class="c-filling" ref="table" style="height: auto;" :initTable="initTable"
						@slotEvents="slotEvents" @initComplete="initComplete" />
				</view>

			</view>
			<view style="color:RED;margin-top: 10rpx;">请左右滑动填写数据！</view>

			<view class="fonts-fu">
				户型相关图片
			</view>
			<view class="box-information-images-col box-information-images-col-to">
				<view class="images-col-title">点击添加图片</view>
				<view class="images-col-title">（如:与本户型相匹配的总图、鸟瞰、</view>
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
				<!-- <view>
								<view>
									<u-form-item prop="name">
										<view class="fill_dow">
											<uni-file-picker limit="5" file-mediatype="all"
											v-model="imageValue2"
											    @select="select2" 
											    @progress="progress2" 
											    @success="success2" 
											    @fail="fail2" 
											>
												<slot name="default">
													<view>
														<u-button icon="plus-circle" :plain="true" text="点击上传PDF文件"></u-button>
													</view>
												</slot>
											</uni-file-picker>
						
										</view>
									</u-form-item>
								</view>
						
							</view> -->
			</view>

			<view class="fonts-fu">
				推荐信息
			</view>
			
			<view>
				<u-form-item prop="name" label="推荐人姓名:">
					<view class="input-type">
						<u-input fontSize='12px' placeholder="请输入" style="width: 300rpx;margin-left: 50rpx;" v-model="form.xm" @change="change" disabled>
						</u-input>
					</view>
				</u-form-item>
			</view>
			
			<view>
				<u-form-item prop="name" label="推荐人联系方式:">
					<view class="input-type">
						<u-input fontSize='12px' placeholder="请输入" style="width: 300rpx;" v-model="form.tjrlxfs" @change="change" disabled>
						</u-input>
					</view>
				</u-form-item>
			</view>
			
			<view class="textarea">推荐原因:</view>
			<u-form-item prop="tjly">
				<u-textarea v-model="form.tjly" placeholder="请简要阐述推荐原因，不少于20字" count></u-textarea>
			</u-form-item>
			</view>
		</u--form>
		
		<!-- <u-action-sheet :show="showlx" :actions="actions" title="请选择" @close="showlx = false" @select="lxSelect"></u-action-sheet> -->
		<view class="button-buyt">
			<!-- <u-button  class='submit' color='#000' :plain="true" @click="postAddbzks">保存信息</u-button> -->
			<u-button @click="postAddbzks" class='submit' color='#000' :loading="coftr">保存并提交</u-button>
		</view>


	</view>
</template>

<script>
	import {
		postAddjpk,
		locations,
		layerss,
		screens,
		jpjacketeds,
		lxlist,
		kfpjlist,
		bzctslist,
		sfdtrhlist,
		getProject,
		xmztlist,
		upImg
	} from '../../api/publice.js';
	import md5 from 'js-md5';
	export default {
		data() {
			return {
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
				img: {
					cftpurl: '',
					cftpxz: '',
					hxturl: '',
					hxtxz: '',
					dwgfjname: '',
					dwgfjdownlod: '',
					dwgfjname2: '',
					dwgfjdownlod2: ''
				},
				imageValue: [],
				imageValue2: [],
				fileList2: [],
				imgSrc: [],
				loadlink: [],
				coftr: false,
				showlx: false,
				actions: [],
				locations: locations,
				layerss: layerss,
				screens: screens,
				jpjacketeds: jpjacketeds,
				lxlist: lxlist,
				kfpjlist: kfpjlist,
				bzctslist: bzctslist,
				sfdtrhlist: sfdtrhlist,
				xmztlist: xmztlist,
				szxmlist: [],
				fileList1: [],
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
					bzhx: "竞品户型",
					xm: JSON.parse(sessionStorage.getItem("user")).username,
					tjrlxfs:JSON.parse(sessionStorage.getItem("user")).phone,
					tjly: '',
					xmdd: '',
					kfsmingche: '',
					xmszcs:'',
					jj: '',
					zxbz: '',
					hxtd: '',
					szxmlh: '',
					hxbh: '',
					zmk: '',
					lx: '',
					kfpj: '',
					bzcts: '',
					sfdtrh: '',
					szxm: '',
					xmzt: '',
					dw: [],
					cs: [],
					mjd: [],
					tx: [],
					bzcmj: '',
					dfl: '',
					name: '',
					password: '',
					jzfasjy: '',
					radiovalue1: '',
					Project_valuye: ''
				},
				rules: {
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

					sfdtrh: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					bzcts: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					lx: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					xmzt: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					kfpj: [{
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					bzcmj: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					szxm: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					szxmlh: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					zmk: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					tjly: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					dfl: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					hxtd: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					bzcmj: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					xmdd: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					kfsmingche: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					jj: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					zxbz: [{
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
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
		methods: {
			toUrl() {
				uni.navigateTo({
					url: '/pages/JpPageDetail/index'
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
			//表格加载完成回调函数
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
			async postAddbzks() {

				this.$refs.uForm.validate().then(async res => {
					try {
						let lx = '',
							kfpj = '',
							bzcts = "",
							sfdtrh = '',
							xmzt = '';

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
							mjd = '';
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
							if (this.form.mjd.length == 1) {
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
						
						this.img.hxturl = this.pjie(this.imgSrc)
						this.img.hxtxz = this.pjie(this.loadlink)
						this.coftr = true;
						let darl = []
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
										"cftpurl": this.img.cftpurl,
										"cftpxz": this.img.cftpxz,
										"hxturl": this.img.hxturl,
										"hxtxz": this.img.hxtxz,
										"dwgfjname": this.img.dwgfjname,
										"dwgfjdownlod": this.img.dwgfjdownlod,
										"taoxing": tx,
										"kfsmingche": this.form.kfsmingche,
										"jj": this.form.jj,
										"zxbz": this.form.zxbz,
										"xmdd": this.form.xmdd,
										"tjrlxfs":this.form.tjrlxfs,
										"xmszcs":this.form.xmszcs,
										"cs":cs,
										"dw": dw,
										"jzfasjy": this.form.jzfasjy,
										"mjd": mjd,
										"hxbh": this.form.hxbh,
										"szxm": this.form.szxm,
										"tjlx": "竞品户型",
										"tjly": this.form.tjly,
										"tjr": JSON.parse(sessionStorage.getItem("user")).userid,
										"tjsh": "0",
										"tjrtxt": this.form.xm
									},
									"detail1": darl
								}],
								"header": {
									"systemid": "Addjpk",
									"currentDateTime": this.setTime(),
									"Md5": md5("Addjpk" + 123 + this.setTime())
								}
							}
							console.log(JSON.stringify(data))
							let res = await postAddjpk(JSON.stringify(data));
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
				if (itmer.type == 'szxm') {
					this.form.szxm = itmer.name;
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
			// 获取上传状态
			async select(event) {
				let res = await upImg(event.tempFiles[0])
				this.img.dwgfjname = event.tempFiles[0].name;
				this.img.dwgfjdownlod = "https://oa.siud.com" + res.uploadFileRes.data.loadlink;
			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			},
			// 获取上传状态
			async select2(event) {
				let res = await upImg(event.tempFiles[0])
				this.img.dwgfjname2 = event.tempFiles[0].name;
				this.img.dwgfjdownlod2 = "https://oa.siud.com" + res.uploadFileRes.data.loadlink;
			},
			// 获取上传进度
			progress2(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success2(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail2(e) {
				console.log('上传失败：', e)
			},
			async afterRead2(event) {
				this.fileList2.push(event.file[0])
				
				// for(let i = 0 ; i < this.fileList2.length;i++){
				let res = await upImg(event.file[0])
				this.imgSrc.push(res.uploadFileRes.data.imgSrc)
				this.loadlink.push(res.uploadFileRes.data.loadlink)
				// }
				// this.img.hxturl = this.pjie(imgSrc)
				// this.img.hxtxz = this.pjie(loadlink)
				// console.log(this.img.hxtxz,99999,this.fileList2)
			},
			pjie(obj) {
				let datre = "";
				if (obj) {
					if (obj.length == 1) {
						datre = obj[0]
					} else {
						obj.forEach((ac, index) => {
							if (obj.length - 1 === index) {
								datre = datre.toString() + "," + ac.toString()
							} else {
								if (index === 0) {
									datre = ac
								} else {
									datre = datre + "," + ac
								}

							}
						})
						return datre;
					}
				}
				return datre;
			},
			// 新增图片
			async afterRead(event) {
				this.fileList1.push(event.file)
				let res = await upImg(this.fileList1[0])
				this.img.cftpurl = "https://oa.siud.com" + res.uploadFileRes.data.imgSrc;
				this.img.cftpxz = "https://oa.siud.com" + res.uploadFileRes.data.loadlink;
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
				let szxm = await getProject(JSON.stringify({
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
				}));
				let list = [];
				eval("(" + szxm.result + ")").forEach((ac, index) => {
					list.push({
						id: ac.mainTable.id,
						name: ac.mainTable.xmmc,
						type: 'szxm'
					})
				})
				this.szxmlist = list
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
				console.log(666)
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
	page {
		background: white;
	}

	.box {
		background: white !important;
	}

	.img1 {
		.u-upload__wrap__preview__image {
			width: 100%;
		}
	}

	.img2 {
		/deep/.u-upload__wrap__preview {
			display: inline-block;
			width: 80px
		}

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

	.input-type-radio-pj {
		/deep/ .u-form-item__body__left__content {
			padding-right: 88rpx !important;
		}

		/deep/ .u-radio {
			margin-bottom: 0 !important;
		}
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

	.images-col {
		border: #AAAAAA;
		border-style: dashed;
		// width: 100%;
		margin: 30rpx;
		height: 200rpx;
		border-radius:20rpx;
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
		padding-bottom: 10rpx;
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

	.layout {
		display: flex;
		align-items: center;
		justify-content: center;

	}

	.toUrl {
		color: #393F9D;
		// text-align: center;
		margin-bottom: 70rpx;
		font-size: 8px;
		margin-left: 127rpx;
		text-decoration: underline;
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

	/deep/ .body--wrapper {
		height: inherit !important;
	}
</style>
