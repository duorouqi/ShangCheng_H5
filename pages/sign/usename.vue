<template>
	<view class="box">
		<view class="fonts">
			注册
		</view>
			<u--form :model="form" ref="uForm" :rules="rules">
				<u-form-item  prop="name">
					<u-input
					    placeholder="请输入用户名"
					    v-model="form.name"
					    @change="change"
						clearable
					  ></u-input>
				</u-form-item>
			</u--form>
			<u-button @click="submit" class='submit' color='#000'>确认</u-button>
		</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入用户名',
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
