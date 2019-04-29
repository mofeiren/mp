<template>
	<div class="edit-area">
		<div class="controll-block">
			<div class="edit-button">
				<el-button @click="openAddMenu()">创建目录</el-button>
				<el-button @click="showAddRule()" style="margin-left:10px">添加规则</el-button>
				<div style="margin:20px"></div>
				<el-card class="box-card" v-if="buttons.button.length != 0">
				  <el-table
				    :data="treeData"
				    :row-style="showTr"
				    style="width: 100%">
				    <el-table-column
				      label="目录名称"
				      width="180" >
				      <template slot-scope="scope">
				      	<span :style="{marginLeft: scope.row._level * 30 + 'px'}"></span>
				        <i v-if="scope.row.expandedAll && scope.row.hasChildrens" class="el-icon-arrow-down" 
				        @click="toggle(scope.row,scope.$index)"></i>
				        <i v-if="!scope.row.expandedAll && scope.row.hasChildrens" class="el-icon-arrow-right" 
				        @click="toggle(scope.row,scope.$index)"></i>
				        <span style="margin-left: 10px">{{ scope.row.name }}</span>
				      </template>
				    </el-table-column>
				    <el-table-column
				      label="操作"
				      width="200">
				      <template slot-scope="scope">
				      	<el-dropdown trigger="click" >
								  <el-button size="mini" icon="el-icon-edit">编辑</el-button>
								  <el-dropdown-menu slot="dropdown">
								    <el-dropdown-item v-if="scope.row._level === 0" @click.native = "showAddSubMenu(scope.row.idx)">添加子目录</el-dropdown-item>
								    <el-dropdown-item @click.native = "openEditMenu(scope.row.idx)" @click="openEditMenu(scope.row.idx)">修改</el-dropdown-item>
								  </el-dropdown-menu>
								</el-dropdown>
				        <el-button
				          size="mini"
				          type="danger"
				          @click="deleteMenu(scope.row.idx)" icon="el-icon-delete">删除</el-button>
				      </template>
				    </el-table-column>
					</el-table>
					<!-- <template v-for="(btn, index) in buttons.button" >
						<div style="margin: 10px 10px 10px 0" class="clearfix">
		        	<span style="line-height:40px">{{btn.name}}</span>
		        	<el-button type="text" class="edit" @click="showAddSubMenu(index)" style="margin-left:10px">添加子目录</el-button>
			        <el-button type="text" class="edit" @click="deleteMenu(index)">删除</el-button>
			        <el-button type="text" class="edit" @click="openEditMenu(index)">修改</el-button> 
      		</div>
					</template> -->
				</el-card>
				<div style="margin:20px"></div>
				<div class="submit-btn" v-if="buttons.button.length != 0">
					<el-button icon="el-icon-check" @click="submitAllMenu()">提交目录</el-button>
					<el-button icon="el-icon-delete" @click="deletAllMenu()">清空目录</el-button>
				</div>
			</div>
			<el-dialog
			  title="创建主目录"
			  :visible.sync="centerDialogVisible"
			  width="30%"
			  center
			  @close="cancelState()">
		  <el-form ref="form" :model="form" label-width="120px">
		  	<input type="hidden" name="" v-model="form.id">
			  <el-form-item label="目录名称(name)">
			    <el-input v-model="form.name"></el-input>
			  </el-form-item>
			  <el-form-item label="key值">
			    <el-input v-model="form.key"></el-input>
			  </el-form-item>
			  <el-form-item label="事件类型(type)">
			  		<el-select v-model="form.type" placeholder="请选择类型" clearable>
			  			<template v-for="(type, index) in getButtonType">
				      	<el-option :label="type" :value="type"></el-option>
				      </template>
    				</el-select>
			  </el-form-item>
			  <el-form-item label="url">
			    <el-input v-model="form.url"></el-input>
			  </el-form-item>
			  <el-form-item label="appid">
			    <el-input v-model="form.appid"></el-input>
			  </el-form-item>
			  <el-form-item label="pagepath">
			    <el-input v-model="form.pagepath"></el-input>
			  </el-form-item>
			  <el-form-item label="media_id">
			    <el-input v-model="form.media_id"></el-input>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancelState()">取 消</el-button>
		    <el-button type="primary" @click="addMainMenu()" v-if="!editingBtn && !addingSubMenu">立即创建</el-button>
		    <el-button type="primary" @click="editMenu()" v-if="editingBtn">更新</el-button>
		    <el-button type="primary" @click="addSubButton()" v-if="addingSubMenu">添加子目录</el-button>
		  </span>
		</el-dialog>
		<el-dialog
			  title="创建匹配规则"
			  :visible.sync="RuleDialogVisible"
			  width="30%"
			  center
			  @close="cancelState()">
		  <el-form ref="form" :model="matchrule" label-width="140px">
		  	<input type="hidden" name="" v-model="matchrule.id">
			  <el-form-item label="tag_id">
			    <el-input v-model="matchrule.tag_id"></el-input>
			  </el-form-item>
			  <el-form-item label="性别">
			  			<el-radio-group v-model="matchrule.sex">
						    <el-radio :label="1">男</el-radio>
						    <el-radio :label="2">女</el-radio>
 							</el-radio-group>
			  </el-form-item>
			
			  <el-form-item label="country">
			    <el-input v-model="matchrule.country"></el-input>
			  </el-form-item>
			  <el-form-item label="media_id">
			    <el-input v-model="matchrule.media_id"></el-input>
			  </el-form-item>
			   <el-form-item label="province">
			    <el-input v-model="matchrule.province"></el-input>
			  </el-form-item>
			  <el-form-item label="city">
			    <el-input v-model="matchrule.city"></el-input>
			  </el-form-item>
			  <el-form-item label="client_platform_type">
			    <el-input v-model="matchrule.client_platform_type"></el-input>
			  </el-form-item>
			  <el-form-item label="language">
			    <el-input v-model="matchrule.language"></el-input>
			  </el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancelState()">取 消</el-button>
		    <el-button type="primary" @click="addRule()" v-if="!editingRuleState && !addingRuleState">立即创建</el-button>
		    <el-button type="primary" @click="editRule()" v-if="editingRuleState">更新</el-button>
		  </span>
		</el-dialog>
		</div>

		<div class="board">
			<div class="main-board">
				<div class="phone-screen">
					<div class="screen">
						<div class="header">
							<div class="device-info">
								<div class="signal ">
									<div class="phone-signal">
										<p class="first"></p>
										<p class="second"></p>
										<p class="third"></p>
										<p class="fourth"></p>
									</div>
									<div class="title">
										<span>中国移动</span>
									</div>
									<div class="wifi">
										<div class="first"></div>
										<div class="second"></div>
										<div class="third"></div>
									</div>
								</div>
								<div class="time">
									<span>下午 10:29</span>
								</div>
								<div class="battery">
									<span class="percent">50%</span>
									<div class="icon-battery">
											<div style="background:black;height:100%;width:50%"></div>
									</div>
								</div>
							</div>
							<div class="wx-mp-header">
								<div class="back">
									<i class="el-icon-arrow-left"></i>
								</div>
								<div class="title">
									<span>XXXXXX的接口</span>
								</div>
								<div class="mp-button">
									<i class="el-icon-mobile-phone"></i>
								</div>
							</div>
						</div>
						<div class="main-content" >
							<div class="content">
								<p class="time">昨天 下午 10：12</p>
								<p class="">该公众号提供的服务出现故障，请稍后再试</p>								
							</div>
							<div class="buttons" ref="bottom-btns">
								<div class="keyboard">
									<i class="el-icon-tickets"></i>
								</div>
								<template v-for="(btn, index) in buttons.button">
									<div class="button">
										<button type="" @click="showUlOrRoute(index)">{{btn.name}}
										</button>
										<transition name="ul">
												<ul v-if="btn.sub_button && (activeUl == index)" class="dropdown-list" ref="dropdownList">
													<template v-for="(subBtn, sIndex) in btn.sub_button">
														<li><span>{{subBtn.name}}</span></li>
													</template>
													<div class="triangle_border_up">
												  </div>
												</ul>
											</transition>	
									</div>
								</template>
							</div>
						</div>	
					</div>
				</div>
				<div class="code">
					<p>目录结构代码：</p>
					<br>
					<pre><code>{{buttons}}</code></pre>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { submitMenu } from "@/api/data"
import  TreeGrid  from '@/components/mp/menu/TreeGrid'
function transfer(data, parent,level, expandedAll) {
			let tmp = []
			if(data) {
				for(let i = 0;i<data.length ;i++){
					let cur_btn = data[i]
					let cur_btn_obj = {}
					cur_btn_obj.name = cur_btn.name
					if(parent) {
						cur_btn_obj.parent = parent
						cur_btn_obj.idx = parent.idx + '-' +  i + ''
					} else {
						cur_btn_obj.expandedAll = expandedAll
						cur_btn_obj.idx = i
					}
					let _level = 0
			    if (level !== undefined && level !== null) {
			      _level = level + 1
			    }
			    cur_btn_obj._level = _level
					tmp.push(cur_btn_obj)
					if(cur_btn.sub_button && cur_btn.sub_button.length > 0) {
						cur_btn_obj.hasChildrens = true
						let children = transfer(cur_btn.sub_button,cur_btn_obj,_level,true)
						tmp = tmp.concat(children)
					}
				}		
			}
			return tmp
		}
export default {
	name: '',
	components:{
		TreeGrid
	},
	data() {
		return{
			title:'',
			activeUl:'',
			editingBtn:false,
			addingSubMenu:false,
			addSubMenu: false,
			centerDialogVisible: false,
			RuleDialogVisible: false,
			addingRuleState: false,
			editingRuleState: false,
			buttons:{button:[], matchrule: {}},
			form: {
				id:'',
        type:'',
        name:'',
        url:'',
        key:'',
        appid:'',
        pagepath:'',
        media_id:'',
        sub_button: []
      },
      matchrule:{},
      buttonType:['click','view','scancode_push','scancode_waitmsg','pic_sysphoto','pic_photo_or_album','pic_weixin','location_select','media_id','view_limited'],
			options:[{
				value:'main',
				label:'主目录',
				children:[{
					value:'edit',
					label:'修改'
				},{
					value:'delete',
					label:'删除'
				}]
			},{
				value:'subButton',
				label:'子目录'
			},{
				value:'rule',
				label:"规则",
				children:[{
					value:'edit',
					label:'修改'
				},{
					value:'delete',
					label:'删除'
				}]
			}],
			selectedOptions:[],
			treeData:[]
		}
	},
	methods:{
	  showTr(row, index) {
      let show = (row.row.parent ? (row.row.parent.expandedAll && row.row.parent._show) : true)
      row.row._show = show
      return show ? '' : 'display:none;'
    },
		addRule(){
			this.buttons['matchrule'] = this.matchrule
			this.RuleDialogVisible = false
		},
		editRule(){
			delete this.buttons['matchrule']
			this.buttons['matchrule'] = this.matchrule
		},
		showAddRule() {
			this.RuleDialogVisible = true
		},
		submitAllMenu(){
			let rules = Object.keys(this.buttons.matchrule)
			this.$confirm('确定提交？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
      	if(rules.lenght === 0) delete this.buttons.matchrule
      	submitMenu(JSON.stringify(this.buttons)).then(res=>{
      		this.$message({
	          type: 'success',
	          message: '提交成功!'
        	});
      	}).catch(err=>{
      		this.$message({
	          type: 'error',
	          message: '提交失败!'
        	});
      	})
      }).catch(() => {
      	if( rules.length === 0 ) {
      		this.buttons.matchrule = {}
      	}
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
		},
		deletAllMenu() {
			this.$confirm('此操作将永久删除所有, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
        	this.buttons={button:[]},
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
		},
		showUlOrRoute(index){
			this.activeUl = this.activeUl == index ? -1 : index;
		},
		openAddMenu(){
			if(this.buttons.button.length == 3) {
				this.$alert('最多只能添加3个主目录', '错误', {
          confirmButtonText: '确定',
        });
				return
			}
			this.centerDialogVisible = true
			this.form = {} 
		},
		openEditMenu(index) {
			this.addingSubMenu = false
			this.centerDialogVisible = true
			this.editingBtn = !this.editingBtn
			if((typeof index) === "string") {
				let idxs = index.split('-').map((item) => {
					return parseInt(item)
				})
				this.form = this.buttons.button[idxs[0]].sub_button[idxs[1]]
				this.form.id = idxs
			} else {
				this.form = this.buttons.button[index]
			}
		},
		editMenu() {
			this.centerDialogVisible = false
			let index =  this.form.id
			delete this.form['id']
			let newObj = Object.assign({}, this.form);
			if((typeof index) === "object") {
				this.buttons.button[index[0]].sub_button.splice(index[1],1,newObj)
			} else {
				this.buttons.button.splice(index,1,newObj)
			}
			this.data2Tree()
		},
		deleteMenu(index) {
			if((typeof index) === 'string'){
				let idxs = index.split('-').map((item) => {
					return parseInt(item)
				})
				this.buttons.button[idxs[0]].sub_button.splice(idxs[1],1)
			} else {
				this.buttons.button.splice(index,1)
			}
			this.data2Tree()
		},
		addMainMenu() {
			this.centerDialogVisible = false
			this.buttons.button.push(this.form)
			this.data2Tree()
		},
		addSubButton(){
			let index = this.form.id
			if(!this.buttons.button[index].sub_button){
				this.buttons.button[index].sub_button = []
			}
			delete this.form['id']
			this.buttons.button[index].sub_button.push(this.form)
			this.form = {}
			this.cancelState()
			this.data2Tree()
		},
		showAddSubMenu(index){
			if(this.buttons.button[index].sub_button && this.buttons.button[index].sub_button.length == 5) {
				this.$alert('最多只能添加5个子目录', '错误', {
          confirmButtonText: '确定',
        });
				return
			}
			this.addingSubMenu = true
			this.editingBtn = false
			this.centerDialogVisible = true
			this.form = {}
			this.form.id = index
		},
		cancelState() {
			this.addingSubMenu = false
			this.editingBtn = false
			this.centerDialogVisible = false
			this.RuleDialogVisible = false
			delete this.form.id
		},
		toggle(obj,index){
			let pa = this.treeData[index]
			pa.expandedAll = !pa.expandedAll
		},
		data2Tree(){
			if(this.buttons.button && this.buttons.button.length > 0){
				this.treeData = transfer(this.buttons.button,null,null,true)
			}
		}
	},
	computed: {
		getButtonType() {
			let bts = this.buttonType.sort((b1,b2) => {
				return b1.length - b2.length
			})
			return bts
		},
		getTitle() {
			if(this.addingSubMenu) {
				this.title = ''
			}
		},

	},
	created(){

	},
	mounted(){
		
	},
	updated() {
		this.$nextTick(_=>{
			
			if(this.$refs.dropdownList) {
				let length = this.$refs.dropdownList.length
				for(let i=0;i<length;i++){
					let ul = this.$refs.dropdownList[i]
		    	let mid = ul.parentNode.offsetWidth / 2 - (ul.offsetWidth / 2 )
		    	let t = - (ul.parentNode.offsetHeight / 2 + ul.offsetHeight)
		    	ul.style.left = mid + 'px'
		    	ul.style.top = t + 'px'
		    }
			}
			return
  	})
	}

}
</script>
<style scoped>
	.edit-area{
		display: flex;
		padding:30px 30px 30px 0;
		margin:30px 30px 30px 15px;
		justify-content:space-between;
		flex-flow:  row nowrap;
	}
	.controll-block .edit-button {
		margin-bottom: 15px;
		margin: 0 auto;
	}	
	.edit-button .edit {
		float: right;
		padding: 0;
	}
	.edit-button .bottom {
  }
	.phone-screen .screen {
		width: 352px;
		height: 624px;
		background:rgba(243,243,243,1);
		color: #000000;
		position: relative;
	}
	.controll-block,.board {
	  flex: 1;
		background:rgba(0,0,0,0.2);
		border-radius: 5px;
		width: 100%;
	}
	.controll-block{
		flex: 0 0 400px;
		margin-right: 20px;
		padding: 30px;
	}
	.board {
		margin:0 auto;
		padding: 30px;
	}
	.main-board {
		display: flex;
		justify-content: space-around;
	}

	.phone-screen {
		margin-right: 30px;
	}
	.device-info {
		padding: 2px 5px 5px 5px;
		display: flex;
	}
	.device-info .signal {
		flex: 1;

	}
	.device-info .battery {
		flex: 1;
		text-align: center;
		font-size: 12px;
	}
	.device-info .time {
		flex: 1;
		text-align: center;
		font-size: 12px;
		vertical-align: middle;
	}
	.device-info .time span {
		vertical-align: middle;
	}
	.device-info .battery .percent {
		vertical-align: middle;
	}
	.device-info .icon-battery {
		border:1px solid rgb(0,0,0);
		border-radius: 4px;
		width: 30px;
		height: 70%;
		display:inline-block;
		vertical-align: middle;
		padding: 2px;
	}
	.phone-signal {
		display: inline-block;
		width: 20px;
		height: 100%;
		vertical-align: middle;

	}
	.signal {
		font-size: 12px;
		position: relative;
	}
	.signal .title span {
		vertical-align: middle;
	}
	.signal .title{
		display: inline-block;
		height: 100%;
	}

	.phone-signal p{
		position: absolute;
		width: 3px;
		background: #000;
		border-radius: 10%;
		bottom: 0;
	}
	.phone-signal p.first{
		height: 4px;
	}
	.phone-signal p.second {
		height: 6px;
		left: 5px;
	}
	.phone-signal p.third {
		height: 8px;
		left: 10px;
	}
	.phone-signal p.fourth {
		height: 10px;
		left: 15px;
	}
	.signal .wifi{
		display: inline-block;
		width: 20px;
		vertical-align: middle;
		text-align: center;
	}

	.wifi div.first{
		width: 15px;
		height: 2px;
		background: black;
		margin-bottom: 1px;
	}
	.wifi div.second{
		width: 12px;
		height: 2px;
		background: black;
		margin-bottom: 1px;
	}
	.wifi div.third{
		width: 9px;
		height: 2px;
		background: black;
		margin-bottom: 1px;
	}
	
	.phone-screen .screen .buttons{
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		background: #fff;
		display: flex;
		height: 40px;
		border-top: 1px solid rgb(243,243,243);
	}
	.screen .buttons .button {
		flex: 1;
		position: relative;
	}
	.buttons .button button {
		outline: none;
		background: #fff;
		width: 100%;
		height: 100%;
		border: 0;
		border-left: 1px solid rgb(243,243,243);
		cursor: pointer;
	}
	.buttons .keyboard{
		font-size: 20px;
		padding: 10px;
		flex: 0 0 20px;
	}
	.main-content {
		margin-top: 10px;
	}
	.main-content p {
		text-align: center;
		font-size: 12px;
		margin-bottom: 10px;
	}
	.screen .wx-mp-header{
		display: flex;
		font-size: 16px;
		padding: 5px 10px 15px 10px;
	}
	
	.screen .wx-mp-header .back{
		flex: 0 0 20px;
	}
	.screen .wx-mp-header .title{
		flex: 0 0 290px;
		text-align: center;
	}
	.screen .wx-mp-header .mp-button{
		flex: 0 0 20px;
	}
	.dropdown-list {
		padding: 10px 0;
		margin: 5px 0;
		z-index: 100;
		background-color: #fff;
		position: absolute;
		border: 1px solid #ebeef5;
    border-radius: 4px;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
	}
	.dropdown-list li{
		line-height: 36px;
		padding: 0 20px;
    margin: 0;
    font-size: 14px;
    color: #606266;
    cursor: pointer;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    max-width: 120px;
    text-align: center;
	}
	.dropdown-list li:hover{ 
		background-color: rgb(245,245,245);
	}
	.triangle_border_up{
    width:100%;
    height:0;
    position: relative;
    bottom:-18px;
	}
	.triangle_border_up:after{
		content: '';
		display:block;
    width:0;
    height:0;
    border-width:10px 10px 0;
    border-style:solid;
    border-color:#fff transparent transparent;/*透明 透明  黄*/
    position:absolute;
    left: 38%;
    top:-10px;
	}
	.code {
	}
	.edit-button i {
		font-size: 16px
	}
	.clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  
  .clearfix:after {
     clear: both
  }
	.ul-enter-active, .ul-leave-active {
  	transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
	} 
	.ul-enter, .ul-leave-to /* .fade-leave-active below version 2.1.8 */ {
		transform: translateY(20px);
		opacity: 0;
	}
</style>