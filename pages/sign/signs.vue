<template>
	<view class="box">
		<view class="fonts">
			注册
		</view>
			<u--form :model="form" ref="uForm" :rules="rules">
				<u-form-item  prop="name">
					<u-input
					    suffixIcon="account"
					    placeholder="请输入手机号/邮箱"
					    v-model="form.name"
					    @change="change"
						clearable
					  ></u-input>
				</u-form-item>
				<u-form-item  prop="password">
					<u-input
					    :type='password_type.type'
					    clearable
					    placeholder="请输入密码"
					    v-model="form.password"
					    @change="change"
					  >
					  <template slot="suffix">
						  <u-icon :name="password_type.suffixIcon" @click="onsuffix"></u-icon>
					  </template>
					  </u-input>
				</u-form-item>
			</u--form>
			<u-button @click="submit" class='submit' color='#000'>下一步</u-button>
		</view>
</template>

<script>
export default {
	data() {
		return {
			password_type:{
				suffixIcon:"eye",
				type:'password'
			},
			value:'',
			form: {
				name: '',
				password:''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入手机号/邮箱',
						trigger: ['blur', 'change']
					}
				],
				password: [
					{
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}
				]
			}
		};
	},
	methods: {
		onsuffix(){
			if(this.password_type.suffixIcon=='eye'){
				this.password_type.type='text'
				this.password_type.suffixIcon='eye-off'
			}else{
				this.password_type.suffixIcon='eye'
				this.password_type.type='password'
			}
		},
		change(){
			
		},
		submit() {
			uni.navigateTo({
				url:'/pages/sign/usename'
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
	/deep/ .u-border{
		border-width: 3rpx !important;
		border-color: #000 !important;
	}
	.fonts{
		font-size: 48rpx;
		font-weight: 600;
		margin-bottom: 50rpx;
	}
	.box{
		background: #FFF;
		height: 100%;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	/deep/ .u-form-item__body__right__message{
		margin-left: 0 !important;
	}
	.submit{
		margin-top: 30rpx;
	}
</style>
