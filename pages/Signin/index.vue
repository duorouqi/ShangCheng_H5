<template>
	<view class="box">
		<view class="fonts">
			登录
		</view>
			<u--form :model="form" ref="uForm" :rules="rules">
				<u-form-item  prop="name">
					<u-input
					    suffixIcon="account"
					    placeholder="请输入用户名"
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
			<!-- <view class="forget" @click="onforget">忘记密码？</view> -->
			<view class="singn">
				<!-- <u-button @click="Verification" class='Code'>验证码登录</u-button> -->
				<u-button @click="submit" class='submit' color='#000'>登录</u-button>
			</view>
			<!-- <view style="display: flex;justify-content: center;" class="defaultbox"><view class="default">没有账户吗？</view><view class="default-rig">立即注册</view></view> -->
		</view>
</template>

<script>
import {checkLogin} from '../../api/publice.js'
export default {
	data() {
		return {
			password_type:{
				suffixIcon:"eye-off",
				type:'password'
			},
			value:'',
			form: {
				// name: 'sysadmin',
				// password:'15efe857c67f35e9ac42ae2ad6b671e7_random_'
				name: '',
				password:''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入用户名',
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
		Verification(){
			uni.navigateTo({
				url:'/pages/Signin/Verification'
			})
		},
		onforget(){
			uni.navigateTo({
				url:'/pages/Signin/forget'
			})
		},
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
			this.$refs.uForm.validate().then(async res => {
				try{
				let res = await checkLogin(this.form.name,escape(this.form.password));
				if(res.loginstatus!='false'&&res.status!=-1){
					sessionStorage.setItem("user",JSON.stringify(res));
					uni.$u.toast(res.msg)
				uni.switchTab({
					url:'/pages/tabBar/component/component'
				})
				}else{
					uni.$u.toast('密码不正确或者不存在当前用户')
				}
				}catch(e){
					//TODO handle the exception
				}
			}).catch(errors => {
				uni.$u.toast('校验失败')
			})
		}
	},
};
</script>

<style scoped lang="scss">
	.forget{
		font-size: 24rpx;color: #828ECE;
		margin-top: 15rpx;
	}
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
	.singn{
		display: flex;
		margin-top: 180rpx;
	}
	.Code{
		margin-right: 15rpx;
		border-width: 3rpx !important;
			border-color: #000 !important;
		margin-top: 30rpx;
	/deep/	.u-button--info{
			
		}
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
