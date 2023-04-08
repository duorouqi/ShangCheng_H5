<template>
	<view>
		<br>
		<br>
		<h3>"标准户型编号"命名原则为：</h3>
		<p>"项目定位"-"层数"-"面积段"（如：HH-L-620）</p>
		<br>
		<br>
		<h3>项目定位:</h3>
		<p>A标（豪华）：HH-</p>
		<p>B标（改善、舒适）：SS-</p>
		<p>C标（刚需、刚改）：GG-</p>
		<br>
		<h3>层数:</h3>
		<p>高层住宅（两楼两电）：L-</p>
		<p>中高层（一楼两电）：M-</p>
		<p>多层洋房：S-</p>
		<p>叠墅：SV-</p>
		<p>别墅：V-</p>
		<br>
		<h3>面积段（示例如下）:</h3>
		<p>标准层双拼户型建筑面积240㎡+300㎡：-2430</p>
		<p>标准层三户建筑面积为120㎡+100+120㎡：-121012</p>
		<p>标准层四户建筑面积为90㎡+80㎡+80㎡+90㎡：-09080809</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	*{
		font-size: 25rpx;
	}
p{
	color: #c9bdbd;
	margin-left: 30rpx;
}
h3{
	margin-left: 30rpx;
	margin-bottom: 20rpx;
}
</style>
