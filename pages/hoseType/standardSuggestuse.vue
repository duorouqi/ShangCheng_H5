<template>
	<view class="box">
		<view class="fonts">
			户型基本信息
		</view>
		<u--form :model="form" ref="uForm" :rules="rules" labelWidth='auto'>
			<!-- 			:labelStyle="{fontSize:'13px'}" -->
			<view>
				<u-form-item prop="name" label="推荐人姓名:">
					<view class="input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change" clearable>
						</u-input>
					</view>
				</u-form-item>
			</view>
			<view>
				<u-form-item prop="name" label="推荐人联系方式:">
					<view class="input-type">
						<u-input fontSize='12px' placeholder="请输入" v-model="form.name" @change="change" clearable>
						</u-input>
					</view>
				</u-form-item>
			</view>
			<!--  -->
			
			<view class="fonts-fu">
				户型优缺点
			</view>
			<view class="textarea">推荐原因:</view>
			<u-form-item prop="name">
				<u-textarea v-model="form.name" placeholder="请输入内容" ></u-textarea>
					
			</u-form-item>
			
		</u--form>
		<view style="display: flex;align-items: center;justify-content: center;">
			<u-button @click="submit" class='submit' color='#000'>提交审核</u-button>
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
				uni.navigateTo({
					url: '/pages/sign/standardSuggestuse'
				})
				console.log(this.$refs.uForm.validate())
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
		width: 70%;
		
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
	.textarea{
		margin-top: 15rpx;
	}
</style>
