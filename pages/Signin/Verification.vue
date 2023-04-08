<template>
	<view class="box">
		<view class="fonts">
			验证码登录
		</view>
			<u--form :model="form" ref="uForm" :rules="rules">
				<u-form-item  prop="name">
					<u-input
					    placeholder="请输入手机号"
					    v-model="form.name"
					    @change="change"
						clearable
					  ></u-input>
				</u-form-item>
			</u--form>
			<view style="display: flex;justify-content: center;">
				<u-code-input v-model="value5" mode="line" :space="10" :maxlength="4" hairline></u-code-input>
			</view>
			<view style="display: flex;justify-content: center;" class="defaultbox"><view class="default">没有账户吗？</view><view class="default-rig">立即注册</view></view>
			<u-button @click="submit" class='submit' color='#000'>获取验证码</u-button>
		</view>
</template>

<script>
export default {
	data() {
		return {
			value5:'',
			form: {
				name: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['blur', 'change']
					}
				]
			}
		};
	},
	methods: {
		change(){
			
		},
		submit() {
			uni.reLaunch({
				url: '/pages/Signin/index',
				success() {
					// plus.navigator.closeSplashscreen()
				}
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
		margin-bottom: 160rpx;
	}
	.box{
		padding-top: 60rpx;
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
		width: 60%;
		margin-top: 90rpx;
	}
	.defaultbox{
		margin-top: 60rpx;
	}
	.default{
		font-size: 24rpx;
		color: #BCBCBC;
		margin-left: 6rpx;
	}
	.default-rig{
		font-size: 24rpx;
		color: #828ECE;
	}
</style>