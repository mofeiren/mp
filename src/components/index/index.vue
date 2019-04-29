<template>
	<div class="container-wrapper">
		<div class="sidebar-wrapper">
			<div class="logo">
				<h1>Light Blue</h1>
			</div>
			<div class="menu-wrapper">
				<el-menu
		      class="el-menu-vertical-demo"
		      text-color="#fff"
		      :router="true"
		      >
				<template v-for="(item,index) in menuList">
					<el-submenu :index="index+''" @click="open">
		        <template slot="title">
		          <i class="el-icon-location"></i>
		          <span>{{item.label}}</span>
		        </template>
		        <template v-for="(subitem, subindex) in item.children">
		        	<el-menu-item-group>
		        	  <el-menu-item :index="subitem.url">{{subitem.label}}</el-menu-item>
		        	</el-menu-item-group>
		        </template>
     			</el-submenu>
				</template>
    </el-menu>
			</div>
		</div>
		<div class="content-wrapper">
			<div class="page-header">
				<div class="header-left">
					<i class="el-icon-search search-bar-icon"></i>
					<input type="" name="" class="search-bar">
				</div>
				<div class="header-right">
					<div class="top-tool-item">
						<i class="el-icon-date"></i>
					</div>
					<div class="top-tool-item">
						<i class="el-icon-date"></i>
					</div>
					<div class="top-tool-item">
						<i class="el-icon-date"></i>
					</div>
					<div class="top-tool-item">
						<i class="el-icon-date"></i>
						<span style="font-size:20px">公告</span>
					</div>
					<div class="top-tool-item">
						<i class="el-icon-circle-close-outline"></i>
						<span style="font-size:20px">退出登录</span>
					</div>
				</div>
			</div>
			<div class="content">
				<div class="main">
					<div class="tag-bars"></div>
					<div>
						<router-view></router-view>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	components:{

	},
	data() {
		return {
			uniqueOpened: true,
			menuList:[
			{label:'用户管理' ,children: [{label: '二级 1-1'}]},
			{label:'微信公众号',children: [{label: '编辑菜单按钮',url:'/editMenu'},{label: '消息管理',url:'/message'}]},
			{label:'微信小程序',children: [{label: '二级 1-1'}]},
			{label:'Statics'},
			{label:'Statics'},
			{label:'Statics'}]
		}
	},
	methods:{
		open() {
			console.log("1")
			this.$router.push({
				path:"/editMenu"
			})
		}
	}
}
</script>
<style scoped>
	.container-wrapper {
		display: flex;
		color:#fff;
	}
	.logo {
		display: table;
		height: 60px;
		vertical-align: middle;
		text-align: center;
	}
	.logo h1 {
		padding: 30px 40px 20px 40px;
	}
	.sidebar-wrapper {
		flex:0 0 200px;
		margin-left: 10px;
	}
	.content-wrapper{
		flex: 1;
	}
	.page-header{
		display: flex;
		justify-content:space-around;
		height: 64px;
	}
	.header-left {
		flex: 1;
		padding: 15px;
		position: relative;
	}
	.header-right {
		display: flex;
		flex: 1;
	}
	.header-right .top-tool-item {
		flex: 1;
		text-align: center;
	}
	.header-right .top-tool-item i{
		padding-top: 18px;
		font-size: 20px;
		line-height: 1
	}
	.menu-wrapper {
	}
	.menu-wrapper .menu-item {
	}
	.menu-wrapper .menu-item:hover {
		background: rgba(0, 0, 0, 0.07);
		cursor: pointer;
		border-radius: 10px;
	}

	.menu-wrapper .menu-item .text {
		
	}
	.header-left .search-bar{
		background: rgba(51, 51, 51, 0.4)!important;
		outline: none;
		border: none;
		border-radius:5px;
		height: 30px;
		text-indent: 32px;
		color: #fff;
		width: 240px;
	}
	.header-left .search-bar-icon {
		width: 24px;
		height: 24px;
		position: absolute;
		top: 24px;
		left: 24px;
	}
	
	
</style>