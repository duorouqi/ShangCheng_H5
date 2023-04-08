<template>
	<view class="box">
		<view class="fonts">
			户型基本信息
		</view>
		<u--form :model="form" ref="uForm"  labelWidth='auto'>
			<!-- 			:labelStyle="{fontSize:'13px'}" -->
			<view class="box-information">
				<view class="box-information-one">
					<view>
						<u-form-item prop="name" label="项目名称:">
							<view class="input-type">
								<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change"
									clearable>
								</u-input>
							</view>
						</u-form-item>
					</view>
					<u-form-item prop="name" label="建筑面积:">
						<view class="input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change" clearable>
							</u-input>
						</view>
					</u-form-item>
					<view class="input-type-cor">
						<u-form-item prop="name" label="套型:">
							<view class="input-type">
								<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change"
									clearable>
								</u-input>
							</view>
						</u-form-item>
					</view>
				</view>
				<view>
					<view class="input-type-cor" style="opacity: 0;">
						<u-form-item  label="套型:">
							<view class="input-type ">
								<u-input fontSize='12px' disabled="true"
									clearable>
								</u-input>
							</view>
						</u-form-item>
					</view>

					<view>
						<u-form-item prop="name" label="设计时间:">
							<view class="input-type">
								<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change"
									clearable>
								</u-input>
							</view>
						</u-form-item>
					</view>
					<u-form-item prop="name" label="建成时间:">
						<view class="input-type">
							<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change" clearable>
							</u-input>
						</view>
					</u-form-item>

				</view>
			</view>
			<!--  -->
			<view class="fonts-fu">
				相关文章
			</view>
			<view class="box-information-images-col box-information-images-col-text">
				<u-form-item prop="name">
					<u-upload name="6" multiple :maxCount="3" width="250" height="150">
						<view class="images-col images-col-text">
							<u-icon name="plus-circle" class='plus-circle' size="28" color="#AAAAAA"></u-icon>
						</view>
					</u-upload>
				</u-form-item>
			</view>
			<view class="box-information-images-col">
				<view class="images-col-title">点击添加图片</view>
				<!-- <image src="../../static/dw/icon.png"></image> -->
				<view style="display: flex;align-items: center;">
				<view class="zdy-image"><u-image :showLoading="true" src="../../static/dw/icon.png" width="100%" height="100%"></u-image></view>
				<view class="images-col-title-conente">
				<view class="title-dw">中国 上海</view>
				<view class="title-dw">4995 Lane Grand Junction, USA</view>
				</view></view>
				<u-form-item prop="name">
					<view class="images-col images-col-dw">
						<u-image :showLoading="true" src="../../static/dw/dw.png" width="100%" height="100%"></u-image>
					</view>
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
			</view>
		</u--form>
		<view style="display: flex;" class="button-buyt">
			<u-button @click="submit" class='submit' color='#000' :plain="true">保存信息</u-button>
			<u-button @click="submit" class='submit' color='#000'>下一步</u-button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
					name: '',
					password: '',
					radiovalue1: '',
					Project_valuye: ''
				},
				rules: {
					name: [{
						required: true,
						message: '请输入手机号/邮箱',
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
		methods: {
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
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
	page{
		background: #F5F6F7;
	}
	.box{
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
		// margin-top: 36rpx;
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
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.images-col-text{
		height: 140rpx;
	}
	.box-information-images-col-to{
		margin-top: 30rpx;
	}
	.box-information-images-col{
		padding-top: 30rpx;
		/deep/ .u-form-item__body__right__content__slot{
			// display: flex;
			/deep/ u-upload{
				// flex: 1;
				// width: 100% !important;
			}
		}
		// padding: 30rpx;
		.images-col-title:nth-child(1) {
			text-align: center;
			color: #000;
			font-size: 26rpx;
			font-family: 'Roboto';
			font-style: normal;
			font-weight: 900;
		}

		.images-col-title:nth-child(2) {
			color: #AAA;
			text-align: center;
			width: 100%;
			font-size: 26rpx;
			font-family: 'Roboto';
			font-style: normal;
			// font-weight: 900;
		}
				border-radius: 16rpx;
				text-align: center;
		background: #FFF;
		width: 100%;
		/deep/ .u-upload__wrap{
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
	}
	.submit:nth-child(1){
		width: 220rpx;
		margin-right: 30rpx;
	}

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
	.button-buyt{
		
	}
	.box-information-images-col-text{
		margin-bottom: 30rpx;
		margin-top: 30rpx;
	}
	.images-col-title-conente{
		text-align: left;
	}
	.zdy-image{
		width: 60rpx;
		height: 60rpx;
		margin-left: 30rpx;
		/deep/ .u-fade-enter-active{
			width: 100% !important;
			height: 100% !important;
		}
	}
	.title-dw{
		font-size: 22rpx;
		font-family: 'Roboto';
		font-style: normal;
		margin-left: 60rpx;
	}
	.title-dw:nth-child(2){
		color: #888888;
	}
	.images-col-dw{
		width: 100%;
		border: none;
		/deep/ .u-fade-enter-active{
			width: 100% !important;
			height: 100% !important;
		}
	}
</style>
